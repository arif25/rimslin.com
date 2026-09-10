/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Edit3,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Lock,
} from "lucide-react";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

// Popular country dialing codes with flags for Rimslin learners (GCC & South Asia)
const COUNTRY_CODES = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+1", name: "USA / Canada", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Location detection: Default to India ("IN") while loading for seamless UX
  const [country, setCountry] = useState<string>("IN");
  const isIndia = country === "IN";

  // Auth step state: "phone" (enter mobile) | "otp" (enter 6-digit code)
  const [authStep, setAuthStep] = useState<"phone" | "otp">("phone");

  // Step 1: Phone input state
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [finalFormattedPhone, setFinalFormattedPhone] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Step 2: OTP verification state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Google sign-in loading
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  // Feedback messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // OTP input refs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1. Detect User Location (IN vs outside IN)
  useEffect(() => {
    let isMounted = true;

    // Check for query override (e.g. ?country=US or ?country=IN for testing)
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const queryCountry = searchParams.get("country");
      if (queryCountry) {
        setCountry(queryCountry.toUpperCase());
        return;
      }

      // Check session cache to avoid repeated network calls
      const cached = sessionStorage.getItem("rimslin_user_country");
      if (cached) {
        setCountry(cached.toUpperCase());
        return;
      }
    }

    const detectCountry = async () => {
      let detected: string | null = null;

      // Try 1: Next.js internal geo route handler (headers like x-vercel-ip-country)
      try {
        const res = await fetch("/api/geo");
        if (res.ok) {
          const data = await res.json();
          if (data?.country) {
            detected = data.country;
          }
        }
      } catch {
        // Continue to fallback
      }

      // Try 2: Free, fast external geolocation fallback (api.country.is)
      if (!detected) {
        try {
          const res = await fetch("https://api.country.is");
          if (res.ok) {
            const data = await res.json();
            if (data?.country) {
              detected = data.country;
            }
          }
        } catch {
          // Continue to fallback
        }
      }

      // Try 3: Secondary external geolocation fallback (ipapi.co)
      if (!detected) {
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const data = await res.json();
            if (data?.country_code) {
              detected = data.country_code;
            }
          }
        } catch {
          // Graceful fallback to default 'IN'
        }
      }

      if (detected && isMounted) {
        const upper = detected.toUpperCase();
        setCountry(upper);
        try {
          sessionStorage.setItem("rimslin_user_country", upper);
        } catch {
          // Ignore session storage errors
        }
      }
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. If already logged in, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // 3. Lifecycle cleanup on unmount for reCAPTCHA
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch {
          // ignore cleanup errors
        }
        window.recaptchaVerifier = undefined;
        const container = document.getElementById("recaptcha-container");
        if (container) {
          container.innerHTML = "";
        }
      }
    };
  }, []);

  // 4. Countdown timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authStep === "otp" && resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else if (authStep === "otp" && resendCountdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [authStep, resendCountdown]);

  // Helper to ensure RecaptchaVerifier instance is available (Singleton)
  // Only rendered/initialized if isIndia is true
  const getOrCreateRecaptchaVerifier = () => {
    if (typeof window === "undefined" || !isIndia) return null;

    // If verifier already exists, reuse it without remounting
    if (window.recaptchaVerifier) {
      return window.recaptchaVerifier;
    }

    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          setErrorMessage("reCAPTCHA session expired. Please try sending OTP again.");
          if (window.recaptchaVerifier) {
            try {
              window.recaptchaVerifier.clear();
            } catch {
              // ignore
            }
            window.recaptchaVerifier = undefined;
            const c = document.getElementById("recaptcha-container");
            if (c) c.innerHTML = "";
          }
        },
      }
    );
    return window.recaptchaVerifier;
  };

  // =========================================================================
  // STEP 1: Handle Send OTP
  // =========================================================================
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate international phone format (must begin with '+', default or prepend +91 if missing)
    const raw = phoneNumber.trim().replace(/[\s-()]/g, "");
    if (!raw) {
      setErrorMessage("Please enter your mobile number.");
      return;
    }

    let formattedPhone = raw;
    if (!formattedPhone.startsWith("+")) {
      const code = countryCode ? (countryCode.startsWith("+") ? countryCode : `+${countryCode}`) : "+91";
      const cleanNumber = formattedPhone.replace(/^0+/, "");
      formattedPhone = `${code}${cleanNumber}`;
    }

    // Must begin with '+' and have 7-15 digits (E.164 standard)
    const internationalRegex = /^\+[1-9]\d{6,14}$/;
    if (!internationalRegex.test(formattedPhone)) {
      setErrorMessage(
        "Please enter a valid international mobile number (e.g. +91 98765 43210 or 9876543210)."
      );
      return;
    }

    try {
      setIsSendingOtp(true);
      const appVerifier = getOrCreateRecaptchaVerifier();
      if (!appVerifier) {
        throw new Error("Unable to initialize reCAPTCHA verifier.");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setFinalFormattedPhone(formattedPhone);
      setAuthStep("otp");
      setOtp(["", "", "", "", "", ""]);
      setResendCountdown(30);
      setCanResend(false);
      setSuccessMessage(`OTP sent successfully to ${formattedPhone}`);

      // Auto-focus first OTP input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      console.error("Firebase send OTP error:", err);
      // Reset reCAPTCHA and container on failure so subsequent attempts succeed cleanly
      if (typeof window !== "undefined" && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch {
          // ignore
        }
        window.recaptchaVerifier = undefined;
        const container = document.getElementById("recaptcha-container");
        if (container) {
          container.innerHTML = "";
        }
      }

      if (err?.code === "auth/invalid-phone-number") {
        setErrorMessage("Invalid phone number format. Please check the country code and number.");
      } else if (err?.code === "auth/too-many-requests") {
        setErrorMessage("Too many attempts. Please wait a few moments before trying again.");
      } else if (err?.code === "auth/quota-exceeded") {
        setErrorMessage("SMS quota reached for today. Please sign in with Google or contact support.");
      } else if (err?.code === "auth/captcha-check-failed") {
        setErrorMessage("reCAPTCHA check failed. Please refresh the page and try again.");
      } else if (err?.code === "auth/app-not-authorized") {
        setErrorMessage("App domain not authorized in Firebase Console. Please add your domain to Authorized Domains.");
      } else {
        setErrorMessage(err?.message || "Failed to send verification code. Please try again.");
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  // =========================================================================
  // STEP 2: Handle OTP Input Change & Keyboard
  // =========================================================================
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next box if digit entered
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerifyOtp();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // =========================================================================
  // STEP 2: Handle Verify OTP
  // =========================================================================
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const enteredOtp = otp.join("").trim();
    if (enteredOtp.length !== 6) {
      setErrorMessage("Please enter all 6 digits of the OTP code.");
      return;
    }

    const activeConfirmation = confirmationResult || window.confirmationResult;
    if (!activeConfirmation) {
      setErrorMessage("Session expired. Please request a new verification code.");
      setAuthStep("phone");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      await activeConfirmation.confirm(enteredOtp);

      setSuccessMessage("Verification successful! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Firebase verify OTP error:", err);
      if (err?.code === "auth/invalid-verification-code") {
        setErrorMessage("Invalid OTP code. Please check your SMS and try again.");
      } else if (err?.code === "auth/code-expired") {
        setErrorMessage("The OTP code has expired. Please click 'Resend OTP' to receive a new code.");
      } else {
        setErrorMessage(err?.message || "Failed to verify OTP. Please try again.");
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // =========================================================================
  // STEP 2: Handle Resend OTP & Edit Number
  // =========================================================================
  const handleResendOtp = async () => {
    if (!canResend || isSendingOtp) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    setOtp(["", "", "", "", "", ""]);
    await handleSendOtp();
  };

  const handleEditNumber = () => {
    setAuthStep("phone");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // =========================================================================
  // STEP 3: Handle Google Sign-In
  // =========================================================================
  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      setIsGoogleSigningIn(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      if (result?.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (
        err?.code !== "auth/popup-closed-by-user" &&
        err?.code !== "auth/cancelled-popup-request"
      ) {
        console.error("Google sign in error:", err);
        setErrorMessage("Google sign-in could not be completed. Please try again.");
      }
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  // Google 4-Color Icon
  const GoogleGIcon = () => (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      {/* Invisible container required for Firebase reCAPTCHA - only rendered if user is in India */}
      {isIndia && <div id="recaptcha-container" />}

      {/* Main Centered Sign-In Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 relative overflow-hidden bg-hero-emerald-glow">
        {/* Subtle decorative background ambient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/10 dark:bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card Container */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-surface-100/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-emerald-950/5 dark:shadow-black/60 p-6 sm:p-8 overflow-hidden">
            {/* Top Gradient Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

            {/* Header / Brand Badge */}
            <div className="text-center space-y-2 mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Rimslin Spoken & Career Hub</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sign in or create account
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isIndia ? (
                  authStep === "phone" ? (
                    "Enter your mobile number to get started"
                  ) : (
                    <span>
                      Enter the 6-digit code sent to{" "}
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {finalFormattedPhone || `${countryCode} ${phoneNumber}`}
                      </span>
                    </span>
                  )
                ) : (
                  "Sign in with Google to get started (Mobile OTP is currently available in India only)"
                )}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300 animate-in fade-in-50 duration-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                <span className="leading-relaxed flex-1 font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300 animate-in fade-in-50 duration-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <span className="leading-relaxed flex-1 font-medium">{successMessage}</span>
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 1: MOBILE NUMBER INPUT (INDIA ONLY) */}
            {/* ============================================================= */}
            {isIndia && authStep === "phone" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={isSendingOtp}
                        className="appearance-none h-12 pl-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all cursor-pointer disabled:opacity-60"
                        aria-label="Country Code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Phone Number Input */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        autoFocus
                        disabled={isSendingOtp}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="98765 43210 or +91..."
                        className="w-full h-12 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    Default +91 (India) applied if + is omitted. International format supported.
                  </p>
                </div>

                {/* Continue Action Button */}
                <button
                  type="submit"
                  disabled={isSendingOtp || !phoneNumber.trim()}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSendingOtp ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ============================================================= */}
            {/* STEP 2: OTP VERIFICATION (INDIA ONLY) */}
            {/* ============================================================= */}
            {isIndia && authStep === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in-50 duration-200">
                {/* Masked Number & Prominent Edit Button */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{finalFormattedPhone || `${countryCode} ${phoneNumber}`}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleEditNumber}
                    disabled={isVerifyingOtp}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit Number</span>
                  </button>
                </div>

                {/* 6-Digit OTP Input Boxes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
                    Enter 6-Digit Verification Code
                  </label>
                  <div className="flex justify-between gap-1.5 sm:gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        disabled={isVerifyingOtp}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-extrabold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all disabled:opacity-60"
                      />
                    ))}
                  </div>
                </div>

                {/* Verify OTP Button */}
                <button
                  type="submit"
                  disabled={isVerifyingOtp || otp.join("").length !== 6}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isVerifyingOtp ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Verify OTP</span>
                    </>
                  )}
                </button>

                {/* Resend & Edit Links Footer */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={!canResend || isSendingOtp || isVerifyingOtp}
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className={`h-3 w-3 ${isSendingOtp ? "animate-spin" : ""}`} />
                    <span>
                      {canResend
                        ? "Resend OTP"
                        : `Resend OTP in ${resendCountdown}s`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEditNumber}
                    disabled={isVerifyingOtp}
                    className="font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    Change Number
                  </button>
                </div>
              </form>
            )}

            {/* ============================================================= */}
            {/* DIVIDER: "OR" (INDIA ONLY) */}
            {/* ============================================================= */}
            {isIndia && (
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-surface-100 px-3 text-slate-400 dark:text-slate-500 font-bold tracking-wider">
                    OR
                  </span>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 3: GOOGLE SIGN-IN */}
            {/* ============================================================= */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleSigningIn || isSendingOtp || isVerifyingOtp}
                className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${!isIndia
                  ? "h-14 py-3.5 border-emerald-500/40 hover:border-emerald-500 shadow-lg shadow-emerald-500/10 text-base ring-2 ring-emerald-500/20"
                  : "h-12"
                  }`}
              >
                {isGoogleSigningIn ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <GoogleGIcon />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Card Security Footnote */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>Protected by Firebase Authentication</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                By continuing, you agree to Rimslin&apos;s{" "}
                <Link
                  href="/terms-and-conditions"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

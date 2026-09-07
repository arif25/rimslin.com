/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  LogOut,
  Sparkles,
  BookOpen,
  Video,
  Volume2,
  FileText,
  ShieldCheck,
  Calendar,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogin = async () => {
    try {
      setIsSigningIn(true);
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

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

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : user?.email?.[0].toUpperCase() || "U";

  const learningFeatures = [
    {
      title: "আরবি ভাষা শিক্ষা ভিডিও কালেকশন",
      subtitle: "২৪ টি সম্পূর্ণ ক্লাস ও উচ্চারণ লেসন",
      icon: Video,
      href: "/video-classes",
      badge: "২৪ টি ক্লাস",
      color: "emerald",
    },
    {
      title: "ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো",
      subtitle: "গালফ স্পোকেন আরবি কাজের অডিও উচ্চারণ",
      icon: Volume2,
      href: "/audio-phrases",
      badge: "অডিও লিসেনিং",
      color: "teal",
    },
    {
      title: "গালফ জব ও ভাষা শিক্ষা বুকস",
      subtitle: "ডিজিটাল PDF হ্যান্ডবুক কালেকশন",
      icon: BookOpen,
      href: "/books",
      badge: "PDF স্টোর",
      color: "amber",
    },
    {
      title: "প্রবাসী এআই রেজুমি বিল্ডার",
      subtitle: "গালফ কাজের প্রফেশনাল CV তৈরি করুন",
      icon: FileText,
      href: "/resume-builder",
      badge: "ফ্রি CV",
      color: "blue",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-background dark:text-slate-100 selection:bg-gulf-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              হোম
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">ইউজার প্রোফাইল</span>
          </div>

          {!hasMounted || loading ? (
            /* Skeleton Loading */
            <div className="space-y-6">
              <div className="h-44 w-full rounded-2xl bg-slate-200/70 dark:bg-surface-200 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-28 rounded-2xl bg-slate-200/70 dark:bg-surface-200 animate-pulse" />
                <div className="h-28 rounded-2xl bg-slate-200/70 dark:bg-surface-200 animate-pulse" />
              </div>
            </div>
          ) : !user ? (
            /* Logged Out State Prompt */
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-100/80 p-8 sm:p-12 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-5">
                <User className="h-8 w-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                আপনার Rimslin অ্যাকাউন্টে লগইন করুন
              </h1>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                আপনার গুগল অ্যাকাউন্ট দিয়ে এক ক্লিকে সহজে লগইন করুন এবং আপনার শেখার অগ্রগতি ও ম্যাটেরিয়ালস সংরক্ষণ করুন।
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isSigningIn}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-200 text-slate-800 dark:text-white font-bold text-base shadow-md hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-surface-300 transition-all active:scale-95"
                >
                  {isSigningIn ? (
                    <div className="h-5 w-5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                  ) : (
                    <GoogleGIcon />
                  )}
                  <span>{isSigningIn ? "লগইন হচ্ছে..." : "গুগল দিয়ে লগইন করুন"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged In Profile View */
            <div className="space-y-8">
              {/* Profile Card Header */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-surface-100/90 p-6 sm:p-8 shadow-xl backdrop-blur-md">
                {/* Background Ambient Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* User Avatar */}
                    <div className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-emerald-50 dark:bg-surface-200 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-2xl shadow-md shrink-0">
                      {user.photoURL && !imgError ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                          {user.displayName || "সম্মানিত লার্নার"}
                        </h1>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
                          <ShieldCheck className="h-3 w-3" />
                          <span>Google Verified</span>
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{user.email}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-surface-200 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-50 dark:hover:bg-red-950/30 transition-all shadow-sm active:scale-95"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>লগআউট (Logout)</span>
                  </button>
                </div>
              </div>

              {/* Learning Sections & Quick Access Hub */}
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500 dark:text-gold-400" />
                  <span>লার্নিং হাব ও কুইক এক্সেস (Learning Hub)</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {learningFeatures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-surface-100 hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:hover:bg-surface-200 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 group-hover:scale-105 transition-transform shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

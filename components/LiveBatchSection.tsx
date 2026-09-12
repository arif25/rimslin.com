"use client";

import React, { useState, useEffect } from "react";
import {
  Video,
  Users,
  CheckCircle2,
  Clock,
  Globe2,
  Calendar,
  ArrowRight,
  Sparkles,
  X,
  ShieldCheck,
  Award,
  MessageSquare,
  PhoneCall,
  Check,
  AlertCircle,
  Laptop,
  Smartphone,
  ChevronRight,
} from "lucide-react";

interface BookingFormData {
  name: string;
  whatsapp: string;
  country: string;
  timeSlot: string;
}

const GULF_COUNTRIES = [
  { code: "+966", name: "সৌদি আরব (Saudi Arabia)", flag: "🇸🇦" },
  { code: "+971", name: "দুবাই / সংযুক্ত আরব আমিরাত (UAE)", flag: "🇦🇪" },
  { code: "+974", name: "কাতার (Qatar)", flag: "🇶🇦" },
  { code: "+965", name: "কুয়েত (Kuwait)", flag: "🇰🇼" },
  { code: "+968", name: "ওমান (Oman)", flag: "🇴🇲" },
  { code: "+973", name: "বাহরাইন (Bahrain)", flag: "🇧🇭" },
  { code: "+880", name: "বাংলাদেশ (প্রবাসগামী / প্রস্তুতি)", flag: "🇧🇩" },
  { code: "+91", name: "ভারত (India / প্রবাসগামী)", flag: "🇮🇳" },
  { code: "+", name: "অন্যান্য দেশ (Other Country)", flag: "🌍" },
];

const TIME_SLOTS = [
  { id: "slot-9pm", label: "🌙 রাত ৯:০০ টা (KSA সন্ধ্যা ৭:০০ টা / BD রাত ৯:০০ টা)" },
  { id: "slot-10pm", label: "🌙 রাত ১০:০০ টা (KSA রাত ৮:০০ টা / BD রাত ১০:০০ টা)" },
  { id: "slot-morning", label: "☀️ সকালের ব্যাচ (সকাল ১০:০০ টা বাংলাদেশ সময়)" },
  { id: "slot-flexible", label: "🕒 যেকোনো সুবিধাজনক সময়ে (Flexible Slot)" },
];

export default function LiveBatchSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    whatsapp: "",
    country: "সৌদি আরব (Saudi Arabia)",
    timeSlot: "🌙 রাত ৯:০০ টা (KSA সন্ধ্যা ৭:০০ টা / BD রাত ৯:০০ টা)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppDirectUrl = (data: BookingFormData) => {
    const message = `আসসালামু আলাইকুম Rimslin টিম,\nআমি সরাসরি লাইভ ক্লাসের ৩ দিনের ফ্রি ট্রায়াল ডেমো ব্যাচে যুক্ত হতে চাই।\n\n📌 নাম: ${data.name.trim()}\n📱 হোয়াটসঅ্যাপ: ${data.whatsapp.trim()}\n🌍 দেশ: ${data.country}\n⏰ পছন্দের সময়: ${data.timeSlot}\n\nদয়া করে আমাকে ডেমো ক্লাসের Google Meet / Zoom লিংক এবং শিডিউল পাঠিয়ে দিন। ধন্যবাদ!`;
    return `https://wa.me/916290051284?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("দয়া করে আপনার নাম লিখুন।");
      return;
    }

    if (!formData.whatsapp.trim() || formData.whatsapp.trim().length < 8) {
      setErrorMessage("দয়া করে দেশের কোড সহ সঠিক হোয়াটসঅ্যাপ নম্বর লিখুন (যেমন: +966 50... বা +880 17...)");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post lead data to internal resilient API
      await fetch("/api/live-batch-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch((err) => {
        console.warn("Lead API background notice:", err);
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      // Even if API fails, allow direct WhatsApp progression
      setIsSuccess(true);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMessage("");
    }, 300);
  };

  return (
    <section
      id="live-batch"
      className="relative scroll-mt-24 sm:scroll-mt-28 w-full max-w-full py-12 sm:py-16 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/80 dark:from-[#041209]/80 dark:via-[#060e09] dark:to-[#040a06] border-y border-emerald-200/80 dark:border-emerald-900/40 transition-colors duration-200 overflow-hidden"
    >
      {/* Background Decorative Ambient Blobs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl rounded-full bg-emerald-400/10 dark:bg-emerald-500/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-amber-400/10 dark:bg-gold-500/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER WITH LIVE BEACON & PLATFORM BADGES                     */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Floating Highlight Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 shadow-xs mb-4 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <span className="uppercase tracking-wider font-bold text-red-600 dark:text-red-400">
              সরাসরি লাইভ ক্লাস
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Video className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Google Meet & Zoom
            </span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
            🔴 সরাসরি লাইভ ক্লাসে আরবি ও ইংরেজি শিখুন{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-gold-400 bg-clip-text text-transparent">
              (Google Meet / Zoom)
            </span>
          </h2>

          {/* Subtitle / Value Proposition */}
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            প্রথম ৩টি ফ্রি ট্রায়াল/ডেমো ক্লাস করে নিজের লেভেল যাচাই করুন। এরপর
            আপনার দক্ষতা অনুযায়ী বেসিক, মিডিয়াম বা অ্যাডভান্সড ব্যাচে যুক্ত
            হওয়ার সুযোগ।
          </p>

          {/* Trust Badges Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/50 border border-emerald-300/80 dark:border-emerald-800/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>৩ দিনের ফ্রি ট্রায়াল ক্লাস</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/50 border border-emerald-300/80 dark:border-emerald-800/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>মোবাইল থেকেই সরাসরি টিচারের সাথে কথা বলার সুযোগ</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/50 border border-emerald-300/80 dark:border-emerald-800/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>ফ্রি লেভেল টেস্ট ও সঠিক ব্যাচ সিলেকশন</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO OFFER BANNER CARD & PRIMARY CTA                                  */}
        {/* ========================================================================= */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border-2 border-emerald-400/80 dark:border-emerald-500/40 bg-white dark:bg-[#0b1b10] shadow-xl shadow-emerald-900/10 p-6 sm:p-8 overflow-hidden">
            {/* Subtle Gradient Accent Border Line at Top */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

            {/* Urgency Badge */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-5 border-b border-slate-200/80 dark:border-white/10">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 dark:text-gold-300 bg-amber-50 dark:bg-gold-950/60 border border-amber-200 dark:border-gold-800/60 px-3 py-1 rounded-full">
                <span>🔥 পরবর্তী ব্যাচে আর মাত্র ৭টি সিট বাকি</span>
                <span className="hidden sm:inline">• আগামী সোমবার থেকে ক্লাস শুরু</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ক্লাস ডিউরেশন: ৪৫ মিনিট / দিন</span>
              </div>
            </div>

            {/* Grid Layout: Left Key Highlights, Right Direct Action CTA */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ভুল উচ্চারণ ও দ্বিধা দূর করুন সরাসরি টিচারের সাথে কথা বলে
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  বই বা ভিডিও দেখে অনেকেই মুখে আটকে যান। আমাদের লাইভ ক্লাসে
                  টিচার সরাসরি আপনাকে দিয়ে মুখে বলিয়ে নেবেন—সৌদি, দুবাই বা
                  কাতারে আরবদের সাথে যেমন কথা বলতে হয় ঠিক সেভাবেই।
                </p>

                {/* Feature checklist */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-1">
                  <li className="flex items-center gap-2 font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0 text-xs">
                      ✓
                    </span>
                    <span>ছোট ব্যাচ (প্রতি ক্লাসে সীমিত ছাত্র, যাতে সবাই বলার সুযোগ পায়)</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0 text-xs">
                      ✓
                    </span>
                    <span>মোবাইল দিয়েই এক ক্লিকে Google Meet-এ জয়েন করা যাবে</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0 text-xs">
                      ✓
                    </span>
                    <span>ক্লাস শেষে প্রতিটি লেকচারের ফ্রি অডিও ও PDF শিট সরবরাহ</span>
                  </li>
                </ul>
              </div>

              {/* Action Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-center bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-5 border border-emerald-200/90 dark:border-emerald-800/50 text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎁</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    ১০০% ফ্রি ট্রায়াল
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  ৩ দিনের ফ্রি ডেমো
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4">
                  কোনো ক্রেডিট কার্ড বা অগ্রিম ফি ছাড়া শুরু করুন
                </p>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 border border-emerald-400/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ring-2 ring-emerald-400/30 animate-pulse-subtle"
                >
                  <span>৩ দিনের ফ্রি ডেমো ক্লাসে সিট বুক করুন</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  🔒 সিট কনফার্মেশন ও মিট লিংক সরাসরি হোয়াটসঅ্যাপে পাবেন
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. LEVEL PROGRESSION EXPLAINER (HOW IT WORKS - 3 STEP ROADMAP)           */}
        {/* ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              কীভাবে আপনার উপযুক্ত ব্যাচ নির্বাচন করা হয়?
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              ৩টি সহজ ধাপে সম্পূর্ণ ফ্রি ডেমো থেকে রেগুলার ব্যাচে উত্তরণ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-base border border-emerald-300 dark:border-emerald-800">
                  ০১
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  ৩ দিন ফ্রি
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                ৩ দিনের ফ্রি ডেমো ক্লাস
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                উচ্চারণ, সালাম-কালাম ও সাধারণ কাজের কথাবার্তা দিয়ে শুরু হবে।
                অনলাইনে টিচারের সাথে কথা বলে ক্লাস পরিবেশ উপভোগ করুন।
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 border border-amber-300/80 dark:border-gold-500/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-gold-950 text-amber-800 dark:text-gold-300 font-black text-base border border-amber-300 dark:border-gold-800">
                  ০২
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-gold-950/70 text-amber-800 dark:text-gold-300 border border-amber-200 dark:border-gold-800/60">
                  লেভেল টেস্ট
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                দক্ষতা যাচাই (Level Test)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ডেমো ক্লাসের পর টিচার ব্যক্তিগতভাবে আপনার পূর্বের অভিজ্ঞতা, কাজের
                ধরণ ও স্পিকিং টেস্ট নিয়ে আপনার সঠিক লেভেল নির্ধারণ করবেন।
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-base border border-emerald-300 dark:border-emerald-800">
                  ০৩
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  টার্গেটেড লার্নিং
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                টার্গেটেড ব্যাচে ক্লাস
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                আপনার মান অনুযায়ী <strong>Basic</strong>, <strong>Medium</strong>{" "}
                অথবা <strong>Advanced</strong> পেইড ব্যাচে যুক্ত হয়ে সরাসরি
                কর্মক্ষেত্রের প্রয়োজনীয় ভাষায় অনর্গল কথা বলা শিখুন।
              </p>
            </div>
          </div>

          {/* Bottom Roadmap Action Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-100/90 dark:bg-surface-100 border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                নিজের লেভেল জানতে আজই ফ্রি ডেমো ক্লাসে যোগ দিন। কোনো বাধ্যবাধকতা নেই।
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-gray-800 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shadow-2xs"
            >
              <span>ফ্রি সিট বুকিং ফর্ম খুলুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOOKING MODAL (POP-UP LEAD GENERATION FORM)                           */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-batch-modal-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          {/* Backdrop Blur Overlay */}
          <div
            onClick={resetModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0c1811] rounded-2xl sm:rounded-3xl border border-emerald-200 dark:border-emerald-800/80 shadow-2xl overflow-hidden z-10 animate-fade-in my-auto">
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {!isSuccess ? (
                <>
                  {/* Modal Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2.5">
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>৩ দিনের ফ্রি লাইভ ডেমো ক্লাস</span>
                    </div>
                    <h3
                      id="live-batch-modal-title"
                      className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
                    >
                      আপনার ফ্রি সিট নিশ্চিত করুন
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      তথ্য প্রদান করুন—ক্লাসের Google Meet / Zoom লিংক ও শিডিউল সরাসরি
                      আপনার হোয়াটসঅ্যাপে পাঠানো হবে।
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {/* Field 1: Name */}
                    <div>
                      <label
                        htmlFor="batch-name"
                        className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                      >
                        আপনার পুরো নাম (Name) *
                      </label>
                      <input
                        type="text"
                        id="batch-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="যেমন: মোঃ আরিফ হোসেন"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Field 2: WhatsApp Number */}
                    <div>
                      <label
                        htmlFor="batch-whatsapp"
                        className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                      >
                        হোয়াটসঅ্যাপ নম্বর (WhatsApp Number) *
                      </label>
                      <input
                        type="tel"
                        id="batch-whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="যেমন: +966 50 123 4567 বা +880 1712 345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 font-mono"
                      />
                      <span className="block mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        * দেশের কোড সহ নম্বর লিখুন (যেমন: +966 / +971 / +880)
                      </span>
                    </div>

                    {/* Field 3: Country */}
                    <div>
                      <label
                        htmlFor="batch-country"
                        className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                      >
                        কোন দেশে আছেন বা যাবেন? (Destination / Current Country)
                      </label>
                      <select
                        id="batch-country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                      >
                        {GULF_COUNTRIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Field 4: Time Slot */}
                    <div>
                      <label
                        htmlFor="batch-timeslot"
                        className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                      >
                        পছন্দের ক্লাসের সময় (Preferred Time Slot)
                      </label>
                      <select
                        id="batch-timeslot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.id} value={slot.label}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-700/20 disabled:opacity-60 transition-all cursor-pointer text-sm sm:text-base active:scale-[0.99]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            সিট সংরক্ষণ করা হচ্ছে...
                          </span>
                        ) : (
                          <>
                            <span>ফ্রি ক্লাসের সিট কনফার্ম করুন (হোয়াটসঅ্যাপে লিংক পান)</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Micro trust note */}
                    <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। কোনো স্প্যাম মেসেজ পাঠানো হবে না।
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-4 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      আপনার ফ্রি সিট সংরক্ষিত হয়েছে! 🎉
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                      ধন্যবাদ <strong>{formData.name}</strong>। আপনার অনুরোধটি গৃহীত হয়েছে।
                      ক্লাসের Google Meet / Zoom লিংক এবং শিডিউল সরাসরি আপনার হোয়াটসঅ্যাপে পেতে নিচের বাটনে ক্লিক করুন:
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div><strong>হোয়াটসঅ্যাপ:</strong> {formData.whatsapp}</div>
                    <div><strong>দেশ:</strong> {formData.country}</div>
                    <div><strong>পছন্দের সময়:</strong> {formData.timeSlot}</div>
                  </div>

                  {/* WhatsApp Direct Connect CTA */}
                  <div className="pt-2 space-y-2.5">
                    <a
                      href={getWhatsAppDirectUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 transition-all text-sm sm:text-base"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      <span>হোয়াটসঅ্যাপে ক্লাসের লিংক রিসিভ করুন →</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetModal}
                      className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      বন্ধ করুন (Close)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

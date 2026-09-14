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

import LiveBatchBookingModal from "@/components/LiveBatchBookingModal";

export default function LiveBatchSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="live-batch"
      className="relative scroll-mt-24 sm:scroll-mt-28 w-full max-w-full py-6 sm:py-10 md:py-16 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/80 dark:from-[#041209]/80 dark:via-[#060e09] dark:to-[#040a06] border-y border-emerald-200/80 dark:border-emerald-900/40 transition-colors duration-200 overflow-hidden"
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
        <div className="mt-5 sm:mt-8 md:mt-10 max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border-2 border-emerald-400/80 dark:border-emerald-500/40 bg-white dark:bg-[#0b1b10] shadow-xl shadow-emerald-900/10 p-4 sm:p-6 md:p-8 overflow-hidden">
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
        <div className="mt-6 sm:mt-10 md:mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              কীভাবে আপনার উপযুক্ত ব্যাচ নির্বাচন করা হয়?
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              ৩টি সহজ ধাপে সম্পূর্ণ ফ্রি ডেমো থেকে রেগুলার ব্যাচে উত্তরণ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 relative">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-4 sm:p-6 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
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
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-4 sm:p-6 border border-amber-300/80 dark:border-gold-500/30 shadow-sm hover:shadow-md transition-shadow">
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
            <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-4 sm:p-6 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
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
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-100/90 dark:bg-surface-100 border border-slate-200 dark:border-white/10">
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
      <LiveBatchBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

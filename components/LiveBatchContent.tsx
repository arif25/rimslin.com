"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Check,
  AlertCircle,
  Laptop,
  Smartphone,
  ChevronRight,
  Headphones,
  FileText,
  Star,
  Zap,
} from "lucide-react";
import LiveBatchBookingModal, {
  BookingFormData,
  GULF_COUNTRIES,
  TIME_SLOTS,
} from "@/components/LiveBatchBookingModal";

export default function LiveBatchContent() {
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
      setIsSuccess(true);
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Decorative Ambient Blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-6xl rounded-full bg-gradient-to-b from-emerald-400/15 via-teal-400/10 to-transparent dark:from-emerald-500/10 dark:via-teal-500/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-96 -right-20 -z-10 h-80 w-80 rounded-full bg-rose-400/10 dark:bg-rose-500/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-96 -left-20 -z-10 h-80 w-80 rounded-full bg-amber-400/10 dark:bg-gold-500/5 blur-3xl"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH LIVE BADGE & TRUST PILLS                            */}
      {/* ========================================================================= */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Live Indicator Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/70 shadow-xs mb-5 text-xs font-bold text-rose-700 dark:text-rose-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
          </span>
          <span className="uppercase tracking-wider">সরাসরি লাইভ ক্লাস</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Video className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Google Meet & Zoom
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight max-w-4xl mx-auto">
          🔴 সরাসরি লাইভ ক্লাসে আরবি ও ইংরেজি শিখুন{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-gold-400 bg-clip-text text-transparent">
            (Google Meet / Zoom)
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 text-base sm:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
          প্রথম ৩ দিনের ফ্রি ডেমো ক্লাস করে নিজের লেভেল যাচাই করুন। কোনো অগ্রিম ফি
          বা ক্রেডিট কার্ড ছাড়াই জয়েন করুন।
        </p>

        {/* Urgency Callout */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900 dark:text-gold-200 bg-amber-50/90 dark:bg-gold-950/50 border border-amber-200/90 dark:border-gold-800/60 px-4 py-1.5 rounded-full shadow-2xs">
          <span>🔥 পরবর্তী ব্যাচে আর মাত্র ৭টি সিট বাকি</span>
          <span className="hidden sm:inline">• আগামী সোমবার থেকে ক্লাস শুরু</span>
        </div>

        {/* Hero CTA Button Cluster */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={scrollToBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 border border-emerald-400/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>৩ দিনের ফ্রি ডেমো ক্লাসে সিট বুক করুন</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0b1910] hover:bg-slate-100 dark:hover:bg-surface-200 border border-slate-200 dark:border-white/10 shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>সরাসরি পপ-আপ ফর্ম</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-800/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>✓ ৩ দিনের ফ্রি ট্রায়াল</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-800/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>✓ সরাসরি কথা বলার সুযোগ</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-800/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>✓ ফ্রি লেভেল টেস্ট</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-800/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>✓ অডিও ও PDF শিট</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS / 3-STEP PROGRESSION ROADMAP                             */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-white/10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <span>ধাপভিত্তিক রোডম্যাপ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            কীভাবে আপনার উপযুক্ত ব্যাচ নির্বাচন করা হয়?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ৩টি সহজ ধাপে সম্পূর্ণ ফ্রি ডেমো থেকে আপনার উপযুক্ত নিয়মিত ব্যাচে উত্তরণ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 sm:p-7 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-lg border border-emerald-300 dark:border-emerald-800">
                ০১
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                ৩ দিন ফ্রি
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
              ৩ দিনের ফ্রি ডেমো ক্লাস
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              উচ্চারণ, সালাম-কালাম ও সাধারণ কাজের কথাবার্তা দিয়ে শুরু হবে। অনলাইনে
              টিচারের সাথে সরাসরি কথা বলে ক্লাসের পরিবেশ ও শিক্ষাদান পদ্ধতি যাচাই করুন।
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 sm:p-7 border border-amber-300/80 dark:border-gold-500/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 dark:bg-gold-950 text-amber-800 dark:text-gold-300 font-black text-lg border border-amber-300 dark:border-gold-800">
                ০২
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-gold-950/70 text-amber-800 dark:text-gold-300 border border-amber-200 dark:border-gold-800/60">
                লেভেল টেস্ট
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
              দক্ষতা যাচাই (Level Test)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ডেমো ক্লাসের পর টিচার ব্যক্তিগতভাবে আপনার পূর্বের অভিজ্ঞতা, কাজের ধরন
              ও স্পিকিং টেস্ট নিয়ে আপনার মান অনুযায়ী সঠিক লেভেল নির্ধারণ করবেন।
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl bg-white dark:bg-[#0c1811] p-6 sm:p-7 border border-emerald-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-lg border border-emerald-300 dark:border-emerald-800">
                ০৩
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                টার্গেটেড ক্লাস
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
              টার্গেটেড ব্যাচে ক্লাস
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              আপনার মান অনুযায়ী <strong>Basic</strong>, <strong>Medium</strong> অথবা{" "}
              <strong>Advanced</strong> পেইড ব্যাচে যুক্ত হয়ে সরাসরি কর্মক্ষেত্রের প্রয়োজনীয় ভাষায় অনর্গল কথা বলা শিখুন।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BATCH FEATURES GRID                                                    */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-white/10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold mb-2">
            <span>লাইভ ক্লাসের বিশেষত্ব</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            বই বা ভিডিও দেখার চেয়ে লাইভ ক্লাস কেন বেশি কার্যকর?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            শুধু দেখে শেখা আর সরাসরি মুখে বলা এক নয়। আমাদের লাইভ ক্লাসে প্রতিটি শিক্ষার্থী সক্রিয়ভাবে কথা বলেন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Feature 1 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              সরাসরি স্পিকিং প্র্যাকটিস
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              মোবাইল থেকেই সরাসরি টিচারের সাথে কথা বলে ভুল উচ্চারণ ও মুখের দ্বিধা দূর করুন।
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              দৈনিক রেকর্ডিং ও PDF শিট
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              প্রতিটি ক্লাসের পর লেকচারের অডিও রেকর্ডিং এবং প্র্যাকটিস ভোকাবুলারি PDF শিট সংগ্রহ করুন।
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              হোয়াটসঅ্যাপ সাপোর্ট গ্রুপ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ক্লাসের বাইরে যেকোনো প্রশ্ন বা দ্বিধা নিরসনে ডেডিকেটেড হোয়াটসঅ্যাপ সাপোর্ট গ্রুপে মেন্টর সহায়তা।
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              সীমিত শিক্ষার্থী প্রতি ব্যাচে
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ছোট ব্যাচ যাতে শিক্ষক প্রত্যেকে ব্যক্তিগত নজর দিতে পারেন এবং সবাই কথা বলার পর্যাপ্ত সময় পান।
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              বাস্তব কাজের পরিস্থিতি
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              সৌদি, কাতার, দুবাই ও কুয়েতের কর্মক্ষেত্রের বাস্তব কথোপকথন—এয়ারপোর্ট, সাইট, শপ ও অফিস কমিউনিকেশন।
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-white/10 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              সুবিধাজনক সময়সূচী
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              প্রবাসী ভাইদের ডিউটি শিফটের সাথে সামঞ্জস্য রেখে রাত ৯টা, ১০টা এবং সকালের ব্যাচ অপশন।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EMBEDDED LEAD BOOKING FORM SECTION                                    */}
      {/* ========================================================================= */}
      <section
        id="booking-form"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24"
      >
        <div className="relative rounded-3xl border-2 border-emerald-400/80 dark:border-emerald-500/40 bg-white dark:bg-[#0b1b10] shadow-2xl shadow-emerald-950/10 p-6 sm:p-10 overflow-hidden">
          {/* Accent top gradient line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              <span>১০০% ফ্রি রেজিস্ট্রেশন • ৩ দিনের ট্রায়াল</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              আপনার ফ্রি ডেমো সিট সংরক্ষণ করুন
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              তথ্য প্রদান করুন—Google Meet / Zoom ক্লাসের সরাসরি লিংক ও শিডিউল আপনার হোয়াটসঅ্যাপে পাঠিয়ে দেওয়া হবে।
            </p>
          </div>

          {!isSuccess ? (
            <>
              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Field 1: Name */}
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    আপনার পুরো নাম (Full Name) *
                  </label>
                  <input
                    type="text"
                    id="lead-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="যেমন: মোঃ আরিফ হোসেন"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Field 2: WhatsApp Number */}
                <div>
                  <label
                    htmlFor="lead-whatsapp"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    হোয়াটসঅ্যাপ নম্বর (WhatsApp Number) *
                  </label>
                  <input
                    type="tel"
                    id="lead-whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="যেমন: +966 50 123 4567 বা +880 1712 345678"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 font-mono"
                  />
                  <span className="block mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    * দেশের কোড সহ নম্বর লিখুন (যেমন: +966 / +971 / +880)
                  </span>
                </div>

                {/* Field 3: Country */}
                <div>
                  <label
                    htmlFor="lead-country"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    কোন দেশে আছেন বা যাবেন? (Current / Destination Country)
                  </label>
                  <select
                    id="lead-country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
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
                    htmlFor="lead-timeslot"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    পছন্দের ক্লাসের সময় (Preferred Time Slot)
                  </label>
                  <select
                    id="lead-timeslot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.label}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit CTA */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/25 disabled:opacity-60 transition-all cursor-pointer text-sm sm:text-base active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        সিট সংরক্ষণ করা হচ্ছে...
                      </span>
                    ) : (
                      <>
                        <span>ফ্রি ক্লাসের সিট কনফার্ম করুন (হোয়াটসঅ্যাপে লিংক পান)</span>
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। কোনো ক্রেডিট কার্ড বা অগ্রিম পেমেন্টের প্রয়োজন নেই।
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6 space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  আপনার ফ্রি সিট সংরক্ষিত হয়েছে! 🎉
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  ধন্যবাদ <strong>{formData.name}</strong>। আপনার অনুরোধটি সফলভাবে গ্রহণ করা হয়েছে।
                  Google Meet ক্লাসের লিংক ও শিডিউল হোয়াটসঅ্যাপে পেতে নিচের বাটনে ক্লিক করুন:
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 max-w-md mx-auto">
                <div><strong>হোয়াটসঅ্যাপ:</strong> {formData.whatsapp}</div>
                <div><strong>দেশ:</strong> {formData.country}</div>
                <div><strong>পছন্দের সময়:</strong> {formData.timeSlot}</div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-2 max-w-md mx-auto">
                <a
                  href={getWhatsAppDirectUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 transition-all text-sm sm:text-base"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>হোয়াটসঅ্যাপে ক্লাসের লিংক রিসিভ করুন →</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <LiveBatchBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

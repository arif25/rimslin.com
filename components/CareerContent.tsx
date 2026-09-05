"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Mic,
  Bot,
  Languages,
  ArrowRight,
  CheckCircle2,
  Bell,
  Send,
  X,
  ShieldCheck,
  Zap,
  HardHat,
  Car,
  UtensilsCrossed,
  Wrench,
  Check,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

export default function CareerContent() {
  const [activeModal, setActiveModal] = useState<"resume" | "interview" | null>(null);

  // Notify Me Form State
  const [contactInput, setContactInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifyType, setNotifyType] = useState<"whatsapp" | "email">("whatsapp");

  // Interactive Resume Builder modal state
  const [resumeTrade, setResumeTrade] = useState("ড্রাইভার (Gulf Driver)");
  const [resumeName, setResumeName] = useState("");
  const [resumeExp, setResumeExp] = useState("৩ বছর (সৌদি আরব)");
  const [resumeGenerated, setResumeGenerated] = useState(false);

  // Interactive Mock Interview modal state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const mockQuestions = [
    {
      q: "মালিক বা ফোরম্যান যদি বলে: 'ওয়েন শুগল হাক্কাক?' (وين شغلك؟) — অর্থ কী এবং কী উত্তর দেবেন?",
      a: "অর্থ: 'তোমার কাজ কোথায়?' উত্তর: 'আনা শুগল হিনা ফি আল-মাবনা' (أنا شغل هنا في المبنى - আমি এখানে বিল্ডিংয়ে কাজ করছি)।",
      tip: "কাজের সাইটে শান্ত গলায় স্পষ্ট উচ্চারণ করুন।",
    },
    {
      q: "সাইটের ভারতীয় বা নেপালি সহকর্মী যদি জিজ্ঞেস করে: 'ইয়ে সামান কিধার রাখনা হ্যায়?' — কীভাবে বলবেন?",
      a: "উত্তর: 'ইয়ে সামান উধার স্টোর রুম মে রাখ দো, সুপারভাইজার আকে চেক করেগা।'",
      tip: "সহকর্মীদের সাথে বন্ডিং দৃঢ় থাকলে কাজের চাপ অনেক কমে যায়।",
    },
    {
      q: "এজেন্সি ইন্টারভিউতে যদি জিজ্ঞেস করে: 'Why do you want to work in Saudi Arabia / UAE?'",
      a: "উত্তর: 'I have practical trade experience, I want to support my family financially, and I am ready to work hard with discipline.'",
      tip: "আত্মবিশ্বাসের সাথে চোখে চোখ রেখে উত্তর দিন।",
    },
  ];

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setContactInput("");
    }, 600);
  };

  const handleGenerateResume = (e: React.FormEvent) => {
    e.preventDefault();
    setResumeGenerated(true);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 -z-10 h-[550px] w-full max-w-[1000px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/15" />
      <div className="pointer-events-none absolute top-96 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/10" />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO HEADER                                                    */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Hub Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur-md mb-6">
          <span>🚀 প্রবাসী ক্যারিয়ার সহায়তা কেন্দ্র</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
            Expat Career Hub
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18] sm:leading-[1.16]">
          বিদেশযাত্রার সম্পূর্ণ প্রস্তুতি—
          <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300">
            ভাষা, রেজুমি ও ইন্টারভিউ এক ছাদের নিচে
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          গালফ ও ইউরোপের চাকরির সুযোগ বাড়াতে তৈরি করুন আন্তর্জাতিক মানের বায়োডাটা, দিন এআই ইন্টারভিউ মক টেস্ট এবং শিখুন বাস্তব কাজের ভাষা।
        </p>

        {/* Trust Badges Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 border border-slate-200 dark:border-gray-800 shadow-sm">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>১০০% বিনামূল্যে ক্যারিয়ার টুলস</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 border border-slate-200 dark:border-gray-800 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>গালফ ও ইউরোপ স্ট্যান্ডার্ড</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 border border-slate-200 dark:border-gray-800 shadow-sm">
            <BadgeCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span>সহজ বাংলা নির্দেশনা</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CORE 3-PRODUCT GRID (FEATURE CARDS)                            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            প্রবাসী ক্যারিয়ার ইকোসিস্টেম
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            চাকরি পাওয়া থেকে শুরু করে সাইটে সফল হওয়ার জন্য ৩টি শক্তিশালী স্তম্ভ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* CARD 1: AI Resume Builder */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/90 p-6 sm:p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-300">
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live / Try Now</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                AI Resume Builder
                <span className="block text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  এআই রেজুমি বিল্ডার
                </span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                গালফ ও বিদেশের কোম্পানির উপযোগী এক ক্লিকে প্রফেশনাল CV ও বায়োডাটা তৈরি করুন।
              </p>

              {/* Feature Points */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>সৌদি, কাতার ও আমিরাত রিক্রুটিং স্ট্যান্ডার্ড লেআউট</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>পাসপোর্ট নম্বর, ভিসা স্ট্যাটাস ও ট্রেড এক্সপেরিয়েন্স সেকশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>বাংলা তথ্য লিখলেই আন্তর্জাতিক ইংরেজি ফরম্যাটে এক্সপোর্ট</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-gray-800/80">
              <Link
                href="/resume-builder"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 text-sm shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>রেজুমি তৈরি করুন</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* CARD 2: AI Mock Interview */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/90 p-6 sm:p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-300">
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Bot className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-3 py-1 text-xs font-bold">
                  <Mic className="h-3 w-3 text-amber-600 animate-bounce" />
                  <span>Interactive</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                AI Mock Interview
                <span className="block text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
                  এআই ইন্টারভিউ প্রস্তুতি
                </span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                এজেন্সি ও কফিল ইন্টারভিউতে কী ধরনের প্রশ্ন করে তা আগে থেকেই এআই-এর সাথে প্র্যাকটিস করুন।
              </p>

              {/* Feature Points */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>কফিল ও ডাইরেক্ট সিলেকশন ইন্টারভিউয়ের বাস্তব ৫০+ প্রশ্ন</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>আরবি, হিন্দি ও ইংরেজি সিমুলেশন অডিও টেস্ট</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>সরাসরি উচ্চারণ ও আত্মবিশ্বাস সংশোধনের স্মার্ট টিপস</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-gray-800/80">
              <button
                type="button"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setActiveModal("interview");
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 text-sm shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>ইন্টারভিউ শুরু করুন</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CARD 3: Trade & Workplace Language */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/90 p-6 sm:p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:border-teal-500/50 dark:hover:border-teal-500/40 transition-all duration-300">
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
                  <Languages className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 px-3 py-1 text-xs font-bold">
                  <Sparkles className="h-3 w-3 text-teal-600" />
                  <span>Popular</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Workplace Language
                <span className="block text-sm font-semibold text-teal-600 dark:text-teal-400 mt-1">
                  কাজের ভাষা ও জব ট্র্যাক
                </span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                সৌদি, কাতার ও দুবাইয়ের সাইট উপযোগী আরবি, হিন্দি ও দরকারি ইংরেজি ক্লাস।
              </p>

              {/* Trade Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  <HardHat className="h-3 w-3 text-amber-500" /> কনস্ট্রাকশন
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  <Car className="h-3 w-3 text-emerald-500" /> ড্রাইভিং
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  <UtensilsCrossed className="h-3 w-3 text-rose-500" /> হোটেল ও শপ
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  <Wrench className="h-3 w-3 text-sky-500" /> টেকনিশিয়ান
                </span>
              </div>

              {/* Feature Points */}
              <ul className="mt-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>২৪+ অডিও ও ভিডিও ডিরেক্ট স্পিকিং লেসন</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>বাংলা উচ্চারণে খাস গালফ উপভাষা ও হিন্দি ভোকাবুলারি</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-gray-800/80">
              <Link
                href="/#course-plans"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3 px-4 text-sm shadow-md shadow-teal-600/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>ভাষা শেখা শুরু করুন</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FUTURE JOB BOARD TEASER (COMING SOON BANNER)                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 via-gray-900 to-slate-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle Background Elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-amber-500/15 blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/40 px-3.5 py-1 text-xs sm:text-sm font-bold text-amber-300 mb-6">
              <Bell className="h-3.5 w-3.5 text-amber-300 animate-bounce" />
              <span>Coming Soon / খুব শীঘ্রই আসছে</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              &ldquo;ভেরিফাইড বিদেশি চাকরির সার্কুলার খুব শীঘ্রই আসছে&rdquo;
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              দালাল ও প্রতারণামুক্ত সরাসরি অনুমোদিত এজেন্সি ও কোম্পানির চাকরির বিজ্ঞপ্তি পান সবার আগে। সৌদি আরব, কাতার, দুবাই, কুয়েত ও ইউরোপের চাকরির নোটিফিকেশন পেতে যুক্ত থাকুন।
            </p>

            {/* Notify Me Form */}
            <div className="mt-8 max-w-xl mx-auto">
              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-900/80 border border-emerald-400/60 p-4 text-emerald-200 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                  <div className="text-left text-xs sm:text-sm font-medium">
                    <p className="font-bold text-white">ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।</p>
                    <p className="text-emerald-300">নতুন সার্কুলার প্রকাশিত হলেই আপনাকে সরাসরি নোটিফাই করা হবে।</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-3">
                  {/* Selector: WhatsApp or Email */}
                  <div className="flex items-center justify-center gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="radio"
                        name="notifyType"
                        value="whatsapp"
                        checked={notifyType === "whatsapp"}
                        onChange={() => setNotifyType("whatsapp")}
                        className="accent-emerald-500"
                      />
                      <span>WhatsApp এ নোটিফিকেশন</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="radio"
                        name="notifyType"
                        value="email"
                        checked={notifyType === "email"}
                        onChange={() => setNotifyType("email")}
                        className="accent-emerald-500"
                      />
                      <span>Email এ নোটিফিকেশন</span>
                    </label>
                  </div>

                  {/* Input and Submit button */}
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <input
                        type={notifyType === "email" ? "email" : "tel"}
                        required
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder={
                          notifyType === "whatsapp"
                            ? "আপনার WhatsApp নম্বর লিখুন (+৮৮০...)"
                            : "আপনার ইমেইল অ্যাড্রেস লিখুন..."
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 backdrop-blur-md focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>যোগ হচ্ছে...</span>
                      ) : (
                        <>
                          <span>Notify Me</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2">
                    🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। কোনো স্প্যাম পাঠানো হবে না।
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: AI RESUME BUILDER (PREVIEW / EARLY ACCESS)                       */}
      {/* ========================================================================= */}
      {activeModal === "resume" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  প্রবাসী AI রেজুমি বিল্ডার
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  গালফ ভিসা ও জব অ্যাপ্লিকেশনের জন্য ১-ক্লিক বায়োডাটা
                </p>
              </div>
            </div>

            {!resumeGenerated ? (
              <form onSubmit={handleGenerateResume} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    আপনার পুরো নাম (ইংরেজি ও বাংলা):
                  </label>
                  <input
                    type="text"
                    required
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    placeholder="যেমন: Md. Arif Hossain (আরিফ হোসেন)"
                    className="w-full rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    আপনার পেশা / কাজের ট্রেড:
                  </label>
                  <select
                    value={resumeTrade}
                    onChange={(e) => setResumeTrade(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option>ড্রাইভার (Gulf Heavy / Light Driver)</option>
                    <option>নির্মাণ শ্রমিক (Mason / Construction Laborer)</option>
                    <option>ইলেকট্রিশিয়ান / প্লাম্বার (Maintenance Technician)</option>
                    <option>হোটেল ও রেস্তোরাঁ কর্মী (Waiter / Kitchen Helper)</option>
                    <option>শপকিপার / সেলসম্যান (Cashier / Retail Staff)</option>
                    <option>সিকিউরিটি গার্ড (Security Officer)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    অভিজ্ঞতা ও পূর্ববর্তী দেশ:
                  </label>
                  <input
                    type="text"
                    value={resumeExp}
                    onChange={(e) => setResumeExp(e.target.value)}
                    placeholder="যেমন: ৩ বছর (সৌদি আরব) বা ফ্রেশার"
                    className="w-full rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm shadow-md transition-all"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>সিভি তৈরি ও প্রিভিউ দেখুন</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800/60 pb-3 mb-3">
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        {resumeName || "Md. Arif Hossain"}
                      </h4>
                      <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        {resumeTrade}
                      </p>
                    </div>
                    <span className="rounded-md bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5">
                      Gulf Standard CV
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-xs">
                    <p>
                      <strong>Work Experience:</strong> {resumeExp} - Demonstrated skills in site compliance, safety procedures, and bilingual trade communication.
                    </p>
                    <p>
                      <strong>Language Skills:</strong> Bengali (Native), Workplace Arabic (Intermediate), Workplace Hindi (Conversational), Basic English.
                    </p>
                    <p>
                      <strong>Key Traits:</strong> Disciplined, hard-working, overtime ready, valid passport holder.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert("রেজুমি PDF ডাউনলোড ডেমো সম্পন্ন! সম্পূর্ণ ভার্সন খুব শীঘ্রই আসছে।");
                      setActiveModal(null);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 text-xs sm:text-sm shadow-md"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PDF ডাউনলোড করুন (Free)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeGenerated(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-gray-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-gray-800"
                  >
                    পুনরায় এডিট করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: AI MOCK INTERVIEW SIMULATOR                                      */}
      {/* ========================================================================= */}
      {activeModal === "interview" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/30 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  এআই ইন্টারভিউ প্র্যাকটিস সিমুলেটর
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  প্রশ্ন {currentQuestionIndex + 1} / {mockQuestions.length}
                </p>
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-50/60 dark:bg-amber-950/30 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shrink-0 text-xs">
                    Q{currentQuestionIndex + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-relaxed">
                      {mockQuestions[currentQuestionIndex].q}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200/80 dark:border-amber-800/40 text-xs sm:text-sm">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                    💡 সঠিক উত্তর দেওয়ার মডেল:
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-mono text-xs sm:text-sm bg-white/70 dark:bg-gray-950/60 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                    {mockQuestions[currentQuestionIndex].a}
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-2 font-medium">
                    📌 টিপস: {mockQuestions[currentQuestionIndex].tip}
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="rounded-xl border border-slate-300 dark:border-gray-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 disabled:opacity-40"
                >
                  পূর্ববর্তী প্রশ্ন
                </button>

                {currentQuestionIndex < mockQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 text-xs font-bold shadow-md"
                  >
                    <span>পরবর্তী প্রশ্ন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      alert("অভিনন্দন! আপনি সফলভাবে মক ইন্টারভিউ সেশন সম্পন্ন করেছেন।");
                      setActiveModal(null);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold shadow-md"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>টেস্ট সমাপ্ত করুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

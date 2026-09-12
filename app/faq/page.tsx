"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Search,
  ArrowLeft,
  BookOpen,
  Languages,
  CreditCard,
  Headphones,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface FAQItem {
  id: string;
  category: "learning" | "workplace" | "payment" | "support";
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // 1. কোর্স ও শেখার পদ্ধতি
  {
    id: "learn-1",
    category: "learning",
    categoryLabel: "কোর্স ও শেখার পদ্ধতি",
    question: "আমি আরবি বা ইংরেজি পড়তে পারি না, আমি কি শিখতে পারব?",
    answer:
      "হ্যাঁ, অবশ্যই। রিমসলিনের সব কোর্স বাংলা উচ্চারণ এবং অডিও-ভিজ্যুয়াল পদ্ধতিতে সাজানো। আপনাকে আরবি হরফ পড়তে হবে না, শুনে শুনে কাজের আসল কথ্য ভাষা শিখতে পারবেন।",
  },
  {
    id: "learn-2",
    category: "learning",
    categoryLabel: "কোর্স ও শেখার পদ্ধতি",
    question: "দৈনিক কতটা সময় দিতে হবে?",
    answer:
      "দিনে মাত্র ১৫ থেকে ২০ মিনিট অডিও লেসন শুনলেই যথেষ্ট। কাজের ফাঁকে বা যাতায়াতের সময়ও হেডফোন দিয়ে সহজে প্র্যাকটিস করতে পারবেন।",
  },
  {
    id: "learn-3",
    category: "learning",
    categoryLabel: "কোর্স ও শেখার পদ্ধতি",
    question: "কোর্সটি কীভাবে শুরু করব?",
    answer:
      "রিমসলিন ওয়েবসাইটে যেকোনো সময় সাইন-আপ বা লগইন করে আপনার পছন্দের কোর্স বেছে নিন। এরপর পেমেন্ট সম্পন্ন করলেই সরাসরি আপনার ড্যাশবোর্ডে কোর্স আনলক হয়ে যাবে এবং সাথে সাথে ক্লাস শুরু করতে পারবেন।",
  },
  {
    id: "learn-4",
    category: "learning",
    categoryLabel: "কোর্স ও শেখার পদ্ধতি",
    question: "কোর্স শেষে কি সার্টিফিকেট পাওয়া যাবে?",
    answer:
      "হ্যাঁ, সম্পূর্ণ কোর্স ও প্রতিটি মডিউলের প্র্যাকটিস সম্পন্ন করার পর আপনি রিমসলিনের ভেরিফায়েড ডিজিটাল কোর্স কমপ্লিশন সার্টিফিকেট পাবেন, যা আপনার বায়োডাটা বা রিজিউমে যুক্ত করতে পারবেন।",
  },

  // 2. কাজের ক্ষেত্র ও ভাষা
  {
    id: "work-1",
    category: "workplace",
    categoryLabel: "কাজের ক্ষেত্র ও ভাষা",
    question: "বইয়ের আরবি আর প্রবাসের আঞ্চলিক ভাষার মধ্যে পার্থক্য কী?",
    answer:
      "বইয়ের ব্যাকরণভিত্তিক আরবি এবং মধ্যপ্রাচ্যের কাজের কথ্য ভাষা (আম্মিয়া) এক নয়। রিমসলিনে সৌদি আরব, দুবাই, কাতার ও কুয়েতের কর্মক্ষেত্রে কফিল, মুদির ও কাস্টমারের সাথে কথা বলার আসল আঞ্চলিক ভাষা শেখানো হয়।",
  },
  {
    id: "work-2",
    category: "workplace",
    categoryLabel: "কাজের ক্ষেত্র ও ভাষা",
    question: "আমার পেশা অনুযায়ী আলাদা লেসন পাওয়া যাবে?",
    answer:
      "হ্যাঁ, ড্রাইভিং ও ডেলিভারি, কনস্ট্রাকশন সাইট, হোটেল ও রেস্টুরেন্ট, এবং শপিং মল সেলস—প্রতিটি পেশার জন্য আলাদা আলাদা কাজের প্রয়োজনীয় ডায়ালগ ও ভোকাবুলারি রয়েছে।",
  },
  {
    id: "work-3",
    category: "workplace",
    categoryLabel: "কাজের ক্ষেত্র ও ভাষা",
    question: "সৌদি আরব এবং দুবাইয়ের ভাষার মধ্যে পার্থক্য কি শেখানো হবে?",
    answer:
      "অবশ্যই! রিমসলিনের প্রতিটি লেসনে সৌদি নজদি/হিজাজি এবং সংযুক্ত আরব আমিরাতের (দুবাই) স্থানীয় আম্মিয়া উপভাষার সুনির্দিষ্ট পার্থক্য ও লোকাল ব্যবহারের নিয়ম সুন্দরভাবে ব্যাখ্যা করা হয়েছে।",
  },
  {
    id: "work-4",
    category: "workplace",
    categoryLabel: "কাজের ক্ষেত্র ও ভাষা",
    question: "কর্মক্ষেত্রে বসের সাথে বেতন ও ছুটি নিয়ে কীভাবে কথা বলব?",
    answer:
      "আমাদের বিশেষ ক্যারিয়ার মডিউলে কফিল বা সুপারিভাইজারের সাথে সম্মান বজায় রেখে বেতন বৃদ্ধি (Salary increment), ওভারটাইম হিসাব, রিকুইজিশন এবং দেশের ছুটির আবেদন সাবলীলভাবে উপস্থাপনের রিয়েল-লাইফ ডায়ালগ ও অডিও রয়েছে।",
  },

  // 3. পেমেন্ট ও অ্যাক্সেস
  {
    id: "pay-1",
    category: "payment",
    categoryLabel: "পেমেন্ট ও অ্যাক্সেস",
    question: "বিদেশ থেকে আমি কীভাবে পেমেন্ট করব?",
    answer:
      "আপনি বিকাশ, নগদ, আন্তর্জাতিক ভিসা/মাস্টারকার্ড এবং মধ্যপ্রাচ্যের লোকাল কার্ড দিয়ে সরাসরি কোর্স ফি পরিশোধ করতে পারবেন। পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই স্বয়ংক্রিয়ভাবে কোর্স অ্যাক্টিভ হয়ে যায়।",
  },
  {
    id: "pay-2",
    category: "payment",
    categoryLabel: "পেমেন্ট ও অ্যাক্সেস",
    question: "কোর্সের মেয়াদ কতদিন থাকবে?",
    answer:
      "একবার এনরোল করলে আপনি আজীবন (Lifetime Access) এই কোর্সের সকল ভিডিও ও অডিও ম্যাটেরিয়াল ব্যবহার করতে পারবেন। ভবিষ্যতে কোনো নতুন আপডেট আসলে তার জন্যও আলাদা ফি দিতে হবে না।",
  },
  {
    id: "pay-3",
    category: "payment",
    categoryLabel: "পেমেন্ট ও অ্যাক্সেস",
    question: "আমি কি মোবাইল এবং কম্পিউটার উভয় ডিভাইসেই ক্লাস করতে পারব?",
    answer:
      "হ্যাঁ, আপনার যেকোনো অ্যান্ড্রয়েড স্মার্টফোন, আইফোন, ট্যাবলেট কিংবা ল্যাপটপ/কম্পিউটার ব্রাউজার থেকে যেকোনো সময় সহজে লগইন করে ক্লাস দেখতে ও শুনতে পারবেন।",
  },
  {
    id: "pay-4",
    category: "payment",
    categoryLabel: "পেমেন্ট ও অ্যাক্সেস",
    question: "কোর্সের ফি কি এককালীন নাকি মাসিক কোনো খরচ আছে?",
    answer:
      "এটি সম্পূর্ণ এককালীন (One-time) ফি। কোনো ধরনের মাসিক সাবস্ক্রিপশন, লুকানো চার্জ বা বার্ষিক রিনিউয়াল ফি নেই।",
  },

  // 4. সাপোর্ট ও অফলাইন সুবিধা
  {
    id: "supp-1",
    category: "support",
    categoryLabel: "সাপোর্ট ও অফলাইন সুবিধা",
    question: "ইন্টারনেট ছাড়া কি অডিও লেসন শোনা যাবে?",
    answer:
      "হ্যাঁ, আপনি প্রয়োজনীয় কাজের অডিও শিট ও ফ্রেজগুলো ডাউনলোড করে ইন্টারনেট সংযোগ ছাড়াই অফলাইনে প্র্যাকটিস করতে পারবেন। কাজের সাইটে নেটওয়ার্ক না থাকলেও চর্চা বন্ধ হবে না।",
  },
  {
    id: "supp-2",
    category: "support",
    categoryLabel: "সাপোর্ট ও অফলাইন সুবিধা",
    question: "কোনো সমস্যা হলে প্রবাস থেকে সাপোর্ট পাব কীভাবে?",
    answer:
      "আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ হেল্পলাইনে যেকোনো সময় মেসেজ দিয়ে কোর্স সংক্রান্ত সরাসরি সহায়তা পেতে পারেন। আমাদের টিম সপ্তাহে ৭ দিনই প্রবাসী ভাইদের তাৎক্ষণিক গাইডেন্সে নিয়োজিত থাকে।",
  },
  {
    id: "supp-3",
    category: "support",
    categoryLabel: "সাপোর্ট ও অফলাইন সুবিধা",
    question: "উচ্চারণ বা কোনো বাক্য বুঝতে না পারলে সরাসরি শিক্ষকের সাহায্য পাব?",
    answer:
      "হ্যাঁ, আমাদের শিক্ষার্থীদের ডেডিকেটেড স্টাডি গ্রুপ ও হোয়াটসঅ্যাপ সাপোর্টে ভয়েস মেসেজ পাঠিয়ে আপনার উচ্চারণের শুদ্ধতা যাচাই করে নেওয়ার সরাসরি সুযোগ রয়েছে।",
  },
];

const CATEGORIES = [
  { id: "all", label: "সকল প্রশ্নোত্তর", icon: Layers },
  { id: "learning", label: "কোর্স ও শেখার পদ্ধতি", icon: BookOpen },
  { id: "workplace", label: "কাজের ক্ষেত্র ও ভাষা", icon: Languages },
  { id: "payment", label: "পেমেন্ট ও অ্যাক্সেস", icon: CreditCard },
  { id: "support", label: "সাপোর্ট ও অফলাইন সুবিধা", icon: Headphones },
];

export default function FAQPage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("learn-1");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return FAQ_DATA.length;
    return FAQ_DATA.filter((item) => item.category === catId).length;
  };

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-8 sm:py-14">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[550px] w-full max-w-[900px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[150px] opacity-75"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation & Back to Home */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/"
                className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
              >
                {language === "en" ? "Home" : "হোম (Home)"}
              </Link>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {language === "en" ? "FAQ" : "সচরাচর প্রশ্নোত্তর"}
              </span>
            </nav>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{language === "en" ? "Back to Home" : "হোম পেজে ফিরে যান"}</span>
            </Link>
          </div>

          {/* 1. Page Header */}
          <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-xs">
              <HelpCircle className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>
                {language === "en"
                  ? "Expat Help & Knowledge Base"
                  : "প্রবাসী সহায়তা ও সাধারণ জিজ্ঞাসা"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {language === "en" ? (
                <>
                  Frequently Asked Questions for{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                    Expat Workers
                  </span>
                </>
              ) : (
                <>
                  প্রবাসী ভাইদের সচরাচর{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                    জিজ্ঞাসিত প্রশ্নোত্তর
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {language === "en"
                ? "Everything you need to know about mastering Gulf spoken Arabic and job English without grammar, tailored directly for your trade and career advancement."
                : "সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমানে কাজের ফিল্ডে সাবলীল কথ্য আরবি ও প্রয়োজনীয় ইংরেজি শিখে নিজের আত্মবিশ্বাস, কাজের দক্ষতা ও বেতন বৃদ্ধি করার সকল তথ্য একনজরে জেনে নিন।"}
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="প্রশ্ন, পেশা বা বিষয় দিয়ে অনুসন্ধান করুন..."
                className="w-full rounded-2xl border border-slate-200/90 bg-white dark:border-white/10 dark:bg-surface-100/90 pl-11 pr-10 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-md"
                >
                  ✕
                </button>
              )}
            </div>
          </header>

          {/* 2. Category Tabs */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max justify-start sm:justify-center px-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = getCategoryCount(cat.id);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      // Auto-open first item of selected category if open item is not in category
                      const firstInCat =
                        cat.id === "all"
                          ? FAQ_DATA[0].id
                          : FAQ_DATA.find((i) => i.category === cat.id)?.id || null;
                      setOpenId(firstInCat);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
                        : "bg-white dark:bg-surface-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-surface-200"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    />
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-surface-200 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Accordion FAQ List */}
          <div className="space-y-4 w-full max-w-full">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200/90 dark:border-white/10 p-8">
                <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-base font-bold text-slate-800 dark:text-white">
                  কোনো প্রশ্নোত্তর পাওয়া যায়নি
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  আপনার অনুসন্ধান অনুযায়ী কোনো উত্তর পাওয়া যায়নি। ক্যাটাগরি পরিবর্তন করুন অথবা সরাসরি আমাদের হোয়াটসঅ্যাপ হেল্পলাইনে মেসেজ দিন।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  সব প্রশ্নোত্তর দেখুন
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 w-full overflow-hidden ${
                      isOpen
                        ? "border-emerald-500/50 bg-white shadow-md dark:border-gulf-500/40 dark:bg-surface-100/95"
                        : "border-slate-200/90 bg-white hover:bg-slate-50/50 hover:border-slate-300 dark:border-white/[0.08] dark:bg-surface-100/50 dark:hover:border-white/20 dark:hover:bg-surface-100/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 pr-2">
                        {/* Category tag */}
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-2 border border-emerald-200/50 dark:border-emerald-800/30">
                          {faq.categoryLabel}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                          {faq.question}
                        </h2>
                      </div>

                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 shrink-0 mt-1 ${
                          isOpen
                            ? "rotate-180 border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-gulf-400 dark:bg-gulf-500/20 dark:text-gulf-300"
                            : "border-slate-200 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-surface-200 dark:text-slate-400"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.06] pt-4 animate-fade-in">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                          <p className="flex-1">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* 4. WhatsApp Support Assistance */}
          <div className="mt-14 text-center rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-surface-100/60 p-6 sm:p-8 shadow-xs">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              আপনার কি নির্দিষ্ট কোনো প্রশ্ন আছে?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-xl mx-auto leading-relaxed">
              প্রবাসের যেকোনো দেশ থেকে আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ হেল্পলাইনে যেকোনো সময় ভয়েস বা টেক্সট পাঠিয়ে সরাসরি সহায়তা নিন।
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href="https://wa.me/916290051284?text=Hello%20Rimslin%20Support,%20I%20have%20questions%20about%20Rimslin%20Course"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>সরাসরি হোয়াটসঅ্যাপে কথা বলুন</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

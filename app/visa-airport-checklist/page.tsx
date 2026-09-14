'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Plane,
  CheckSquare,
  Square,
  FileText,
  AlertTriangle,
  Volume2,
  Luggage,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'prep' | 'docs' | 'luggage';
  title: string;
  description: string;
  importantNote?: string;
}

interface ImmigrationPhrase {
  id: number;
  situation: string;
  arabic: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  officerQuestion?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. ফ্লাইটের আগের প্রস্তুতি
  {
    id: 'prep-1',
    category: 'prep',
    title: 'বিএমইটি ম্যানপাওয়ার কার্ড ও স্মার্টকার্ড চেক',
    description: 'বিএমইটি (BMET) ইমিগ্রেশন ক্লিয়ারেন্স কার্ড বা স্মার্টকার্ড বৈধ এবং অনলাইন ডাটাবেজে এন্ট্রি হয়েছে কি না পরীক্ষা করুন।',
    importantNote: 'ম্যানপাওয়ার কার্ড ছাড়া ঢাকার এয়ারপোর্টে ইমিগ্রেশন পার হতে পারবেন না।',
  },
  {
    id: 'prep-2',
    category: 'prep',
    title: 'গামকা (GAMCA / Wafid) ফিট মেডিকেল রিপোর্ট',
    description: 'অনুমোদিত মেডিকেল সেন্টারের ফিট সার্টিফিকেট ও অনলাইন বারকোড রিপোর্ট প্রিন্ট কপি সঙ্গে রাখুন।',
  },
  {
    id: 'prep-3',
    category: 'prep',
    title: 'ফ্লাইটের ৭২ ঘণ্টা আগে টিকিট রি-কনফার্মেশন',
    description: 'এয়ারলাইন্সের ওয়েবসাইট বা অ্যাপ থেকে পিএনআর (PNR) স্ট্যাটাস চেক করে ফ্লাইট টাইম সঠিক আছে কি না নিশ্চিত হোন।',
  },
  {
    id: 'prep-4',
    category: 'prep',
    title: 'আন্তর্জাতিক সিম কার্ড বা রোমিং চালু করা',
    description: 'ট্রানজিট এয়ারপোর্ট বা অবতরণের পর পরিবার ও নিয়োগকর্তার সাথে যোগাযোগের জন্য রোমিং বা ইন্টারনেট সিম প্রস্তুত রাখুন।',
  },

  // 2. প্রয়োজনীয় ডকুমেন্ট ফাইল
  {
    id: 'docs-1',
    category: 'docs',
    title: 'মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদসহ)',
    description: 'পাসপোর্টের মূল কপি এবং কমপক্ষে ২ সেট রঙিন ফটোকপি আলাদা ফাইলে রাখুন।',
    importantNote: 'পাসপোর্ট কোনো অবস্থাতেই বুকিং লাগেজে দেবেন না, হ্যান্ড ব্যাগে রাখুন।',
  },
  {
    id: 'docs-2',
    category: 'docs',
    title: 'ভিসার প্রিন্ট কপি (ই-ভিসা বা ভিসা স্টিকার)',
    description: 'সৌদি মুকিম / কাতার বা ইউএই ই-ভিসার একাধিক ঝকঝকে প্রিন্ট কপি সঙ্গে নিন।',
  },
  {
    id: 'docs-3',
    category: 'docs',
    title: 'চুক্তিপত্র (Job Offer Letter / Employment Contract)',
    description: 'বেতন, সুযোগ-সুবিধা ও কোম্পানির ফোন নম্বর উল্লেখ থাকা চুক্তিপত্রের কপি।',
  },
  {
    id: 'docs-4',
    category: 'docs',
    title: 'কোম্পানি বা কফিলের ফোন নম্বর ও আরবের ঠিকানা',
    description: 'এয়ারপোর্টে নামার পর কার সাথে যোগাযোগ করবেন তার মোবাইল নম্বর একটি কাগজে লিখে রাখুন।',
    importantNote: 'ফোনের চার্জ শেষ হয়ে গেলেও যেন কাগজ দেখে ফোন করতে পারেন।',
  },
  {
    id: 'docs-5',
    category: 'docs',
    title: 'পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)',
    description: 'জরুরি প্রয়োজনে ব্যবহারের জন্য ৪-৬ কপি পাসপোর্ট সাইজ ল্যাব প্রিন্ট ছবি সঙ্গে রাখুন।',
  },

  // 3. লাগেজ ও নিষিদ্ধ দ্রব্যের তালিকা
  {
    id: 'luggage-1',
    category: 'luggage',
    title: 'প্রেসক্রিপশন ছাড়া কোনো ওষুধ না নেওয়া',
    description: 'পেইনকিলার, ঘুমের ওষুধ বা কাশির সিরাপ ডাক্তারের সিলযুক্ত ইংরেজি প্রেসক্রিপশন ছাড়া নেওয়া আইনত দণ্ডনীয় অপরাধ।',
    importantNote: 'উপসাগরীয় দেশে মাদকবিরোধী আইন অতি কঠোর।',
  },
  {
    id: 'luggage-2',
    category: 'luggage',
    title: 'নিষিদ্ধ খাদ্যদ্রব্য ও তামাকজাত পণ্য বর্জন',
    description: 'জর্দা, গুল, পানের পাতা, কাঁচা সুপারি, শুঁটকি ও দেশি তৈরি খাবার অনেক এয়ারপোর্টে নিষিদ্ধ ও জরিমানাযোগ্য।',
  },
  {
    id: 'luggage-3',
    category: 'luggage',
    title: 'লাগেজের ওজন লিমিট চেক করা (২০-৩০ কেজি)',
    description: 'আপনার টিকিটের অনুমোদিত ওজন অনুযায়ী লাগেজ প্রস্তুত করুন এবং শক্ত করে লক ও নেইম ট্যাগ যুক্ত করুন।',
  },
  {
    id: 'luggage-4',
    category: 'luggage',
    title: 'পাওয়ার ব্যাংক হ্যান্ড ব্যাগে রাখা',
    description: 'পাওয়ার ব্যাংক বা লিথিয়াম ব্যাটারি কখনোই বড় লাগেজে দেওয়া যাবে না, সবসময় হ্যান্ড ব্যাগে বহন করতে হয়।',
  },
];

const IMMIGRATION_PHRASES: ImmigrationPhrase[] = [
  {
    id: 1,
    situation: 'ইমিগ্রেশন কাউন্টারে সালাম ও শুভেচ্ছা',
    officerQuestion: 'মারহাবা, পাসপোর্ট দিন (مَرْحَبًا، هَاتِ الجَوَاز)',
    arabic: 'تَفَضَّلْ يَا سَيِّدِي، هَذَا جَوَازِي وَتَأْشِيرَتِي',
    bengaliPronunciation: 'তাফাদ্বল ইয়া সায়্যিদি, হাযা জাওয়াজি ওয়া তা’শীরতি',
    bengaliMeaning: 'নিন স্যার, এটি আমার পাসপোর্ট এবং আমার ভিসা কপি।',
  },
  {
    id: 2,
    situation: 'আপনি কি প্রথমবার এসেছেন নাকি রিটার্ন?',
    officerQuestion: 'হাল হাজিহি আওয়াল মাররাহ? (هَلْ هَذِهِ أَوَّلُ مَرَّة؟)',
    arabic: 'نَعَمْ، هَذِهِ أَوَّلُ مَرَّةٍ لِي فِي السَّعُودِيَّة',
    bengaliPronunciation: 'না’আম, হাযিহি আওয়ালু মাররাতিল লি ফিস-সাউদিয়্যাহ',
    bengaliMeaning: 'হ্যাঁ, সৌদি আরবে এটাই আমার প্রথমবার আসা।',
  },
  {
    id: 3,
    situation: 'আপনার কাজের পেশা বা কোম্পানি কি?',
    officerQuestion: 'মা হুয়া আমালুক? বা মীন শারিকাতুক? (مَا هُوَ عَمَلُك؟)',
    arabic: 'أَنَا سَائِقٌ خَاصٌّ / عَامِلٌ فِي شَرِكَة',
    bengaliPronunciation: 'আনা সায়েক খাস / আমেল ফি শারিকাহ',
    bengaliMeaning: 'আমি একজন ড্রাইভার / একটি কোম্পানিতে কর্মরত কর্মী।',
  },
  {
    id: 4,
    situation: 'ফিঙ্গারপ্রিন্ট ও চোখের ছবি স্ক্যান',
    officerQuestion: 'হাত বা আঙুল মেশিনে রাখুন (ضَعْ إِصْبَعَكَ عَلَى الجِهَاز)',
    arabic: 'حَاضِرْ يَا فَنَدِم، أَيُّ إِصْبَع؟',
    bengaliPronunciation: 'হাদির ইয়া ফানদাম, আইয়ু ইসবা’?',
    bengaliMeaning: 'ঠিক আছে স্যার, কোন আঙুল রাখব?',
  },
  {
    id: 5,
    situation: 'লাগেজ বেল্ট বা বের হওয়ার দিক জানা',
    officerQuestion: 'লাগেজ কোথায় পাব জানতে চান?',
    arabic: 'أَيْنَ صَالَةُ اسْتِلَامِ الحَقَائِب؟',
    bengaliPronunciation: 'আইনা সালাতুস তিরামিল হাকায়িব?',
    bengaliMeaning: 'লাগেজ সংগ্রহের হলরুমটি বা বেল্টটি কোন দিকে?',
  },
];

export default function VisaAirportChecklistPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<number | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    setCheckedState({});
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleSpeak = (phrase: ImmigrationPhrase) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে অডিও প্লেয়ার সাপোর্ট করে না।');
      return;
    }
    window.speechSynthesis.cancel();
    setPlayingId(phrase.id);

    const utterance = new SpeechSynthesisUtterance(phrase.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#060b08] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden py-5 sm:py-8 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Clean Header with Back Link */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-2.5 sm:mb-4"
            >
              ← হোমপেজে ফিরে যান
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 sm:mb-3">
              <Plane className="w-3.5 h-3.5" />
              <span>নিরাপদ ভ্রমণ ও ইমিগ্রেশন গাইডলাইন</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ভিসা ও এয়ারপোর্ট প্রিপারেশন চেকলিস্ট (Visa & Airport Checklist)
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              ফ্লাইটের আগে প্রয়োজনীয় কাগজপত্র, মেডিকেল রিপোর্ট, ম্যানপাওয়ার ও এয়ারপোর্ট ইমিগ্রেশন চেকলিস্ট। একটি একটি করে টিক দিন এবং নিশ্চিত হোন আপনি পুরোপুরি প্রস্তুত।
            </p>
          </div>

          {/* Interactive Progress Bar */}
          <div className="bg-white dark:bg-surface-100 rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 dark:border-white/10 shadow-xs mb-5 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  আপনার যাত্রা প্রস্তুতির অগ্রগতি
                </span>
                <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {completedCount} টি সম্পন্ন হয়েছে ({progressPercent}%)
                </p>
              </div>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিসেট করুন</span>
                </button>
              )}
            </div>

            <div className="w-full bg-slate-100 dark:bg-surface-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3 Interactive Checklist Categories */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 mb-6 sm:mb-10 md:mb-14">
            
            {/* 1. ফ্লাইটের আগের প্রস্তুতি */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ১. ফ্লাইটের আগের প্রস্তুতি (Pre-Flight Preparation)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {CHECKLIST_ITEMS.filter((i) => i.category === 'prep').map((item) => {
                  const isChecked = !!checkedState[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 sm:p-5 border transition-all select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/60'
                          : 'bg-white dark:bg-surface-100 border-slate-200/90 dark:border-white/10 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3
                            className={`text-sm font-bold ${
                              isChecked
                                ? 'line-through text-slate-500 dark:text-slate-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                          {item.importantNote && (
                            <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>{item.importantNote}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. প্রয়োজনীয় ডকুমেন্ট ফাইল */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ২. প্রয়োজনীয় ডকুমেন্ট ফাইল (Travel Documents)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {CHECKLIST_ITEMS.filter((i) => i.category === 'docs').map((item) => {
                  const isChecked = !!checkedState[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 sm:p-5 border transition-all select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/60'
                          : 'bg-white dark:bg-surface-100 border-slate-200/90 dark:border-white/10 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3
                            className={`text-sm font-bold ${
                              isChecked
                                ? 'line-through text-slate-500 dark:text-slate-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                          {item.importantNote && (
                            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>{item.importantNote}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. লাগেজ ও নিষিদ্ধ দ্রব্যের তালিকা */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                <Luggage className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ৩. লাগেজ ও নিষিদ্ধ দ্রব্যের তালিকা (Luggage & Banned Items)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {CHECKLIST_ITEMS.filter((i) => i.category === 'luggage').map((item) => {
                  const isChecked = !!checkedState[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 sm:p-5 border transition-all select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/60'
                          : 'bg-white dark:bg-surface-100 border-slate-200/90 dark:border-white/10 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3
                            className={`text-sm font-bold ${
                              isChecked
                                ? 'line-through text-slate-500 dark:text-slate-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                          {item.importantNote && (
                            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>{item.importantNote}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. এয়ারপোর্ট ইমিগ্রেশনের প্রয়োজনীয় আরবি বাক্য */}
            <div className="pt-2 sm:pt-4">
              <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-slate-200 dark:border-white/10">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  ৪. এয়ারপোর্ট ইমিগ্রেশনের প্রয়োজনীয় আরবি বাক্য (Airport Arabic Dialogues)
                </h2>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3.5 sm:mb-6">
                আরবের এয়ারপোর্টে অফিসারদের মুখোমুখি হওয়ার সময় এই বাক্যগুলো সঠিকভাবে বলুন। অডিও শুনতে বাটনে চাপ দিন।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {IMMIGRATION_PHRASES.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-surface-100 rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        {item.situation}
                      </span>

                      {item.officerQuestion && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2">
                          অফিসার জিজ্ঞেস করতে পারে: &ldquo;{item.officerQuestion}&rdquo;
                        </p>
                      )}

                      <div className="my-3 p-3 bg-slate-50 dark:bg-surface-200/60 rounded-xl">
                        <p className="font-arabic text-lg font-bold text-slate-900 dark:text-white text-right leading-relaxed" dir="rtl">
                          {item.arabic}
                        </p>
                      </div>

                      <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                        উচ্চারণ: {item.bengaliPronunciation}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                        অর্থ: {item.bengaliMeaning}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeak(item)}
                      className={`mt-4 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                        playingId === item.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-surface-200 dark:hover:bg-surface-300 dark:text-slate-200'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{playingId === item.id ? 'আরবি শুনছি...' : 'উচ্চারণ শুনুন'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-8 md:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              বিমানে ওঠার আগেই বেসিক আরবি শিখে প্রস্তুত হোন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-4 sm:mb-6 max-w-lg mx-auto">
              নতুন দেশে যাওয়ার ভয় দূর করতে আমাদের ৩ দিনের ফ্রি লাইভ ওরিয়েন্টেশন ক্লাসে যোগ দিন।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              বিমানে ওঠার আগেই বেসিক আরবি শিখে নিন আমাদের ৩ দিনের ফ্রি ক্লাসে →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

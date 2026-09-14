'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface DialogExchange {
  speaker: string;
  arabic: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
}

interface ConversationTopic {
  id: number;
  title: string;
  category: string;
  icon: string;
  scenario: string;
  dialogues: DialogExchange[];
}

const SAMPLE_CONVERSATIONS: ConversationTopic[] = [
  {
    id: 1,
    title: 'প্রথম পরিচয় ও কুশলবিনিময়',
    category: 'greeting',
    icon: '🤝',
    scenario: 'নতুন কারো সাথে দেখা হলে সালাম এবং প্রাথমিক পরিচয় দেওয়া।',
    dialogues: [
      {
        speaker: 'আহমেদ',
        arabic: 'السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟',
        bengaliPronunciation: 'আস-সালামু আলাইকুম, কাইফ হালাক?',
        bengaliMeaning: 'আপনার ওপর শান্তি বর্ষিত হোক, কেমন আছেন?',
      },
      {
        speaker: 'করিম',
        arabic: 'وَعَلَيْكُمُ السَّلَام، أَنَا بِخَيْرٍ الحَمْدُ لِلَّه',
        bengaliPronunciation: 'ওয়ালাইকুমুস সালাম, আনা বিখাইর আলহামদুলিল্লাহ।',
        bengaliMeaning: 'আপনার ওপরও শান্তি বর্ষিত হোক, আমি ভালো আছি আলহামদুলিল্লাহ।',
      },
    ],
  },
  {
    id: 2,
    title: 'সুপারশপ বা দোকানে কেনাকাটা ও দরদাম',
    category: 'shopping',
    icon: '🛍️',
    scenario: 'দোকানে গিয়ে প্রয়োজনীয় পণ্য খোঁজা ও দামাদামি করা।',
    dialogues: [
      {
        speaker: 'ক্রেতা',
        arabic: 'بِكَمْ هَذَا يَا أَخِي؟ هَلْ فِيهِ خَصْم؟',
        bengaliPronunciation: 'বিকাম হাযা ইয়া আখি? ফী খাছম?',
        bengaliMeaning: 'ভাই এটার দাম কত? কোনো ছাড় বা ডিসকাউন্ট আছে?',
      },
      {
        speaker: 'দোকানদার',
        arabic: 'هَذَا بِعَشَرَةِ رِيَال، هَذَا آخِر سِعْر',
        bengaliPronunciation: 'হাযা বি-আশারাহ রিয়াল, হাযা আখির সির।',
        bengaliMeaning: 'এটা ১০ রিয়াল, এটাই শেষ দাম।',
      },
    ],
  },
  {
    id: 3,
    title: 'ফার্মেসি বা ক্লিনিকে অসুস্থতা প্রকাশ',
    category: 'emergency',
    icon: '💊',
    scenario: 'শারীরিক অসুস্থতায় ডাক্তার বা ফার্মেসিতে ঔষধ চাওয়া।',
    dialogues: [
      {
        speaker: 'রোগী',
        arabic: 'عِنْدِي أَلَمٌ فِي رَأْسِي وَحَرَارَة',
        bengaliPronunciation: 'ইন্দি আলাম ফি রা’সি ওয়া হারারাহ।',
        bengaliMeaning: 'আমার মাথায় প্রচণ্ড ব্যথা এবং শরীরে জ্বর।',
      },
      {
        speaker: 'ফার্মাসিস্ট',
        arabic: 'خُذْ هَذَا الدَّوَاءَ بَعْدَ الأَكْل',
        bengaliPronunciation: 'খুদ হাযাদ দাওয়া বা’দাল আকল।',
        bengaliMeaning: 'এই ঔষধটি খাওয়ার পরে গ্রহণ করবেন।',
      },
    ],
  },
  {
    id: 4,
    title: 'কপিল বা মালিকের সাথে দৈনন্দিন কাজের কথা',
    category: 'boss',
    icon: '💼',
    scenario: 'কাজের অগ্রগতি জানানো ও ছুটি বা অনুমতির কথা বলা।',
    dialogues: [
      {
        speaker: 'কর্মী',
        arabic: 'يَا مُدِير، أَنَا خَلَّصْتُ كُلَّ الشُّغْلِ اليَوْم',
        bengaliPronunciation: 'ইয়া মুদির, আনা খাল্লাস্তু কুল্লাশ শুগল আল-ইয়াউম।',
        bengaliMeaning: 'মুদির, আমি আজকের সব কাজ শেষ করেছি।',
      },
      {
        speaker: 'মুদির',
        arabic: 'مُمْتَاز، بُكْرَة تَعَالَ فِي نَفْسِ الوَقْت',
        bengaliPronunciation: 'মুমতায, বুকরা তা’আলা ফি নাফসির ওয়াক্ত।',
        bengaliMeaning: 'চমৎকার, আগামীকাল ঠিক একই সময়ে চলে আসবে।',
      },
    ],
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'সব ডায়লগ (All)' },
  { key: 'greeting', label: 'কুশলবিনিময় ও পরিচয়' },
  { key: 'shopping', label: 'কেনাকাটা ও দরদাম' },
  { key: 'emergency', label: 'জরুরি অবস্থা ও ডাক্তার' },
  { key: 'boss', label: 'বাসা ও মালিকের সাথে' },
];

export default function DailyConversationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTopics = activeCategory === 'all'
    ? SAMPLE_CONVERSATIONS
    : SAMPLE_CONVERSATIONS.filter((t) => t.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 min-h-screen bg-slate-50 py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#060b08]">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">

          {/* Top Header */}
          <div className="text-center">
            <Link
              className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 hover:underline"
              href="/"
            >
              ← হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              দৈনন্দিন প্রয়োজনীয় আরবি কথোপকথন (Daily Conversations)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              ঘুম থেকে ওঠা থেকে শুরু করে কেনাকাটা, যাতায়াত ও ডাক্তারের কাছে যাওয়ার বাস্তব কথোপকথন শিখুন।
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.key
                    ? 'bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 dark:text-slate-950 font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-surface-100/90 dark:text-slate-300 dark:border-white/10 dark:hover:bg-surface-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dialogue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center text-xl shrink-0">
                      {topic.icon}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        {topic.title}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {topic.scenario}
                      </p>
                    </div>
                  </div>

                  {/* Exchanges */}
                  <div className="mt-4 space-y-3">
                    {topic.dialogues.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-surface-200/50 border border-slate-100 dark:border-white/5 rounded-xl p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {item.speaker}
                          </span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-right dir-rtl font-arabic pt-1 leading-relaxed">
                          {item.arabic}
                        </p>
                        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                          উচ্চারণ: {item.bengaliPronunciation}
                        </p>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                          অর্থ: {item.bengaliMeaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5">
                  <Link
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800/60 transition-colors shadow-2xs"
                    href="/live-batch"
                  >
                    <span>মুখোমুখি ডায়লগ প্র্যাকটিস করুন</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-8 md:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              পড়ে শেখার পাশাপাশি নিজে মুখে কথা বলার সাহস বাড়ান
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে জয়েন করে শিক্ষকের সাথে সরাসরি ডায়লগ প্র্যাকটিস করুন।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              ৩ দিনের ফ্রি ডেমো ক্লাস বুক করুন →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

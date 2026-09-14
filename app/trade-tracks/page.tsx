'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TradeTrack {
  id: number;
  trade: string;
  category: string;
  englishTitle: string;
  icon: string;
  badge: string;
  description: string;
  topics: string[];
}

const SAMPLE_TRACKS: TradeTrack[] = [
  {
    id: 1,
    trade: 'ড্রাইভার ও ডেলিভারি রাইডার',
    englishTitle: 'Driver & Delivery Rider Track',
    category: 'driving',
    icon: '🚗',
    badge: 'জরুরি কথোপকথন ও টার্মস',
    description: 'রাস্তা চেনা, জিপিএস ডিরেকশন, পুলিশ ট্রাফিক সিগন্যাল ও কাস্টমার ড্রপ-অফ আরবি।',
    topics: ['দিকনির্দেশনা ও লোকেশন টার্মস', 'ট্রাফিক আইন ও সিগন্যাল', 'কাস্টমার কল কনভারসেশন'],
  },
  {
    id: 2,
    trade: 'রেস্তোরাঁ, ক্যাফে ও ক্যাটারিং',
    englishTitle: 'Restaurant & Hospitality Track',
    category: 'hospitality',
    icon: '🍽️',
    badge: 'হসপিটালিটি ডায়লগ',
    description: 'খাবারের অর্ডার নেওয়া, কিচেন টার্মিনোলজি ও কাস্টমার সার্ভিস স্পোকেন আরবি।',
    topics: ['অর্ডার নেওয়া ও মেন্যু বোঝানো', 'বিল ও পেমেন্ট হিসাব', 'কাস্টমার কমপ্লেইন সমাধান'],
  },
  {
    id: 3,
    trade: 'কনস্ট্রাকশন ও সাইট ওয়ার্কার',
    englishTitle: 'Construction & Site Engineering',
    category: 'construction',
    icon: '🏗️',
    badge: 'সাইট সেফটি ও টুলস',
    description: 'সাইটের টুলস, মালামালের মাপজোখ, সেফটি রুলস ও ফোরম্যানের নির্দেশনা বোঝা।',
    topics: ['নির্মাণ সামগ্রীর নাম ও মাপ', 'সাইট সেফটি টার্মস', 'ফোরম্যানের ইনস্ট্রাকশন হ্যান্ডলিং'],
  },
  {
    id: 4,
    trade: 'ইলেকট্রিশিয়ান ও টেকনিশিয়ান',
    englishTitle: 'Electrician & Maintenance Track',
    category: 'construction',
    icon: '⚡',
    badge: 'টেকনিক্যাল সার্ভিস',
    description: 'সার্কিট, ওয়্যারিং, মেইনটেন্যান্স কাজ এবং বাসা-বাড়ির সার্ভিস ডায়লগ।',
    topics: ['টুলস ও পার্টস পরিচিতি', 'ফল্ট ডিটেকশন টার্মস', 'কাস্টমার সার্ভিসের ভাষা'],
  },
  {
    id: 5,
    trade: 'সুপারশপ ও রিটেইল সেলস',
    englishTitle: 'Retail & Supermarket Track',
    category: 'retail',
    icon: '🛒',
    badge: 'ক্যাশ কাউন্টার ও সেলস',
    description: 'পণ্য দেখানো, ডিসকাউন্ট বোঝানো, বারকোড স্ক্যান এবং ক্যাশ কাউন্টার ডায়লগ।',
    topics: ['দাম ও ডিসকাউন্ট ডায়লগ', 'স্টক ইনভেন্টরি টার্মস', 'বিলিং ও চেঞ্জ ফেরত'],
  },
  {
    id: 6,
    trade: 'হাউস ড্রাইভ ও হোম সার্ভিস',
    englishTitle: 'Domestic & Private Assistant Track',
    category: 'domestic',
    icon: '🏠',
    badge: 'হোম সার্ভিস ডায়লগ',
    description: 'মালিক পরিবারের সাথে কথা বলা, বাজার করা এবং দৈনন্দিন কাজের শিডিউল বোঝা।',
    topics: ['দৈনন্দিন গৃহস্থালী নির্দেশ', 'বাজার ও কেনাকাটার হিসাব', 'জরুরি পরিস্থিতিতে যোগাযোগ'],
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'সব পেশা (All)' },
  { key: 'driving', label: 'ড্রাইভিং ও ডেলিভারি' },
  { key: 'hospitality', label: 'হোটেল ও ক্যাটারিং' },
  { key: 'construction', label: 'কনস্ট্রাকশন ও ইলেকট্রিক' },
  { key: 'domestic', label: 'ডমেস্টিক ও হাউস ওয়ার্ক' },
  { key: 'retail', label: 'রিটেইল ও সুপারশপ' },
];

export default function TradeTracksPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTracks = activeCategory === 'all'
    ? SAMPLE_TRACKS
    : SAMPLE_TRACKS.filter((t) => t.category === activeCategory);

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
              পেশাভিত্তিক ভাষা ও কাজের গাইড (Trade / Job Tracks)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-xl mx-auto">
              আপনার পেশা নির্বাচন করুন এবং কর্মক্ষেত্রে প্রয়োজনীয় আরবি শব্দ, ডায়লগ ও প্র্যাকটিক্যাল কাজের নির্দেশিকা শিখুন।
            </p>
          </div>

          {/* Filter Tabs */}
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

          {/* Trade Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center text-2xl shadow-2xs">
                      {track.icon}
                    </div>
                    <span className="text-[10.5px] font-bold tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border dark:border-emerald-800/50 px-2.5 py-1 rounded-full">
                      {track.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {track.trade}
                  </h2>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-400 mt-0.5">
                    {track.englishTitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Sub-topics list */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 space-y-1.5">
                    {track.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <Link
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800/60 transition-colors shadow-2xs"
                    href="/live-batch"
                  >
                    <span>লাইভ ক্লাসে প্র্যাকটিস করুন</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-8 md:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              আপনার পেশায় কাজের কথা সরাসরি প্র্যাকটিস করতে চান?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              যুক্ত হন আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে এবং শিক্ষকের সাথে স্পোকেন আরবি ঝালিয়ে নিন।
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

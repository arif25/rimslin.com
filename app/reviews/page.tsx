'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, CheckCircle2, ThumbsUp, Quote, Award } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  countryFlag: string;
  profession: string;
  category: string;
  rating: number;
  beforeStory: string;
  afterStory: string;
  quote: string;
  badge: string;
}

const REVIEWS_DATA: Testimonial[] = [
  {
    id: 1,
    name: 'মো. রফিকুল ইসলাম',
    location: 'রিয়াদ',
    countryFlag: '🇸🇦',
    profession: 'ট্যাক্সি ও উবার ড্রাইভার',
    category: 'driver',
    rating: 5,
    beforeStory: 'রিয়াদ এয়ারপোর্টে আরব কাস্টমারদের সাথে লোকেশন নিয়ে কথা বলতে খুব ভয় পেতাম।',
    afterStory: 'রিমসলিনের অডিও ক্লাস করার পর এখন সাবলীলভাবে রুট, ট্রাফিক ও ভাড়ার হিসাব বুঝাতে পারি।',
    quote: 'রিমসলিনের সবচেয়ে ভালো দিক হলো কোনো গ্রামার না শিখিয়ে সরাসরি রাস্তায় কথা বলার প্র্যাকটিক্যাল ডায়লগ শিখিয়েছে। আমার রেটিং এখন ৪.৯২!',
    badge: 'ভেরিফায়েড শিক্ষার্থী',
  },
  {
    id: 2,
    name: 'শাকিল আহমেদ',
    location: 'দুবাই',
    countryFlag: '🇦🇪',
    profession: 'ক্যাফে ও রেস্টুরেন্ট সুপারভাইজার',
    category: 'hospitality',
    rating: 5,
    beforeStory: 'দুবাই সিটিতে আরবি কাস্টমারদের অর্ডার নিতে আটকে যেতাম, সহকর্মীর সাহায্য নিতে হতো।',
    afterStory: 'খাবার, মেন্যু ও বিলিংয়ের স্পোকেন আরবি শেখার পর একা পুরো ফ্রন্ট ডেস্ক সামলাতে পারি।',
    quote: '৩ দিনের ফ্রি ডেমো ক্লাস করার পরেই বিশ্বাস হয়েছিল যে আমি পারব। টিচারদের মুখ দিয়ে বলিয়ে নেওয়ার পদ্ধতি অতুলনীয়।',
    badge: 'লাইভ ব্যাচ গ্র্যাজুয়েট',
  },
  {
    id: 3,
    name: 'তরিকুল ইসলাম',
    location: 'দোহা',
    countryFlag: '🇶🇦',
    profession: 'সাইট ইলেকট্রিশিয়ান',
    category: 'construction',
    rating: 5,
    beforeStory: 'কাতারে সাইট ইঞ্জিনিয়ার ও মিশরীয় ফোরম্যানের নির্দেশনা ঠিকমতো না বুঝে ভুল করতাম।',
    afterStory: 'টুলস ও মেজারমেন্টের টেকনিক্যাল আরবি শব্দ শিখে এখন কাজ অনেক দ্রুত ও নির্ভুলভাবে করি।',
    quote: 'বাংলা উচ্চারণে আরবি লেখা থাকার কারণে সহজে পড়তে পেরেছি। যাদের আরবি অক্ষর জানা নেই তাদের জন্য এটা সেরা মাধ্যম।',
    badge: 'ভেরিফায়েড শিক্ষার্থী',
  },
  {
    id: 4,
    name: 'ফারুক হোসেন',
    location: 'জেদ্দা',
    countryFlag: '🇸🇦',
    profession: 'ডেলিভারি রাইডার (HungerStation)',
    category: 'driver',
    rating: 5,
    beforeStory: 'অ্যাপার্টমেন্টে ডেলিভারি দিতে গিয়ে কাস্টমারকে ফোন করে ঠিকানা জানতে চরম দ্বিধায় পড়তাম।',
    afterStory: 'এখন সহজে ফোন করে ‘আইনাল মাওকা’ বা ‘আনা ফিল বায়ত’ বলে এক মিনিটে পার্সেল ডেলিভারি দেই।',
    quote: 'প্রতিটি টাকার শতভাগ সদ্ব্যবহার হয়েছে। মোবাইল দিয়ে অবসর সময়ে শুনে শুনে শিখেছি।',
    badge: 'লাইভ ব্যাচ গ্র্যাজুয়েট',
  },
  {
    id: 5,
    name: 'আলমগীর কবির',
    location: 'কুয়েত সিটি',
    countryFlag: '🇰🇼',
    profession: 'সুপারমার্কেট সেলস এক্সিকিউটিভ',
    category: 'sales',
    rating: 5,
    beforeStory: 'কুয়েতি নাগরিকদের পণ্য দেখানো ও দামাদামির কথায় হ্যাঁ-না ছাড়া কিছু বলতে পারতাম না।',
    afterStory: 'ডিসকাউন্ট, আইটেম কোড ও পেমেন্টের ডায়লগ এখন স্বাচ্ছন্দ্যে আরবদের সাথে বলতে পারি।',
    quote: 'লাইভ ক্লাসে টিচার সরাসরি কথা বলতে বাধ্য করেন, ফলে মুখের জড়তা একদম কেটে যায়। কুয়েত প্রবাসীদের জন্য আবশ্যক।',
    badge: 'ভেরিফায়েড শিক্ষার্থী',
  },
  {
    id: 6,
    name: 'কামরুল হাসান',
    location: 'মাস্কাট',
    countryFlag: '🇴🇲',
    profession: 'হোম সার্ভিস ও টেকনিশিয়ান',
    category: 'construction',
    rating: 5,
    beforeStory: 'ওমানের লোকাল ভাষা একটু ভিন্ন হওয়ায় গৃহকর্তার সাথে সমস্যা হতো।',
    afterStory: 'ওমানি উপভাষার শব্দগুলো শিখে এখন মালিক পরিবারের সাথে খুব চমৎকার সম্পর্ক তৈরি হয়েছে।',
    quote: 'দেশভিত্তিক উপভাষা সেকশনটি আমাকে ওমানের খাস ভাষা বুঝতে সবচেয়ে বেশি সাহায্য করেছে। অনেক ধন্যবাদ রিমসলিন টিমকে।',
    badge: 'ভেরিফায়েড শিক্ষার্থী',
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'সকল রিভিউ' },
  { key: 'driver', label: 'ড্রাইভার ও ডেলিভারি' },
  { key: 'hospitality', label: 'হোটেল ও রেস্টুরেন্ট' },
  { key: 'construction', label: 'সাইট ও কনস্ট্রাকশন' },
  { key: 'sales', label: 'সেলস ও রিটেইল' },
];

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredReviews = activeCategory === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#060b08]">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Top Header */}
          <div className="text-center">
            <Link
              className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 hover:underline"
              href="/"
            >
              ← হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              শিক্ষার্থীদের সাফল্য ও অভিজ্ঞতা (Student Reviews)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              সৌদি আরব, কাতার ও দুবাই প্রবাসী শিক্ষার্থীরা কীভাবে সহজে আরবি শিখে কর্মক্ষেত্রে সফল হয়েছেন।
            </p>

            {/* Rating Summary Bar */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-3 shadow-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                ⭐ ৪.৯/৫ রেটিং | ১,২০০+ সফল শিক্ষার্থী
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>১০০% বাস্তব কর্মক্ষেত্রের রিভিউ</span>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.key
                    ? 'bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 dark:text-slate-950 font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-surface-100/90 dark:text-slate-300 dark:border-white/10 dark:hover:bg-surface-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Student Profile & Rating */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{review.countryFlag}</span>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {review.name}
                        </h2>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {review.profession} • {review.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Feedback Quote */}
                  <div className="relative bg-slate-50 dark:bg-surface-200/50 rounded-xl p-4 border border-slate-100 dark:border-white/5 mb-4">
                    <Quote className="w-5 h-5 text-slate-300 dark:text-slate-600 mb-1" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Before vs After Comparison */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 bg-rose-50/60 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                      <span className="font-bold shrink-0">পূর্বের অবস্থা:</span>
                      <span>{review.beforeStory}</span>
                    </div>
                    <div className="flex items-start gap-2 bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                      <span className="font-bold shrink-0">কোর্সের পর:</span>
                      <span>{review.afterStory}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{review.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>প্র্যাকটিক্যাল ফলাফল</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              সরাসরি ৩ দিনের ফ্রি ডেমো ক্লাস করে নিজের অভিজ্ঞতা শুরু করুন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              কোনো অগ্রিম ফি ছাড়া ক্লাসে অংশ নিয়ে নিজেই যাচাই করুন কতটা সহজে মুখে মুখে আরবি বলা শেখা সম্ভব।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              সরাসরি ৩ দিনের ফ্রি ডেমো ক্লাস করে নিজের অভিজ্ঞতা শুরু করুন →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

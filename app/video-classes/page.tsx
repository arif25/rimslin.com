'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YouTubeGallery from '@/components/YouTubeGallery';

export default function VideoClassesPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#060b08]">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Top Header (Matches Audio Phrases Style) */}
          <div className="text-center">
            <Link
              className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 hover:underline"
              href="/"
            >
              ← হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              আরবি ভাষা শিক্ষা ভিডিও কালেকশন
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-xl mx-auto">
              কর্মক্ষেত্রে কথা বলার জন্য তৈরি প্রতিটি ভিডিও সহজে দেখুন এবং সঠিক উচ্চারণ রপ্ত করুন।
            </p>
          </div>

          {/* Original Homepage Video Component / Section */}
          <div className="w-full">
            <YouTubeGallery isStandalonePage={true} />
          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              ভিডিও দেখার পাশাপাশি সরাসরি শিক্ষকের সাথে প্র্যাকটিস করতে চান?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে অংশ নিয়ে নিজের স্পোকেন অ্যারাবিক লেভেল যাচাই করুন।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              ৩ দিনের ফ্রি লাইভ ডেমো ক্লাস বুক করুন →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeartPulse, PhoneCall, Volume2, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EmergencyPhrase {
  id: number;
  category: string;
  categoryLabel: string;
  situation: string;
  arabic: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  sosTip: string;
}

const EMERGENCY_DATA: EmergencyPhrase[] = [
  {
    id: 1,
    category: 'hospital',
    categoryLabel: 'হাসপাতাল ও ডাক্তার',
    situation: 'তীব্র বুকে ব্যথা বা হার্ট অ্যাটাকের লক্ষণ',
    arabic: 'عِنْدِي أَلَمٌ شَدِيدٌ فِي صَدْرِي، سَاعِدْنِي',
    bengaliPronunciation: 'ইন্দি আলাম শাদীদ ফি সাদরী, সাইদনি',
    bengaliMeaning: 'আমার বুকে তীব্র ব্যথা হচ্ছে, আমাকে সাহায্য করুন।',
    sosTip: 'জরুরি অ্যাম্বুলেন্স নম্বর: ৯৯৭ (সৌদি), ৯৯৮ (দুবাই)।',
  },
  {
    id: 2,
    category: 'hospital',
    categoryLabel: 'হাসপাতাল ও ডাক্তার',
    situation: 'উচ্চ রক্তচাপ বা মাথা ঘোরা',
    arabic: 'أَشْعُرُ بِدَوْخَةٍ وَضَغْطِي مُرْتَفِع',
    bengaliPronunciation: 'আশউরু বি-দাওখা ওয়া দাগতি মুরতাফি’',
    bengaliMeaning: 'আমার মাথা ঘুরছে এবং ব্লাড প্রেশার খুব বেশি।',
    sosTip: 'হাসপাতালের জরুরি বিভাগে (মুস্তাশফা তাওয়ারী) যেতে বলুন।',
  },
  {
    id: 3,
    category: 'pharmacy',
    categoryLabel: 'ফার্মেসি',
    situation: 'জ্বর ও ব্যথানাশক ওষুধ চাওয়া',
    arabic: 'أُرِيدُ خَافِضَ حَرَارَةٍ وَمُسَكِّنَ أَلَم',
    bengaliPronunciation: 'উরিদু খাফিদ হারারাহ ওয়া মুসাক্কিন আলাম',
    bengaliMeaning: 'আমি জ্বরের ওষুধ এবং ব্যথানাশক ট্যাবলেট চাই।',
    sosTip: 'প্যারাসিটামলকে আরবে ‘ফেনাডল’ (Panadol) বা ‘বেনাদোল’ বলে।',
  },
  {
    id: 4,
    category: 'pharmacy',
    categoryLabel: 'ফার্মেসি',
    situation: 'ডায়াবেটিসের ইনসুলিন বা ওষুধ',
    arabic: 'عِنْدِي مَرَضُ السُّكَّرِي، أَحْتَاجُ عِلَاج',
    bengaliPronunciation: 'ইন্দি মারাদুস সুক্কারি, আহ্তাজু ইলাজ',
    bengaliMeaning: 'আমার ডায়াবেটিস আছে, আমার ওষুধ দরকার।',
    sosTip: 'রক্ত পরীক্ষার জন্য ‘তাহলিল সুক্কার’ শব্দটি মনে রাখুন।',
  },
  {
    id: 5,
    category: 'police',
    categoryLabel: 'পুলিশ ও অ্যাম্বুলেন্স',
    situation: 'চুরি বা ছিনতাইয়ের অভিযোগ জানানো',
    arabic: 'تَعَرَّضْتُ لِلسَّرِقَة، أُرِيدُ الشُّرْطَة',
    bengaliPronunciation: 'তা’আররাতু লিস-সারিকাহ, উরিদুশ শুরতাহ',
    bengaliMeaning: 'আমার মালামাল চুরি হয়েছে, আমি পুলিশের সাহায্য চাই।',
    sosTip: 'জরুরি পুলিশ হেল্পলাইন: ৯৯৯ (সৌদি আরব / ইউএই / কাতার)।',
  },
  {
    id: 6,
    category: 'police',
    categoryLabel: 'পুলিশ ও অ্যাম্বুলেন্স',
    situation: 'জরুরি অ্যাম্বুলেন্স ডাকা',
    arabic: 'أَرْسِلُوا سَيَّارَةَ الإِسْعَافِ فَوْراً',
    bengaliPronunciation: 'ইরসিলু সাইয়্যারাাতাল ইস’আফ ফাওরান',
    bengaliMeaning: 'অবিলম্বে একটি অ্যাম্বুলেন্স গাড়ি পাঠান।',
    sosTip: 'ফোনে কথা বলার সময় সরাসরি আপনার গুগল ম্যাপ লাইভ লোকেশন শেয়ার করুন।',
  },
  {
    id: 7,
    category: 'accident',
    categoryLabel: 'জরুরি রোড এক্সিডেন্ট',
    situation: 'রাস্তায় গাড়ি দুর্ঘটনা বা ট্রাফিক পুলিশ কল',
    arabic: 'حَصَلَ حَادِثٌ مَرُورِيٌّ فِي الشَّارِع',
    bengaliPronunciation: 'হাসালা হাদিস মারুরি ফিশ-শারে’',
    bengaliMeaning: 'রাস্তায় একটি সড়ক দুর্ঘটনা ঘটেছে।',
    sosTip: 'সৌদি আরবে ট্রাফিক দুর্ঘটনার জন্য নাজমু (Najm) হেল্পলাইন: ৯২০-০০-০৫৬০।',
  },
  {
    id: 8,
    category: 'accident',
    categoryLabel: 'জরুরি রোড এক্সিডেন্ট',
    situation: 'গাড়ির টায়ার পাংচার বা ইঞ্জিন নষ্ট',
    arabic: 'تَعَطَّلَتْ سَيَّارَتِي، أَحْتَاجُ سَطْحَة',
    bengaliPronunciation: 'তা’আত্তালাত সাইয়্যারাতি, আহ্তাজু সাতহাহ',
    bengaliMeaning: 'আমার গাড়ি নষ্ট হয়ে গেছে, গাড়ি টেনে নেওয়ার জন্য রেকার (সাতহা) দরকার।',
    sosTip: 'গাড়ি টানার ক্রেন বা ট্রেলারকে আরবে ‘সাতহা’ (سطحة) বলা হয়।',
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'সকল জরুরি বাক্য' },
  { key: 'hospital', label: 'হাসপাতাল ও ডাক্তার' },
  { key: 'pharmacy', label: 'ফার্মেসি' },
  { key: 'police', label: 'পুলিশ ও অ্যাম্বুলেন্স' },
  { key: 'accident', label: 'জরুরি রোড এক্সিডেন্ট' },
];

export default function EmergencyArabicPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filteredPhrases = activeCategory === 'all'
    ? EMERGENCY_DATA
    : EMERGENCY_DATA.filter((item) => item.category === activeCategory);

  const handleSpeak = (item: EmergencyPhrase) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingId(item.id);

      const utterance = new SpeechSynthesisUtterance(item.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingId(item.id);
      setTimeout(() => setPlayingId(null), 1500);
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 min-h-screen bg-slate-50 py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#060b08]">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">

          {/* Header */}
          <div className="text-center">
            <Link
              className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 hover:underline"
              href="/"
            >
              ← হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              জরুরি অবস্থা ও হাসপাতাল আরবি গাইড (Emergency & Medical Arabic)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              অসুস্থতা, দুর্ঘটনা, পুলিশ হেল্প ও ফার্মেসিতে তাৎক্ষণিক কথা বলার জরুরি শব্দ ও ডায়লগ।
            </p>

            {/* Quick Emergency Helplines Bar */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>পুলিশ: ৯৯৯</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                <HeartPulse className="w-3.5 h-3.5 text-amber-600" />
                <span>অ্যাম্বুলেন্স: ৯৯৭</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-200 dark:border-sky-900/50">
                <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
                <span>রোড এক্সিডেন্ট (নাজম): ৯২০-০০-০৫৬০</span>
              </span>
            </div>
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
                    ? 'bg-rose-600 text-white shadow-xs dark:bg-rose-600 dark:text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-surface-100/90 dark:text-slate-300 dark:border-white/10 dark:hover:bg-surface-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Emergency Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {filteredPhrases.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 px-2.5 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      পরিস্থিতি: {item.situation}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-right dir-rtl font-arabic my-3 leading-relaxed">
                    {item.arabic}
                  </p>

                  <div className="space-y-1 bg-slate-50 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/5">
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      উচ্চারণ: {item.bengaliPronunciation}
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                      অর্থ: {item.bengaliMeaning}
                    </p>
                  </div>

                  <div className="mt-3 flex items-start gap-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200/70 dark:border-amber-900/40">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.sosTip}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSpeak(item)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors ${
                      playingId === item.id
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/80 dark:text-rose-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-surface-200 dark:hover:bg-surface-300 dark:text-slate-200'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{playingId === item.id ? 'আরবি শুনছি...' : 'আরবি উচ্চারণ শুনুন'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-8 md:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              জরুরি মুহূর্তে যাতে মুখে আটকে না যায়, এখনই প্র্যাকটিস করুন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে অংশ নিন এবং সঠিক উচ্চারণে যেকোনো জরুরি পরিস্থিতির কথা শিখে নিন।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              লাইভ ক্লাসে জরুরি কথা বলার প্র্যাকটিস করুন →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

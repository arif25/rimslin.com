'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface DialectTrack {
  id: number;
  country: string;
  flag: string;
  dialectName: string;
  category: string;
  description: string;
  commonPhrases: { standard: string; local: string; meaning: string }[];
}

const SAMPLE_DIALECTS: DialectTrack[] = [
  {
    id: 1,
    country: 'সৌদি আরব',
    flag: '🇸🇦',
    dialectName: 'নজদী ও হিজাজি আরবি (Saudi Arabic)',
    category: 'saudi',
    description: 'রিয়াদ, জেদ্দা, মক্কা ও মদিনায় প্রচলিত সাধারণ স্পোকেন টার্মস এবং লোকাল টান।',
    commonPhrases: [
      { standard: 'كيف حالك؟ (Kaifa haluka)', local: 'كيفك / وش لونك؟ (Wesh lawnak)', meaning: 'কেমন আছেন?' },
      { standard: 'ماذا تريد؟ (Madha tureed)', local: 'وش تبغى؟ (Wesh tebgha)', meaning: 'আপনি কী চান?' },
      { standard: 'الآن (Al-aan)', local: 'الحين (Al-heen)', meaning: 'এখনই' },
    ],
  },
  {
    id: 2,
    country: 'সংযুক্ত আরব আমিরাত (দুবাই)',
    flag: '🇦🇪',
    dialectName: 'ইমারতি খালিজী আরবি (Emirati / Dubai)',
    category: 'uae',
    description: 'দুবাই ও আবুধাবির ট্যাক্সি, কাস্টমার সার্ভিস ও লোকাল নাগরিকদের কথ্য ভাষা।',
    commonPhrases: [
      { standard: 'كيف حالك؟ (Kaifa haluka)', local: 'شخبارك؟ (Shekhbarak)', meaning: 'আপনার কী খবর?' },
      { standard: 'كثير (Katheer)', local: 'وايد (Waayid)', meaning: 'অনেক বেশি / খুব' },
      { standard: 'هنا (Huna)', local: 'هني (Heni)', meaning: 'এখানে' },
    ],
  },
  {
    id: 3,
    country: 'কাতার',
    flag: '🇶🇦',
    dialectName: 'কাতারি খালিজী আরবি (Qatari Arabic)',
    category: 'qatar',
    description: 'দোহা ও অন্যান্য অঞ্চলে বহুল ব্যবহৃত গাল্ফ ডায়লেক্ট এবং কাজের টার্মিনোলজি।',
    commonPhrases: [
      { standard: 'ماذا حدث؟ (Madha hadath)', local: 'شصار؟ (Shoo saar)', meaning: 'কী হয়েছে?' },
      { standard: 'أريد هذا (Ureedu hadha)', local: 'أبي هذا (Abi hatha)', meaning: 'আমি এটা চাই' },
      { standard: 'جيد جداً (Jayyid jiddan)', local: 'زين واجد (Zein waajid)', meaning: 'খুব ভালো' },
    ],
  },
  {
    id: 4,
    country: 'কুয়েত',
    flag: '🇰🇼',
    dialectName: 'কুয়েতি ডায়লেক্ট (Kuwaiti Arabic)',
    category: 'kuwait',
    description: 'কুয়েতের লোকাল ভাষা যাতে ‘ক’ এবং ‘জ’ ধ্বনির কিছু আঞ্চলিক বৈচিত্র্য থাকে।',
    commonPhrases: [
      { standard: 'كيف حالك؟ (Kaifa haluka)', local: 'شلونك؟ (Shlonak)', meaning: 'কেমন আছেন?' },
      { standard: 'جمিল (Jameel)', local: 'حلو / وايد زين (Waayid zein)', meaning: 'অনেক সুন্দর' },
      { standard: 'لماذا؟ (Limadha)', local: 'ليش؟ (Leysh)', meaning: 'কেন?' },
    ],
  },
  {
    id: 5,
    country: 'ওমান',
    flag: '🇴🇲',
    dialectName: 'ওমানি লোকাল আরবি (Omani Arabic)',
    category: 'oman',
    description: 'মাস্কাট ও সালালাহ অঞ্চলের আঞ্চলিক শব্দভাণ্ডার ও শান্ত উচ্চারণভঙ্গি।',
    commonPhrases: [
      { standard: 'كيف حالك؟ (Kaifa haluka)', local: 'مو علومك؟ (Moo uloomak)', meaning: 'আপনার কী অবস্থা?' },
      { standard: 'ماذا تريد؟ (Madha tureed)', local: 'مو باغي؟ (Moo baghi)', meaning: 'কী খুঁজছেন / কী চান?' },
      { standard: 'بسرعة (Bi-sur\'ah)', local: 'بسرعة / خفيف (Sur\'ah)', meaning: 'তাড়াতাড়ি করুন' },
    ],
  },
];

const COUNTRY_TABS = [
  { key: 'all', label: 'সকল দেশ' },
  { key: 'saudi', label: 'সৌদি আরব 🇸🇦' },
  { key: 'uae', label: 'সংযুক্ত আরব আমিরাত 🇦🇪' },
  { key: 'qatar', label: 'কাতার 🇶🇦' },
  { key: 'kuwait', label: 'কুয়েত 🇰🇼' },
  { key: 'oman', label: 'ওমান 🇴🇲' },
];

export default function CountryDialectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDialects = activeCategory === 'all'
    ? SAMPLE_DIALECTS
    : SAMPLE_DIALECTS.filter((d) => d.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#060b08]">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center">
            <Link
              className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 hover:underline"
              href="/"
            >
              ← হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              দেশভিত্তিক আরবি উপভাষা ও লোকাল ডায়লেক্ট
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              যে দেশে যাচ্ছেন বা কাজ করছেন, সেখানকার স্থানীয় আঞ্চলিক শব্দের পার্থক্য ও সঠিক কথ্য রূপ আয়ত্ত করুন।
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {COUNTRY_TABS.map((tab) => (
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

          {/* Dialect Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDialects.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.flag}</span>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                          {item.country}
                        </h2>
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {item.dialectName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Phrase Comparisons */}
                  <div className="space-y-2.5">
                    {item.commonPhrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-surface-200/50 border border-slate-100 dark:border-white/5 rounded-xl p-3 flex flex-col gap-1 text-xs"
                      >
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-medium">
                          <span>আঞ্চলিক কথ্য রূপ:</span>
                          <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm font-arabic" dir="rtl">
                            {phrase.local}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                          <span>বাংলা অর্থ:</span>
                          <span className="font-semibold">{phrase.meaning}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400 dark:text-slate-500 text-[11px] pt-1 border-t border-slate-200/50 dark:border-white/5">
                          <span>প্রমিত রূপ:</span>
                          <span className="font-arabic" dir="rtl">{phrase.standard}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5">
                  <Link
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800/60 transition-colors shadow-2xs"
                    href="/live-batch"
                  >
                    <span>এই দেশের উপভাষা লাইভ ক্লাসে শিখুন</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              নির্দিষ্ট দেশের আঞ্চলিক টানে কথা বলতে চান?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি ডেমো লাইভ ক্লাসে অংশ নিন এবং অভিজ্ঞ শিক্ষকের সাথে সঠিক উপভাষা অনুশীলন করুন।
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

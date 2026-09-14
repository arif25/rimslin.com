'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PracticeItem {
  id: number;
  category: string;
  arabic: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  expectedScore: string;
}

const SAMPLE_PRACTICE: PracticeItem[] = [
  {
    id: 1,
    category: 'basic',
    arabic: 'صَبَاحُ الخَيْرِ، كَيْفَ حَالُكَ؟',
    bengaliPronunciation: 'সাবাহুল খাইর, কাইফ হালাক?',
    bengaliMeaning: 'শুভ সকাল, কেমন আছেন?',
    expectedScore: '৯৬%',
  },
  {
    id: 2,
    category: 'work',
    arabic: 'أَنَا جَاهِزٌ لِلْعَمَلِ اليَوْم',
    bengaliPronunciation: 'আনা জাহিজুন লিল-আমালি আল-ইয়াউম',
    bengaliMeaning: 'আমি আজ কাজ করার জন্য প্রস্তুত।',
    expectedScore: '৯৮%',
  },
  {
    id: 3,
    category: 'work',
    arabic: 'أَيْنَ مَكَانُ تَسْلِيمِ الطَّلَب؟',
    bengaliPronunciation: 'আইনা মাকানু তাসলীমিত তালাব?',
    bengaliMeaning: 'অর্ডার ডেলিভারি দেওয়ার জায়গাটি কোথায়?',
    expectedScore: '৯৫%',
  },
  {
    id: 4,
    category: 'emergency',
    arabic: 'سَاعِدْنِي لَوْ سَمَحْت، أَنَا ضَائِع',
    bengaliPronunciation: 'সাইদনি লাও সামাহতা, আনা দাইয়ি',
    bengaliMeaning: 'দয়া করে সাহায্য করুন, আমি পথ হারিয়ে ফেলেছি।',
    expectedScore: '৯৪%',
  },
];

const FILTER_TABS = [
  { key: 'all', label: 'সব লেভেল' },
  { key: 'basic', label: 'বেসিক কুশল' },
  { key: 'work', label: 'কর্মক্ষেত্র ও দোকান' },
  { key: 'emergency', label: 'ইমার্জেন্সি ও যাতায়াত' },
];

export default function AiVoiceCoachPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [recordingId, setRecordingId] = useState<number | null>(null);
  const [feedbackId, setFeedbackId] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? SAMPLE_PRACTICE
    : SAMPLE_PRACTICE.filter((item) => item.category === activeCategory);

  const handlePlayAudio = (item: PracticeItem) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingId(item.id);

      const utterance = new SpeechSynthesisUtterance(item.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;

      utterance.onend = () => {
        setPlayingId(null);
      };

      utterance.onerror = () => {
        setPlayingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingId(item.id);
      setTimeout(() => setPlayingId(null), 1500);
    }
  };

  const handleRecord = (id: number) => {
    setRecordingId(id);
    setFeedbackId(null);
    setTimeout(() => {
      setRecordingId(null);
      setFeedbackId(id);
    }, 2000);
  };

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
              🤖 এআই ভয়েস কোচ (AI Voice Practice Coach)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-xl mx-auto">
              আরবি বাক্য শুনুন, মাইকে মুখে বলুন এবং সাথে সাথে উচ্চারণ সঠিক হয়েছে কি না এআই ফিডব্যাক নিন।
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_TABS.map((tab) => (
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

          {/* Practice Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-surface-100 border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      লেভেল অনুশীলন
                    </span>
                    {feedbackId === item.id && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 px-2.5 py-0.5 rounded-full animate-fade-in">
                        ✓ স্কোর: {item.expectedScore} (নিখুঁত উচ্চারণ)
                      </span>
                    )}
                  </div>

                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-right dir-rtl font-arabic mb-4 leading-relaxed">
                    {item.arabic}
                  </p>

                  <div className="bg-slate-50 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/5 space-y-1">
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      উচ্চারণ: {item.bengaliPronunciation}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      অর্থ: {item.bengaliMeaning}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(item)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      playingId === item.id
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300'
                        : 'text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-surface-200 dark:hover:bg-surface-300 border border-transparent'
                    }`}
                  >
                    <span>{playingId === item.id ? '🔊 বাজছে...' : '🔊 শুনুন'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRecord(item.id)}
                    disabled={recordingId === item.id}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs ${
                      recordingId === item.id
                        ? 'bg-rose-600 animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950'
                    }`}
                  >
                    <span>{recordingId === item.id ? '🎙️ শুনছি...' : '🎙️ মুখে বলুন'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              এআই কোচের পাশাপাশি সরাসরি দেশীয় শিক্ষকের ফিডব্যাক চান?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে অংশ নিন এবং শিক্ষকের সাথে কথা বলে জড়তা দূর করুন।
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

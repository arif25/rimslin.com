'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Download,
  FileText,
  Music,
  Briefcase,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface DownloadItem {
  id: string;
  category: 'pdf' | 'mp3' | 'trade';
  title: string;
  description: string;
  format: string;
  fileSize: string;
  tag: string;
  downloadLink: string;
  whatsappMessage: string;
}

const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 'res-1',
    category: 'pdf',
    title: 'দৈনন্দিন ১,০০০+ জরুরি আরবি শব্দের হ্যান্ডবুক (PDF)',
    description: 'আরব দেশে প্রতিদিন ব্যবহৃত সবচেয়ে কমন ১০০০ শব্দের বাংলা উচ্চারণ ও অর্থসহ গোছানো শব্দকোষ। প্রিন্ট করে পকেটে রাখার উপযোগী।',
    format: 'PDF ই-বুক',
    fileSize: '৪.৮ MB',
    tag: 'সবচেয়ে জনপ্রিয়',
    downloadLink: '/books/gulf-arabic-guide.jpg',
    whatsappMessage: 'Hello Rimslin, I want the 1000+ Arabic Vocabulary PDF Guide.',
  },
  {
    id: 'res-2',
    category: 'mp3',
    title: 'অফলাইন আরবি অডিও লেকচার ও উচ্চারণ প্যাক (MP3)',
    description: 'ইন্টারনেট ছাড়াই গাড়িতে, কাজে বা হাঁটার সময় শোনার জন্য প্রবাসীদের খাঁটি আরবি উচ্চারণ ও কুশলবিনিময়ের পূর্ণ অডিও প্যাক।',
    format: 'MP3 অডিও প্যাক',
    fileSize: '১৮.৫ MB',
    tag: 'অফলাইন অডিও',
    downloadLink: '#',
    whatsappMessage: 'Hello Rimslin, Please send me the Offline Spoken Arabic MP3 Pack.',
  },
  {
    id: 'res-3',
    category: 'trade',
    title: 'ড্রাইভার ও ট্যাক্সি ক্যাব আরবি স্পিকিং শিট (PDF)',
    description: 'জিপিএস লোকেশন, ট্রাফিক সিগন্যাল, কাফালা ও স্পিড লিমিট সংক্রান্ত সকল জরুরি শব্দ ও কথোপকথন নিয়ে প্র্যাকটিক্যাল গাইড শিট।',
    format: 'PDF গাইড শিট',
    fileSize: '৩.২ MB',
    tag: 'ড্রাইভিং স্পেশাল',
    downloadLink: '/books/taxi-driver-guide.jpg',
    whatsappMessage: 'Hello Rimslin, Please send me the Driver Arabic Speaking PDF Sheet.',
  },
  {
    id: 'res-4',
    category: 'trade',
    title: 'রেস্টুরেন্ট, ক্যাটারিং ও কফি শপ স্পিকিং চিটশিট (PDF)',
    description: 'খাবার অর্ডার গ্রহণ, কাস্টমার সার্ভিস, বিল পেমেন্ট ও কিচেন পরিচালনার প্রয়োজনীয় সকল আরবি ডায়লগ ও শব্দের তালিকা।',
    format: 'PDF গাইড শিট',
    fileSize: '২.৯ MB',
    tag: 'হোটেল ও রেস্টুরেন্ট',
    downloadLink: '/books/catering-arabic.jpg',
    whatsappMessage: 'Hello Rimslin, Please send me Restaurant & Catering Arabic Sheet.',
  },
  {
    id: 'res-5',
    category: 'trade',
    title: 'কনস্ট্রাকশন, ইলেকট্রিশিয়ান ও টেকনিশিয়ান স্পিকিং কিট (PDF)',
    description: 'সাইট ইঞ্জিনিয়ার, ফোরম্যান ও সুপারভাইজারের সাথে কাজের মাপজোখ, মালামাল ও সেফটি সংক্রান্ত কথাবার্তার সম্পূর্ণ গাইড।',
    format: 'PDF গাইড শিট',
    fileSize: '৩.৫ MB',
    tag: 'টেকনিক্যাল ট্রেড',
    downloadLink: '/books/technical-trade-visa-kit.jpg',
    whatsappMessage: 'Hello Rimslin, Please send me the Construction & Trade Arabic Kit.',
  },
  {
    id: 'res-6',
    category: 'pdf',
    title: 'উপসাগরীয় দেশভিত্তিক স্থানীয় ডায়লেক্ট পার্থক্য চার্ট (PDF)',
    description: 'সৌদি, দুবাই, কাতার ও কুয়েতের স্থানীয় আঞ্চলিক শব্দের তুলনামূলক টেবিল। এক নজরে কোন দেশে কোন শব্দ চলে তা জানুন।',
    format: 'PDF কালার চার্ট',
    fileSize: '২.৪ MB',
    tag: 'ডায়লেক্ট চার্ট',
    downloadLink: '/books/gulf-arabic-guide.jpg',
    whatsappMessage: 'Hello Rimslin, Please send me Country Dialects Comparison Chart.',
  },
];

export default function FreeDownloadsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pdf' | 'mp3' | 'trade'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredItems = selectedTab === 'all'
    ? DOWNLOAD_ITEMS
    : DOWNLOAD_ITEMS.filter((item) => item.category === selectedTab);

  const handleDownload = (item: DownloadItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      setDownloadingId(null);
      // Simulate file download trigger
      const link = document.createElement('a');
      link.href = item.downloadLink;
      link.download = `${item.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#060b08] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Clean Header with Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-4"
            >
              ← হোমপেজে ফিরে যান
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Download className="w-3.5 h-3.5" />
              <span>বিনামূল্যে শিক্ষণ সামগ্রী ও স্টাডি প্যাক</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ফ্রি অডিও ও ভোকাবুলারি ডাউনলোড প্যাক (Free Resources)
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              ইন্টারনেট ছাড়াও প্র্যাকটিস করার জন্য গুরুত্বপূর্ণ অডিও লেকচার ও PDF শব্দভাণ্ডার শিট। সরাসরি ডাউনলোড করুন অথবা এক ক্লিকে হোয়াটসঅ্যাপে সংগ্রহ করুন।
            </p>
          </div>

          {/* Quick WhatsApp Assistance Ribbon */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  ডাউনলোড করতে সমস্যা হচ্ছে? সরাসরি হোয়াটসঅ্যাপে ফাইল নিন!
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  আমাদের অফিসিয়াল নম্বরে একটি মেসেজ দিন, তাৎক্ষণিকভাবে স্টাডি মেটেরিয়াল আপনার চ্যাটে পৌঁছে দেওয়া হবে।
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/916290051284?text=Hello%20Rimslin%20Support,%20please%20send%20me%20the%20free%20Arabic%20learning%20PDF%20and%20audio%20materials."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shrink-0"
            >
              <span>হোয়াটসঅ্যাপে ফাইল নিন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
            {[
              { key: 'all', label: 'সব ডাউনলোড' },
              { key: 'pdf', label: 'ভোকাবুলারি শিট (PDF)' },
              { key: 'mp3', label: 'অডিও লেকচার প্যাক (MP3)' },
              { key: 'trade', label: 'পেশাভিত্তিক গাইড শিট' },
            ].map((tab) => {
              const isActive = selectedTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-white dark:bg-surface-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-emerald-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-surface-100 rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.fileSize}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-surface-200 text-emerald-600 dark:text-emerald-400 shrink-0">
                      {item.category === 'pdf' && <FileText className="w-5 h-5" />}
                      {item.category === 'mp3' && <Music className="w-5 h-5" />}
                      {item.category === 'trade' && <Briefcase className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h2>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        ফরম্যাট: {item.format}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadingId === item.id ? 'ডাউনলোড শুরু হচ্ছে...' : 'সরাসরি ডাউনলোড করুন'}</span>
                  </button>

                  <a
                    href={`https://wa.me/916290051284?text=${encodeURIComponent(item.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-200 dark:hover:bg-surface-300 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>হোয়াটসঅ্যাপে ফাইলটি নিন</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              শুধু পড়ে নয়, শিক্ষকের সাথে সরাসরি মুখে মুখে আরবি শিখুন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              বই ও শিটের পাশাপাশি লাইভ ক্লাসে অংশ নিয়ে মনের জড়তা কাটান এবং দ্রুত কথা বলা শুরু করুন।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              ডাউনলোড মেটেরিয়ালের পাশাপাশি সরাসরি শিক্ষকের সাথে লাইভ ক্লাস করুন →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

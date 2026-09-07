import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioPhraseDemo from "@/components/AudioPhraseDemo";
import { Volume2, Sparkles, BookOpen, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো | গালফ কথ্য আরবি ও কাজের ইংরেজি - Rimslin",
  description:
    "সৌদি আরব, দুবাই (UAE), কাতার, কুয়েত ও ওমান প্রবাসীদের জন্য কাজের বাস্তব গালফ কথ্য আরবি ও ইংরেজি বাক্যের সম্পূর্ণ অডিও প্লেলিস্ট। সঠিক উচ্চারণ শুনুন ও সহজে প্র্যাকটিস করুন।",
  alternates: {
    canonical: "https://rimslin.com/audio-phrases",
  },
  openGraph: {
    title: "ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো | গালফ কথ্য আরবি ও কাজের ইংরেজি - Rimslin",
    description:
      "সৌদি আরব, দুবাই, কাতার, কুয়েত কাজের জন্য বাস্তব কাজের গালফ আরবি ও ইংরেজি বাক্যের সম্পূর্ণ অডিও উচ্চারণ ডেমো প্লেলিস্ট।",
    url: "https://rimslin.com/audio-phrases",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function AudioPhrasesPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-8 sm:py-14">
        {/* Ambient Hero Emerald Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[520px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-75"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/"
                className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
              >
                হোম (Home)
              </Link>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                অডিও ফ্রেজ ডেমো (Audio Phrases)
              </span>
            </nav>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>হোমে ফিরুন</span>
            </Link>
          </div>

          {/* Page Header */}
          <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400 animate-pulse" />
              <span>ইন্টারেক্টিভ অডিও ডিরেক্টরি (Complete Audio Directory)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              প্রবাসীদের কর্মক্ষেত্রের{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                প্রয়োজনীয় আরবি ও ইংরেজি বাক্য
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              সৌদি আরব, দুবাই (UAE), কাতার, কুয়েত ও ওমানের নির্মাণ সাইট, দোকান, ড্রাইভিং ও দৈনন্দিন কাজের বাস্তব বাক্যসমূহ। প্রতিটি বাক্যের অডিও শুনে সঠিক উচ্চারণ সহজে রপ্ত করুন।
            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-gulf-500/15 border border-emerald-500/25 px-3 py-1 text-emerald-800 dark:text-gulf-300 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
                ১২+ প্লে-যোগ্য বাক্য
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/15 border border-amber-500/25 px-3 py-1 text-amber-800 dark:text-gold-300 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-gold-400" />
                ৫টি বাস্তব কাজের ক্যাটাগরি
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/25 px-3 py-1 text-sky-800 dark:text-sky-300 font-semibold">
                <Volume2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                ধীর (0.7x) ও স্বাভাবিক গতি
              </span>
            </div>
          </header>

          {/* Full Interactive Audio Demo (renders all phrases + search) */}
          <AudioPhraseDemo isStandalonePage={true} />

          {/* Bottom Conversion & Offline Guidebook Card */}
          <section className="mt-16 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 via-slate-900/40 to-slate-950 p-6 sm:p-10 text-center relative overflow-hidden backdrop-blur-xl">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-300 mb-4">
                <BookOpen className="h-3.5 w-3.5" />
                সম্পূর্ণ অডিও ও গাইডবুক প্যাক
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                অফলাইনে ১,০০০+ বাক্য ও সম্পূর্ণ অডিও কোর্স চান?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                আমাদের প্রকাশিত প্রিন্টেড গাইডবুক ও ডিজিটাল ই-বুকে থাকছে কাজের সাইট, সুপারমার্কেট, ড্রাইভিং ও ইন্টারভিউয়ের ১,০০০+ বাস্তব বাক্য যা আপনি কোনো ইন্টারনেট ছাড়াই অনুশীলন করতে পারবেন।
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-700/30 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>বইসমূহ দেখুন (Books Store)</span>
                </Link>
                <a
                  href="https://wa.me/916290051284?text=আমি%20গালফ%20আরবি%20অডিও%20কোর্স%20সম্পর্কে%20জানতে%20চাই"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/60 hover:bg-emerald-900/60 px-5 py-2.5 text-xs sm:text-sm font-bold text-emerald-300 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp-এ সরাসরি কথা বলুন</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookStoreClient from "@/components/books/BookStoreClient";
import { BookOpen, Sparkles, Truck, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Books Store | প্রবাসী ভাষা ও ক্যারিয়ার সহায়িকা বই - Rimslin.com",
  description:
    "সহজ কাজের আরবি, হিন্দি ও ইংরেজি স্পোকেন গাইডবুক। ঘরে বসে সরাসরি প্রিন্টেড কপি অর্ডার করুন অথবা ফোনে পড়তে ডাউনলোড করুন ডিজিটাল ই-বুক (PDF)।",
  alternates: {
    canonical: "https://rimslin.com/books",
  },
  openGraph: {
    title: "Books Store | প্রবাসী ভাষা ও ক্যারিয়ার সহায়িকা বই - Rimslin.com",
    description:
      "সহজ কাজের আরবি, হিন্দি ও ইংরেজি স্পোকেন গাইডবুক। ঘরে বসে সরাসরি প্রিন্টেড কপি অর্ডার করুন অথবা ফোনে পড়তে ডাউনলোড করুন ডিজিটাল ই-বুক (PDF)।",
    url: "https://rimslin.com/books",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-10 sm:py-16">
        {/* Ambient Hero Emerald Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[520px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-75"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8"
          >
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
            >
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              বইসমূহ (Books Store)
            </span>
          </nav>

          {/* ========================================================================= */}
          {/* A. HERO HEADER SECTION                                                   */}
          {/* ========================================================================= */}
          <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <span className="text-base leading-none">📱</span>
              <span>ইনস্ট্যান্ট ডিজিটাল ই-বুক ও স্টাডি গাইড</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              প্রবাসে ভালো বেতনের চাকরির বাস্তব প্রস্তুতি—
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                সেরা হ্যান্ডবুক কালেকশন
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              কাজের সাইট, কফিল ও ইন্টারভিউয়ের প্রয়োজনীয় আরবি, হিন্দি ও ইংলিশ গাইড। অর্ডার করলেই ফোনে ইনস্ট্যান্ট ডাউনলোড করে পড়ার সুবিধা।
            </p>

            {/* Fast Value Props Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 px-3 py-1 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
                <span>সারা দেশে হোম ডেলিভারি</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 px-3 py-1 shadow-sm">
                <Zap className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                <span>তাৎক্ষণিক PDF ই-বুক</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 px-3 py-1 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </span>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* B & C. INTERACTIVE STORE CATALOG, FILTERS & GRID                         */}
          {/* ========================================================================= */}
          <BookStoreClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}

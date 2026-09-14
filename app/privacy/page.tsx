'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Shield,
  Lock,
  Eye,
  Cookie,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  CreditCard,
} from 'lucide-react';

export default function PrivacyPage() {
  const effectiveDate = 'সেপ্টেম্বর ২০২৬';

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#060b08] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Clean Header with Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-4"
            >
              ← হোমপেজে ফিরে যান
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>আইনি সুরক্ষা ও ডেটা পলিসি</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              প্রাইভেসি পলিসি ও তথ্য সুরক্ষা (Privacy Policy)
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              রিমসলিনের ইউজার ডেটা সুরক্ষা, হোয়াটসঅ্যাপ নম্বর নিরাপত্তা, কুকিজ ও নিরাপদ ট্রানজাকশন সংক্রান্ত নীতিমালা।
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              সর্বশেষ কার্যকর তারিখ: <span className="font-semibold text-slate-600 dark:text-slate-300">{effectiveDate}</span>
            </p>
          </div>

          {/* Policy Document Card */}
          <article className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-12">
            
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>১. ভূমিকা ও সাধারণ পরিধি (Introduction)</span>
              </h2>
              <p>
                <strong>Rimslin</strong> (<Link href="/" className="text-emerald-600 underline">https://rimslin.com</Link>) প্রবাসী বাংলাদেশি এবং মধ্যপ্রাচ্যগামী কর্মীদের পেশাগত ভাষা ও দক্ষতা উন্নয়নে প্রতিশ্রুতিবদ্ধ একটি এডটেক প্ল্যাটফর্ম। আমাদের ব্যবহারকারীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করা আমাদের অন্যতম সর্বোচ্চ অগ্রাধিকার। এই গোপনীয়তা নীতিমালায় আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি তা বিস্তারিত বর্ণনা করা হয়েছে।
              </p>
            </section>

            {/* 2. WhatsApp Privacy */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>২. হোয়াটসঅ্যাপ নম্বর ও যোগাযোগের নিরাপত্তা (WhatsApp Privacy)</span>
              </h2>
              <p>
                লাইভ ব্যাচ বুকিং বা স্টাডি মেটেরিয়াল ডাউনলোডের সময় আপনার প্রদানকৃত ফোন নম্বর বা হোয়াটসঅ্যাপ নম্বর অত্যন্ত সতর্কতার সাথে সংরক্ষিত থাকে।
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>আপনার হোয়াটসঅ্যাপ নম্বর কখনোই কোনো তৃতীয় পক্ষ বা বিজ্ঞাপনী এজেন্সির কাছে বিক্রি বা শেয়ার করা হয় না।</li>
                <li>নম্বরটি শুধুমাত্র ক্লাসের লিংক, স্টাডি মেটেরিয়াল এবং শিক্ষার্থী সহায়তা প্রদানের জন্য ব্যবহার করা হয়।</li>
                <li>আপনি যেকোনো সময় ‘STOP’ লিখে আমাদের মেসেজ দিয়ে আপডেট গ্রহণ বন্ধ করতে পারেন।</li>
              </ul>
            </section>

            {/* 3. Secure Transactions */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৩. নিরাপদ পেমেন্ট ও এনক্রিপশন (Secure Payments)</span>
              </h2>
              <p>
                রিমসলিনে যেকোনো কোর্স ফি পরিশোধের ক্ষেত্রে ব্যাংক-গ্রেড SSL এনক্রিপশন এবং অনুমোদিত নিরাপদ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, ভিসা/মাস্টারকার্ড) ব্যবহৃত হয়। আমরা কখনোই আপনার কোনো কার্ড নম্বর, CVV বা ব্যাংক পিন কোড আমাদের সার্ভারে সংরক্ষণ করি না।
              </p>
            </section>

            {/* 4. Cookies & Analytics */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cookie className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৪. কুকিজ ও অ্যানালিটিক্স (Cookies & Analytics)</span>
              </h2>
              <p>
                ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে আমরা স্ট্যান্ডার্ড কুকিজ ব্যবহার করি (যেমন আপনার ডার্ক/লাইট মোড পছন্দ সংরক্ষণ করা)। এছাড়াও আমরা গোপনীয়তা বজায় রেখে সাইট ভিজিটরের সাধারণ পরিসংখ্যান বিশ্লেষণ করতে Vercel Web Analytics ব্যবহার করি, যা কোনো ব্যক্তিগত পরিচয় ট্র্যাক করে না।
              </p>
            </section>

            {/* 5. Google AdSense & Third Party Links */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৫. গুগল অ্যাডসেন্স ও এক্সটার্নাল লিংক (Third-Party Services)</span>
              </h2>
              <p>
                আমাদের ওয়েবসাইটে প্রাসঙ্গিক তথ্য প্রদানে ইউটিউব ভিডিও এম্বেড বা গুগল সেবা যুক্ত থাকতে পারে। গুগল তার পার্টনার সাইটে বিজ্ঞাপন প্রদর্শনে ডার্ট (DART) কুকি ব্যবহার করতে পারে। ব্যবহারকারী চাইলে গুগলের অ্যাড সেটিংস থেকে পার্সোনালাইজড বিজ্ঞাপন বন্ধ করতে পারেন।
              </p>
            </section>

            {/* 6. Contact Support */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৬. আপনার অধিকার ও যোগাযোগ (Your Rights & Contact)</span>
              </h2>
              <p>
                আপনার সংরক্ষিত তথ্য সংশোধন বা মুছে ফেলার অনুরোধের জন্য আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন:
              </p>
              <div className="bg-slate-50 dark:bg-surface-200/50 p-4 rounded-xl border border-slate-100 dark:border-white/5 space-y-1">
                <p><strong>ইমেইল:</strong> <a href="mailto:support@rimslin.com" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">support@rimslin.com</a></p>
                <p><strong>হোয়াটসঅ্যাপ সাপোর্ট:</strong> +91 62900 51284</p>
              </div>
            </section>

          </article>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              নিরাপদ ও নির্ভরযোগ্য প্ল্যাটফর্মে আরবি ভাষা শিখুন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              আমাদের ৩ দিনের ফ্রি লাইভ ডেমো ক্লাসে অংশ নিয়ে নিজেই অভিজ্ঞতা যাচাই করুন।
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

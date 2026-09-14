'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Scale,
  BookOpen,
  FileCheck,
  AlertTriangle,
  RotateCcw,
  Users,
  ShieldAlert,
} from 'lucide-react';

export default function TermsPage() {
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
              <Scale className="w-3.5 h-3.5" />
              <span>ব্যবহারের শর্তাবলী ও নীতিমালা</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ব্যবহারের শর্তাবলী ও নীতিমালা (Terms & Conditions)
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              রিমসলিন প্ল্যাটফর্ম ব্যবহার, কোর্স অ্যাক্সেস, ক্লাস শিষ্টাচার ও রিফান্ড নীতি সংক্রান্ত বিস্তারিত নির্দেশিকা।
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              সর্বশেষ কার্যকর তারিখ: <span className="font-semibold text-slate-600 dark:text-slate-300">{effectiveDate}</span>
            </p>
          </div>

          {/* Terms Article */}
          <article className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-12">
            
            {/* 1. Acceptance of Terms */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>১. শর্তাবলী গ্রহণ (Acceptance of Terms)</span>
              </h2>
              <p>
                রিমসলিন (<Link href="/" className="text-emerald-600 underline">Rimslin.com</Link>) ওয়েবসাইট ব্রাউজ করা, অ্যাকাউন্ট তৈরি করা বা কোনো কোর্স/লাইভ ব্যাচে অংশগ্রহণ করার মাধ্যমে আপনি এই ব্যবহারের শর্তাবলীর সাথে সম্পূর্ণভাবে সম্মত হচ্ছেন। আপনি এই শর্তাবলীর সাথে একমত না হলে ওয়েবসাইট ব্যবহার না করার অনুরোধ জানানো হচ্ছে।
              </p>
            </section>

            {/* 2. Educational Content & Intellectual Property */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>২. মেধা সম্পত্তি ও কপিরাইট আইন (Intellectual Property)</span>
              </h2>
              <p>
                রিমসলিনে প্রদর্শিত সকল অডিও পাঠ, ভিডিও লেকচার, PDF শিট, ই-বুক এবং টেক্সট সামগ্রী রিমসলিনের একক বৌদ্ধিক সম্পত্তি।
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>ব্যক্তিগত শিক্ষার উদ্দেশ্যে ডাউনলোডযোগ্য উপকরণ ব্যবহার করা যাবে।</li>
                <li>অনুমতি ছাড়া কোনো কোর্স ভিডিও বা অডিও পাইরেসি, রি-আপলোড, বাণিজ্যিক বিক্রয় বা কোনো পাবলিক প্ল্যাটফর্মে শেয়ার করা কঠোরভাবে নিষিদ্ধ ও কপিরাইট আইনে দণ্ডনীয়।</li>
              </ul>
            </section>

            {/* 3. Live Class Etiquette */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৩. লাইভ ক্লাস শিষ্টাচার ও আচরণবিধি (Classroom Etiquette)</span>
              </h2>
              <p>
                লাইভ ক্লাসে অংশগ্রহণকারী সকল শিক্ষার্থীকে শালীন ও সম্মানজনক পরিবেশ বজায় রাখতে হবে:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>শিক্ষক বা সহপাঠীদের প্রতি কোনো প্রকার অশোভন আচরণ, রাজনৈতিক বা ধর্মীয় বিতর্ক বরদাস্ত করা হবে না।</li>
                <li>ক্লাসের সময় ব্যাকগ্রাউন্ড নয়েজ এড়াতে মাইক্রোফোন মিউট রাখতে হবে এবং প্রশ্ন করার সময় অনুমতি নিতে হবে।</li>
                <li>শৃঙ্খলা ভঙ্গ করলে সংশ্লিষ্ট শিক্ষার্থীকে নোটিশ ছাড়াই ক্লাস থেকে বহিষ্কারের অধিকার রিমসলিন সংরক্ষণ করে।</li>
              </ul>
            </section>

            {/* 4. Cancellation & Refund Policy */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৪. বাতিল ও রিফান্ড নীতিমালা (Cancellation & Refund Policy)</span>
              </h2>
              <p>
                শিক্ষার্থীদের সন্তুষ্টি আমাদের মূল লক্ষ্য। আমাদের ৩ দিনের ডেমো ক্লাসে কোনো প্রকার ফি নেওয়া হয় না, যাতে আপনি কোর্স কেনার আগেই মান যাচাই করতে পারেন।
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>পেইড কোর্সে ভর্তির পর কোর্স ম্যাটেরিয়াল সম্পূর্ণ আনলক হওয়ার কারণে সাধারণত ফি অফেরতযোগ্য (Non-refundable)।</li>
                <li>তবে যদি কোনো প্রযুক্তিগত কারণে আপনি ক্লাস বা ড্যাশবোর্ড অ্যাক্সেস না পান এবং আমাদের সাপোর্ট টিম ৭২ ঘণ্টার মধ্যে সমাধান দিতে ব্যর্থ হয়, তবে পূর্ণ রিফান্ড কার্যকর করা হবে।</li>
              </ul>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>৫. দায়বদ্ধতার সীমাবদ্ধতা (Limitation of Liability)</span>
              </h2>
              <p>
                রিমসলিন শিক্ষার্থীদের ভাষা শিক্ষা ও কর্মদক্ষতা বৃদ্ধির জন্য সর্বোচ্চ মানসম্মত প্রশিক্ষণ প্রদান করে। তবে কোনো নির্দিষ্ট দেশে চাকরি নিশ্চিতকরণ বা ভিসার নিশ্চয়তা প্রদান করে না। নিয়োগ সংক্রান্ত যেকোনো চুক্তি ব্যবহারকারীর নিজস্ব কফিল বা কোম্পানির সাথে আইনি সম্পর্কের অধীন।
              </p>
            </section>

          </article>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              শর্তহীনভাবে ৩ দিনের ফ্রি ক্লাসে অংশ নিন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              কোনো প্রকার কার্ড ছাড়াই ৩ দিনের ফ্রি ডেমো ক্লাসে যোগ দিয়ে নিজেই পরখ করুন।
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

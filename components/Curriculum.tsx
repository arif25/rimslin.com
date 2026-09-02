"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight,
  Headphones,
  ShieldCheck,
  Award,
  Zap,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export default function Curriculum() {
  const [selectedDuration, setSelectedDuration] = useState<string>("6m");

  const plans = [
    {
      id: "3m",
      duration: "৩ মাস মেয়াদী",
      durationEn: "3 Months Starter",
      title: "এয়ারপোর্ট ও ডেইলি সারভাইভাল কোর্স",
      subtitle: "নতুন কর্মীদের জন্য দেশ ছাড়ার পূর্বে প্রাথমিক প্রস্তুতি",
      badge: "নতুনদের জন্য",
      price: "৳ ১,৯৫০",
      regularPrice: "৳ ৩,৫০০",
      popular: false,
      gradient: "from-slate-800 to-surface-200",
      accentBorder: "border-white/10",
      iconColor: "text-gulf-400",
      features: [
        "বিমানবন্দর, ইমিগ্রেশন ও ভিসা চেকিং ডায়ালগ",
        "ট্যাক্সি, রুট নেভিগেশন ও হোটেল চেক-ইন",
        "দোকান, বাক্কালা (মুদি দোকান) ও বাজারে দরদাম",
        "সালাম, কুশল বিনিময় ও প্রয়োজনীয় ১০০+ বাক্য",
        "বেসিক স্পোকেন ইংলিশ ও হিন্দি পরিচয়",
        "৩৫০+ বাস্তব অডিও ক্লিপ (অফলাইন ডাউনলোড)",
        "মোবাইল অ্যাপ ও ওয়েব থেকে আজীবন অডিও এক্সেস",
      ],
      ctaText: "৩ মাসের কোর্সে ভর্তি হন",
    },
    {
      id: "6m",
      duration: "৬ মাস মেয়াদী",
      durationEn: "6 Months Workplace Pro",
      title: "ওয়ার্কপ্লেস কমিউনিকেশন ও স্যালারি টক",
      subtitle: "কাজের সাইট, সুপারভাইজার ও বসের সাথে সরাসরি বোঝাপড়া",
      badge: "সবচেয়ে জনপ্রিয়",
      price: "৳ ৩,৪৫০",
      regularPrice: "৳ ৬,০০০",
      popular: true,
      gradient: "from-gulf-950 via-surface-200 to-emerald-950",
      accentBorder: "border-gulf-400/80 shadow-2xl shadow-gulf-500/20",
      iconColor: "text-gold-400",
      features: [
        "৩ মাসের সব সারভাইভাল মডিউল অন্তর্ভুক্ত",
        "কাজের সাইট, ইঞ্জিনিয়ার ও ফোরম্যানের নির্দেশ বোঝা",
        "মুদিরের সাথে বেতন বৃদ্ধি, ছুটি ও ওভারটাইম ডায়ালগ",
        "টুলস, মেজারমেন্ট ও কারিগরি টেকনিক্যাল পরিভাষা",
        "অসুস্থতা, হাসপাতাল ও জরুরি পুলিশ নিরাপত্তা ভাষা",
        "৮৫০+ হাই-কোয়ালিটি অডিও লেসন ও প্র্যাকটিস শিট",
        "সাপ্তাহিক লাইভ প্রশ্নোত্তর সেশন ও উচ্চারণ চেক",
        "কোর্স সমাপ্তি ডিজিটাল সার্টিফিকেট",
      ],
      ctaText: "৬ মাসের প্রো কোর্সে ভর্তি হন",
    },
    {
      id: "12m",
      duration: "১২ মাস মেয়াদী",
      durationEn: "12 Months Master Career Pack",
      title: "কমপ্লিট আরবি + ইংলিশ + হিন্দি মাস্টার কোর্স",
      subtitle: "সুপারভাইজার, ক্যাশিয়ার ও ম্যানেজার পদে প্রমোশনের জন্য",
      badge: "সর্বোচ্চ ক্যারিয়ার গ্রোথ",
      price: "৳ ৫,৯৫০",
      regularPrice: "৳ ১০,৫০০",
      popular: false,
      gradient: "from-amber-950/40 via-surface-200 to-surface-100",
      accentBorder: "border-gold-500/40 hover:border-gold-400",
      iconColor: "text-gold-400",
      features: [
        "৬ মাসের সম্পূর্ণ ওয়ার্কপ্লেস কারিকুলাম অন্তর্ভুক্ত",
        "সৌদি ও আমিরাতি (দুবাই) স্থানীয় আঞ্চলিক উপভাষা",
        "প্রফেশনাল স্পোকেন ইংলিশ (কাস্টমার সার্ভিস ও অফিস)",
        "ওয়ার্কপ্লেস হিন্দি ও উর্দু ফ্লুয়েন্সি মাস্টারক্লাস",
        "রিমসলিন এআই ভয়েস কোচ আনলিমিটেড লাইফটাইম এক্সেস",
        "গালফ জবের প্রফেশনাল বায়োডাটা/সিভি তৈরি সহায়তা",
        "ভিডিও ইন্টারভিউ মক টেস্ট ও প্র্যাকটিস",
        "১-টু-১ পার্সোনাল মেন্টর ও ভেরিফায়েড সার্টিফিকেট",
      ],
      ctaText: "১২ মাসের মাস্টার কোর্সে ভর্তি হন",
    },
  ];

  return (
    <section id="curriculum" className="relative py-24 sm:py-32 bg-[#050e08] border-t border-gulf-500/20">
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/50 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md mb-4">
            <BookOpen className="h-3.5 w-3.5 text-gold-400" />
            <span>কোর্স কারিকুলাম ও মেয়াদভিত্তিক প্ল্যান (Course Plans)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            আপনার লক্ষ্য অনুযায়ী বেছে নিন{" "}
            <span className="gradient-gulf-text">সঠিক মেয়াদ ও কারিকুলাম</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            দেশ ছাড়ার আগেই প্র্যাকটিস করে কথা বলার ভয় দূর করুন। প্রতিটি কোর্সে রয়েছে সহজ বাংলা উচ্চারণ ও বাস্তব অডিও।
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border bg-gradient-to-b ${plan.gradient} p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 ${plan.accentBorder} ${
                  plan.popular ? "scale-[1.02] ring-2 ring-gulf-400/40" : "hover:-translate-y-1"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gulf-500 to-gold-500 px-4 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-gulf-500/40">
                    ★ {plan.badge}
                  </div>
                )}

                <div>
                  {/* Duration & Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 text-gold-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-bold">{plan.duration}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {plan.durationEn}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-black text-white leading-snug">
                    {plan.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-6 rounded-2xl bg-[#09150e]/80 p-4 border border-white/[0.06] flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        অফার কোর্স ফি
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {plan.price}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 line-through">
                        {plan.regularPrice}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-400">
                        সীমিত সময়ের ছাড়
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      কোর্সে যা যা পাচ্ছেন:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                        >
                          <CheckCircle2 className="h-4 w-4 text-gulf-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <Link
                    href={`https://wa.me/8801700000000?text=আমি%20রিমসলিন%20এর%20${encodeURIComponent(
                      plan.title
                    )}%20কোর্সে%20ভর্তি%20হতে%20চাই`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-gulf-500 via-emerald-500 to-gold-400 text-slate-950 shadow-xl shadow-gulf-500/30 hover:scale-[1.02]"
                        : "border border-gulf-500/40 bg-surface-100/90 text-white hover:bg-gulf-600 hover:border-gulf-400"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      বিকাশ / নগদ পেমেন্ট
                    </span>
                    <span>•</span>
                    <span>সরাসরি এক্সেস</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curriculum Guarantee Note */}
        <div className="mt-12 rounded-2xl border border-gulf-500/20 bg-surface-100/60 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                কোন কোর্সটি আপনার জন্য উপযুক্ত তা বুঝতে পারছেন না?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                আমাদের অভিজ্ঞ ভাষা পরামর্শকের সাথে ফ্রি কথা বলে নিজের পেশা অনুযায়ী সেরা প্ল্যানটি বেছে নিন।
              </p>
            </div>
          </div>

          <Link
            href="https://wa.me/8801700000000?text=আমি%20কোন%20কোর্সটি%20নেব%20পরামর্শ%20চাই"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/60 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 transition-colors shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            <span>ফ্রি পরামর্শ নিন</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

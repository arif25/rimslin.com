import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Globe,
  BookOpen,
  Users,
  Target,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Tv,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | আমাদের সম্পর্কে - Rimslin",
  description:
    "Learn about Rimslin: An online educational hub dedicated to helping learners master everyday spoken Arabic, workplace English, and practical vocabulary for the Gulf region.",
  alternates: {
    canonical: "https://rimslin.com/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Quality Learning / মানসম্মত শিক্ষা",
      desc: "জটিল ব্যাকরণ মুখস্থ করার বদলে আমরা বাস্তব কর্মক্ষেত্র ও দৈনন্দিন জীবনের সর্বাধিক ব্যবহৃত শব্দ এবং কথোপকথন শেখাই।",
      badge: "ব্যবহারিক পদ্ধতি",
    },
    {
      icon: HeartHandshake,
      title: "Accessibility / সবার জন্য উন্মুক্ত",
      desc: "যেকোনো স্মার্টফোন বা স্বল্পগতির ইন্টারনেটেও যেন প্রবাসী ভাইবোনেরা বিনামূল্যে সরাসরি ভিডিও ক্লাস ও অডিও প্র্যাকটিস করতে পারেন।",
      badge: "১০০% সুলভ",
    },
    {
      icon: Users,
      title: "Community & Empowerment / কর্মী ক্ষমতায়ন",
      desc: "মধ্যপ্রাচ্যে কর্মরত ও গমনেচ্ছু কর্মীদের ভাষাগত দক্ষতা বৃদ্ধি করে আত্মবিশ্বাস, কাজের নিরাপত্তা ও ভালো বেতনের সুযোগ তৈরি করা।",
      badge: "প্রবাসী সহায়তা",
    },
    {
      icon: ShieldCheck,
      title: "Authentic Pronunciation / নির্ভুল উচ্চারণ",
      desc: "গালফ অঞ্চলের (সৌদি, দুবাই, কাতার, কুয়েত) স্থানীয় কথ্য উপভাষা (আম্মিয়া/খালিজি) ও ধ্বনিতত্ত্বের নিখুঁত নির্দেশনা।",
      badge: "স্থানীয় উপভাষা",
    },
  ];

  const milestones = [
    { number: "২৪+", label: "সম্পূর্ণ ভিডিও ক্লাস", sub: "বাস্তব কথোপকথন ও শব্দভাণ্ডার" },
    { number: "১,৫০০+", label: "প্র্যাকটিস ফ্রেজ", sub: "বাংলা উচ্চারণ ও অনুবাদসহ" },
    { number: "৫+", label: "পেশাভিত্তিক ট্র্যাক", sub: "কনস্ট্রাকশন, ড্রাইভিং, হসপিটালিটি" },
    { number: "১০০%", label: "ফ্রি ওপেন লার্নিং", sub: "কোনো হিডেন ফি বা বাধ্যবাধকতা নেই" },
  ];

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-12 sm:py-20">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[500px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-70"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors">
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">আমাদের সম্পর্কে (About Us)</span>
          </nav>

          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>এডুকেশনাল হাব ও মিশন</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              About <span className="text-emerald-600 dark:text-gulf-400">Rimslin</span>
              <span className="block text-2xl sm:text-4xl mt-2 font-black bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                প্রবাসী ভাষা শিক্ষার সহজ ডিজিটাল মাধ্যম
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Rimslin.com একটি আধুনিক শিক্ষামূলক প্ল্যাটফর্ম, যা বিশেষভাবে মধ্যপ্রাচ্যগামী ও কর্মরত প্রবাসী ভাই-বোনদের জন্য সরাসরি কাজের স্পোকেন আরবি ও কর্মক্ষেত্রের ইংরেজি ভাষা শেখার সুযোগ তৈরি করেছে।
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-surface-100/90 backdrop-blur-md p-6 sm:p-10 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-gulf-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                আমাদের উদ্দেশ্য ও মিশন (Our Mission)
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                প্রতি বছর বাংলাদেশ থেকে লাখ লাখ কর্মী সৌদি আরব, সংযুক্ত আরব আমিরাত (দুবাই), কাতার, কুয়েত ও ওমানসহ বিভিন্ন গালফ রাষ্ট্রে পাড়ি জমান। কিন্তু ভাষার দুর্বলতার কারণে বিমানবন্দরে পৌঁছানো থেকে শুরু করে কর্মক্ষেত্রে নির্দেশ বোঝা, ডাক্তারের কাছে অসুস্থতা প্রকাশ করা কিংবা সঠিক বেতন ও অধিকার পাওয়ার ক্ষেত্রে নানা ভোগান্তির মুখোমুখি হন।
              </p>
              <p>
                <strong>Rimslin-এর লক্ষ্য হলো এই ভাষাগত ব্যবধান দূর করা।</strong> আমরা কোনো জটিল ব্যাকরণ বা অপ্রয়োজনীয় বইয়ের ভাষা শেখাই না; বরং সরাসরি কর্মক্ষেত্রে ও দৈনন্দিন জীবনে যে ভাষা প্রয়োজন—বিমানবন্দর ক্লিয়ারেন্স, সাইট সেফটি, ড্রাইভিং ডিরেকশন, রেস্তোরাঁ সার্ভিস, বাজার-সদাই ও জরুরি সাহায্য চাওয়ার বাক্যগুলো অডিও-ভিডিওর মাধ্যমে সহজে শিখিয়ে দিই।
              </p>
            </div>

            {/* Stat Counters */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-100 dark:border-white/5 pt-8">
              {milestones.map((m, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-gulf-400">{m.number}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white mt-1">{m.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Values Grid */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                আমাদের মূল দর্শন ও অঙ্গীকার (Core Values)
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                যেকোনো শিক্ষার্থীকেন্দ্রিক নির্ভরযোগ্য প্ল্যাটফর্মের মূল ভিত্তি
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 hover:border-emerald-500/40 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-gulf-500/15 text-emerald-600 dark:text-gulf-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface-300 text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Educational Approach & Content Integrity */}
          <section className="mb-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-surface-100/90 p-6 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              পাঠ্যক্রম ও শিক্ষার মান নিয়ন্ত্রণ (Editorial & Content Integrity)
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Rimslin-এ উপস্থাপিত প্রতিটি অডিও ফ্রেজ, উচ্চারণ নির্দেশিকা এবং ইউটিউব ভিডিও ক্লাস গালফ প্রবাসী অভিজ্ঞ প্রশিক্ষক ও স্থানীয় ভাষা বিশেষজ্ঞদের পর্যালোচনায় সংকলিত। আমরা আন্তর্জাতিক মান রক্ষা করে শিক্ষার্থীকেন্দ্রিক ওপেন এডুকেশন রিসোর্স তৈরি করতে বদ্ধপরিকর।
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "প্রমিত ব্যাকরণের বদলে ব্যবহারিক কথ্য আরবির প্রাধান্য",
                  "বাংলা বর্ণে নিখুঁত উচ্চারণ ও ইংরেজি আন্তর্জাতিক অর্থ",
                  "ইউটিউব অফিসিয়াল এমবেড প্লেয়ারের মাধ্যমে নিরাপদ স্ট্রিমিং",
                  "নিয়মিত নতুন ভিডিও লেকচার ও প্র্যাকটিস সেশন সংযোজন",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Quick CTA */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-amber-500/10 p-8 sm:p-12 text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              আজই শুরু করুন আপনার ভাষা শিক্ষার যাত্রা
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-6">
              আমাদের ফ্রি ভিডিও গ্যালারি ও অডিও প্র্যাকটিস সেশনে যুক্ত হয়ে গালফ আরবিতে আত্মবিশ্বাসী হয়ে উঠুন।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#video-gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Tv className="w-4 h-4" />
                <span>ভিডিও ক্লাস দেখুন</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-surface-200 hover:bg-slate-50 dark:hover:bg-surface-300 text-slate-800 dark:text-white font-bold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>যোগাযোগ করুন</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

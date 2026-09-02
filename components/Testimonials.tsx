"use client";

import {
  Star,
  Quote,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
} from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  avatar: string;
  salaryGain: string;
  quote: string;
  trackTag: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "তরিকুল ইসলাম",
      role: "ইলেকট্রিক্যাল টেকনিশিয়ান",
      company: "আল-রাশিদ কনস্ট্রাকশন",
      country: "রিয়াদ, সৌদি আরব",
      flag: "🇸🇦",
      avatar: "👨‍🔧",
      salaryGain: "+১,২০০ রিয়াল বেতন বৃদ্ধি",
      trackTag: "কনস্ট্রাকশন ট্র্যাক",
      quote:
        "দেশ থেকে যাওয়ার আগে আরবি নিয়ে প্রচণ্ড ভয় ছিল। রিমসলিনের সাইট টেকনিক্যাল অডিও শুনে সরাসরি ফোরম্যান ও ইঞ্জিনিয়ারের নির্দেশ বোঝা শিখেছি। ৩ মাসের মাথায় সাইট ইন-চার্জের সাথে কথা বলে বেতন বাড়াতে পেরেছি।",
    },
    {
      name: "শাহাদাত হোসেন",
      role: "তালাবাত ফুড ডেলিভারি রাইডার",
      company: "তালাবাত ইউএই",
      country: "দুবাই, সংযুক্ত আরব আমিরাত",
      flag: "🇦🇪",
      avatar: "🛵",
      salaryGain: "৫-স্টার কাস্টমার রেটিং",
      trackTag: "ড্রাইভার ও রাইডার ট্র্যাক",
      quote:
        "দুবাই এসে বিল্ডিং ও ফ্ল্যাট খোঁজা নিয়ে বিপদে পড়তাম। রিমসলিনের ড্রাইভিং ও কাস্টমার ডায়ালগ মুখস্থ থাকায় এখন ফোনে আরবি-ইংলিশ মিলিয়ে খুব সহজে কাস্টমারের সাথে কথা বলতে পারি। টিপসও ভালো পাচ্ছি।",
    },
    {
      name: "ফারুক আহমেদ",
      role: "রেস্টুরেন্ট ফ্লোর সুপারভাইজার",
      company: "দোহা ডাইনিং গ্রুপ",
      country: "দোহা, কাতার",
      flag: "🇶🇦",
      avatar: "👨‍🍳",
      salaryGain: "অ্যাসিস্ট্যান্ট পদে পদোন্নতি",
      trackTag: "হোটেল ও রেস্টুরেন্ট",
      quote:
        "রিমসলিনের হসপিটালিটি ট্র্যাকের স্পোকেন ইংলিশ ও আরবি কোর্সে চমৎকারভাবে খাবারের মেনু ও সালামের আদব শেখানো হয়েছে। ইন্টারভিউতে আরবিতে উত্তর দিতে পেরে আমার চাকরিটা কনফার্ম হয়েছিল।",
    },
    {
      name: "কবির মিঞা",
      role: "হেভি ট্রেলার ড্রাইভার",
      company: "কুয়েত লজিস্টিকস",
      country: "কুয়েত সিটি, কুয়েত",
      flag: "🇰🇼",
      avatar: "🚚",
      salaryGain: "+৫০ কুয়েতি দিনার বৃদ্ধি",
      trackTag: "হেভি ভেহিক্যাল ট্র্যাক",
      quote:
        "বাংলা উচ্চারণে আরবি লেখা থাকায় লেখাপড়া কম জানা সত্ত্বেও আমি সহজে শিখতে পেরেছি। মোবাইল দিয়েই সারাদিন অডিও শুনতাম। এখন ট্রাফিক পুলিশ বা বসের সাথে কথা বলতে কোনো দ্বিধা লাগে না।",
    },
    {
      name: "বেলাল হোসেন",
      role: "সুপারমার্কেট অ্যাসিস্ট্যান্ট",
      company: "লুলু হাইপারমার্কেট",
      country: "মাস্কাট, ওমান",
      flag: "🇴🇲",
      avatar: "🏬",
      salaryGain: "ক্যাশ কাউন্টার দায়িত্ব",
      trackTag: "জেনারেল হেল্পার ট্র্যাক",
      quote:
        "দোকানে পণ্য সাজানো ও ওমানি কাস্টমারদের দাম হিসাব বুঝিয়ে দেওয়ার আরবি রিমসলিনের অডিওতেই সবচেয়ে প্র্যাকটিক্যাল পেয়েছি। কোনো কঠিন ব্যাকরণ ছাড়া শুধু কাজের কথা শেখার জন্য এর বিকল্প নেই।",
    },
    {
      name: "মাসুদ রানা",
      role: "প্লাম্বিং সুপারভাইজার",
      company: "বাহরাইন মেইনটেন্যান্স সার্ভিস",
      country: "মানামা, বাহরাইন",
      flag: "🇧🇭",
      avatar: "🔧",
      salaryGain: "+৮০ দিনার ইনক্রিমেন্ট",
      trackTag: "টেকনিক্যাল ট্র্যাক",
      quote:
        "আরবিতে পাইপ, ফিটিংস ও প্রেসারের নামগুলো বাংলা উচ্চারণে অডিও শুনে রপ্ত করেছি। যেকোনো প্রবাসী ভাইয়ের মধ্যপ্রাচ্যে যাওয়ার আগে এই কোর্সটা অবশ্যই করা উচিত।",
    },
  ];

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-[#050c07] border-t border-gulf-500/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/60 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md mb-4">
            <Quote className="h-3.5 w-3.5 text-gold-400" />
            <span>প্রবাসী ভাইদের সাফল্যের গল্প (Success Stories)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            রিমসলিন শিখে মধ্যপ্রাচ্যে যারা{" "}
            <span className="gradient-gulf-text">সফল হয়েছেন</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            সৌদি আরব, দুবাই, কাতার ও কুয়েতে কর্মরত হাজারো বাংলাদেশী ভাইয়ের আস্থা ও বাস্তব অভিজ্ঞতার প্রতিফলন।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-100/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-gulf-500/40 hover:bg-surface-200/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-gulf-500/10"
            >
              <div>
                {/* Top Strip: Star Rating & Track */}
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-md bg-gulf-500/10 px-2 py-0.5 text-[10px] font-bold text-gulf-300 border border-gulf-500/20">
                    {item.trackTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Salary Gain Highlight */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{item.salaryGain}</span>
                </div>
              </div>

              {/* Worker Profile Bottom */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-200 text-2xl border border-white/10 shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-sm">{item.flag}</span>
                  </div>
                  <p className="text-[11px] text-gulf-400 font-medium">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-gold-400" />
                    <span>{item.country}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

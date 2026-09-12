"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Car,
  Headphones,
  Languages,
  HeartPulse,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function JobTracks() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tracks = [
    {
      id: "driving",
      badge: language === "en" ? "Hot Career" : "হট জব ট্র্যাক",
      badgeIcon: Car,
      title:
        language === "en"
          ? "Drivers & Delivery Riders Track"
          : "ড্রাইভার ও ডেলিভারি রাইডার ট্র্যাক",
      description:
        language === "en"
          ? "GPS navigation terminology, customer calling protocols, apartment deliveries, and vehicle maintenance dialogues."
          : "জিপিএস ও ট্রাফিক নেভিগেশন, কাস্টমারের সাথে ঠিকানা নিশ্চিত করা, ফুড ও পার্সেল ডেলিভারি এবং গাড়ি মেরামতের জরুরি কথোপকথন।",
      features:
        language === "en"
          ? [
              "Roads, landmarks & navigation cues",
              "Customer calling & 5-star rating techniques",
              "Traffic police & fine avoidance dialogues",
            ]
          : [
              "রাস্তা ও ল্যান্ডমার্ক চেনার সুনির্দিষ্ট শব্দমালা",
              "কাস্টমার কল ও ৫-স্টার রেটিং পাওয়ার টেকনিক",
              "ট্রাফিক পুলিশ ও জরিমানা বিষয়ক জরুরি কথা",
            ],
    },
    {
      id: "customer-service",
      badge: language === "en" ? "High Demand" : "কাস্টমার সার্ভিস",
      badgeIcon: Headphones,
      title:
        language === "en"
          ? "Hospitality & Customer Service Track"
          : "হোটেল, রেস্টুরেন্ট ও কাস্টমার সার্ভিস ট্র্যাক",
      description:
        language === "en"
          ? "Customer greetings, menu explanations, order taking, bill processing, and fluent complaint resolution dialogues."
          : "কাস্টমারকে সালাম ও স্বাগতম জানানো, মেনু বর্ণনা, খাবার অর্ডার নেওয়া, বিল জমা দেওয়া এবং রেস্টুরেন্ট ম্যানেজারের সাথে সাবলীল কথা।",
      features:
        language === "en"
          ? [
              "Food & beverage Arabic-English glossary",
              "Customer dispute & complaint resolution",
              "Cash & POS card terminal transactions",
            ]
          : [
              "খাবার ও পানীয়ের আরবি-ইংরেজি প্রফেশনাল তালিকা",
              "কাস্টমার কমপ্লেইন ও সমস্যা সমাধানের ভাষা",
              "ক্যাশ ও কার্ড পেমেন্ট এবং বিলিং ডায়ালগ",
            ],
    },
    {
      id: "regional-dialects",
      badge: language === "en" ? "Workplace Spoken" : "আঞ্চলিক উপভাষা",
      badgeIcon: Languages,
      title:
        language === "en"
          ? "Gulf Regional Dialects Track"
          : "গালফ আঞ্চলিক উপভাষা ও কথপোকথন ট্র্যাক",
      description:
        language === "en"
          ? "Master Saudi Najdi/Hijazi and Emirati native dialects, colloquial idioms, and natural conversations with Gulf sponsors."
          : "সৌদি নজদি ও হিজাজি এবং আমিরাতি (দুবাই) স্থানীয় উপভাষা, কফিল ও বসের সাথে দ্রুত ভাববিনিময় এবং কাজের সাইট কথপোকথন।",
      features:
        language === "en"
          ? [
              "Saudi & Emirati native regional idioms",
              "Workplace negotiations with bosses & Arbab",
              "Common Gulf colloquial terms & slangs",
            ]
          : [
              "সৌদি ও আমিরাতি স্থানীয় লোকাল শব্দ ও স্ল্যাং",
              "কফিল ও ম্যানেজারের সাথে বেতন ও ছুটির কথা",
              "দৈনন্দিন বাজার ও কর্মক্ষেত্রের স্বাভাবিক ভাষা",
            ],
    },
    {
      id: "medical",
      badge: language === "en" ? "Essential Care" : "জরুরি চিকিৎসা",
      badgeIcon: HeartPulse,
      title:
        language === "en"
          ? "Medical & Emergency Care Track"
          : "জরুরি চিকিৎসা ও স্বাস্থ্যসেবা আরবি ট্র্যাক",
      description:
        language === "en"
          ? "Communicate physical symptoms to doctors, purchase pharmacy medicines, and handle 999 emergency calls."
          : "ডাক্তার ও নার্সের সাথে শারীরিক সমস্যা বলা, ফার্মেসি থেকে সঠিক ওষুধ কেনা এবং জরুরি অ্যাম্বুলেন্স বা পুলিশ ডাকার কথপোকথন।",
      features:
        language === "en"
          ? [
              "Body parts, pains & acute medical symptoms",
              "Pharmacy prescription & medication dialogues",
              "Emergency ambulance (997/998) phone calls",
            ]
          : [
              "শরীরের অঙ্গ ও ব্যথার সুনির্দিষ্ট বিবরণ দেওয়ার শব্দ",
              "প্রেসক্রিপশন ও ফার্মেসি ওষুধ কেনার ডায়ালগ",
              "জরুরি অ্যাম্বুলেন্স ও পুলিশ হেল্পলাইনে কল করা",
            ],
    },
  ];

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const handlePrev = () => {
    if (scrollRef.current) {
      const step =
        scrollRef.current.clientWidth >= 640
          ? scrollRef.current.clientWidth / 2
          : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const step =
        scrollRef.current.clientWidth >= 640
          ? scrollRef.current.clientWidth / 2
          : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <section id="job-tracks" className="max-w-6xl mx-auto px-4 py-12">
      {/* 1. Section Heading: Centered title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {language === "en"
            ? "Specialized Language Tracks for Your Profession"
            : "আপনার পেশার জন্য তৈরি নির্দিষ্ট ভাষা ট্র্যাক"}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {language === "en"
            ? "Skip generic textbooks. Learn the exact technical terminology and real-world dialogues needed for your daily trade."
            : "যেকোনো সাধারণ বই পড়ে সময় নষ্ট না করে, সরাসরি নিজের কাজের ফিল্ডের আরবি ও ইংরেজি শব্দ এবং বাস্তব ডায়ালগ শিখুন।"}
        </p>
      </div>

      {/* Top Carousel Navigation Controls */}
      <div className="flex items-center justify-end mb-4 px-1">
        {/* Prev / Next controls on top right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous track"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next track"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. 2-Item Carousel / Slider */}
      <div className="relative group/carousel">
        {/* Floating Side Arrow Left (Desktop) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canScrollLeft}
          aria-label="Previous tracks"
          className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 disabled:opacity-0 disabled:pointer-events-none transition-all dark:bg-surface-100 dark:border-white/15 dark:text-white cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Side Arrow Right (Desktop) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canScrollRight}
          aria-label="Next tracks"
          className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 disabled:opacity-0 disabled:pointer-events-none transition-all dark:bg-surface-100 dark:border-white/15 dark:text-white cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Sliding Viewport: 2 cards on desktop/tablet, 1 card on mobile */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc(50%-12px)] gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth p-1"
        >
          {tracks.map((track) => {
            const BadgeIcon = track.badgeIcon;

            return (
              <div
                key={track.id}
                className="bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-500/60 hover:shadow-md transition-all snap-start"
              >
                <div>
                  {/* Top Badge: Category pill tag */}
                  <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200/60 w-fit mb-3 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40 inline-flex items-center gap-1.5">
                    <BadgeIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{track.badge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {track.title}
                  </h3>

                  {/* Description: Short 1-2 line summary */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Bullets/Dialogs: Clean checklist rows */}
                  <div className="space-y-2 py-3 border-t border-slate-100 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300">
                    {track.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div>
                  <Link
                    href="/courses"
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mt-4 inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>কোর্স মডিউল দেখুন →</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom "সব কোর্স দেখুন" Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
        >
          <span>সব কোর্স দেখুন →</span>
        </Link>
      </div>
    </section>
  );
}

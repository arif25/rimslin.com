"use client";

import React from "react";
import { Building2 } from "lucide-react";

export interface DestinationCountry {
  code: string;
  name: string;
  english: string;
}

export const COUNTRIES: DestinationCountry[] = [
  { code: "SA", name: "সৌদি আরব", english: "Saudi Arabia" },
  { code: "AE", name: "সংযুক্ত আরব আমিরাত (দুবাই)", english: "UAE / Dubai" },
  { code: "QA", name: "কাতার", english: "Qatar" },
  { code: "KW", name: "কুয়েত", english: "Kuwait" },
  { code: "OM", name: "ওমান", english: "Oman" },
  { code: "BH", name: "বাহরাইন", english: "Bahrain" },
  { code: "RU", name: "রাশিয়া", english: "Russia" },
  { code: "MY", name: "মালয়েশিয়া", english: "Malaysia" },
  { code: "IT", name: "ইতালি", english: "Italy" },
  { code: "SG", name: "সিঙ্গাপুর", english: "Singapore" },
  { code: "PL", name: "পোল্যান্ড", english: "Poland" },
  { code: "RO", name: "রোমানিয়া", english: "Romania" },
  { code: "JP", name: "জাপান", english: "Japan" },
  { code: "KR", name: "দক্ষিণ কোরিয়া", english: "South Korea" },
  { code: "HR", name: "ক্রোয়েশিয়া", english: "Croatia" },
  { code: "DE", name: "জার্মানি", english: "Germany" },
];

interface GlobalDestinationsMarqueeProps {
  countries?: DestinationCountry[];
  title?: string;
  className?: string;
}

export default function GlobalDestinationsMarquee({
  countries = COUNTRIES,
  title = "যেসব দেশের জন্য বিশেষভাবে তৈরি",
  className = "",
}: GlobalDestinationsMarqueeProps) {
  // Duplicate list to achieve a continuous, seamless loop without any blank jump
  const duplicatedCountries = [...countries, ...countries];

  return (
    <div
      className={`bg-white dark:bg-surface-100 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm p-6 md:p-8 mt-6 sm:mt-8 md:mt-10 w-full max-w-5xl ${className}`}
    >
      {/* Top Header: Exact icon and text centered */}
      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-6 flex items-center justify-center gap-2">
        <Building2 className="h-4 w-4 text-amber-500" />
        <span>{title}</span>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="w-full overflow-hidden relative">
        <div className="flex gap-4 pr-4 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {duplicatedCountries.map((country, idx) => (
            <div
              key={`${country.code}-${idx}`}
              className="bg-slate-50/70 dark:bg-surface-200/50 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl w-[140px] sm:w-[160px] h-[130px] flex flex-col items-center justify-center text-center p-3 shrink-0"
            >
              <span className="text-slate-800 dark:text-slate-200 font-bold text-lg">
                {country.code}
              </span>
              <span className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm mt-1">
                {country.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-1">
                {country.english}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

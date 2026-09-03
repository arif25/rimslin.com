"use client";

import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 overflow-hidden w-full max-w-full pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/2 h-[550px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[120px]"
        />
        <div
          className="absolute top-1/2 right-0 h-[400px] w-full max-w-[400px] rounded-full bg-gold-glow blur-[100px]"
        />
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col items-center text-center w-full max-w-full min-w-0">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 text-emerald-800 shadow-sm dark:border-gulf-500/30 dark:bg-gulf-950/60 dark:text-gulf-300 backdrop-blur-md dark:shadow-lg dark:shadow-gulf-950/50 mb-6 px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400 animate-pulse" />
            <span>{t.hero.badge}</span>
            <span className="rounded-full bg-amber-500/15 text-amber-700 dark:bg-gold-500/20 dark:text-gold-300 px-2 py-0.5 text-[10px] font-bold border border-amber-500/30 dark:border-gold-500/30">
              {t.hero.yearBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-slate-900 dark:text-white">
            {t.hero.headlinePart1}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-gulf-400 dark:via-emerald-300 dark:to-gold-400 bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <div className="mt-3 text-sm sm:text-base font-semibold text-emerald-700 dark:text-gulf-400 tracking-wide uppercase">
            {t.hero.subHeadline}
          </div>

          {/* Tagline focused on survival talk over grammar */}
          <p className="mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-xl font-normal leading-relaxed">
            {t.hero.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#course-plans"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-gulf-600 dark:via-emerald-600 dark:to-gold-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-emerald-900/20 dark:shadow-gulf-900/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>{t.hero.viewCourse}</span>
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Link>

            <Link
              href="#phrase-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:border-gulf-500/30 dark:bg-surface-100/80 dark:text-gulf-200 dark:hover:bg-surface-200 dark:hover:text-white px-8 py-3.5 text-base font-semibold backdrop-blur-md transition-all duration-200 shadow-sm"
            >
              <Headphones className="h-5 w-5 text-amber-500 dark:text-gold-400" />
              <span>{t.hero.freeAudio}</span>
            </Link>
          </div>

          {/* Key Value Props */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop3}</span>
            </div>
          </div>

          {/* Gulf Country Trust Flags Strip */}
          <div className="mt-14 w-full max-w-5xl rounded-2xl border border-slate-200/80 bg-white/70 shadow-lg shadow-black/5 dark:border-white/[0.08] dark:bg-surface-100/50 p-6 backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4 flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4 text-amber-500 dark:text-gold-400" />
              <span>{t.hero.destinationsTitle}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {t.hero.destinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-white hover:border-emerald-500/40 dark:border-white/[0.05] dark:bg-surface-200/50 dark:hover:bg-surface-200 dark:hover:border-gulf-500/40 py-3 px-2 text-center transition-all shadow-sm dark:shadow-none"
                >
                  <span className="text-2xl mb-1">{dest.flag}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                    {dest.country}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-300 font-mono mt-0.5">
                    {dest.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

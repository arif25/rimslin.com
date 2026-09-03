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
    <section className="relative overflow-hidden w-full max-w-full pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[400px] w-full max-w-[400px] rounded-full bg-gold-glow blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col items-center text-center w-full max-w-full min-w-0">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gulf-500/30 bg-gulf-950/60 px-4 py-1.5 text-xs font-semibold text-gulf-300 backdrop-blur-md shadow-lg shadow-gulf-950/50 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
            <span>{t.hero.badge}</span>
            <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300 border border-gold-500/30">
              {t.hero.yearBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {t.hero.headlinePart1}
            <span className="bg-gradient-to-r from-gulf-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <div className="mt-3 text-sm sm:text-base font-semibold text-gulf-400 tracking-wide uppercase">
            {t.hero.subHeadline}
          </div>

          {/* Tagline focused on survival talk over grammar */}
          <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-xl font-normal leading-relaxed">
            {t.hero.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#curriculum"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gulf-600 via-emerald-600 to-gold-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-gulf-900/40 transition-all duration-300 hover:shadow-gulf-500/30 hover:scale-[1.02]"
            >
              <span>{t.hero.viewCourse}</span>
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Link>

            <Link
              href="#audio-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-gulf-500/30 bg-surface-100/80 px-8 py-3.5 text-base font-semibold text-gulf-200 backdrop-blur-md transition-all duration-200 hover:bg-surface-200 hover:text-white hover:border-gulf-400"
            >
              <Headphones className="h-5 w-5 text-gold-400" />
              <span>{t.hero.freeAudio}</span>
            </Link>
          </div>

          {/* Key Value Props */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gulf-400" />
              <span>{t.hero.prop1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gulf-400" />
              <span>{t.hero.prop2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gulf-400" />
              <span>{t.hero.prop3}</span>
            </div>
          </div>

          {/* Gulf Country Trust Flags Strip */}
          <div className="mt-14 w-full max-w-5xl rounded-2xl border border-white/[0.08] bg-surface-100/50 p-6 backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4 text-gold-400" />
              <span>{t.hero.destinationsTitle}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {t.hero.destinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/[0.05] bg-surface-200/50 py-3 px-2 text-center transition-all hover:border-gulf-500/40 hover:bg-surface-200"
                >
                  <span className="text-2xl mb-1">{dest.flag}</span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {dest.country}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono mt-0.5">
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

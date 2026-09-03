"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, Headphones, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gulf-500/30 bg-gradient-to-b from-[#0e2116] via-[#09160e] to-[#050b07] px-6 py-16 sm:px-16 sm:py-20 shadow-2xl shadow-gulf-950/60 backdrop-blur-2xl">
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-[650px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[120px]"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/60 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
              <span>{t.cta.badge}</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
              {t.cta.titlePart1}
              <span className="bg-gradient-to-r from-gulf-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
                {t.cta.titleHighlight}
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.cta.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                  t.cta.whatsappDirectMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gulf-600 via-emerald-600 to-gold-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-gulf-900/50 transition-all duration-300 hover:shadow-gulf-500/40 hover:scale-[1.02]"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{t.cta.whatsappDirect}</span>
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Link>

              <Link
                href="#audio-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-surface-100/90 px-8 py-3.5 text-base font-semibold text-slate-200 hover:bg-surface-200 hover:text-white transition-colors"
              >
                <Headphones className="h-5 w-5 text-gold-400" />
                <span>{t.cta.freeTrial}</span>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gulf-400" />
                <span>{t.cta.trust1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gulf-400" />
                <span>{t.cta.trust2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gulf-400" />
                <span>{t.cta.trust3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

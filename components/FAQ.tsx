"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-24 sm:py-32 bg-slate-50 border-t border-slate-200/80 dark:bg-[#060e09] dark:border-gulf-500/20 transition-colors duration-200">
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
            <span>{t.faq.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.faq.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent"> {t.faq.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.faq.description}
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-14 space-y-4 w-full max-w-full min-w-0">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 w-full max-w-full min-w-0 overflow-hidden ${
                  isOpen
                    ? "border-emerald-500/40 bg-white shadow-lg dark:border-gulf-500/40 dark:bg-surface-100/90 dark:shadow-gulf-950/40"
                    : "border-slate-200/90 bg-white/70 hover:bg-white hover:border-slate-300 dark:border-white/[0.08] dark:bg-surface-100/50 dark:hover:border-white/20 dark:hover:bg-surface-100/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? "rotate-180 border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-gulf-400 dark:bg-gulf-500/20 dark:text-gulf-300"
                        : "border-slate-200 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-surface-200 dark:text-slate-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.06] pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-12 text-center rounded-2xl border border-slate-200 bg-white/80 dark:border-white/[0.08] dark:bg-surface-100/40 p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t.faq.moreQuestions}
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              href="https://wa.me/8801700000000?text=I%20have%20questions%20about%20Rimslin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-500/40 px-5 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:text-emerald-300 dark:hover:bg-emerald-900 transition-colors shadow-sm"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.faq.whatsappChat}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

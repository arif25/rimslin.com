"use client";

import { useState } from "react";
import {
  Volume2,
  Play,
  Square,
  Check,
  Copy,
  Tag,
  Flame,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AudioPhraseItem } from "@/lib/translations";

export default function AudioPhraseDemo() {
  const { t, language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const phrases = t.audioDemo.phrases;

  const filteredPhrases =
    activeCategory === "all"
      ? phrases
      : phrases.filter((p) => p.category === activeCategory);

  const handlePlayAudio = (phrase: AudioPhraseItem) => {
    if (playingId === phrase.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(phrase.id);

    // Speak using Arabic or fallback synthesizer
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.arabicScript);
      utterance.lang = "ar-SA";
      utterance.rate = speechRate;

      utterance.onend = () => {
        setPlayingId(null);
      };

      utterance.onerror = () => {
        setTimeout(() => {
          setPlayingId(null);
        }, 2200);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setPlayingId(null);
      }, 2200);
    }
  };

  const handleCopy = (phrase: AudioPhraseItem) => {
    const text = `${phrase.meaning}\n${t.audioDemo.arabicPronunciationLabel}: ${phrase.phoneticScript}\nEnglish: ${phrase.englishWorkplace}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="audio-demo" className="relative overflow-hidden w-full max-w-full py-20 sm:py-28 bg-[#07110c] border-y border-gulf-500/20">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/40 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md mb-4">
            <Volume2 className="h-3.5 w-3.5 text-gold-400" />
            <span>{t.audioDemo.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.audioDemo.titlePart1}
            <span className="gradient-gulf-text">{t.audioDemo.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {t.audioDemo.description}
          </p>
        </div>

        {/* Category Filter Tabs & Speed Toggle */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-full min-w-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 max-w-full">
            {t.audioDemo.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gulf-500 text-slate-950 shadow-lg shadow-gulf-500/20 font-bold"
                    : "border border-white/10 bg-surface-100/60 text-slate-300 hover:bg-surface-200 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Speed Toggle */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-100/60 px-3 py-1 text-xs text-slate-300 shrink-0">
            <span className="text-[11px] text-slate-400">{t.audioDemo.speedLabel}</span>
            <button
              type="button"
              onClick={() => setSpeechRate(0.7)}
              className={`rounded px-2 py-0.5 font-bold transition-colors ${
                speechRate <= 0.75
                  ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                  : "hover:text-white text-slate-400"
              }`}
            >
              {t.audioDemo.speedSlow}
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(0.95)}
              className={`rounded px-2 py-0.5 font-bold transition-colors ${
                speechRate > 0.75
                  ? "bg-gulf-500/20 text-gulf-300 border border-gulf-500/30"
                  : "hover:text-white text-slate-400"
              }`}
            >
              {t.audioDemo.speedNormal}
            </button>
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-full min-w-0">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingId === phrase.id;
            const isCopied = copiedId === phrase.id;

            return (
              <div
                key={phrase.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 min-w-0 max-w-full overflow-hidden ${
                  isPlaying
                    ? "border-gulf-400 bg-gulf-950/40 shadow-xl shadow-gulf-500/20 ring-1 ring-gulf-400/50 scale-[1.01]"
                    : "border-white/[0.08] bg-surface-100/70 hover:border-gulf-500/40 hover:bg-surface-200/80"
                }`}
              >
                {/* Card Top Strip */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-gulf-500/10 px-2.5 py-1 text-[11px] font-semibold text-gulf-300 border border-gulf-500/20">
                      <Tag className="h-3 w-3" />
                      {phrase.tradeTag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isRTL && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                          لهجة خليجية بيئة العمل
                        </span>
                      )}
                      {phrase.popular && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold text-gold-300 border border-gold-500/30">
                          <Flame className="h-3 w-3 text-gold-400" />
                          {t.audioDemo.popularBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Adaptive Meaning in Active Language */}
                  <div className="mb-4 text-start">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      {t.audioDemo.meaningLabel}
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {phrase.meaning}
                    </div>
                  </div>

                  {/* Gulf Arabic in Adapted Phonetic Script & Arabic Original */}
                  <div className="mb-4 rounded-xl bg-[#0b1b12] p-3.5 border border-gulf-500/20 text-start">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gulf-400 uppercase tracking-wider">
                        {t.audioDemo.arabicPronunciationLabel}
                      </span>
                      <span className="text-xs font-arabic text-slate-300" dir="rtl">
                        {phrase.arabicScript}
                      </span>
                    </div>
                    {/* Phonetic in Bengali / Devanagari / Latin / Arabic */}
                    <div className="text-sm font-extrabold text-gold-300 mt-1">
                      &quot;{phrase.phoneticScript}&quot;
                    </div>
                    {language !== "en" && language !== "ar" && (
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        Phonetic: {phrase.phoneticLatin}
                      </div>
                    )}
                  </div>

                  {/* Khaleeji Dialect Nuance Highlight Box for Arabic UI */}
                  {isRTL && phrase.dialectTip && (
                    <div className="mb-4 rounded-xl bg-gold-950/40 p-3 border border-gold-500/20 text-start text-xs text-gold-300/95 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-gold-400 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>فائدة واستخدام في اللهجة الخليجية:</span>
                      </div>
                      <p className="text-[11px] text-slate-200">{phrase.dialectTip}</p>
                    </div>
                  )}

                  {/* Workplace English */}
                  <div className="mb-6 text-start">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      {t.audioDemo.workplaceEnglishLabel}
                    </div>
                    <div className="text-xs font-medium text-slate-200 italic mt-0.5" dir="ltr">
                      &ldquo;{phrase.englishWorkplace}&rdquo;
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Play Audio & Copy */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(phrase)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all ${
                      isPlaying
                        ? "bg-gulf-400 text-slate-950 shadow-md shadow-gulf-400/30"
                        : "bg-gradient-to-r from-gulf-600 to-emerald-600 text-white hover:opacity-90 shadow-md shadow-gulf-900/30"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="h-3.5 w-3.5 fill-current" />
                        <span>{t.audioDemo.stopAudio}</span>
                      </>
                    ) : (
                      <>
                        <Play className={`h-3.5 w-3.5 fill-current ${isRTL ? "rotate-180" : ""}`} />
                        <span>{t.audioDemo.playAudio}</span>
                      </>
                    )}
                  </button>

                  {/* Sound visualizer wave bars when active */}
                  {isPlaying ? (
                    <div className="sound-wave playing px-2">
                      <span className="sound-wave-bar h-4" />
                      <span className="sound-wave-bar h-5" />
                      <span className="sound-wave-bar h-3" />
                      <span className="sound-wave-bar h-6" />
                      <span className="sound-wave-bar h-4" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCopy(phrase)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-surface-200 p-2.5 text-slate-300 transition-colors hover:text-white hover:bg-surface-300"
                      title={t.audioDemo.copyTooltip}
                      aria-label="Copy phrase"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-gulf-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-300">
            {t.audioDemo.bottomNote}
          </p>
        </div>
      </div>
    </section>
  );
}

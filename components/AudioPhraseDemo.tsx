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
  const [globalTashkeel, setGlobalTashkeel] = useState<boolean>(true);
  const [cardOverrides, setCardOverrides] = useState<Record<string, boolean>>({});

  const isTashkeelFor = (id: string) => {
    if (cardOverrides[id] !== undefined) {
      return cardOverrides[id];
    }
    return globalTashkeel;
  };

  const toggleCardTashkeel = (id: string) => {
    setCardOverrides((prev) => ({
      ...prev,
      [id]: !(prev[id] !== undefined ? prev[id] : globalTashkeel),
    }));
  };

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
    const isTashkeelActive = isTashkeelFor(phrase.id);
    const activeArabic = isTashkeelActive
      ? phrase.arabicTashkeel || phrase.arabicScript
      : phrase.arabicScript;
    const text = `${phrase.meaning}\nআরবি: ${activeArabic}\n${t.audioDemo.arabicPronunciationLabel}: ${phrase.phoneticScript}\nEnglish: ${phrase.englishWorkplace}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="phrase-demo" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-20 sm:py-28 bg-white/70 border-y border-slate-200/80 dark:bg-[#07110c] dark:border-gulf-500/20 transition-colors duration-200">
      <span id="audio-demo" className="sr-only" aria-hidden="true" />
      <span id="country-dialects" className="sr-only" aria-hidden="true" />
      <span id="daily-dialogues" className="sr-only" aria-hidden="true" />
      <span id="emergency-phrases" className="sr-only" aria-hidden="true" />
      <span id="audio-downloads" className="sr-only" aria-hidden="true" />
      <span id="free-practice" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:border-gold-500/30 dark:bg-gold-950/40 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-gold-300 backdrop-blur-md mb-4 shadow-sm">
            <Volume2 className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
            <span>{t.audioDemo.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.audioDemo.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent"> {t.audioDemo.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.audioDemo.description}
          </p>
        </div>

        {/* Category Filter Tabs, Tashkeel Toggle & Speed Controls */}
        <div className="mt-10 flex flex-col lg:flex-row items-center justify-between gap-4 w-full max-w-full min-w-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-full">
            {t.audioDemo.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-gulf-500 dark:text-slate-950 dark:shadow-gulf-500/20 font-bold"
                    : "border border-slate-200/90 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-surface-100/60 dark:text-slate-300 dark:hover:bg-surface-200 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls Cluster: Dual Format (Tashkeel) Toggle & Audio Speed */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            {/* Tashkeel Global Segmented Pill */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200/90 bg-white/80 dark:border-white/10 dark:bg-surface-100/60 p-1 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1.5">
                {isRTL ? "الحركات:" : "হরকত:"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setGlobalTashkeel(true);
                  setCardOverrides({});
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  globalTashkeel
                    ? "bg-emerald-600 text-white shadow-xs dark:bg-gulf-500 dark:text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t.audioDemo.tashkeelWithLabel || "যের-যবর সহ"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setGlobalTashkeel(false);
                  setCardOverrides({});
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  !globalTashkeel
                    ? "bg-emerald-600 text-white shadow-xs dark:bg-gulf-500 dark:text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t.audioDemo.tashkeelWithoutLabel || "সাদামাটা"}
              </button>
            </div>

            {/* Speed Toggle */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/80 dark:border-white/10 dark:bg-surface-100/60 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">{t.audioDemo.speedLabel}</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.7)}
                className={`rounded px-2 py-0.5 font-bold transition-colors ${
                  speechRate <= 0.75
                    ? "bg-amber-500/20 text-amber-700 dark:bg-gold-500/20 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/30"
                    : "hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400"
                }`}
              >
                {t.audioDemo.speedSlow}
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.95)}
                className={`rounded px-2 py-0.5 font-bold transition-colors ${
                  speechRate > 0.75
                    ? "bg-emerald-500/20 text-emerald-700 dark:bg-gulf-500/20 dark:text-gulf-300 border border-emerald-500/30 dark:border-gulf-500/30"
                    : "hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400"
                }`}
              >
                {t.audioDemo.speedNormal}
              </button>
            </div>
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-full min-w-0">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingId === phrase.id;
            const isCopied = copiedId === phrase.id;
            const isTashkeelActive = isTashkeelFor(phrase.id);
            const primaryArabic = isTashkeelActive
              ? (phrase.arabicTashkeel || phrase.arabicScript)
              : phrase.arabicScript;
            const secondaryArabic = isTashkeelActive
              ? phrase.arabicScript
              : (phrase.arabicTashkeel || phrase.arabicScript);

            return (
              <div
                key={phrase.id}
                className={`relative flex flex-col justify-between rounded-2xl border w-full overflow-hidden p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 min-w-0 max-w-full ${
                  isPlaying
                    ? "border-emerald-500 bg-emerald-50/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50 dark:border-gulf-400 dark:bg-gulf-950/40 dark:shadow-gulf-500/20 dark:ring-gulf-400/50 scale-[1.01]"
                    : "border-slate-200/90 bg-white/95 shadow-sm hover:border-emerald-500/40 hover:shadow-md dark:border-white/[0.08] dark:bg-surface-100/70 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200/80"
                }`}
              >
                {/* Card Top Strip */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.06] pb-3 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 dark:bg-gulf-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-gulf-300 border border-emerald-500/20 dark:border-gulf-500/20">
                      <Tag className="h-3 w-3" />
                      {phrase.tradeTag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isRTL && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          لهجة خليجية بيئة العمل
                        </span>
                      )}
                      {phrase.popular && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 dark:bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/30">
                          <Flame className="h-3 w-3 text-amber-500 dark:text-gold-400" />
                          {t.audioDemo.popularBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gulf Arabic Sentence Showcase Box with Dual Format Toggle */}
                  <div className="my-3 rounded-2xl bg-emerald-50/70 dark:bg-[#0b1b12] p-4 sm:p-5 border border-emerald-200/70 dark:border-gulf-500/25 w-full overflow-hidden text-start shadow-inner">
                    <div className="flex items-center justify-between border-b border-emerald-200/40 dark:border-white/[0.06] pb-2 gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-gulf-400 uppercase tracking-wider">
                        {t.audioDemo.arabicPronunciationLabel}
                      </span>
                      
                      {/* Interactive Dual Format Toggle Pill */}
                      <button
                        type="button"
                        onClick={() => toggleCardTashkeel(phrase.id)}
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-all cursor-pointer bg-white/90 dark:bg-black/40 border-emerald-300/80 dark:border-gulf-500/30 text-emerald-800 dark:text-gulf-300 hover:bg-emerald-100/70 dark:hover:bg-gulf-500/20 shadow-xs"
                        title="হরকত সহ এবং সাধারণ লেখার মধ্যে টগল করুন"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{isTashkeelActive ? "যের-যবর সহ" : "সাধারণ"}</span>
                        <span className="text-[9px] text-slate-400">⇄ টগল</span>
                      </button>
                    </div>

                    {/* Arabic Sentence Sizing - Amiri Font */}
                    <div
                      dir="rtl"
                      className="w-full block my-2.5 py-1 text-right rtl:text-right ltr:text-left sm:text-center font-arabic text-2xl sm:text-3xl font-bold leading-relaxed tracking-normal text-slate-900 dark:text-white break-words transition-all duration-200"
                    >
                      {primaryArabic}
                    </div>

                    {/* Dual Format Counterpart Subtitle */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1 mb-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {isTashkeelActive ? "দৈনন্দিন সাধারণ লেখা:" : "উচ্চারণের জন্য হরকত সহ:"}
                      </span>
                      <span
                        dir="rtl"
                        className="font-arabic text-base sm:text-lg font-normal text-slate-700 dark:text-slate-200 px-2.5 py-0.5 rounded-md bg-white/75 dark:bg-black/25 border border-slate-200/80 dark:border-white/10 inline-block"
                      >
                        {secondaryArabic}
                      </span>
                    </div>

                    {/* Phonetic Pronunciation in Refined Khaleeji Bengali */}
                    <div className="mt-2 text-center sm:text-center text-base sm:text-lg font-bold text-amber-700 dark:text-gold-300 leading-snug">
                      &quot;{phrase.phoneticScript}&quot;
                    </div>
                    {language !== "en" && language !== "ar" && (
                      <div className="text-center text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-1">
                        Phonetic: {phrase.phoneticLatin}
                      </div>
                    )}
                  </div>

                  {/* Adaptive Meaning in Active Language */}
                  <div className="mt-4 mb-3 text-start">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t.audioDemo.meaningLabel}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {phrase.meaning}
                    </div>
                  </div>

                  {/* Workplace English */}
                  <div className="mb-5 text-start">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t.audioDemo.workplaceEnglishLabel}
                    </div>
                    <div className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium italic mt-0.5" dir="ltr">
                      &ldquo;{phrase.englishWorkplace}&rdquo;
                    </div>
                  </div>

                  {/* Khaleeji Dialect Nuance Highlight Box for Arabic UI */}
                  {isRTL && phrase.dialectTip && (
                    <div className="mb-4 rounded-xl bg-amber-50 dark:bg-gold-950/40 p-3 border border-amber-200 dark:border-gold-500/20 text-start text-xs text-amber-800 dark:text-gold-300/95 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-gold-400 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>فائدة واستخدام في اللهجة الخليجية:</span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-200">{phrase.dialectTip}</p>
                    </div>
                  )}
                </div>

                {/* Card Bottom: Play Audio & Copy */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(phrase)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all ${
                      isPlaying
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 dark:bg-gulf-400 dark:text-slate-950"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 shadow-md shadow-emerald-900/10 dark:from-gulf-600 dark:to-emerald-600 dark:shadow-gulf-900/30"
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
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-600 transition-colors hover:text-slate-900 hover:bg-slate-200 dark:border-white/10 dark:bg-surface-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-surface-300 shadow-sm"
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

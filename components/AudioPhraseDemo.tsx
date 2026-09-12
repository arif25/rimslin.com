"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  Play,
  Square,
  Check,
  Copy,
  Tag,
  Flame,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AudioPhraseItem, translations } from "@/lib/translations";

export interface AudioPhraseDemoProps {
  limit?: number;
  showViewAll?: boolean;
  isStandalonePage?: boolean;
}

// Utility to strip Arabic Tashkeel / diacritics (vowel marks: fatha, damma, kasra, sukun, tanween, shaddah)
const stripTashkeel = (text: string): string =>
  text.replace(/[\u064B-\u065F\u0670]/g, "");

interface PhraseCardProps {
  phrase: AudioPhraseItem;
  isPlaying: boolean;
  isCopied: boolean;
  onPlayAudio: (phrase: AudioPhraseItem) => void;
  onCopy: (phrase: AudioPhraseItem, showHarakat: boolean) => void;
  t: any;
  language: string;
  isRTL: boolean;
}

function PhraseCard({
  phrase,
  isPlaying,
  isCopied,
  onPlayAudio,
  onCopy,
  t,
  language,
  isRTL,
}: PhraseCardProps) {
  // Independent local state per card: true = with harakat, false = without harakat
  const [showHarakat, setShowHarakat] = useState<boolean>(true);

  // Active state displays full Arabic text with Tashkeel; Inactive state displays plain Arabic without vowel marks
  const primaryArabic = showHarakat
    ? phrase.arabicTashkeel || phrase.arabicScript
    : stripTashkeel(phrase.arabicScript || phrase.arabicTashkeel || "");

  // Lookup Bengali and Hindi meanings
  const bnPhrase = translations.bn?.audioDemo?.phrases?.find((p) => p.id === phrase.id);
  const hiPhrase = translations.hi?.audioDemo?.phrases?.find((p) => p.id === phrase.id);

  const bengaliMeaning = bnPhrase?.meaning || phrase.meaning;
  const hindiMeaning = hiPhrase?.meaning;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border w-full overflow-hidden p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 min-w-0 max-w-full ${
        isPlaying
          ? "border-emerald-500 bg-emerald-50/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50 dark:border-gulf-400 dark:bg-gulf-950/40 dark:shadow-gulf-500/20 dark:ring-gulf-400/50 scale-[1.01]"
          : "border-slate-200/90 bg-white/95 shadow-sm hover:border-emerald-500/40 hover:shadow-md dark:border-white/[0.08] dark:bg-surface-100/70 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200/80"
      }`}
    >
      <div>
        {/* ========================================================= */}
        {/* 1. CARD TOP: Category / context tags & copy button       */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.06] pb-3 mb-3">
          {/* Left: Tags */}
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 dark:bg-gulf-500/10 px-2.5 py-1 text-[11px] font-semibold font-cairo text-emerald-700 dark:text-gulf-300 border border-emerald-500/20 dark:border-gulf-500/20 truncate">
              <Tag className="h-3 w-3 shrink-0" />
              <span>{phrase.tradeTag}</span>
            </span>

            {phrase.popular && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 dark:bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold font-cairo text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/30">
                <Flame className="h-3 w-3 text-amber-500 dark:text-gold-400 shrink-0" />
                <span>{t.audioDemo.popularBadge || "বেশি ব্যবহৃত"}</span>
              </span>
            )}
          </div>

          {/* Right: Copy Button */}
          <button
            type="button"
            onClick={() => onCopy(phrase, showHarakat)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-600 transition-colors hover:text-slate-900 hover:bg-slate-200 dark:border-white/10 dark:bg-surface-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-surface-300 shadow-xs shrink-0"
            title={t.audioDemo.copyTooltip}
            aria-label="Copy phrase"
          >
            {isCopied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. ARABIC PHRASE DISPLAY (IBM Plex Sans Arabic / Greta)  */}
        {/* ========================================================= */}
        <div className="rounded-2xl bg-emerald-50/70 dark:bg-[#0b1b12] p-3.5 sm:p-4 border border-emerald-200/70 dark:border-gulf-500/25 w-full text-center shadow-inner overflow-hidden">
          <div
            dir="rtl"
            title={primaryArabic}
            className="w-full font-arabic font-['IBM_Plex_Sans_Arabic',_sans-serif] font-semibold text-xl sm:text-2xl md:text-[26px] leading-relaxed py-1 text-slate-900 dark:text-white truncate whitespace-nowrap overflow-hidden text-ellipsis block transition-all duration-200"
          >
            {primaryArabic}
          </div>

          {/* ========================================================= */}
          {/* 3. COMPACT SEGMENTED SWITCH (Reading Mode Toggle)        */}
          {/* ========================================================= */}
          <div className="flex items-center justify-end mt-2 pt-1.5 border-t border-emerald-200/40 dark:border-white/[0.06]">
            <div className="inline-flex p-0.5 bg-slate-100 dark:bg-surface-200 rounded-lg border border-slate-200/80 dark:border-white/10 font-cairo shadow-xs">
              <button
                type="button"
                onClick={() => setShowHarakat(true)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                  showHarakat
                    ? "bg-white text-emerald-700 font-semibold shadow-xs dark:bg-surface-100 dark:text-gulf-400"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                }`}
              >
                {isRTL ? "مع الحركات" : "হরকত সহ"}
              </button>
              <button
                type="button"
                onClick={() => setShowHarakat(false)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                  !showHarakat
                    ? "bg-white text-emerald-700 font-semibold shadow-xs dark:bg-surface-100 dark:text-gulf-400"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                }`}
              >
                {isRTL ? "بدون حركات" : "হরকত ছাড়া"}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. MEANING SECTION: বাংলা অর্থ -> हिंदी अर्थ -> English   */}
        {/* ========================================================= */}
        <div className="mt-3.5 space-y-2.5 text-start">
          {/* বাংলা অর্থ (Bengali Meaning) */}
          <div className="bg-slate-50/90 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/[0.05]">
            <span className="text-[10px] font-bold font-cairo text-emerald-700 dark:text-gulf-400 uppercase tracking-wider block">
              বাংলা অর্থ:
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {bengaliMeaning}
            </p>
          </div>

          {/* हिंदी अर्थ (Hindi Meaning) */}
          {hindiMeaning && (
            <div className="bg-slate-50/90 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/[0.05]">
              <span className="text-[10px] font-bold font-cairo text-amber-700 dark:text-gold-400 uppercase tracking-wider block">
                हिंदी अर्थ:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {hindiMeaning}
              </p>
            </div>
          )}

          {/* Workplace English */}
          {phrase.englishWorkplace && (
            <div className="px-1 pt-0.5">
              <span className="text-[10px] font-bold font-cairo text-slate-400 uppercase tracking-wider block">
                Workplace English:
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic mt-0.5" dir="ltr">
                &ldquo;{phrase.englishWorkplace}&rdquo;
              </p>
            </div>
          )}

          {/* Khaleeji Dialect Nuance Highlight Box for Arabic UI */}
          {isRTL && phrase.dialectTip && (
            <div className="rounded-xl bg-amber-50 dark:bg-gold-950/40 p-3 border border-amber-200 dark:border-gold-500/20 text-start text-xs text-amber-800 dark:text-gold-300/95 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-gold-400 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>فائدة واستخدام في اللهجة الخليجية:</span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-200">
                {phrase.dialectTip}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. CARD BOTTOM: Secondary Audio Trigger Button            */}
      {/* ========================================================= */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] mt-4">
        <button
          type="button"
          onClick={() => onPlayAudio(phrase)}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold font-cairo transition-all active:scale-[0.98] ${
            isPlaying
              ? "bg-emerald-600 text-white border border-transparent shadow-sm dark:bg-emerald-500 dark:text-white"
              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800/60"
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current shrink-0" />
              <span>{t.audioDemo.stopAudio || "থামুন (Playing...)"}</span>
              <div className="sound-wave playing px-1.5 ml-1">
                <span className="sound-wave-bar h-3.5" />
                <span className="sound-wave-bar h-5" />
                <span className="sound-wave-bar h-3" />
                <span className="sound-wave-bar h-5.5" />
                <span className="sound-wave-bar h-4" />
              </div>
            </>
          ) : (
            <>
              <Play
                className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20 dark:fill-emerald-400/30 shrink-0 ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
              <span>{t.audioDemo.playAudio || "Play Audio (আরবি শুনুন)"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AudioPhraseDemo({
  limit,
  showViewAll = limit !== undefined,
  isStandalonePage = false,
}: AudioPhraseDemoProps = {}) {
  const { t, language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const phrases = t.audioDemo.phrases;

  const filteredPhrases = phrases.filter((phrase) => {
    const matchesCategory =
      activeCategory === "all" || phrase.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      phrase.meaning.toLowerCase().includes(q) ||
      phrase.arabicScript.includes(q) ||
      (phrase.arabicTashkeel && phrase.arabicTashkeel.includes(q)) ||
      phrase.phoneticScript.toLowerCase().includes(q) ||
      phrase.phoneticLatin.toLowerCase().includes(q) ||
      phrase.englishWorkplace.toLowerCase().includes(q) ||
      phrase.tradeTag.toLowerCase().includes(q)
    );
  });

  const displayPhrases = limit ? filteredPhrases.slice(0, limit) : filteredPhrases;

  const handlePlayAudio = (phrase: AudioPhraseItem) => {
    if (playingId === phrase.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(phrase.id);

    // Speak using Arabic synthesizer at default 1.0 rate
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.arabicScript);
      utterance.lang = "ar-SA";
      utterance.rate = 1.0;

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

  const handleCopy = (phrase: AudioPhraseItem, showHarakat: boolean) => {
    const activeArabic = showHarakat
      ? phrase.arabicTashkeel || phrase.arabicScript
      : stripTashkeel(phrase.arabicScript || phrase.arabicTashkeel || "");
    const text = `${phrase.meaning}\nআরবি: ${activeArabic}\nEnglish: ${phrase.englishWorkplace}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section
      id="phrase-demo"
      className={`relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full ${
        isStandalonePage
          ? "py-8 sm:py-14 bg-transparent"
          : "py-10 sm:py-14 bg-white/70 border-y border-slate-200/80 dark:bg-[#07110c] dark:border-gulf-500/20"
      } transition-colors duration-200`}
    >
      <span id="audio-demo" className="sr-only" aria-hidden="true" />
      <span id="country-dialects" className="sr-only" aria-hidden="true" />
      <span id="dialects" className="sr-only" aria-hidden="true" />
      <span id="daily-dialogues" className="sr-only" aria-hidden="true" />
      <span id="emergency-phrases" className="sr-only" aria-hidden="true" />
      <span id="emergency" className="sr-only" aria-hidden="true" />
      <span id="audio-downloads" className="sr-only" aria-hidden="true" />
      <span id="audio-pack" className="sr-only" aria-hidden="true" />
      <span id="free-practice" className="sr-only" aria-hidden="true" />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header (rendered on homepage or if not standalone) */}
        {!isStandalonePage && (
          <div className="text-center max-w-3xl mx-auto w-full min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:border-gold-500/30 dark:bg-gold-950/40 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-gold-300 backdrop-blur-md mb-4 shadow-sm">
              <Volume2 className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
              <span>{t.audioDemo.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {t.audioDemo.titlePart1}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                {" "}
                {t.audioDemo.titleHighlight}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.audioDemo.description}
            </p>
          </div>
        )}

        {/* Standalone Search Bar */}
        {isStandalonePage && (
          <div className="mb-8 max-w-xl mx-auto w-full">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="শব্দ বা অর্থ দিয়ে ফ্রেজ খুঁজুন (যেমন: বেতন, বাজার, হাসপাতাল, ড্রিল)..."
                className="w-full rounded-2xl border border-slate-200/90 bg-white dark:border-white/10 dark:bg-surface-100/90 pl-10 pr-10 py-3 text-sm font-cairo text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <span>মোট {phrases.length}টি অডিও ফ্রেজ তালিকাভুক্ত</span>
              {searchQuery && (
                <span>
                  খোঁজের ফলাফল: <strong className="text-emerald-600 dark:text-gulf-400">{filteredPhrases.length}</strong>টি
                </span>
              )}
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 w-full max-w-full min-w-0">
          {t.audioDemo.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-bold font-cairo transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-gulf-500 dark:text-slate-950 dark:shadow-gulf-500/20"
                  : "border border-slate-200/90 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-surface-100/60 dark:text-slate-300 dark:hover:bg-surface-200 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Phrases Grid with 50/50 Controls and Bottom Play Button */}
        {displayPhrases.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-full min-w-0">
            {displayPhrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                isPlaying={playingId === phrase.id}
                isCopied={copiedId === phrase.id}
                onPlayAudio={handlePlayAudio}
                onCopy={handleCopy}
                t={t}
                language={language}
                isRTL={isRTL}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 p-8 my-8 max-w-md mx-auto">
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              &ldquo;{searchQuery}&rdquo; দিয়ে কোনো ফ্রেজ পাওয়া যায়নি।
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold font-cairo text-emerald-600 dark:text-gulf-400 hover:underline"
            >
              সব ফ্রেজ পুনরায় দেখুন
            </button>
          </div>
        )}

        {/* Centered Modern "View All" CTA Button (when limited on homepage) */}
        {showViewAll && (
          <div className="mt-14 flex flex-col items-center justify-center text-center px-4">
            <Link
              href="/audio-phrases"
              className="group inline-flex items-center gap-2.5 mx-auto py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-sm hover:shadow-md hover:shadow-emerald-900/10 transition-all duration-200"
            >
              <Volume2 className="h-4 w-4 text-emerald-100 group-hover:text-white transition-colors shrink-0" />
              <span className="text-sm sm:text-base font-medium text-white tracking-wide font-cairo">
                {t.audioDemo.viewAllButton ||
                  (isRTL ? "عرض جميع النماذج الصوتية" : "সব অডিও ফ্রেজ দেখুন")}
              </span>
              <ArrowRight
                className={`w-4 h-4 text-emerald-100 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1 shrink-0 ${
                  isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
                }`}
              />
            </Link>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 max-w-md">
              {t.audioDemo.viewAllSubtext ||
                (isRTL
                  ? "استمع إلى أكثر من ১২ عبارة خليجية وإنجليزية لبيئات العمل"
                  : "দৈনন্দিন বাজার, বেতন, সাইট ও টেকনিক্যালের সকল বাক্য একসাথে শুনুন")}
            </p>
          </div>
        )}

        {/* Bottom Banner Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.audioDemo.bottomNote}
          </p>
        </div>
      </div>
    </section>
  );
}

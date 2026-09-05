"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  BookOpen,
  Star,
  ListCheck,
  Smartphone,
  BookMarked,
  ShoppingBag,
  Sparkles,
  Download,
  Share2,
  IndianRupee,
} from "lucide-react";
import { Book } from "@/data/books";

interface BookSampleModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book, format: "pdf" | "hardcopy") => void;
}

export default function BookSampleModal({
  book,
  isOpen,
  onClose,
  onAddToCart,
}: BookSampleModalProps) {
  const [activeTab, setActiveTab] = useState<"toc" | "sample" | "highlights">(
    "sample"
  );
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "hardcopy">(
    "hardcopy"
  );
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const currentPrice =
    selectedFormat === "pdf"
      ? book.formats.pdf.price
      : book.formats.hardcopy.price;
  const originalPrice =
    selectedFormat === "pdf"
      ? book.formats.pdf.originalPrice
      : book.formats.hardcopy.originalPrice;

  const currentChapter = book.sampleChapters[selectedChapterIndex] || book.sampleChapters[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-modal-title"
        className="relative z-10 flex flex-col w-full max-w-3xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#08150e] shadow-2xl overflow-hidden animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-4 sm:px-6 py-3.5 bg-slate-50/80 dark:bg-black/40">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 shrink-0">
              <BookOpen className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h2
                id="sample-modal-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                বইয়ের ফ্রি নমুনা প্রিভিউ (Sample Preview)
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {book.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              title="শেয়ার করুন"
              className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Book Quick Info + Tabs */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-surface-200/40 p-4">
            {/* Thumbnail */}
            <div className="relative w-24 aspect-[3/4] shrink-0 rounded-lg overflow-hidden shadow-md ring-1 ring-black/10 dark:ring-white/10 mx-auto sm:mx-0">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            {/* Quick Specs */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                  {book.publisher}
                </span>
                <span className="rounded-md bg-slate-200 text-slate-700 dark:bg-surface-300 dark:text-slate-300 px-2 py-0.5 text-[10px] font-semibold">
                  {book.edition}
                </span>
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="ml-1">{book.rating} ({book.reviewsCount} রিভিউ)</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {book.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {book.subtitle}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                লেখক: <strong>{book.author}</strong> • সর্বমোট {book.pages} পৃষ্ঠা
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 dark:border-white/10 gap-2 sm:gap-4 text-xs font-bold overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("sample")}
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === "sample"
                  ? "border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>নমুনা পাঠ ও ডায়লগ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("toc")}
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === "toc"
                  ? "border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <ListCheck className="h-4 w-4" />
              <span>সূচিপত্র (Table of Contents)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("highlights")}
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === "highlights"
                  ? "border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Star className="h-4 w-4" />
              <span>বইয়ের বিশেষ সুবিধাসমূহ</span>
            </button>
          </div>

          {/* Tab 1: Sample Lesson & Dialogue Reading Preview */}
          {activeTab === "sample" && (
            <div className="space-y-4">
              {/* Chapter Selector Dropdown / Pills if multiple chapters exist */}
              {book.sampleChapters.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {book.sampleChapters.map((ch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedChapterIndex(idx)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all border ${
                        selectedChapterIndex === idx
                          ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-surface-200 dark:text-slate-300 dark:border-white/10"
                      }`}
                    >
                      {ch.title.split(":")[0] || `নমুনা অধ্যায় ${idx + 1}`}
                    </button>
                  ))}
                </div>
              )}

              {/* Sample Excerpt Box Styled Like a Book Page */}
              <div className="rounded-2xl border border-amber-200/60 bg-[#fffdfa] dark:bg-[#07130a] dark:border-emerald-500/20 p-5 sm:p-7 shadow-inner space-y-4">
                <div className="flex items-center justify-between border-b border-amber-100 dark:border-white/10 pb-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {currentChapter?.title}
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                      {currentChapter?.pageRange}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/80 dark:border-amber-800/40">
                    📖 ফ্রি নমুনা পৃষ্ঠা
                  </span>
                </div>

                {/* Sub topics covered in this excerpt */}
                {currentChapter?.topics && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentChapter.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium rounded-md bg-slate-100 dark:bg-surface-200 px-2 py-0.5 text-slate-600 dark:text-slate-300"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actual Bilingual Sample Text Cards */}
                <div className="space-y-2.5 pt-2">
                  {currentChapter?.sampleText.map((textLine, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-white dark:bg-surface-100/60 text-xs sm:text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200 shadow-sm"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono shrink-0">
                          [{i + 1}]
                        </span>
                        <span>{textLine}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 text-center border-t border-dashed border-amber-200 dark:border-white/10">
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    (এটি বইটির সংক্ষিপ্ত নমুনা পাতা। সম্পূর্ণ বইতে পাবেন {book.pages} পৃষ্ঠার বিশদ অনুবাদ ও অনুশীলন।)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Full Table of Contents */}
          {activeTab === "toc" && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                বইটির প্রতিটি অধ্যায় বাস্তব অভিজ্ঞতার আলোকে পর্যায়ক্রমে সাজানো হয়েছে:
              </div>

              <div className="divide-y divide-slate-100 dark:divide-white/5 border rounded-2xl border-slate-200 dark:border-white/10 overflow-hidden">
                {book.sampleChapters.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-surface-100/70 hover:bg-slate-50 dark:hover:bg-surface-200/80 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {ch.title}
                      </h5>
                      <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {ch.pageRange}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {ch.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="text-[11px] rounded bg-slate-100 dark:bg-surface-300 px-2 py-0.5 text-slate-600 dark:text-slate-300"
                        >
                          • {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Key Features & Benefits */}
          {activeTab === "highlights" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {book.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {book.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-surface-200/50 flex items-start gap-2.5"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Format Selector & Immediate Purchase Bar */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/50 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Format Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hidden md:inline">
                ফরম্যাট:
              </span>
              <div className="inline-flex rounded-xl border border-slate-200 dark:border-white/15 p-1 bg-white dark:bg-surface-100 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedFormat("hardcopy")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedFormat === "hardcopy"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
                >
                  <BookMarked className="h-3.5 w-3.5" />
                  <span className="inline-flex items-center">
                    হার্ডকপি (<IndianRupee className="h-3 w-3 inline shrink-0 -mr-0.5" />{book.formats.hardcopy.price})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat("pdf")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedFormat === "pdf"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="inline-flex items-center">
                    ডিজিটাল PDF (<IndianRupee className="h-3 w-3 inline shrink-0 -mr-0.5" />{book.formats.pdf.price})
                  </span>
                </button>
              </div>
            </div>

            {/* Price and Cart Action */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {selectedFormat === "hardcopy" ? "হোম ডেলিভারি" : "ইন্সট্যান্ট ডাউনলোড"}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="inline-flex items-center text-xl font-black text-slate-900 dark:text-white">
                    <IndianRupee className="h-4.5 w-4.5 shrink-0 -mr-0.5" />
                    <span>{currentPrice}</span>
                  </span>
                  {originalPrice && (
                    <span className="inline-flex items-center text-xs text-slate-400 line-through">
                      <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                      <span>{originalPrice}</span>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(book, selectedFormat);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>অর্ডার / কার্টে যোগ করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

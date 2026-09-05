"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Download,
  BookOpen,
  Check,
  Zap,
  IndianRupee,
  FileText,
  Clock,
} from "lucide-react";
import { EBook } from "@/data/books";

interface BookCardProps {
  book: EBook;
  onPreviewSample: (book: EBook) => void;
  onAddToCart: (book: EBook) => void;
}

export default function BookCard({
  book,
  onPreviewSample,
  onAddToCart,
}: BookCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.pdfPrice) / book.originalPrice) * 100)
    : null;

  const categoryLabels: Record<EBook["category"], { text: string; bg: string }> = {
    arabic: {
      text: "Gulf Arabic",
      bg: "bg-emerald-600/90 text-white dark:bg-emerald-500 dark:text-slate-950",
    },
    hindi: {
      text: "Workplace Hindi",
      bg: "bg-rose-600/90 text-white dark:bg-rose-500 dark:text-slate-950",
    },
    english: {
      text: "Workplace English",
      bg: "bg-sky-600/90 text-white dark:bg-sky-400 dark:text-slate-950",
    },
    career: {
      text: "Trade & Visa Kit",
      bg: "bg-amber-600/90 text-white dark:bg-gold-400 dark:text-slate-950",
    },
  };

  const handleBuyOrAdd = () => {
    onAddToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl dark:border-white/10 dark:bg-surface-100/90 dark:hover:border-emerald-400/40 dark:hover:shadow-emerald-950/30">
      {/* 1. Book Mockup/Cover with Realistic Aspect Ratio (3/4) */}
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-100 dark:bg-black/40 p-3 flex items-center justify-center">
        <div className="relative w-full aspect-[3/4] max-w-[240px] transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg shadow-black/25 ring-1 ring-black/10 dark:ring-white/10">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Realistic 3D Book Spine Shadow Overlay */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
            {/* Gloss Highlight Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Badge Overlays */}
          {/* Top-Left: Category Tag */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md tracking-wide ${categoryLabels[book.category].bg}`}
            >
              {categoryLabels[book.category].text}
            </span>
          </div>

          {/* Top-Right: ⚡ Instant PDF */}
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-sm dark:bg-black/90">
              <Zap className="h-3 w-3 text-emerald-400 fill-emerald-400" />
              <span>Instant PDF</span>
            </span>
          </div>

          {/* Bottom File Size Badge */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[9px] font-medium text-slate-200 backdrop-blur-sm">
              <FileText className="h-2.5 w-2.5 text-emerald-400" />
              <span>{book.fileSize}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Book Meta */}
      <div className="flex-1 flex flex-col">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <div className="flex items-center text-amber-500 dark:text-gold-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="ml-1 font-bold text-slate-800 dark:text-slate-100">
              {book.rating}
            </span>
            <span className="text-slate-400 text-[11px] ml-1">
              ({book.reviewCount}+ রিভিও)
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            {book.pages} পৃষ্ঠা
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-2 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-gulf-400 transition-colors">
          {book.title}
        </h3>

        {/* Subtitle */}
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {book.subtitle}
        </p>

        {/* 3. Format & Price Display */}
        <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-3 dark:border-white/10 dark:bg-black/30 space-y-2">
          {/* Prominent PDF Price */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                ডিজিটাল ই-বুক (PDF)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="inline-flex items-center text-xl font-black text-slate-900 dark:text-white">
                  <IndianRupee className="h-4.5 w-4.5 shrink-0 -mr-0.5" />
                  <span>{book.pdfPrice}</span>
                </span>
                {book.originalPrice && (
                  <span className="inline-flex items-center text-xs text-slate-400 line-through">
                    <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                    <span>{book.originalPrice}</span>
                  </span>
                )}
              </div>
            </div>

            {discountPercent && (
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                {discountPercent}% ছাড়
              </span>
            )}
          </div>

          {/* Hardcopy Availability Teaser (Coming Soon) */}
          {book.hardcopyComingSoon && (
            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-200/70 dark:bg-white/5 px-2 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 cursor-not-allowed">
                <span>📖 হার্ডকপি প্রিন্ট</span>
                <span className="text-[9px] font-bold uppercase rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-1 py-0.2">
                  শীঘ্রই আসছে
                </span>
              </span>

              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="h-2.5 w-2.5" />
                <span>তাৎক্ষণিক ডাউনলোড</span>
              </span>
            </div>
          )}
        </div>

        {/* 4. Action Buttons: Buy PDF & Free Preview */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
          {/* Secondary CTA: Free Preview */}
          <button
            type="button"
            onClick={() => onPreviewSample(book)}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200/90 bg-white py-2.5 px-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-emerald-500/40 hover:bg-slate-50 hover:text-emerald-700 dark:border-white/10 dark:bg-surface-200 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-white active:scale-95"
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400 shrink-0" />
            <span className="truncate">ফ্রি প্রিভিউ দেখুন</span>
          </button>

          {/* Primary CTA: Buy PDF / Add to Cart */}
          <button
            type="button"
            onClick={handleBuyOrAdd}
            className={`inline-flex items-center justify-center gap-1 rounded-xl py-2.5 px-2.5 text-xs font-bold shadow-md transition-all active:scale-95 ${
              isAdded
                ? "bg-emerald-600 text-white shadow-emerald-600/30"
                : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-800 dark:from-gulf-500 dark:to-emerald-500 dark:text-slate-950"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">যুক্ত হয়েছে</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">এখনই কিনুন (Buy PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

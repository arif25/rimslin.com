"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  BookOpen,
  Check,
  Truck,
  Zap,
  Smartphone,
  BookMarked,
  IndianRupee,
} from "lucide-react";
import { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
  onPreviewSample: (book: Book) => void;
  onAddToCart: (book: Book, format: "pdf" | "hardcopy") => void;
  activeFilterFormat?: "all" | "hardcopy" | "pdf";
}

export default function BookCard({
  book,
  onPreviewSample,
  onAddToCart,
  activeFilterFormat = "all",
}: BookCardProps) {
  // Format selection state: default to PDF if user filter is 'pdf', or hardcopy if 'hardcopy'
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "hardcopy">(
    activeFilterFormat === "pdf" ? "pdf" : "hardcopy"
  );
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice =
    selectedFormat === "pdf" ? book.formats.pdf.price : book.formats.hardcopy.price;
  const originalPrice =
    selectedFormat === "pdf"
      ? book.formats.pdf.originalPrice
      : book.formats.hardcopy.originalPrice;

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const categoryLabels: Record<Book["category"], { text: string; bg: string }> = {
    arabic: {
      text: "গালফ আরবি",
      bg: "bg-emerald-600/90 text-white dark:bg-emerald-500 dark:text-slate-950",
    },
    hindi: {
      text: "স্পোকেন হিন্দি",
      bg: "bg-rose-600/90 text-white dark:bg-rose-500 dark:text-slate-950",
    },
    english: {
      text: "স্পোকেন ইংলিশ",
      bg: "bg-sky-600/90 text-white dark:bg-sky-400 dark:text-slate-950",
    },
    career: {
      text: "ট্রেড ও ভিসা",
      bg: "bg-amber-600/90 text-white dark:bg-gold-400 dark:text-slate-950",
    },
  };

  const handleAddToCart = () => {
    onAddToCart(book, selectedFormat);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl dark:border-white/10 dark:bg-surface-100/90 dark:hover:border-emerald-400/40 dark:hover:shadow-emerald-950/30">
      {/* 1. Realistic Book Cover Thumbnail */}
      <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-black/40 p-2 sm:p-3 flex items-center justify-center">
        {/* Book Container with Realistic Aspect Ratio and Shadows */}
        <div className="relative w-full aspect-[3/4] max-w-[240px] transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg shadow-black/25 ring-1 ring-black/10 dark:ring-white/10">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Realistic 3D Book Spine Left Shadow Overlay */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
            {/* Gloss Highlight Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Badge Overlays */}
          {/* Top-Left: Category Pill */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md tracking-wide ${categoryLabels[book.category].bg}`}
            >
              {categoryLabels[book.category].text}
            </span>
          </div>

          {/* Top-Right: Format Indicator Badge */}
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-900/85 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-md backdrop-blur-sm dark:bg-black/85">
              {book.formats.hardcopy.available && book.formats.pdf.available ? (
                <>
                  <BookMarked className="h-3 w-3 text-amber-400" />
                  <span>Hardcopy + PDF</span>
                </>
              ) : (
                <>
                  <Zap className="h-3 w-3 text-emerald-400" />
                  <span>Instant PDF</span>
                </>
              )}
            </span>
          </div>

          {/* Bottom Badge: Popular or Bestseller */}
          {book.badge && (
            <div className="absolute bottom-2 right-2 z-10">
              <span className="inline-flex items-center rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-0.5 text-[10px] font-black text-slate-950 shadow-md">
                ★ {book.badge}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Book Title & Subtitle */}
      <div className="flex-1 flex flex-col">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-1.5 text-xs">
          <div className="flex items-center text-amber-500 dark:text-gold-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="ml-1 font-bold text-slate-800 dark:text-slate-100">
              {book.rating}
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            ({book.reviewsCount}+ রিভিউ)
          </span>
          <span className="ml-auto text-[10px] font-medium text-slate-500 dark:text-slate-400">
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

        {/* Author */}
        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500 italic truncate">
          লেখক: {book.author}
        </p>

        {/* 3. Format & Pricing Toggle (Dual Pricing) */}
        <div className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50 p-1.5 dark:border-white/10 dark:bg-black/30">
          <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
            {/* Digital PDF Tab */}
            <button
              type="button"
              onClick={() => setSelectedFormat("pdf")}
              disabled={!book.formats.pdf.available}
              className={`flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 transition-all ${
                selectedFormat === "pdf"
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-500/30 dark:bg-surface-200 dark:text-emerald-300 dark:border-emerald-400/40"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
              <span>ডিজিটাল PDF</span>
            </button>

            {/* Hardcopy Tab */}
            <button
              type="button"
              onClick={() => setSelectedFormat("hardcopy")}
              disabled={!book.formats.hardcopy.available}
              className={`flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 transition-all ${
                selectedFormat === "hardcopy"
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-500/30 dark:bg-surface-200 dark:text-emerald-300 dark:border-emerald-400/40"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <BookMarked className="h-3.5 w-3.5 shrink-0" />
              <span>হার্ডকপি বই</span>
            </button>
          </div>

          {/* Pricing Info for Selected Format */}
          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-baseline justify-between px-1">
            <div className="flex items-baseline gap-1.5">
              <span className="inline-flex items-center text-lg font-black text-slate-900 dark:text-white">
                <IndianRupee className="h-4 w-4 shrink-0 -mr-0.5" />
                <span>{currentPrice}</span>
              </span>
              {originalPrice && (
                <span className="inline-flex items-center text-xs text-slate-400 line-through">
                  <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                  <span>{originalPrice}</span>
                </span>
              )}
            </div>

            {discountPercent && (
              <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                {discountPercent}% ছাড়
              </span>
            )}
          </div>
        </div>

        {/* 4. Delivery / Instant Download Note */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px]">
          {selectedFormat === "hardcopy" ? (
            <div className="flex items-center gap-1 text-emerald-700 dark:text-gulf-400 font-medium">
              <Truck className="h-3.5 w-3.5 shrink-0" />
              <span>🚚 ৩-৫ দিনে সারা দেশে হোম ডেলিভারি</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>⚡ পেমেন্টের সাথে সাথে ইনস্ট্যান্ট ডাউনলোড</span>
            </div>
          )}
        </div>

        {/* 5. Action Buttons: Add to Cart & Preview Sample */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
          {/* Secondary CTA: Preview Sample */}
          <button
            type="button"
            onClick={() => onPreviewSample(book)}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200/90 bg-white py-2 px-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-emerald-500/40 hover:bg-slate-50 hover:text-emerald-700 dark:border-white/10 dark:bg-surface-200 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-white active:scale-95"
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400 shrink-0" />
            <span className="truncate">ফ্রি স্যাম্পল</span>
          </button>

          {/* Primary CTA: Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1 rounded-xl py-2 px-2.5 text-xs font-bold shadow-md transition-all active:scale-95 ${
              isAdded
                ? "bg-emerald-600 text-white shadow-emerald-600/30"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 dark:from-gulf-500 dark:to-emerald-500 dark:text-slate-950"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">যুক্ত হয়েছে</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">কার্ট-এ যোগ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

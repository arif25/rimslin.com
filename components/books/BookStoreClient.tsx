"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  X,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Headphones,
  HelpCircle,
  ChevronDown,
  Smartphone,
  Download,
  FileCheck,
} from "lucide-react";
import { EBook, BOOKS } from "@/data/books";
import BookCard from "./BookCard";
import BookSampleModal from "./BookSampleModal";
import BookCartDrawer, { CartItem } from "./BookCartDrawer";

type CategoryFilter = "all" | "arabic" | "hindi_english" | "career";

export default function BookStoreClient() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewBook, setPreviewBook] = useState<EBook | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Filter books based on category and search query
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory === "arabic" && book.category !== "arabic") {
        return false;
      }
      if (
        selectedCategory === "hindi_english" &&
        book.category !== "hindi" &&
        book.category !== "english"
      ) {
        return false;
      }
      if (selectedCategory === "career" && book.category !== "career") {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchSubtitle = book.subtitle.toLowerCase().includes(q);
        const matchAuthor = (book.author || "").toLowerCase().includes(q);
        const matchDescription = book.description.toLowerCase().includes(q);
        if (!matchTitle && !matchSubtitle && !matchAuthor && !matchDescription) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (book: EBook) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.book.id === book.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [...prev, { book, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenSampleModal = (book: EBook) => {
    setPreviewBook(book);
    setIsSampleModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { id: "all", label: "সব বই (All)" },
    { id: "arabic", label: "আরবি গাইডবুক (Arabic)" },
    { id: "hindi_english", label: "কাজের হিন্দি ও ইংলিশ (Hindi/English)" },
    { id: "career", label: "রেজুমি ও ইন্টারভিউ কিট (Career Kits)" },
  ];

  const faqs = [
    {
      q: "ডিজিটাল PDF ই-বুক কীভাবে ডাউনলোড করব এবং পড়তে পারব?",
      a: "অর্ডার কনফার্ম করার সাথে সাথেই ডাউনলোড বাটন সক্রিয় হয়ে যাবে এবং আপনার দেওয়া হোয়াটসঅ্যাপ ও ইমেইল ঠিকানায় সরাসরি হাই-রেজোলিউশন PDF ফাইল পাঠানো হবে। আপনি যেকোনো স্মার্টফোন, ট্যাব বা ল্যাপটপে অফলাইনে আজীবন পড়তে পারবেন।"
    },
    {
      q: "হার্ডকপি মুদ্রিত বই কবে নাগাদ পাওয়া যাবে?",
      a: "আমাদের হার্ডকপি প্রিন্টেড সংস্করণ বর্তমানে প্রেস পাইপলাইনে রয়েছে। খুব শীঘ্রই প্রি-অর্ডার শুরু হবে এবং সুন্দরবন/রেডেক্স কুরিয়ারে সারা দেশে হোম ডেলিভারি দেওয়া হবে। তবে তাৎক্ষণিক পড়ার জন্য এখনই ডিজিটাল সংস্করণ ডাউনলোড করতে পারেন।"
    },
    {
      q: "কেনার আগে কি বইয়ের সূচিপত্র ও নমুনা পৃষ্ঠা দেখার সুযোগ আছে?",
      a: "হ্যাঁ! প্রতিটি বইয়ের কার্ডে 'ফ্রি প্রিভিউ দেখুন' বোতামে চাপলেই বইটির সূচিপত্র, বাস্তব নমুনা অধ্যায় ও গুরুত্বপূর্ণ বাক্যমালা সম্পূর্ণ বিনামূল্যে পড়তে পারবেন।"
    },
    {
      q: "প্রবাস থেকে কোন কোন মাধ্যমে পেমেন্ট করা যাবে?",
      a: "বাংলাদেশ ও প্রবাস থেকে বিকাশ, নগদ, রকেট, আন্তর্জাতিক মাস্টারকার্ড, ভিসা কার্ড এবং হোয়াটসঅ্যাপ অর্ডারের মাধ্যমে সহজে পেমেন্ট করে তাৎক্ষণিক ই-বুক ডাউনলোড করতে পারবেন।"
    }
  ];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR SECTION                                          */}
      {/* ========================================================================= */}
      <section className="mb-10 rounded-3xl border border-slate-200/90 bg-white/80 p-4 sm:p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-surface-100/90">
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Top Row: Search Input & PDF Instant Delivery Pill */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="ই-বুকের নাম, বিষয় বা লেখক দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-emerald-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Instant Delivery Feature Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl px-3.5 py-2 w-full md:w-auto justify-center">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500" />
              <span>১০০% ডিজিটাল ফরম্যাট • পেমেন্টেই ফোনে তাৎক্ষণিক ডাউনলোড</span>
            </div>
          </div>

          {/* Bottom Row: Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 dark:border-white/5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0 hidden sm:inline">
              ক্যাটাগরি:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 dark:bg-emerald-500 dark:text-slate-950 dark:border-emerald-400"
                      : "border-slate-200/90 bg-white text-slate-600 hover:border-emerald-500/30 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-200/60 dark:text-slate-300 dark:hover:border-emerald-400/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* RESULTS HEADER & ACTIVE VIEW                                             */}
      {/* ========================================================================= */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            ডিজিটাল হ্যান্ডবুক কালেকশন ({filteredBooks.length}টি ই-বুক উপলব্ধ)
          </h2>
        </div>

        {/* Quick View Cart Button in Header */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500/40 transition-colors"
        >
          <ShoppingBag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>কার্ট দেখুন</span>
          {totalCartCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white dark:bg-emerald-400 dark:text-slate-950">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* RESPONSIVE BOOK GRID (4-column layout)                                   */}
      {/* ========================================================================= */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPreviewSample={handleOpenSampleModal}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-12 text-center space-y-3">
          <BookOpen className="h-10 w-10 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
            কোনো ই-বুক খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            অন্য কোনো কিওয়ার্ড বা ফিল্টার দিয়ে পুনরায় চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="rounded-xl border border-emerald-600 px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 transition-colors"
          >
            সব ই-বুক দেখুন
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VALUE PROPOSITIONS / DIGITAL STORE TRUST BADGES                           */}
      {/* ========================================================================= */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-slate-200/90 bg-white/70 dark:border-white/10 dark:bg-surface-100/80 p-6 sm:p-10 backdrop-blur-md shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ইনস্ট্যান্ট PDF ডাউনলোড
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                পেমেন্ট সম্পন্ন হওয়ামাত্রই ডাউনলোড লিংক পান এবং অফলাইনে পড়ুন।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 border border-sky-200/60 dark:border-sky-800/60">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                মোবাইল ও ট্যাবে সহজ পাঠ
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                যেকোনো স্মার্টফোনে ক্লিয়ার ফন্ট ও বুকমার্ক সুবিধাসহ পড়া যায়।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                হার্ডকপি পাইপলাইন
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                প্রিন্টেড হার্ডকপি সংস্করণ শীঘ্রই আসছে সারা দেশে হোম ডেলিভারিসহ।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ২৪/৭ হোয়াটসঅ্যাপ সাপোর্ট
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                যেকোনো অর্ডার বা ফাইল ডাউনলোডে তাৎক্ষণিক সরাসরি সহায়তা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS (FAQ)                                         */}
      {/* ========================================================================= */}
      <section className="mt-16 sm:mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ডিজিটাল ই-বুক ক্রয় ও ডাউনলোড সম্পর্কিত প্রশ্নোত্তর
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100/90 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLOATING CART TRIGGER (BOTTOM RIGHT)                                     */}
      {/* ========================================================================= */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 py-3 shadow-xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs font-extrabold">ই-বুক কার্ট ({totalCartCount})</span>
          </button>
        </div>
      )}

      {/* Sample Preview Modal */}
      <BookSampleModal
        book={previewBook}
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <BookCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

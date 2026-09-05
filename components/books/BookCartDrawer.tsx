"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  IndianRupee,
  Mail,
  Download,
} from "lucide-react";
import { EBook } from "@/data/books";

export interface CartItem {
  book: EBook;
  quantity: number;
}

interface BookCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export default function BookCartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: BookCartDrawerProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate items subtotal
  const subtotal = items.reduce((acc, item) => {
    return acc + item.book.pdfPrice * item.quantity;
  }, 0);

  // Free digital delivery
  const deliveryCharge = 0;
  const grandTotal = subtotal;

  // Build WhatsApp Order Link
  const buildWhatsAppUrl = () => {
    const orderItemsSummary = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.book.title} (Digital PDF) - ${item.quantity}টি = ₹${
            item.book.pdfPrice * item.quantity
          }`
      )
      .join("\n");

    const message = `*রিমসলিন ডিজিটাল ই-বুক অর্ডার:*
--------------------------------
${orderItemsSummary}

*সাবটোটাল:* ₹${subtotal}
*ডেলিভারি:* ফ্রি (ইনস্ট্যান্ট ডিজিটাল ডাউনলোড)
*সর্বমোট প্রদেয়:* ₹${grandTotal}

*গ্রাহকের তথ্য:*
নাম: ${customerName || "উল্লেখ করা হয়নি"}
হোয়াটসঅ্যাপ নম্বর: ${customerPhone || "উল্লেখ করা হয়নি"}
ইমেইল (PDF লিংক পাওয়ার জন্য): ${customerEmail || "উল্লেখ করা হয়নি"}

দয়া করে আমার ডিজিটাল ই-বুক অর্ডারের পেমেন্ট ও ডাউনলোড লিংক পাঠান।`;

    return `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
  };

  const handleFormOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone && !customerEmail) {
      alert("অনুগ্রহ করে আপনার হোয়াটসঅ্যাপ নম্বর অথবা ইমেইল লিখুন।");
      return;
    }
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white dark:bg-[#07130b] text-slate-800 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-white/10 animate-fade-in">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-5 py-4 bg-slate-50 dark:bg-black/30">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                আপনার ই-বুক কার্ট
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {items.length}টি ডিজিটাল বই নির্বাচিত
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {orderSuccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
              ধন্যবাদ! আপনার দেওয়া হোয়াটসঅ্যাপ ও ইমেইলে সরাসরি হাই-কোয়ালিটি PDF ডাউনলোড লিংক পাঠিয়ে দেওয়া হচ্ছে।
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>হোয়াটসঅ্যাপে ডাউনলোড লিংক চান</span>
            </a>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-surface-200">
              <Download className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">
              কার্ট বর্তমানে খালি রয়েছে
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              পছন্দের ডিজিটাল আরবি, হিন্দি ও ইংলিশ হ্যান্ডবুক কার্টে যুক্ত করে ইনস্ট্যান্ট ডাউনলোড করুন।
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-xl border border-emerald-600 px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 transition-colors"
            >
              ই-বুকসমূহ ব্রাউজ করুন
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.book.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/60 dark:border-white/10 dark:bg-surface-200/50 p-3 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-14 aspect-[3/4] shrink-0 rounded-lg overflow-hidden shadow ring-1 ring-black/10 dark:ring-white/10">
                    <Image
                      src={item.book.coverImage}
                      alt={item.book.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {item.book.title}
                    </h5>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 px-1.5 py-0.5 text-[10px] font-bold">
                        <Zap className="h-2.5 w-2.5" />
                        <span>Instant PDF</span>
                      </span>

                      <span className="inline-flex items-center text-xs font-black text-slate-900 dark:text-white">
                        <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                        <span>{item.book.pdfPrice * item.quantity}</span>
                      </span>
                    </div>

                    {/* Quantity Selector & Remove Button */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-surface-100">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.book.id, item.quantity - 1)
                          }
                          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.book.id, item.quantity + 1)
                          }
                          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.book.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Instant Delivery Guarantee Card */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/70 dark:border-emerald-500/20 dark:bg-emerald-950/30 p-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>তাৎক্ষণিক ডেলিভারি সুবিধা:</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                পেমেন্ট সম্পন্ন হওয়া মাত্রই আপনার স্মার্টফোনে সরাসরি PDF কপি ডাউনলোড করে অফলাইনে পড়ার সুযোগ।
              </p>
            </div>

            {/* Customer Contact Form */}
            <form onSubmit={handleFormOrder} className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                ডাউনলোড লিংক পাওয়ার তথ্য:
              </div>

              <input
                type="text"
                placeholder="আপনার নাম"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />

              <input
                type="tel"
                required
                placeholder="হোয়াটসঅ্যাপ নম্বর (যেমন: 017xxxxxxxx)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />

              <input
                type="email"
                placeholder="ইমেইল অ্যাড্রেস (অপশনাল - ব্যাকআপ লিংক পেতে)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </form>
          </div>
        )}

        {/* Drawer Footer: Pricing Summary & Checkout Actions */}
        {items.length > 0 && !orderSuccess && (
          <div className="border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4 space-y-3">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>ই-বুকের মোট মূল্য:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white inline-flex items-center">
                  <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                  <span>{subtotal}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ফ্রি (Instant Digital)
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-1.5 text-sm font-black text-slate-900 dark:text-white">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="text-base text-emerald-600 dark:text-emerald-400 inline-flex items-center">
                  <IndianRupee className="h-4 w-4 shrink-0 -mr-0.5" />
                  <span>{grandTotal}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {/* WhatsApp Fast Order */}
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>হোয়াটসঅ্যাপে ডাউনলোড লিংক নিন</span>
              </a>

              {/* Direct Submit */}
              <button
                type="button"
                onClick={handleFormOrder}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-surface-200 hover:bg-slate-100 dark:hover:bg-surface-300 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-100 transition-all active:scale-95"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>বিকাশ / কার্ডে পেমেন্ট করে ডাউনলোড</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

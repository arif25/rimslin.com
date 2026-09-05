"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Zap,
  Smartphone,
  BookMarked,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import { Book } from "@/data/books";

export interface CartItem {
  book: Book;
  format: "pdf" | "hardcopy";
  quantity: number;
}

interface BookCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, format: "pdf" | "hardcopy", quantity: number) => void;
  onRemoveItem: (bookId: string, format: "pdf" | "hardcopy") => void;
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
  const [deliveryArea, setDeliveryArea] = useState<"dhaka" | "outside">("dhaka");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Check if cart contains any physical hardcopy items
  const hasHardcopy = items.some((item) => item.format === "hardcopy");

  // Delivery charge: 0 for all-PDF; 60 inside Dhaka; 120 outside Dhaka
  const deliveryCharge = !hasHardcopy
    ? 0
    : deliveryArea === "dhaka"
    ? 60
    : 120;

  // Calculate items subtotal
  const subtotal = items.reduce((acc, item) => {
    const price =
      item.format === "pdf"
        ? item.book.formats.pdf.price
        : item.book.formats.hardcopy.price;
    return acc + price * item.quantity;
  }, 0);

  const grandTotal = subtotal + deliveryCharge;

  // Build WhatsApp Order Link
  const buildWhatsAppUrl = () => {
    const orderItemsSummary = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.book.title} (${
            item.format === "pdf" ? "ডিজিটাল PDF" : "হার্ডকপি বই"
          }) - ${item.quantity}টি = ₹${
            (item.format === "pdf"
              ? item.book.formats.pdf.price
              : item.book.formats.hardcopy.price) * item.quantity
          }`
      )
      .join("\n");

    const message = `*রিমসলিন বুকস্টোর অর্ডার:*
--------------------------
${orderItemsSummary}

*সাবটোটাল:* ₹${subtotal}
*ডেলিভারি চার্জ:* ${deliveryCharge === 0 ? "ফ্রি (PDF)" : `₹${deliveryCharge}`} ${hasHardcopy ? `(${deliveryArea === "dhaka" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"})` : "(PDF ফ্রি)"}
*সর্বমোট:* ₹${grandTotal}

*গ্রাহকের তথ্য:*
নাম: ${customerName || "উল্লেখ করা হয়নি"}
ফোন: ${customerPhone || "উল্লেখ করা হয়নি"}
${hasHardcopy ? `ঠিকানা: ${customerAddress || "উল্লেখ করা হয়নি"}` : `ইমেইল (PDF পাঠানোর জন্য): ${customerEmail || "উল্লেখ করা হয়নি"}`}

দয়া করে আমার অর্ডারটি কনফার্ম করুন।`;

    return `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
  };

  const handleFormOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone) {
      alert("অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন।");
      return;
    }
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 2000);
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
                আপনার বইয়ের কার্ট
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {items.length}টি বই নির্বাচিত
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
              ধন্যবাদ! আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন। যেকোনো প্রয়োজনে আমাদের হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>হোয়াটসঅ্যাপে আপডেট জানুন</span>
            </a>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-surface-200">
              <BookMarked className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">
              কার্ট বর্তমানে খালি রয়েছে
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              পছন্দের ভাষা ও ক্যারিয়ার গাইড বই থেকে হার্ডকপি বা ডিজিটাল PDF কার্টে যুক্ত করুন।
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-xl border border-emerald-600 px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 transition-colors"
            >
              বইসমূহ ব্রাউজ করুন
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {items.map((item) => {
                const itemPrice =
                  item.format === "pdf"
                    ? item.book.formats.pdf.price
                    : item.book.formats.hardcopy.price;

                return (
                  <div
                    key={`${item.book.id}-${item.format}`}
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
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            item.format === "hardcopy"
                              ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300"
                          }`}
                        >
                          {item.format === "hardcopy" ? (
                            <>
                              <BookMarked className="h-2.5 w-2.5" />
                              <span>হার্ডকপি</span>
                            </>
                          ) : (
                            <>
                              <Smartphone className="h-2.5 w-2.5" />
                              <span>ডিজিটাল PDF</span>
                            </>
                          )}
                        </span>

                        <span className="inline-flex items-center text-xs font-black text-slate-900 dark:text-white">
                          <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                          <span>{itemPrice * item.quantity}</span>
                        </span>
                      </div>

                      {/* Quantity Selector & Remove Button */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-surface-100">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.book.id,
                                item.format,
                                item.quantity - 1
                              )
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
                              onUpdateQuantity(
                                item.book.id,
                                item.format,
                                item.quantity + 1
                              )
                            }
                            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.book.id, item.format)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Option for Hardcopy */}
            {hasHardcopy && (
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-black/30 p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Truck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>ডেলিভারি এলাকা নির্বাচন করুন:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea("dhaka")}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      deliveryArea === "dhaka"
                        ? "border-emerald-500 bg-emerald-50/60 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-400"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300"
                    }`}
                  >
                    <div>ঢাকার ভেতরে</div>
                    <div className="text-[11px] font-mono font-bold inline-flex items-center">
                      <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                      <span>60 (২-৩ দিন)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea("outside")}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      deliveryArea === "outside"
                        ? "border-emerald-500 bg-emerald-50/60 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-400"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300"
                    }`}
                  >
                    <div>ঢাকার বাইরে</div>
                    <div className="text-[11px] font-mono font-bold inline-flex items-center">
                      <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                      <span>120 (৩-৫ দিন)</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Customer Quick Order Form */}
            <form onSubmit={handleFormOrder} className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                ডেলিভারি ও যোগাযোগের তথ্য:
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
                placeholder="মোবাইল নম্বর (যেমন: 017xxxxxxxx)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />

              {hasHardcopy ? (
                <textarea
                  rows={2}
                  required
                  placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা (গ্রাম/রোড, থানা, জেলা)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              ) : (
                <input
                  type="email"
                  placeholder="ইমেইল অ্যাড্রেস (PDF ফাইল সরাসরি পেতে)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              )}
            </form>
          </div>
        )}

        {/* Drawer Footer: Pricing Summary & Checkout Actions */}
        {items.length > 0 && !orderSuccess && (
          <div className="border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4 space-y-3">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>বইয়ের মোট মূল্য:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white inline-flex items-center">
                  <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                  <span>{subtotal}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center">
                  {deliveryCharge === 0 ? (
                    "ফ্রি (PDF)"
                  ) : (
                    <>
                      <IndianRupee className="h-3 w-3 shrink-0 -mr-0.5" />
                      <span>{deliveryCharge}</span>
                    </>
                  )}
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
                <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন</span>
              </a>

              {/* Cash On Delivery Direct Submit */}
              <button
                type="button"
                onClick={handleFormOrder}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-surface-200 hover:bg-slate-100 dark:hover:bg-surface-300 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-100 transition-all active:scale-95"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি অর্ডার কনফার্ম করুন</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

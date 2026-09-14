"use client";

import React, { useState, useEffect } from "react";
import {
  Video,
  X,
  AlertCircle,
  ArrowRight,
  Check,
  MessageSquare,
} from "lucide-react";

export interface BookingFormData {
  name: string;
  whatsapp: string;
  country: string;
  timeSlot: string;
}

export const GULF_COUNTRIES = [
  { code: "+966", name: "সৌদি আরব (Saudi Arabia)", flag: "🇸🇦" },
  { code: "+971", name: "দুবাই / সংযুক্ত আরব আমিরাত (UAE)", flag: "🇦🇪" },
  { code: "+974", name: "কাতার (Qatar)", flag: "🇶🇦" },
  { code: "+965", name: "কুয়েত (Kuwait)", flag: "🇰🇼" },
  { code: "+968", name: "ওমান (Oman)", flag: "🇴🇲" },
  { code: "+973", name: "বাহরাইন (Bahrain)", flag: "🇧🇭" },
  { code: "+880", name: "বাংলাদেশ (প্রবাসগামী / প্রস্তুতি)", flag: "🇧🇩" },
  { code: "+91", name: "ভারত (India / প্রবাসগামী)", flag: "🇮🇳" },
  { code: "+", name: "অন্যান্য দেশ (Other Country)", flag: "🌍" },
];

export const TIME_SLOTS = [
  { id: "slot-9pm", label: "🌙 রাত ৯:০০ টা (KSA সন্ধ্যা ৭:০০ টা / BD রাত ৯:০০ টা)" },
  { id: "slot-10pm", label: "🌙 রাত ১০:০০ টা (KSA রাত ৮:০০ টা / BD রাত ১০:০০ টা)" },
  { id: "slot-morning", label: "☀️ সকালের ব্যাচ (সকাল ১০:০০ টা বাংলাদেশ সময়)" },
  { id: "slot-flexible", label: "🕒 যেকোনো সুবিধাজনক সময়ে (Flexible Slot)" },
];

interface LiveBatchBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveBatchBookingModal({
  isOpen,
  onClose,
}: LiveBatchBookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    whatsapp: "",
    country: "সৌদি আরব (Saudi Arabia)",
    timeSlot: "🌙 রাত ৯:০০ টা (KSA সন্ধ্যা ৭:০০ টা / BD রাত ৯:০০ টা)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppDirectUrl = (data: BookingFormData) => {
    const message = `আসসালামু আলাইকুম Rimslin টিম,\nআমি সরাসরি লাইভ ক্লাসের ৩ দিনের ফ্রি ট্রায়াল ডেমো ব্যাচে যুক্ত হতে চাই।\n\n📌 নাম: ${data.name.trim()}\n📱 হোয়াটসঅ্যাপ: ${data.whatsapp.trim()}\n🌍 দেশ: ${data.country}\n⏰ পছন্দের সময়: ${data.timeSlot}\n\nদয়া করে আমাকে ডেমো ক্লাসের Google Meet / Zoom লিংক এবং শিডিউল পাঠিয়ে দিন। ধন্যবাদ!`;
    return `https://wa.me/916290051284?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("দয়া করে আপনার নাম লিখুন।");
      return;
    }

    if (!formData.whatsapp.trim() || formData.whatsapp.trim().length < 8) {
      setErrorMessage("দয়া করে দেশের কোড সহ সঠিক হোয়াটসঅ্যাপ নম্বর লিখুন (যেমন: +966 50... বা +880 17...)");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post lead data to internal resilient API
      await fetch("/api/live-batch-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch((err) => {
        console.warn("Lead API background notice:", err);
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMessage("");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-batch-modal-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop Blur Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0c1811] rounded-2xl sm:rounded-3xl border border-emerald-200 dark:border-emerald-800/80 shadow-2xl overflow-hidden z-10 animate-fade-in my-auto">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          {!isSuccess ? (
            <>
              {/* Modal Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2.5">
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  <span>৩ দিনের ফ্রি লাইভ ডেমো ক্লাস</span>
                </div>
                <h3
                  id="live-batch-modal-title"
                  className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
                >
                  আপনার ফ্রি সিট নিশ্চিত করুন
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  তথ্য প্রদান করুন—ক্লাসের Google Meet / Zoom লিংক ও শিডিউল সরাসরি
                  আপনার হোয়াটসঅ্যাপে পাঠানো হবে।
                </p>
              </div>

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Field 1: Name */}
                <div>
                  <label
                    htmlFor="modal-batch-name"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                  >
                    আপনার পুরো নাম (Name) *
                  </label>
                  <input
                    type="text"
                    id="modal-batch-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="যেমন: মোঃ আরিফ হোসেন"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Field 2: WhatsApp Number */}
                <div>
                  <label
                    htmlFor="modal-batch-whatsapp"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                  >
                    হোয়াটসঅ্যাপ নম্বর (WhatsApp Number) *
                  </label>
                  <input
                    type="tel"
                    id="modal-batch-whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="যেমন: +966 50 123 4567 বা +880 1712 345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 font-mono"
                  />
                  <span className="block mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    * দেশের কোড সহ নম্বর লিখুন (যেমন: +966 / +971 / +880)
                  </span>
                </div>

                {/* Field 3: Country */}
                <div>
                  <label
                    htmlFor="modal-batch-country"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                  >
                    কোন দেশে আছেন বা যাবেন? (Destination / Current Country)
                  </label>
                  <select
                    id="modal-batch-country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {GULF_COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 4: Time Slot */}
                <div>
                  <label
                    htmlFor="modal-batch-timeslot"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1"
                  >
                    পছন্দের ক্লাসের সময় (Preferred Time Slot)
                  </label>
                  <select
                    id="modal-batch-timeslot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-surface-100 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.label}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-700/20 disabled:opacity-60 transition-all cursor-pointer text-sm sm:text-base active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        সিট সংরক্ষণ করা হচ্ছে...
                      </span>
                    ) : (
                      <>
                        <span>ফ্রি ক্লাসের সিট কনফার্ম করুন (হোয়াটসঅ্যাপে লিংক পান)</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>

                {/* Micro trust note */}
                <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। কোনো স্প্যাম মেসেজ পাঠানো হবে না।
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  আপনার ফ্রি সিট সংরক্ষিত হয়েছে! 🎉
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                  ধন্যবাদ <strong>{formData.name}</strong>। আপনার অনুরোধটি গৃহীত হয়েছে।
                  ক্লাসের Google Meet / Zoom লিংক এবং শিডিউল সরাসরি আপনার হোয়াটসঅ্যাপে পেতে নিচের বাটনে ক্লিক করুন:
                </p>
              </div>

              {/* Summary Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div><strong>হোয়াটসঅ্যাপ:</strong> {formData.whatsapp}</div>
                <div><strong>দেশ:</strong> {formData.country}</div>
                <div><strong>পছন্দের সময়:</strong> {formData.timeSlot}</div>
              </div>

              {/* WhatsApp Direct Connect CTA */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={getWhatsAppDirectUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 transition-all text-sm sm:text-base"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>হোয়াটসঅ্যাপে ক্লাসের লিংক রিসিভ করুন →</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  বন্ধ করুন (Close)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

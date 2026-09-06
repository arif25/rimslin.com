"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  CheckCircle,
  RefreshCw,
  Headphones,
  Mail,
  Lock,
} from "lucide-react";

export default function FloatingChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "কোর্স সংক্রান্ত তথ্য (Course Inquiry)",
    message: "",
  });

  const chatboxRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on outside click on desktop/tablet
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        chatboxRef.current &&
        !chatboxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setErrorMessage("দয়া করে প্রয়োজনীয় সবগুলো ঘর পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean client-side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        contact: "",
        subject: "কোর্স সংক্রান্ত তথ্য (Course Inquiry)",
        message: "",
      });
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage("");
  };

  return (
    <div ref={chatboxRef} className="select-none">
      {/* 1. Floating Launcher / Toggle Button (Bottom-Right) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "বার্তা ফর্ম বন্ধ করুন" : "অনলাইন বার্তা ফর্ম খুলুন"}
        aria-expanded={isOpen}
        className={`fixed bottom-5 right-5 z-50 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 active:scale-95 ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-700 border border-slate-600 shadow-slate-900/50 rotate-90"
            : "bg-gradient-to-tr from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 border border-emerald-400/40 shadow-emerald-950/40 hover:scale-105"
        }`}
      >
        {/* Unread / Online pulse dot (visible when closed) */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-900" />
          </span>
        )}

        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform duration-200" />
        ) : (
          <MessageCircle className="h-6 w-6 fill-current text-white transition-transform duration-200" />
        )}
      </button>

      {/* 2. Chatbox Popup Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="অনলাইন বার্তা ফর্ম"
        className={`fixed z-50 bottom-20 inset-x-4 sm:inset-x-auto sm:right-5 w-auto sm:w-[400px] max-h-[580px] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* A. Chat Header (Branded & Supportive) */}
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Agent Avatar with online indicator */}
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-white shadow-inner">
              <Headphones className="h-5 w-5 text-emerald-200" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800" />
            </div>

            <div className="flex flex-col text-left">
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                অনলাইন বার্তা ফর্ম (Rimslin Help)
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[11px] sm:text-xs text-emerald-100 opacity-90 leading-tight">
                  সাধারণত কয়েক ঘণ্টার মধ্যে উত্তর দেওয়া হয়
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="বন্ধ করুন"
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-600/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* B. Scrollable Form Body or Submission State */}
        <div className="p-4 space-y-3.5 overflow-y-auto max-h-[500px] flex-1 text-slate-800 dark:text-slate-100">
          {isSubmitted ? (
            /* Submission State & Feedback Card */
            <div className="py-6 px-4 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner transition-transform duration-300 scale-110">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  বার্তা সফলভাবে পৌঁছেছে!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
                  ধন্যবাদ, আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>আরেকটি বার্তা পাঠান</span>
              </button>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-2 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>তথ্য সম্পূর্ণ নিরাপদ ও সংরক্ষিত</span>
              </p>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* 1. Name Field */}
              <div>
                <label
                  htmlFor="chat-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  আপনার পূর্ণ নাম (Full Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="chat-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="যেমন: মোহাম্মদ করিম"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* 2. Email / Contact Field */}
              <div>
                <label
                  htmlFor="chat-contact"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  ইমেইল বা ফোন নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="chat-contact"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="yourname@example.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* 3. Subject Dropdown */}
              <div>
                <label
                  htmlFor="chat-subject"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  অনুসন্ধানের ধরন (Subject)
                </label>
                <select
                  id="chat-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                >
                  <option value="কোর্স সংক্রান্ত তথ্য (Course Inquiry)">
                    কোর্স সংক্রান্ত তথ্য (Course Inquiry)
                  </option>
                  <option value="রেজুমি ও ক্যারিয়ার সহায়তা (Resume / Career Hub)">
                    রেজুমি ও ক্যারিয়ার সহায়তা (Resume / Career Hub)
                  </option>
                  <option value="বই ও PDF অর্ডার (Book Store Support)">
                    বই ও PDF অর্ডার (Book Store Support)
                  </option>
                  <option value="অন্যান্য জিজ্ঞাসা (General Inquiry)">
                    অন্যান্য জিজ্ঞাসা (General Inquiry)
                  </option>
                </select>
              </div>

              {/* 4. Message Textarea */}
              <div>
                <label
                  htmlFor="chat-message"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  আপনার বার্তা বা প্রশ্ন (Your Message){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="chat-message"
                  name="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="আপনার জিজ্ঞাসা বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* C. Footer & Submit Action */}
              <div className="pt-1.5 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors text-xs sm:text-sm active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>বার্তা পাঠান (Send Message)</span>
                    </>
                  )}
                </button>

                {/* Trust & Direct Help */}
                <div className="flex flex-col items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 text-center">
                  <span>🔒 তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত</span>
                  <span>
                    ইমেইল:{" "}
                    <a
                      href="mailto:support@rimslin.com"
                      className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center gap-0.5"
                    >
                      <Mail className="w-3 h-3 inline" /> support@rimslin.com
                    </a>
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

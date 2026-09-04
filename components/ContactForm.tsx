"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("দয়া করে নাম, ইমেইল এবং বার্তার বিবরণ পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean client-side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/40 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-gulf-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
          আমরা আপনার মতামত গুরুত্বসহকারে বিবেচনা করি। আমাদের টিম ২৪ থেকে ৪৮ ঘণ্টার মধ্যে <span className="font-semibold text-emerald-600 dark:text-gulf-400">support@rimslin.com</span> থেকে আপনার সাথে যোগাযোগ করবে।
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>আরেকটি বার্তা পাঠান</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="contact-name" className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          আপনার পূর্ণ নাম (Full Name) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="যেমন: মোহাম্মদ করিম"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-surface-200 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          ইমেইল ঠিকানা (Email Address) <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="yourname@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-surface-200 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
        />
      </div>

      {/* Subject Dropdown / Input */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          বিষয় বা অনুসন্ধানের ধরন (Subject)
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-surface-200 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
        >
          <option value="">বিষয় নির্বাচন করুন (বা খালি রাখুন)</option>
          <option value="Lesson Suggestion">নতুন আরবি লেকচার বা বিষয়ের প্রস্তাব</option>
          <option value="Website Feedback">ওয়েবসাইটের কারিগরি পরামর্শ বা বাগ রিপোর্ট</option>
          <option value="Business/Partnership">সহযোগিতা ও পার্টনারশিপ সংক্রান্ত</option>
          <option value="General Inquiry">সাধারণ জিজ্ঞাসা</option>
        </select>
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="contact-message" className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          আপনার বার্তা বা প্রশ্ন (Your Message) <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="আপনার জিজ্ঞাসা, মতামত বা পরামর্শ বিস্তারিত লিখুন..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-surface-200 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-colors resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all duration-200"
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

      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
        🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হবে না।
      </p>

      <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
        <span>ফর্ম পূরণ করতে সমস্যা হলে সরাসরি ইমেইল করুন:</span>
        <a
          href="mailto:support@rimslin.com"
          className="font-bold text-emerald-600 dark:text-gulf-400 hover:underline transition-colors"
        >
          support@rimslin.com
        </a>
      </div>
    </form>
  );
}

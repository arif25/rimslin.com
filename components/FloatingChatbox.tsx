"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  CheckCircle,
  RotateCcw,
  Headphones,
  Mail,
  Lock,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  chips?: string[];
}

type ChatStep = 1 | 2 | 3 | 4 | "COMPLETED";

const QUICK_REPLY_SUBJECTS = [
  "কোর্স ও ভর্তি সংক্রান্ত",
  "রেজুমি ও ক্যারিয়ার সহায়তা",
  "বই ও PDF অর্ডার",
  "অন্যান্য জিজ্ঞাসা",
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function FloatingChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>(1);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Collected User Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "আসসালামু আলাইকুম! Rimslin সাপোর্টে স্বাগতম। আপনার কি সহায়তা প্রয়োজন? অনুগ্রহ করে প্রথমে আপনার পুরো নামটি লিখুন:",
      time: getCurrentTime(),
    },
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Auto-scroll on new messages or state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isSubmitting, isOpen]);

  // Focus input when step changes or chat opens
  useEffect(() => {
    if (isOpen && step !== 3 && step !== "COMPLETED") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, step]);

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

  // Close on outside click
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

  // Helper to add bot message with realistic typing delay
  const addBotMessage = (text: string, chips?: string[], delay = 350) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text,
          time: getCurrentTime(),
          chips,
        },
      ]);
    }, delay);
  };

  // 1. Submit Name (Step 1)
  const handleNameSubmit = (nameVal: string) => {
    const trimmed = nameVal.trim();
    if (!trimmed) {
      setInputError("অনুগ্রহ করে আপনার নামটি লিখুন।");
      return;
    }

    setInputError("");
    setSubmitError(null);
    setFormData((prev) => ({ ...prev, name: trimmed }));
    setInputValue("");

    // Add user bubble
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmed,
        time: getCurrentTime(),
      },
    ]);

    setStep(2);
    // Bot asks for Email
    addBotMessage(
      `ধন্যবাদ, ${trimmed} ভাই! আপনার সাথে যোগাযোগের জন্য আপনার ইমেইল ঠিকানাটি দিন:`
    );
  };

  // 2. Submit Email (Step 2)
  const handleEmailSubmit = (emailVal: string) => {
    const trimmed = emailVal.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setInputError("অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন (যেমন: name@example.com)");
      return;
    }

    setInputError("");
    setSubmitError(null);
    setFormData((prev) => ({ ...prev, email: trimmed }));
    setInputValue("");

    // Add user bubble
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmed,
        time: getCurrentTime(),
      },
    ]);

    setStep(3);
    // Bot presents Subject Selection
    addBotMessage(
      "আপনার বার্তাটি কোন বিষয়ে? নিচের যেকোনো একটি অপশন বেছে নিন:",
      QUICK_REPLY_SUBJECTS
    );
  };

  // 3. Submit Subject via Quick-Reply Chip (Step 3)
  const handleSubjectSelect = (selectedSubject: string) => {
    setInputError("");
    setSubmitError(null);
    setFormData((prev) => ({ ...prev, subject: selectedSubject }));

    // Add user bubble
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: selectedSubject,
        time: getCurrentTime(),
      },
    ]);

    setStep(4);
    // Bot asks for Message
    addBotMessage("আপনার প্রশ্ন বা বিস্তারিত বার্তাটি এখানে লিখুন:");
  };

  // 4. Submit Message & Send to Backend (Step 4 -> COMPLETED)
  const handleFinalSubmit = async (finalMessage: string) => {
    const trimmed = finalMessage.trim();
    if (!trimmed) {
      setInputError("অনুগ্রহ করে আপনার বার্তার বিবরণ লিখুন।");
      return;
    }

    // 1. Gather all collected fields from state:
    const payload = {
      name: formData.name,       // state storing the full name
      email: formData.email,     // state storing the email
      subject: formData.subject || "General Inquiry", // state storing the selected subject
      message: trimmed,          // the current message text
    };

    console.log("Submitting contact payload:", payload);

    setInputError("");
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));
      console.log("Server response:", result);

      if (!res.ok) {
        throw new Error(result.error || "Failed to dispatch email");
      }

      // 2. Only show the success bubble AFTER the request succeeds:
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: "user",
          text: trimmed,
          time: getCurrentTime(),
        },
        {
          id: `bot-confirm-${Date.now() + 1}`,
          sender: "bot",
          text: "ধন্যবাদ! আপনার বার্তাটি আমাদের টিমের কাছে পাঠানো হয়েছে। আমরা দ্রুত support@rimslin.com থেকে আপনার ইমেইলে উত্তর দেব।",
          time: getCurrentTime(),
        },
      ]);

      setFormData((prev) => ({ ...prev, message: trimmed }));
      setInputValue("");
      setStep("COMPLETED");
    } catch (error: any) {
      console.error("Submission failed:", error);
      const errMsg =
        error.message || "বার্তা পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।";
      setSubmitError(errMsg);
      alert("বার্তা পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form Submit Dispatcher
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleNameSubmit(inputValue);
    } else if (step === 2) {
      handleEmailSubmit(inputValue);
    } else if (step === 4) {
      handleFinalSubmit(inputValue);
    }
  };

  // Reset / Restart Conversation
  const handleReset = () => {
    setStep(1);
    setInputValue("");
    setInputError("");
    setSubmitError(null);
    setIsTyping(false);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: "আসসালামু আলাইকুম! Rimslin সাপোর্টে স্বাগতম। আপনার কি সহায়তা প্রয়োজন? অনুগ্রহ করে প্রথমে আপনার পুরো নামটি লিখুন:",
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <div ref={chatboxRef} className="select-none">
      {/* 1. Floating Launcher Trigger Button (Bottom-Right) */}
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

      {/* 2. Conversational Chatbox Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rimslin লাইভ সাপোর্ট চ্যাট"
        className={`fixed z-50 bottom-20 inset-x-4 sm:inset-x-auto sm:right-5 w-auto sm:w-[410px] h-[540px] max-h-[82vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* A. Chat Header (Branded & Supportive) */}
        <div className="bg-emerald-700 text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            {/* Agent Avatar with online indicator */}
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800/90 border border-emerald-400/30 text-white shadow-inner shrink-0">
              <Headphones className="h-5 w-5 text-emerald-200" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800" />
            </div>

            <div className="flex flex-col text-left">
              <h2 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                <span>অনলাইন বার্তা ফর্ম (Rimslin Help)</span>
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[11px] text-emerald-100 opacity-90 leading-tight">
                  সাধারণত কয়েক ঘণ্টার মধ্যে উত্তর দেওয়া হয়
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Reset conversation button */}
            <button
              type="button"
              onClick={handleReset}
              title="নতুন করে শুরু করুন (Restart Chat)"
              aria-label="নতুন করে শুরু করুন"
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-600/60 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="চ্যাটবক্স বন্ধ করুন"
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-600/60 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* B. Scrollable Conversational Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              } animate-in fade-in slide-in-from-bottom-2 duration-200`}
            >
              <div className="flex items-end gap-2 max-w-[86%]">
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs">
                    R
                  </div>
                )}

                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-xs"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>

              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                {msg.time}
              </span>

              {/* Step 3: Quick-Reply Selectable Chips */}
              {msg.chips && step === 3 && (
                <div className="mt-2.5 pl-8 flex flex-col gap-1.5 w-full max-w-[90%]">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    একটি অপশন বেছে নিন:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSubjectSelect(chip)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 transition-all duration-150 hover:scale-102 active:scale-95 shadow-2xs text-left"
                      >
                        <span>{chip}</span>
                        <ChevronRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator for Bot responses */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-1 animate-in fade-in duration-150">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                R
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs px-3 py-2 flex items-center gap-1.5 shadow-xs">
                <span className="text-[11px] font-medium">
                  Rimslin Support is typing
                </span>
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </div>
            </div>
          )}

          {/* Dispatch / Sending Indicator */}
          {isSubmitting && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-1 animate-in fade-in duration-150">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                R
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs px-3.5 py-2.5 flex items-center gap-2 shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  বার্তা পাঠানো হচ্ছে...
                </span>
              </div>
            </div>
          )}

          {/* Step COMPLETED: Success State */}
          {step === "COMPLETED" && (
            <div className="py-3 px-1 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>✓ বার্তা সফলভাবে পাঠানো হয়েছে</span>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all active:scale-98 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>নতুন আরেকটি বার্তা পাঠান</span>
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* C. Bottom Input Bar & Error Feedback */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 space-y-2">
          {/* Input Validation Error */}
          {inputError && (
            <div className="text-[11px] font-medium text-red-500 dark:text-red-400 px-1 animate-in fade-in duration-150">
              {inputError}
            </div>
          )}

          {/* Network / Dispatch Error: shown above send button to protect typed message */}
          {submitError && (
            <div className="text-red-500 text-xs font-medium px-1 mt-1 flex items-center gap-1 animate-in fade-in duration-150">
              <span>⚠️ {submitError}</span>
            </div>
          )}

          {step !== 3 && step !== "COMPLETED" ? (
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              {step === 4 ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  rows={2}
                  value={inputValue}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (inputError) setInputError("");
                    if (submitError) setSubmitError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleFormSubmit(e);
                    }
                  }}
                  placeholder="আপনার জিজ্ঞাসা বিস্তারিত লিখুন..."
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 transition-colors resize-none"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={step === 2 ? "email" : "text"}
                  value={inputValue}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (inputError) setInputError("");
                    if (submitError) setSubmitError(null);
                  }}
                  placeholder={
                    step === 1
                      ? "যেমন: মোহাম্মদ করিম"
                      : "yourname@example.com"
                  }
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 transition-colors"
                />
              )}

              <button
                type="submit"
                disabled={!inputValue.trim() || isSubmitting || isTyping}
                aria-label="পাঠান"
                className="h-10 w-10 sm:h-10.5 sm:w-10.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          ) : step === 3 ? (
            <div className="py-1 px-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              👆 উপরের অপশনগুলো থেকে একটি বিষয় বেছে নিন
            </div>
          ) : null}

          {/* Trust & Email Fallback */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-0.5 px-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>নিরাপদ ও সংরক্ষিত</span>
            </span>
            <a
              href="mailto:support@rimslin.com"
              className="hover:text-emerald-500 transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>support@rimslin.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

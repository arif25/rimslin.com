"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  isMobile = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; shortCode: string; nativeName: string }[] = [
    { code: "bn", label: "বাংলা (BN)", shortCode: "BN", nativeName: "বাংলা" },
    { code: "hi", label: "हिन्दी (HI)", shortCode: "HI", nativeName: "हिन्दी" },
    { code: "en", label: "English (EN)", shortCode: "EN", nativeName: "English" },
    { code: "ar", label: "العربية (AR)", shortCode: "AR", nativeName: "العربية" },
  ];

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // If inside mobile drawer, provide an intuitive 4-pill segmented grid
  if (isMobile) {
    return (
      <div className={`w-full max-w-full rounded-2xl border border-slate-200 bg-slate-50 dark:border-gulf-500/30 dark:bg-[#07140c] p-3 min-w-0 ${className}`}>
        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-emerald-700 dark:text-gulf-300">
          <Globe className="h-4 w-4 text-amber-500 dark:text-gold-400" />
          <span>
            {language === "ar"
              ? "اختيار اللغة / Select Language"
              : language === "hi"
              ? "भाषा चुनें / Choose Language"
              : "ভাষা নির্বাচন করুন / Choose Language"}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-full min-w-0">
          {languages.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex flex-col items-center justify-center rounded-xl py-2 px-1 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-surface-100 dark:text-slate-300 dark:hover:bg-surface-200 dark:hover:text-white"
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className="text-[10px] font-mono opacity-80">({lang.shortCode})</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-start max-w-full z-50 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-gulf-500/30 dark:bg-surface-100/90 dark:text-slate-200 dark:hover:border-gulf-400 dark:hover:bg-surface-200/90 dark:hover:text-white max-w-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
      >
        <Globe className="h-4 w-4 text-emerald-600 dark:text-gulf-400 transition-transform duration-300 group-hover:rotate-45 shrink-0" />
        <span className="font-bold text-slate-800 dark:text-white tracking-wide truncate">{currentLang.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-emerald-600 dark:text-gulf-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu - adapts side based on RTL */}
      {isOpen && (
        <div
          className={`absolute z-[999] mt-2 w-52 max-w-[90vw] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl ring-1 ring-black/5 dark:border-gulf-500/30 dark:bg-[#08150d] dark:shadow-2xl dark:shadow-black dark:ring-white/10 ${
            isRTL
              ? "left-0 end-0 origin-top-left"
              : "right-0 end-0 origin-top-right"
          }`}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/[0.06] mb-1 flex items-center justify-between">
            <span>{isRTL ? "اختر اللغة" : "Select Language"}</span>
            <span className="text-amber-500 dark:text-gold-400 font-mono text-[9px]">4 Languages</span>
          </div>

          <div className="space-y-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-700 dark:bg-gulf-500/20 dark:text-gulf-300 font-bold border border-emerald-300 dark:border-gulf-500/40"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-surface-200 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lang.nativeName}</span>
                    <span className="text-[11px] font-mono text-slate-400">({lang.shortCode})</span>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

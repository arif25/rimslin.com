"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themeOptions = [
    {
      value: "light",
      label:
        language === "bn"
          ? "লাইট মোড"
          : language === "hi"
          ? "लाइट मोड"
          : language === "ar"
          ? "الوضع الفاتح"
          : "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label:
        language === "bn"
          ? "ডার্ক মোড"
          : language === "hi"
          ? "डार्क मोड"
          : language === "ar"
          ? "الوضع الداكن"
          : "Dark",
      icon: Moon,
    },
    {
      value: "system",
      label:
        language === "bn"
          ? "সিস্টেম"
          : language === "hi"
          ? "सिस्टम"
          : language === "ar"
          ? "تلقائي النظام"
          : "System",
      icon: Monitor,
    },
  ];

  if (!mounted) {
    return (
      <div
        className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-slate-200 dark:border-gulf-500/30 bg-white/80 dark:bg-surface-100/90 ${className}`}
      />
    );
  }

  return (
    <div className={`relative inline-block text-start z-50 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-gulf-500/30 dark:bg-surface-100/90 dark:text-slate-200 dark:hover:border-gulf-400 dark:hover:bg-surface-200/90 dark:hover:text-white"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-amber-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 text-gulf-400 dark:rotate-0 dark:scale-100" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 end-0 right-0 rtl:right-auto rtl:left-0 z-[999] min-w-[150px] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl ring-1 ring-black/5 dark:border-gulf-500/30 dark:bg-[#08150d] dark:shadow-2xl dark:shadow-black dark:ring-white/10 origin-top">
          <div className="space-y-0.5">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-700 dark:bg-gulf-500/20 dark:text-gulf-300 font-bold"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-slate-500 dark:text-gulf-400" />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
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

export default ThemeToggle;

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  MessageSquare,
  Sparkles,
  Volume2,
  HardHat,
  Compass,
  MessageCircle,
  Bot,
  BookOpen,
  ChevronDown,
  Menu,
  Star,
  HeartPulse,
  ShieldCheck,
  Plane,
  Download,
  HelpCircle,
  Headphones,
  PlayCircle,
  Tv,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  const { t } = useLanguage();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Primary visible items on the left side
  const primaryNavLinks = [
    {
      name: t.navbar.audioDemo,
      href: "#phrase-demo",
      icon: Volume2,
    },
    {
      name: "ভিডিও ক্লাস",
      href: "#video-gallery",
      icon: Tv,
    },
    {
      name: t.navbar.jobTracks,
      href: "#job-tracks",
      icon: HardHat,
    },
    {
      name: t.navbar.countryDialects,
      href: "#country-dialects",
      icon: Compass,
    },
    {
      name: t.navbar.dailyDialogues,
      href: "#daily-dialogues",
      icon: MessageCircle,
    },
    {
      name: t.navbar.aiVoice,
      href: "#ai-coach",
      icon: Bot,
    },
    {
      name: t.navbar.curriculum,
      href: "#course-plans",
      icon: BookOpen,
    },
    {
      name: t.navbar.freePractice,
      href: "#free-practice",
      icon: PlayCircle,
    },
  ];

  // Secondary items in the "More" popover dropdown
  const moreNavLinks = [
    {
      name: t.navbar.moreItems.testimonials,
      href: "#testimonials",
      icon: Star,
    },
    {
      name: t.navbar.moreItems.emergencyPhrases,
      href: "#emergency-phrases",
      icon: HeartPulse,
    },
    {
      name: t.navbar.moreItems.workerRights,
      href: "#worker-rights",
      icon: ShieldCheck,
    },
    {
      name: t.navbar.moreItems.airportGuide,
      href: "#airport-guide",
      icon: Plane,
    },
    {
      name: t.navbar.moreItems.audioDownloads,
      href: "#audio-downloads",
      icon: Download,
    },
    {
      name: t.navbar.moreItems.faq,
      href: "#faq",
      icon: HelpCircle,
    },
    {
      name: t.navbar.moreItems.contact,
      href: "#contact",
      icon: Headphones,
    },
  ];

  const whatsappUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(
    t.navbar.whatsappMessage
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 dark:border-gulf-500/20 dark:bg-[#060b08]/95 backdrop-blur-md shadow-sm dark:shadow-lg dark:shadow-black/20 transition-colors duration-200">
      {/* Top Tier: Main Action Header */}
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl w-full items-center justify-between px-3 sm:px-6 lg:px-8 min-w-0">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-400 p-[1px] shadow-md shadow-emerald-900/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-100 dark:bg-[#07120b]">
              <Globe className="h-5 w-5 text-emerald-600 dark:text-gulf-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Rimslin
              </span>
              <span className="rounded bg-emerald-500/15 dark:bg-gulf-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-gulf-400 border border-emerald-500/30 dark:border-gulf-500/30">
                {t.navbar.brandTag}
              </span>
            </div>
            <span className="hidden md:inline-block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-300 font-medium tracking-wide">
              {t.navbar.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Right Side: Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          {/* Theme Toggle (Light / Dark / System) */}
          <ThemeToggle />

          {/* 1. Language Dropdown */}
          <LanguageSwitcher />

          {/* 2. Direct WhatsApp Helpline Button */}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold transition-colors shadow-sm shrink-0"
            title={t.navbar.whatsappHelp}
            aria-label={t.navbar.whatsappHelp}
          >
            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{t.navbar.whatsappHelp}</span>
          </Link>

          {/* 3. Primary Start Course CTA */}
          <Link
            href="#course-plans"
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white dark:from-gulf-500 dark:via-emerald-500 dark:to-gold-400 dark:text-slate-950 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-all shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="whitespace-nowrap">{t.navbar.startCourse}</span>
          </Link>
        </div>
      </div>

      {/* Bottom Tier: Category & Section Navigation Bar + "More" Dropdown */}
      <div className="w-full border-t border-b border-slate-200/80 bg-white/80 dark:border-gulf-500/20 dark:bg-[#07130b]/95 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Primary Navigation Links (Horizontally scrollable on mobile) */}
          <nav
            aria-label="Section navigation"
            className="w-full overflow-x-auto no-scrollbar flex items-center justify-start ltr:justify-start rtl:justify-start gap-1.5 sm:gap-2.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap text-left ltr:text-left rtl:text-right min-w-0 flex-1"
          >
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 dark:text-slate-300 dark:hover:text-gulf-300 dark:hover:bg-gulf-500/15 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 dark:focus:ring-gulf-500/40 shrink-0 border border-transparent hover:border-emerald-500/20 dark:hover:border-gulf-500/20 transition-all active:scale-95"
                >
                  <Icon className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400/90 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* "More" Popover Dropdown Toggle */}
          <div className="relative shrink-0 py-2 z-50" ref={moreDropdownRef}>
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all border ${
                isMoreOpen
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20 dark:bg-gulf-500 dark:text-slate-950 dark:border-gulf-400 dark:shadow-gulf-500/20"
                  : "bg-white/90 text-slate-700 border-slate-200/80 hover:border-emerald-500/40 hover:bg-slate-100 hover:text-slate-900 dark:bg-surface-100/90 dark:text-slate-200 dark:border-white/10 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200 dark:hover:text-white"
              }`}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              aria-label={t.navbar.more}
            >
              <Menu className="h-3.5 w-3.5 shrink-0" />
              <span>{t.navbar.more}</span>
              <ChevronDown
                className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                  isMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Floating Popover Menu */}
            {isMoreOpen && (
              <div
                className="absolute top-full mt-2 z-50 min-w-[260px] max-w-[90vw] rounded-2xl border border-slate-200 bg-white/98 text-slate-800 shadow-2xl backdrop-blur-2xl animate-fade-in ring-1 ring-black/5 dark:border-gulf-500/30 dark:bg-[#08150d]/98 dark:text-slate-200 dark:shadow-black/90 dark:ring-white/10 ltr:right-0 rtl:left-0 origin-top"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/[0.06] mb-1 flex items-center justify-between">
                  <span>{t.navbar.more}</span>
                  <span className="text-amber-500 dark:text-gold-400 font-mono text-[9px]">7 Resources</span>
                </div>

                <div className="space-y-0.5">
                  {moreNavLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-gulf-500/15 dark:hover:text-white transition-colors"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 group-hover:border-emerald-500/30 group-hover:bg-emerald-100/50 dark:bg-white/5 dark:border-white/5 dark:group-hover:border-gulf-500/30 dark:group-hover:bg-gulf-500/20 transition-colors shrink-0">
                          <Icon className="h-3.5 w-3.5 text-emerald-600 group-hover:text-amber-500 dark:text-gulf-400 dark:group-hover:text-gold-400 transition-colors" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

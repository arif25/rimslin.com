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
  X,
  Star,
  HeartPulse,
  ShieldCheck,
  Plane,
  Download,
  HelpCircle,
  Headphones,
  PlayCircle,
  Tv,
  Mail,
  Home,
  Info,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  const { t } = useLanguage();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileDrawerOpen(false);
        setIsMoreOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Primary visible items on the Tier 3 navigation bar
  const primaryNavLinks = [
    {
      name: "হোম",
      href: "/",
      icon: Home,
    },
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
    {
      name: "আমাদের সম্পর্কে",
      href: "/about",
      icon: Info,
    },
    {
      name: "যোগাযোগ",
      href: "/contact",
      icon: Headphones,
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
      name: "Privacy Policy",
      href: "/privacy-policy",
      icon: ShieldCheck,
    },
    {
      name: "Terms & Conditions",
      href: "/terms-and-conditions",
      icon: FileText,
    },
  ];

  const whatsappUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(
    t.navbar.whatsappMessage
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 dark:bg-[#060b08] shadow-sm dark:shadow-black/30 transition-colors duration-200">
      {/* ========================================================================= */}
      {/* TIER 1: TOP UTILITY BAR (Above Logo - Right-Aligned & Slim)              */}
      {/* ========================================================================= */}
      <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-slate-100/95 dark:bg-gray-950 dark:bg-[#030704] text-xs py-0 transition-colors duration-200 relative z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-0 flex items-center justify-end gap-4 w-full text-slate-600 dark:text-slate-400">
          {/* 1. Support Email */}
          <a
            href="mailto:support@rimslin.com"
            className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-gulf-300 font-medium transition-colors shrink-0"
            title="Official Support Email: support@rimslin.com"
            aria-label="Official Support Email: support@rimslin.com"
          >
            <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400 shrink-0" />
            <span className="hidden sm:inline font-mono text-[11px] sm:text-xs">
              support@rimslin.com
            </span>
            <span className="sm:hidden font-mono text-[11px]">ইমেইল</span>
          </a>

          {/* 2. WhatsApp Help */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors shrink-0"
            title={t.navbar.whatsappHelp}
            aria-label={t.navbar.whatsappHelp}
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline text-xs">{t.navbar.whatsappHelp}</span>
            <span className="sm:hidden text-[11px]">হোয়াটসঅ্যাপ</span>
          </a>

          {/* 3. Language Dropdown Selector */}
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>

          {/* 4. Dark / Light Mode Toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TIER 2: MAIN BRANDING BAR (Center Row with Logo & CTA)                   */}
      {/* ========================================================================= */}
      <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 dark:bg-[#060b08] backdrop-blur-md transition-colors duration-200 relative z-40">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl w-full items-center justify-between px-3 sm:px-6 lg:px-8 min-w-0">
          {/* Left Side: Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-400 p-[1px] shadow-md shadow-emerald-900/20">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-100 dark:bg-gray-900 dark:bg-[#07120b] transition-colors">
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-gulf-400 transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                  Rimslin<span className="text-amber-500 dark:text-gold-400">.com</span>
                </span>
                <span className="rounded-full bg-emerald-500/15 dark:bg-gulf-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-gulf-400 border border-emerald-500/30 dark:border-gulf-500/30">
                  {t.navbar.brandTag}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium tracking-wide mt-0.5">
                {t.navbar.brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Right Side: Primary CTA Button & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Primary Start Course CTA */}
            <Link
              href="#course-plans"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white dark:from-gulf-500 dark:via-emerald-500 dark:to-gold-400 dark:text-slate-950 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all shrink-0"
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{t.navbar.startCourse}</span>
            </Link>

            {/* Mobile Hamburger Drawer Button (Visible on screens < lg) */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800 dark:bg-surface-100 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-gulf-400 hover:border-emerald-500 dark:hover:border-gulf-400 focus:outline-none transition-colors shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileDrawerOpen}
            >
              {isMobileDrawerOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TIER 3: NAVIGATION MENU BAR (Lower Section with Nav Links & More Menu)   */}
      {/* ========================================================================= */}
      <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-slate-50/95 dark:bg-gray-950 dark:bg-[#07130b] transition-colors duration-200 relative z-30">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Horizontal Navigation Links (Smooth scrollable on mobile/tablet) */}
          <nav
            aria-label="Section navigation"
            className="w-full overflow-x-auto no-scrollbar flex items-center justify-start ltr:justify-start rtl:justify-start gap-1 sm:gap-2 py-2 text-xs sm:text-sm font-medium whitespace-nowrap text-left ltr:text-left rtl:text-right min-w-0 flex-1"
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
                  : "bg-white text-slate-700 border-gray-200 dark:border-gray-800 hover:border-emerald-500/40 hover:bg-slate-100 hover:text-slate-900 dark:bg-gray-800 dark:bg-surface-100 dark:text-slate-200 dark:hover:border-gulf-500/40 dark:hover:bg-gray-700 dark:hover:text-white"
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

            {/* Floating Popover Menu - Solid background, z-[999], and high elevation */}
            {isMoreOpen && (
              <div
                className="absolute top-full mt-2 end-0 right-0 rtl:right-auto rtl:left-0 z-[999] min-w-[270px] max-w-[90vw] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white p-2 text-slate-800 shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:bg-[#08150d] dark:text-slate-200 dark:shadow-2xl dark:shadow-black dark:ring-white/10 origin-top"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-gray-100 dark:border-gray-800 mb-1.5 flex items-center justify-between">
                  <span>{t.navbar.more}</span>
                  <span className="text-amber-600 dark:text-gold-400 font-mono text-[9px] font-semibold">
                    8 Resources
                  </span>
                </div>

                <div className="space-y-1">
                  {moreNavLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-gulf-500/15 dark:hover:text-white transition-colors"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 border border-gray-200 group-hover:border-emerald-500/30 group-hover:bg-emerald-100/50 dark:bg-gray-800 dark:border-gray-700 dark:group-hover:border-gulf-500/30 dark:group-hover:bg-gulf-500/20 transition-colors shrink-0">
                          <Icon className="h-3.5 w-3.5 text-emerald-600 group-hover:text-amber-500 dark:text-gulf-400 dark:group-hover:text-gold-400 transition-colors" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Need help? Email us (Popover Footer) */}
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/60 dark:border-gulf-500/20 dark:bg-gulf-950/40 p-2.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-gulf-300 mb-1 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
                      <span>Need help? Email us</span>
                    </div>
                    <a
                      href="mailto:support@rimslin.com"
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-gulf-400 hover:underline transition-colors font-mono"
                    >
                      support@rimslin.com
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OUT NAVIGATION DRAWER (Full Sheet)                          */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-y-0 right-0 z-[1001] w-full max-w-sm bg-white dark:bg-gray-900 dark:bg-[#08150d] text-slate-800 dark:text-slate-100 shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ease-out"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 dark:bg-[#08150d]">
              <Link
                href="/"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-400 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-100 dark:bg-gray-900 dark:bg-[#07120b] transition-colors">
                    <Globe className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
                    Rimslin<span className="text-amber-500 dark:text-gold-400">.com</span>
                  </span>
                  <span className="rounded-full bg-emerald-500/15 dark:bg-gulf-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-gulf-400 border border-emerald-500/30 dark:border-gulf-500/30">
                    {t.navbar.brandTag}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Primary Start Course CTA */}
              <Link
                href="#course-plans"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white dark:from-gulf-500 dark:via-emerald-500 dark:to-gold-400 dark:text-slate-950 py-3 text-sm font-bold shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.navbar.startCourse}</span>
              </Link>

              {/* Main Navigation Sections */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                  প্রধান সেকশনসমূহ
                </h4>
                <div className="space-y-1">
                  {primaryNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-gulf-500/15 dark:hover:text-white transition-colors"
                      >
                        <Icon className="h-4 w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Additional Resources & Policies */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                  অতিরিক্ত রিসোর্স ও নীতিমালা
                </h4>
                <div className="space-y-1">
                  {moreNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-gulf-500/15 dark:hover:text-white transition-colors"
                      >
                        <Icon className="h-4 w-4 text-amber-500 dark:text-gold-400 shrink-0" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Direct Support Card */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/80 dark:border-gulf-500/20 dark:bg-gulf-950/40 p-4 space-y-3">
                <div className="text-xs font-bold text-emerald-800 dark:text-gulf-300">
                  সরাসরি সহায়তা ও অনুসন্ধান
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-white transition-colors"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>হোয়াটসঅ্যাপ: +৮৮০ ১৭০০-০০০০০০</span>
                </a>

                <a
                  href="mailto:support@rimslin.com"
                  className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono">support@rimslin.com</span>
                </a>
              </div>

              {/* Mobile Language Switcher (Segmented Grid) */}
              <div>
                <LanguageSwitcher isMobile={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

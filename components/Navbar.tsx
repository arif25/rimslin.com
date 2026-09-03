"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, MessageSquare, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t.navbar.audioDemo, href: "#audio-demo" },
    { name: t.navbar.jobTracks, href: "#job-tracks" },
    { name: t.navbar.curriculum, href: "#curriculum" },
    { name: t.navbar.aiVoice, href: "#ai-voice" },
    { name: t.navbar.reviews, href: "#reviews" },
    { name: t.navbar.faq, href: "#faq" },
  ];

  const whatsappUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(
    t.navbar.whatsappMessage
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gulf-500/20 bg-[#060b08]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-gulf-600 via-gulf-400 to-gold-400 p-[1px] shadow-lg shadow-gulf-900/40">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#07120b]">
              <Globe className="h-5 w-5 text-gulf-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white">
                Rimslin
              </span>
              <span className="rounded bg-gulf-500/20 px-1.5 py-0.2 text-[10px] font-bold text-gulf-400 border border-gulf-500/30">
                {t.navbar.brandTag}
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium tracking-wide">
              {t.navbar.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 rounded-full border border-white/[0.08] bg-surface-100/70 px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-gulf-500/15 hover:text-gulf-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs & Language Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Multi-language selector dropdown */}
          <LanguageSwitcher />

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-900/60 hover:border-emerald-400"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.navbar.whatsappHelp}</span>
          </Link>

          <Link
            href="#curriculum"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gulf-600 via-gulf-500 to-gold-500 p-[1px] font-medium text-white shadow-lg shadow-gulf-600/25 transition-all duration-300 hover:shadow-gulf-500/40 hover:scale-[1.02]"
          >
            <span className="inline-flex h-full w-full items-center gap-1.5 rounded-[11px] bg-[#0b1a11] px-3.5 py-2 text-xs font-bold text-white transition-all group-hover:bg-opacity-80">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              {t.navbar.startCourse}
            </span>
          </Link>
        </div>

        {/* Mobile menu toggle & quick language */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-surface-200 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-gulf-500/20 bg-[#09130d]/95 backdrop-blur-2xl px-6 py-6 transition-all">
          <div className="flex flex-col space-y-3">
            {/* Language Switcher in Mobile Drawer */}
            <LanguageSwitcher isMobile={true} className="mb-2" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-gulf-900/40 hover:text-gulf-300"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/70 py-2.5 text-sm font-semibold text-emerald-300"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t.navbar.whatsappHelp}</span>
              </Link>

              <Link
                href="#curriculum"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf-600 to-gold-500 py-3 text-sm font-bold text-white shadow-md shadow-gulf-600/30"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.navbar.syllabusMobile}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

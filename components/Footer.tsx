"use client";

import Link from "next/link";
import { Globe, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gulf-500/20 bg-[#040805] pt-16 pb-12 text-slate-300 w-full max-w-full overflow-hidden relative">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 w-full max-w-full min-w-0">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gulf-600 via-gulf-400 to-gold-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07120b]">
                  <Globe className="h-5 w-5 text-gulf-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  Rimslin<span className="text-gold-400">.com</span>
                </span>
                <span className="text-[11px] text-gulf-300 font-medium">
                  {t.footer.brandSubtitle}
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-300">
              {t.footer.description}
            </p>

            {/* Direct WhatsApp Helpline Card */}
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>{t.footer.hotlineTitle}</span>
              </div>
              <Link
                href="https://wa.me/8801700000000?text=I%20want%20information%20about%20Rimslin"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-black text-white hover:text-emerald-300 transition-colors"
              >
                <span>+৮৮০ ১৭০০-০০০০০০</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  {t.footer.directChat}
                </span>
              </Link>
            </div>
          </div>

          {/* Col 2: Job Tracks */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gulf-400">
              {t.footer.colJobTracks}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.jobTracksLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-gold-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Courses */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gulf-400">
              {t.footer.colCurriculum}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.curriculumLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-gold-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Gulf Destinations */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              {t.footer.colCountries}
            </h3>
            <ul className="mt-4 space-y-2">
              {t.footer.countries.map((country, idx) => (
                <li key={idx}>
                  <span className="text-xs text-slate-300 block">
                    {country.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Worker Rights & Education Disclaimer */}
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-[#07110a] p-4 text-[11px] text-slate-400 leading-relaxed w-full max-w-full min-w-0 overflow-hidden">
          <p>
            ℹ️ <strong>{t.footer.disclaimerLabel}</strong> {t.footer.disclaimerText}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-400 sm:flex-row w-full max-w-full min-w-0">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.footer.statusText}
            </span>
            <span className="text-slate-400">•</span>
            <Link href="#faq" className="hover:text-white transition-colors">
              {t.footer.faqLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

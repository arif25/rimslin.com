import Link from "next/link";
import { Globe, MessageSquare, PhoneCall, Mail, Heart, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  const footerTracks = [
    { name: "কনস্ট্রাকশন ও সাইট আরবি", href: "#job-tracks" },
    { name: "ড্রাইভার ও ডেলিভারি রাইডার", href: "#job-tracks" },
    { name: "হোটেল ও রেস্টুরেন্ট স্টাফ", href: "#job-tracks" },
    { name: "জেনারেল হেল্পার ও ক্লিনার", href: "#job-tracks" },
    { name: "দৈনন্দিন বাজার ও স্যালারি টক", href: "#audio-demo" },
  ];

  const footerCurriculum = [
    { name: "৩ মাস: এয়ারপোর্ট সারভাইভাল", href: "#curriculum" },
    { name: "৬ মাস: ওয়ার্কপ্লেস প্রফেশনাল", href: "#curriculum" },
    { name: "১২ মাস: কমপ্লিট মাস্টার কোর্স", href: "#curriculum" },
    { name: "এআই ভয়েস কোচ সিমুলেটর", href: "#ai-voice" },
    { name: "ফ্রি অডিও স্যাম্পল ও ফ্রেজ", href: "#audio-demo" },
  ];

  const gulfCountries = [
    { name: "🇸🇦 সৌদি আরব (Saudi Arabia)", href: "#job-tracks" },
    { name: "🇦🇪 সংযুক্ত আরব আমিরাত (Dubai / UAE)", href: "#job-tracks" },
    { name: "🇶🇦 কাতার (Qatar)", href: "#job-tracks" },
    { name: "🇰🇼 কুয়েত (Kuwait)", href: "#job-tracks" },
    { name: "🇴🇲 ওমান (Oman)", href: "#job-tracks" },
    { name: "🇧🇭 বাহরাইন (Bahrain)", href: "#job-tracks" },
  ];

  return (
    <footer className="border-t border-gulf-500/20 bg-[#040805] pt-16 pb-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
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
                  প্রবাসী ভাষা ও ক্যারিয়ার প্ল্যাটফর্ম
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-300">
              বাংলাদেশ থেকে সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমানগামী ভাইদের জন্য সহজ গালফ স্পোকেন আরবি, জব ইংলিশ ও হিন্দি শিক্ষার নির্ভরযোগ্য মাধ্যম।
            </p>

            {/* Direct WhatsApp Helpline Card */}
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>২৪/৭ প্রবাসী হোয়াটসঅ্যাপ হেল্পলাইন:</span>
              </div>
              <Link
                href="https://wa.me/8801700000000?text=আমি%20রিমসলিন%20সম্পর্কে%20জানতে%20চাই"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-black text-white hover:text-emerald-300 transition-colors"
              >
                <span>+৮৮০ ১৭০০-০০০০০০</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  সরাসরি চ্যাট
                </span>
              </Link>
            </div>
          </div>

          {/* Col 2: Job Tracks */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gulf-400">
              কাজের স্পেশাল ট্র্যাক
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerTracks.map((link, idx) => (
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
              কোর্স ও কারিকুলাম
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerCurriculum.map((link, idx) => (
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
              গালফ কান্ট্রি হাব
            </h3>
            <ul className="mt-4 space-y-2">
              {gulfCountries.map((country, idx) => (
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
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-[#07110a] p-4 text-[11px] text-slate-400 leading-relaxed">
          <p>
            ℹ️ <strong>ঘোষণা ও দিকনির্দেশনা:</strong> রিমসলিন (rimslin.com) একটি স্বাধীন ভাষা ও কর্মদক্ষতা শিক্ষা প্ল্যাটফর্ম। আমরা মধ্যপ্রাচ্যের ভিসা বা চাকরি বিক্রয় করি না। আমাদের উদ্দেশ্য প্রবাসী ভাইদের ভাষা শিখিয়ে কর্মস্থলে অধিক বেতন, নিরাপত্তা ও মর্যাদা অর্জনে সহায়তা করা।
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© ২০২৬ Rimslin (rimslin.com)। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              rimslin.com লাইভ
            </span>
            <span className="text-slate-400">•</span>
            <Link href="#faq" className="hover:text-white transition-colors">
              সাধারণ প্রশ্ন (FAQ)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

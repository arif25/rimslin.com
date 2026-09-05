import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileCheck, ShieldAlert, Scale, BookOpen, AlertTriangle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | ব্যবহারের শর্তাবলী - Rimslin",
  description:
    "Terms and Conditions governing the use of Rimslin.com. Review our educational content disclaimers, intellectual property policies, user conduct rules, and liability limitations.",
  alternates: {
    canonical: "https://rimslin.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  const effectiveDate = "September 4, 2026";

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-12 sm:py-20">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[500px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-70"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors">
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Terms & Conditions</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Scale className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>User Agreement & Terms</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Terms & Conditions
              <span className="block text-xl sm:text-2xl mt-2 font-bold text-emerald-600 dark:text-gulf-400">
                ব্যবহারের শর্তাবলী ও নীতিমালা
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Last Updated / কার্যকর তারিখ: <span className="font-semibold text-slate-700 dark:text-slate-300">{effectiveDate}</span>
            </p>
          </div>

          {/* Terms Article */}
          <article className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100/95 backdrop-blur-md p-6 sm:p-10 shadow-xl space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {/* 1. Agreement to Terms */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>১. শর্তাবলীর স্বীকৃতি (Agreement to Terms)</span>
              </h2>
              <p>
                Welcome to <strong>Rimslin</strong> (<a href="https://rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline font-semibold">https://rimslin.com</a>). By accessing or using our website, video gallery, audio phrase learning tools, or related services, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
              </p>
              <p>
                If you do not agree with any part of these terms, you must discontinue the use of Rimslin immediately.
              </p>
            </section>

            {/* 2. Educational Purpose Disclaimer */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>২. শিক্ষামূলক উদ্দেশ্য ও সাধারণ ঘোষণা (Educational Purpose Disclaimer)</span>
              </h2>
              <p>
                The materials and information available on Rimslin are provided exclusively for general informational and educational purposes to assist learners in acquiring conversational spoken Arabic and vocational language skills.
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  ⚠️ আইনি বা অভিবাসন পরামর্শ সংক্রান্ত অস্বীকৃতি (Legal & Immigration Disclaimer):
                </p>
                <p>
                  Rimslin কোনো রিক্রুটিং বা সরকারি ভিসা প্রদানকারী সংস্থা নয়। আমাদের ওয়েবসাইটের তথ্যাবলি কোনো দেশের ভিসা, আইনি সহায়তা কিংবা নিশ্চিত চাকরির গ্যারান্টি প্রদান করে না। প্রবাসে গমনাগমনের ক্ষেত্রে সর্বদা সংশ্লিষ্ট দেশের দূতাবাস ও সরকারি নিয়মাবলী অনুসরণ করুন।
                </p>
              </div>
            </section>

            {/* 3. Intellectual Property Rights */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৩. মেধাসম্পদ ও স্বত্বাধিকার (Intellectual Property Rights)
              </h2>
              <p>
                Unless otherwise indicated, the website design, logos, graphics, text explanations, custom audio compilation, and software code are the proprietary intellectual property of Rimslin.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>You are granted a personal, non-exclusive, non-transferable license to access and use the educational content for personal learning purposes.</li>
                <li>You may not reproduce, republish, sell, distribute, or commercially exploit any part of Rimslin without prior written consent from us.</li>
              </ul>
            </section>

            {/* 4. Third-Party Content & YouTube Embedding */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৪. থার্ড-পার্টি কনটেন্ট ও ইউটিউব লিংক (Third-Party Content & YouTube Terms)
              </h2>
              <p>
                Our platform embeds publicly available YouTube video tutorials using the official YouTube IFrame Embed API. All embedded YouTube videos, audio streams, and trademarks belong to their respective content creators and channels (including MinArabic, Daily Life Arabic, ArabicPod101, etc.).
              </p>
              <p>
                By viewing these embedded videos on Rimslin, you also agree to be bound by the{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-gulf-400 font-semibold underline"
                >
                  YouTube Terms of Service
                </a>. Rimslin claims no ownership over third-party video media.
              </p>
            </section>

            {/* 5. User Conduct & Acceptable Use */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৫. ব্যবহারকারীর আচরণ ও বিধিনিষেধ (User Conduct & Prohibited Uses)
              </h2>
              <p>When using Rimslin.com, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Engage in any automated scraping, data harvesting, or systematic extraction of platform data without authorization.</li>
                <li>Attempt to bypass, disable, or interfere with security features or content restrictions of the website.</li>
                <li>Transmit any malicious code, viruses, trojans, or harmful software.</li>
                <li>Submit false, misleading, or abusive messages through our contact or inquiry forms.</li>
              </ul>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-gold-400" />
                <span>৬. দায়বদ্ধতার সীমাবদ্ধতা (Limitation of Liability)</span>
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Rimslin, its founders, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the platform, including but not limited to reliance on any educational content or third-party links.
              </p>
            </section>

            {/* 7. Modifications to the Service & Terms */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৭. শর্তাবলী পরিবর্তন (Changes to Terms)
              </h2>
              <p>
                We reserve the right to modify or replace these Terms and Conditions at any time. We will update the &quot;Last Updated&quot; date at the top of this page. Your continued use of the website after any revisions constitutes your acceptance of the new terms.
              </p>
            </section>

            {/* 8. Contact Us */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৮. যোগাযোগ (Contact Us)
              </h2>
              <p>
                If you have questions regarding these Terms &amp; Conditions, please reach out to us at:
              </p>
              <p className="text-xs sm:text-sm">
                📧 Email: <a href="mailto:support@rimslin.com" className="font-sans font-semibold text-emerald-600 dark:text-gulf-400 underline">support@rimslin.com</a>
                <br />
                🌐 Website: <a href="https://rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline font-semibold">https://rimslin.com</a>
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

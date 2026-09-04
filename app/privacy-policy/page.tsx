import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Cookie, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | গোপনীয়তা নীতি - Rimslin",
  description:
    "Privacy Policy for Rimslin.com. Learn how we collect, use, and protect your information, including disclosures regarding cookies, Google AdSense, DoubleClick DART cookies, and YouTube embeds.",
  alternates: {
    canonical: "https://rimslin.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const effectiveDate = "September 4, 2026";

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-12 sm:py-20">
        {/* Ambient Background Glow */}
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
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Privacy Policy</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>Legal & Privacy Disclosures</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Privacy Policy
              <span className="block text-xl sm:text-2xl mt-2 font-bold text-emerald-600 dark:text-gulf-400">
                গোপনীয়তা ও ডেটা সুরক্ষা নীতিমালা
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Last Updated / কার্যকর তারিখ: <span className="font-semibold text-slate-700 dark:text-slate-300">{effectiveDate}</span>
            </p>
          </div>

          {/* Policy Card Body */}
          <article className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100/95 backdrop-blur-md p-6 sm:p-10 shadow-xl space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>১. পরিচিতি ও সাধারণ পরিধি (Introduction & Scope)</span>
              </h2>
              <p>
                At <strong>Rimslin</strong> (accessible from <a href="https://rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline">https://rimslin.com</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Rimslin and how we use it.
              </p>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:support@rimslin.com" className="text-emerald-600 dark:text-gulf-400 font-semibold underline">support@rimslin.com</a>.
              </p>
            </section>

            {/* 2. Consent */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>২. সম্মতি (Consent)</span>
              </h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. আমাদের ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি এই গোপনীয়তা নীতিমালার সকল শর্তাবলীতে সম্মতি প্রদান করছেন।
              </p>
            </section>

            {/* 3. Information We Collect */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>৩. আমরা যে তথ্য সংগ্রহ করি (Information We Collect)</span>
              </h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Contact Information:</strong> If you contact us directly via our online form or email at <code className="text-xs bg-slate-100 dark:bg-surface-200 px-1 py-0.5 rounded">support@rimslin.com</code>, we may receive additional information about you such as your name, email address, the contents of the message, and any attachments you may send us.
                </li>
                <li>
                  <strong>Log Files:</strong> Like most standard website servers, Rimslin follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
                </li>
                <li>
                  <strong>Analytics:</strong> We use <em>Vercel Web Analytics</em>, a privacy-focused analytics service that collects anonymized aggregated performance and usage metrics (such as page views, country, device, and operating system) without tracking personal identities across third-party websites.
                </li>
              </ul>
            </section>

            {/* 4. Cookies and Web Beacons (AdSense Mandatory Clause) */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cookie className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>৪. কুকিজ ও ওয়েব বীকন (Cookies and Web Beacons)</span>
              </h2>
              <p>
                Like any other website, Rimslin uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences (such as light/dark mode settings and preferred language), and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
              </p>
            </section>

            {/* 5. Google DoubleClick DART Cookie & Third-Party Advertising (Critical for AdSense Approval) */}
            <section className="space-y-4 border-t border-slate-100 dark:border-white/5 pt-6 rounded-2xl bg-amber-500/5 dark:bg-gold-500/5 p-4 sm:p-6 border-amber-500/20">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-gold-400" />
                <span>৫. গুগল ডাবল-ক্লিক ডার্ট কুকি (Google DoubleClick DART Cookie)</span>
              </h2>
              <p className="text-xs sm:text-sm">
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <a href="https://rimslin.com" className="underline font-semibold">www.rimslin.com</a> and other sites on the internet.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-surface-200 border border-amber-500/30 text-xs sm:text-sm space-y-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  বিজ্ঞাপন অপ্ট-আউট করার উপায় (How to Opt Out):
                </p>
                <p>
                  Visitors may choose to decline or opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at the following URL:
                </p>
                <p>
                  👉{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-gulf-400 font-semibold underline break-all"
                  >
                    https://policies.google.com/technologies/ads
                  </a>
                </p>
                <p>
                  You can also manage your personalized ad settings at{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-gulf-400 font-semibold underline"
                  >
                    Google Ads Settings
                  </a>{" "}
                  or visit{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-gulf-400 font-semibold underline"
                  >
                    www.aboutads.info
                  </a>.
                </p>
              </div>
            </section>

            {/* 6. Embedded Third-Party Content (YouTube) */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>৬. থার্ড-পার্টি এমবেডেড কনটেন্ট (YouTube Video Player Embeds)</span>
              </h2>
              <p>
                Our video library embeds video lessons hosted by YouTube (Google LLC). By viewing these videos, you are subject to the YouTube Terms of Service and Google Privacy Policy. When you interact with or play embedded YouTube videos, YouTube/Google may collect viewing statistics and set cookies on your browser. For more information, please consult the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-gulf-400 underline font-semibold"
                >
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-gulf-400 underline font-semibold"
                >
                  YouTube Terms of Service
                </a>.
              </p>
            </section>

            {/* 7. Third Party Privacy Policies */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৭. তৃতীয় পক্ষের গোপনীয়তা নীতি (Third Party Privacy Policies)
              </h2>
              <p>
                Rimslin&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p>
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
              </p>
            </section>

            {/* 8. CCPA & GDPR Privacy Rights */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৮. আন্তর্জাতিক ডেটা সুরক্ষা অধিকার (CCPA & GDPR Rights)
              </h2>
              <p>
                Under data privacy regulations (including CCPA and GDPR), users have rights to request access to their personal data, request correction of any inaccurate data, request erasure of personal data under certain conditions, and opt out of the sale or processing of personal data. Rimslin does not sell any personal information. If you wish to exercise any of these rights, please contact us at <a href="mailto:support@rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline font-semibold">support@rimslin.com</a>.
              </p>
            </section>

            {/* 9. Children's Information (COPPA) */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ৯. শিশুদের সুরক্ষা (Children&apos;s Privacy Protection)
              </h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p>
                Rimslin does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </section>

            {/* 10. Contact Information */}
            <section className="space-y-3 border-t border-slate-100 dark:border-white/5 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ১০. যোগাযোগ ও ফিডব্যাক (Contact Information)
              </h2>
              <p>
                If you have any questions, suggestions, or concerns regarding our Privacy Policy or data practices, please reach out to us:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-medium">
                <li>Website: <a href="https://rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline">https://rimslin.com</a></li>
                <li>Email: <a href="mailto:support@rimslin.com" className="text-emerald-600 dark:text-gulf-400 underline">support@rimslin.com</a></li>
                <li>Subject line: <em>Privacy Policy Inquiry</em></li>
              </ul>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

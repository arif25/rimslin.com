import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  HelpCircle,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | যোগাযোগ - Rimslin",
  description:
    "Get in touch with Rimslin. Have questions about our spoken Arabic lessons, vocabulary courses, or platform feedback? Contact us at support@rimslin.com.",
  alternates: {
    canonical: "https://rimslin.com/contact",
  },
};

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      title: "অফিসিয়াল ইমেইল (Official Email)",
      value: "support@rimslin.com",
      link: "mailto:support@rimslin.com",
      desc: "যেকোনো আনুষ্ঠানিক যোগাযোগ, কোর্সের তথ্য ও পরামর্শের জন্য।",
    },
    {
      icon: MessageSquare,
      title: "হোয়াটসঅ্যাপ হেল্পলাইন (WhatsApp Helpline)",
      value: "+৮৮০ ১৭০০-০০০০০০",
      link: "https://wa.me/8801700000000?text=I%20have%20an%20inquiry%20about%20Rimslin",
      desc: "দ্রুত সহায়তা ও প্রবাসী ভাইদের তাত্ক্ষণিক বার্তা পাঠানোর জন্য।",
    },
    {
      icon: Clock,
      title: "রেসপন্স সময় (Response Time)",
      value: "২৪ – ৪৮ ঘণ্টা",
      link: null,
      desc: "আমরা প্রতিটি বার্তা গুরুত্বসহকারে দেখে দ্রুততম সময়ে উত্তর দিই।",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden relative py-12 sm:py-20">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[500px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-70"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors">
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">যোগাযোগ (Contact Us)</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>সহায়তা ও অনুসন্ধান</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Contact <span className="text-emerald-600 dark:text-gulf-400">Rimslin</span>
              <span className="block text-2xl sm:text-4xl mt-2 font-black bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                আমাদের সাথে সরাসরি যোগাযোগ করুন
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              আরবি ভাষা শিক্ষার কোনো ক্লাস সংক্রান্ত প্রশ্ন, মতামত কিংবা পরামর্শ থাকলে আমাদের অফিসিয়াল ইমেইল{" "}
              <a
                href="mailto:support@rimslin.com"
                className="font-bold text-emerald-600 dark:text-gulf-400 hover:underline"
              >
                support@rimslin.com
              </a>{" "}
              এ যেকোনো সময় যোগাযোগ করতে পারেন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info Cards (Left Col - 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 shadow-sm"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-gulf-500/15 text-emerald-600 dark:text-gulf-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-gulf-400 hover:underline transition-colors mt-0.5 inline-block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                            {item.value}
                          </p>
                        )}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Inquiry Advice Card */}
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:border-gold-500/20 dark:bg-gold-500/5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-gold-400 font-bold text-sm mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>কোন ধরনের বিষয়ে লিখতে পারেন?</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>নতুন কোনো বিষয়ের আরবি বা স্পোকেন ইংলিশ ভিডিও লেসনের অনুরোধ</li>
                  <li>কোনো শব্দ বা ফ্রেজের অনুবাদ ও উচ্চারণ স্পষ্ট করার পরামর্শ</li>
                  <li>ওয়েবসাইটের পারফরম্যান্স বা বাগের রিপোর্ট</li>
                  <li>শিক্ষামূলক অংশীদারিত্ব ও কনটেন্ট সাজেশন</li>
                </ul>
              </div>
            </div>

            {/* Contact Form (Right Col - 7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-surface-100/90 backdrop-blur-md shadow-xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  অনলাইন বার্তা ফর্ম (Inquiry Form)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  নিচের ফর্মটি পূরণ করে সাবমিট করুন। আমরা আপনার বার্তার দ্রুত প্রত্যুত্তর দেব।
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

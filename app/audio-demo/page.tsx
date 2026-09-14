import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioDemoContent from "@/components/AudioDemoContent";

export const metadata: Metadata = {
  title: "🎧 ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো | গালফ কথ্য আরবি ও ইংরেজি উচ্চারণ - Rimslin",
  description:
    "সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমান প্রবাসীদের জন্য কাজের বাস্তব গালফ কথ্য আরবি ও ইংরেজি বাক্যের সম্পূর্ণ অডিও প্লেলিস্ট। সঠিক উচ্চারণ শুনুন ও সহজে প্র্যাকটিস করুন।",
  alternates: {
    canonical: "https://rimslin.com/audio-demo",
  },
  openGraph: {
    title: "🎧 ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো | গালফ কথ্য আরবি ও ইংরেজি উচ্চারণ - Rimslin",
    description:
      "আরবি ও ইংরেজি ভাষার বাস্তব কথোপকথন শুনুন, সঠিক উচ্চারণ শিখুন এবং অডিও প্লে করে নিজে অনুশীলন করুন।",
    url: "https://rimslin.com/audio-demo",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function AudioDemoPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        <AudioDemoContent />
      </main>
      <Footer />
    </div>
  );
}

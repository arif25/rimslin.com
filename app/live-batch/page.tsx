import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveBatchContent from "@/components/LiveBatchContent";

export const metadata: Metadata = {
  title: "🔴 সরাসরি লাইভ ব্যাচ | আরবি ও ইংরেজি স্পোকেন ক্লাস (Google Meet / Zoom) - Rimslin",
  description:
    "সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমান প্রবাসীদের জন্য সরাসরি লাইভ ক্লাসে আরবি ও ইংরেজি শিক্ষা। ৩ দিনের ফ্রি ডেমো ক্লাস ও লেভেল টেস্টে অংশ নিন।",
  alternates: {
    canonical: "https://rimslin.com/live-batch",
  },
  openGraph: {
    title: "🔴 সরাসরি লাইভ ব্যাচ | আরবি ও ইংরেজি স্পোকেন ক্লাস (Google Meet / Zoom) - Rimslin",
    description:
      "প্রবাসী ভাইদের জন্য সরাসরি লাইভ ক্লাসে আরবি ও ইংরেজি ভাষা শিক্ষা। প্রথম ৩ দিনের ফ্রি ডেমো ক্লাস করে নিজের লেভেল যাচাই করুন।",
    url: "https://rimslin.com/live-batch",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function LiveBatchPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        <LiveBatchContent />
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import { Home, Compass, Globe } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gulf-500/10 text-gulf-400 border border-gulf-500/20 mb-6">
        <Globe className="h-7 w-7 text-gold-400" />
      </div>
      <h1 className="text-6xl font-black text-white tracking-tight sm:text-7xl">
        ৪০৪ <span className="text-gulf-400 font-sans">/ 404</span>
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-100">
        পৃষ্ঠাটি পাওয়া যায়নি (Page Not Found)
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-300">
        রিমসলিন (rimslin.com) এর যে পেজটি খুঁজছেন তা সরানো হয়েছে অথবা সঠিক নয়। মূল পাতায় ফিরে কোর্সগুলো দেখুন।
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gulf-600 to-gold-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gulf-900/40 hover:scale-[1.02] transition-transform"
        >
          <Home className="h-4 w-4" />
          <span>হোমে ফিরে যান (Return Home)</span>
        </Link>
        <Link
          href="/#audio-demo"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-100 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-surface-200"
        >
          <Compass className="h-4 w-4 text-gulf-400" />
          <span>অডিও ফ্রেজ শুনুন</span>
        </Link>
      </div>
    </div>
  );
}

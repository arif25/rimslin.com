import { Users, Globe2, Headphones, Award } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "২৫,০০০+",
      englishValue: "25,000+ Learners",
      label: "প্রবাসী শিক্ষার্থী",
      description: "বাংলাদেশ থেকে মধ্যপ্রাচ্যগামী ভাইয়েরা যুক্ত",
    },
    {
      icon: Globe2,
      value: "৬টি",
      englishValue: "6 Gulf Nations",
      label: "গালফ দেশ কভারেজ",
      description: "সৌদি, দুবাই, কাতার, কুয়েত, ওমান ও বাহরাইন",
    },
    {
      icon: Headphones,
      value: "১,২০০+",
      englishValue: "1,200+ Audio Clips",
      label: "কাজের অডিও ফ্রেজ",
      description: "সাইট, বাজার ও বসের সাথে কাজের খাঁটি ডায়ালগ",
    },
    {
      icon: Award,
      value: "৯৮.৪%",
      englishValue: "98.4% Success Rate",
      label: "সফলতা ও আত্মবিশ্বাস",
      description: "কাজে যোগদান ও সহজে বেতন বৃদ্ধির অভিজ্ঞতা",
    },
  ];

  return (
    <section id="stats" className="relative py-14 border-y border-gulf-500/20 bg-[#07120b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-white/[0.08] bg-surface-100/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-gulf-500/40 hover:bg-surface-200/80"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gulf-500/20 to-gold-500/10 text-gulf-300 border border-gulf-500/30">
                    <Icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {stat.englishValue}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <div className="text-sm font-bold text-gulf-300">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

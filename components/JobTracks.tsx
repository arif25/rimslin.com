import Link from "next/link";
import {
  Hammer,
  Car,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HardHat,
  Truck,
  Coffee,
  Brush,
} from "lucide-react";

export default function JobTracks() {
  const tracks = [
    {
      id: "construction",
      icon: HardHat,
      title: "কনস্ট্রাকশন ও টেকনিক্যাল ট্র্যাক",
      subtitle: "ইলেকট্রিশিয়ান, প্লাম্বার, মেসন, রডবাইন্ডার ও ফোরম্যান",
      badge: "উচ্চ চাহিদা",
      color: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-400",
      description:
        "সাইটের সেফটি রুলস, মেজারমেন্ট ও টুলসের নাম, ইঞ্জিনিয়ার ও ফোরম্যানের আদেশ বোঝা এবং কাজের প্রগ্রেস বুঝিয়ে দেওয়ার প্রয়োজনীয় আরবি ও হিন্দি।",
      keyPhrases: [
        "সউই তারকিব হাদা (এটা ফিটিং করো)",
        "জিব মিযান ওয়া সুরু (লেভেল ও পাইপ আনো)",
        "মা ফি খাহারবা (বিদ্যুৎ সংযোগ নেই)",
      ],
      topics: [
        "টুলস ও মেশিনারিজ এর আরবি নাম",
        "সাইট সেফটি ও বিপদ সংকেত",
        "ওভারটাইম ও ডিউটি হিসাব",
      ],
    },
    {
      id: "drivers",
      icon: Car,
      title: "ড্রাইভার ও ডেলিভারি রাইডার ট্র্যাক",
      subtitle: "ট্যাক্সি, উবার, তালাবাত, নুন ও প্রাইভেট ড্রাইভার",
      badge: "হট জব ট্র্যাক",
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
      description:
        "জিপিএস ও ট্রাফিক নেভিগেশন, কাস্টমারের সাথে ঠিকানা নিশ্চিত করা, ফুড ও পার্সেল ডেলিভারি এবং গাড়ি মেরামতের জরুরি কথোপকথন।",
      keyPhrases: [
        "আনা ফিল মাওকি (আমি লোকেশনে আছি)",
        "রো সিদা বা'দাইন শিমাল (সোজা গিয়ে বামে যান)",
        "হাদা তলব হাক্কিক (এটা আপনার অর্ডার)",
      ],
      topics: [
        "রাস্তা ও ল্যান্ডমার্ক চেনার শব্দ",
        "কাস্টমার কল ও রেটিং পাওয়ার টেকনিক",
        "ট্রাফিক পুলিশ ও জরিমানা বিষয়ক কথা",
      ],
    },
    {
      id: "hospitality",
      icon: UtensilsCrossed,
      title: "হোটেল ও রেস্টুরেন্ট স্টাফ ট্র্যাক",
      subtitle: "ওয়েটার, কিচেন হেল্পার, শেফ ও কফি বারিস্তা",
      badge: "ভালো টিপস",
      color: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-cyan-400",
      description:
        "কাস্টমারকে সালাম দেওয়া ও মেনু বর্ণনা, খাবার অর্ডার নেওয়া, বিল জমা দেওয়া এবং রেস্টুরেন্ট ম্যানেজারের সাথে স্মুথ ইংরেজি ও আরবিতে কথা বলা।",
      keyPhrases: [
        "আহ্লান ওয়া সাহলান, আই খেদমা? (স্বাগতম, কী সাহায্য করতে পারি?)",
        "হাদা আক্কেল মাররাহ লাজিজ (এই খাবারটা খুব সুস্বাদু)",
        "হিসাব খালাস (বিল রেডি হয়েছে)",
      ],
      topics: [
        "খাবার ও পানীয়ের আরবি-ইংরেজি তালিকা",
        "কাস্টমার কমপ্লেইন হ্যান্ডলিং",
        "ক্যাশ ও কার্ড পেমেন্ট ডায়ালগ",
      ],
    },
    {
      id: "helpers",
      icon: Brush,
      title: "জেনারেল হেল্পার ও ক্লিনার ট্র্যাক",
      subtitle: "মল ক্লিনার, অফিস বয়, ওয়্যারহাউস ও সুপারমার্কেট স্টাফ",
      badge: "সবচেয়ে সহজ",
      color: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400",
      description:
        "পরিচ্ছন্নতার সামগ্রীর নাম, দায়িত্বপ্রাপ্ত রুম পরিষ্কার করা, বসের নিত্যদিনের নির্দেশ পালন এবং বিনয়ের সাথে অনুমতি চাওয়ার ভাষা।",
      keyPhrases: [
        "আনা সউই তানযীফ আলহীন (আমি এখনই পরিষ্কার করছি)",
        "লাযিম মাসাহা ওয়া সাবুন (মপ এবং সাবান লাগবে)",
        "তামাম মুদির, কুল্লু জাহেয (ঠিক আছে স্যার, সব রেডি)",
      ],
      topics: [
        "দৈনন্দিন কাজের রুটিন শব্দমালা",
        "অফিস ও বাসা শিষ্টাচার",
        "ছুটি ও বেতন চাওয়ার নিরাপদ ভাষা",
      ],
    },
  ];

  return (
    <section id="job-tracks" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gulf-500/30 bg-gulf-950/60 px-3.5 py-1 text-xs font-semibold text-gulf-300 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            <span>পেশাভিত্তিক স্পেশাল লার্নিং ট্র্যাক</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            আপনার পেশার জন্য তৈরি{" "}
            <span className="gradient-gulf-text">নির্দিষ্ট ভাষা কোর্স</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            যেকোনো সাধারণ বই পড়ে সময় নষ্ট না করে, সরাসরি নিজের কাজের ফিল্ডের আরবি ও ইংরেজি শব্দ শিখুন।
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-100/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-gulf-500/40 hover:bg-surface-200/80 hover:shadow-2xl hover:shadow-gulf-500/10"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${track.color} border border-white/10`}
                      >
                        <Icon className={`h-6 w-6 ${track.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gulf-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[11px] font-bold text-gold-300 border border-gold-500/30 shrink-0">
                      {track.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm leading-relaxed text-slate-300">
                    {track.description}
                  </p>

                  {/* Sample Key Phrases Preview */}
                  <div className="mt-6 rounded-2xl bg-[#09150e] p-4 border border-gulf-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gulf-400 mb-2">
                      🗣️ এই ট্র্যাকে যে ধরনের ডায়ালগ শিখবেন:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {track.keyPhrases.map((phrase, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                          <span className="font-semibold text-gold-200">
                            {phrase}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Syllabus Modules */}
                  <div className="mt-5 space-y-2">
                    {track.topics.map((topic, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-gulf-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">
                    অডিও লেসন + প্র্যাকটিস শিট সহ
                  </span>
                  <Link
                    href="#curriculum"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gulf-500/10 px-4 py-2 text-xs font-bold text-gulf-300 border border-gulf-500/30 transition-all group-hover:bg-gulf-500 group-hover:text-slate-950"
                  >
                    <span>কোর্স মডিউল দেখুন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

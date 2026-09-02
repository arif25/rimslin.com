import {
  Layers,
  Zap,
  Shield,
  Palette,
  LineChart,
  Boxes,
  ArrowUpRight,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Layers,
      title: "Full-Stack Web Architecture",
      description:
        "Modern App Router pipelines using React Server Components, TypeScript, and micro-frontend structures for maximum agility.",
      tag: "Next.js & App Router",
      gradient: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      icon: Zap,
      title: "Ultra-Fast Edge Performance",
      description:
        "Near-zero TTFB with globally distributed edge middleware, automated static asset optimization, and dynamic route streaming.",
      tag: "Sub-100ms TTFB",
      gradient: "from-amber-500/20 to-yellow-500/10",
      iconColor: "text-amber-400",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "Built-in CSP headers, bot protection, automated vulnerability patching, and secure cookie session architectures.",
      tag: "Zero-Trust",
      gradient: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: Palette,
      title: "Design Systems & Modern UX",
      description:
        "Accessible, sleek, responsive user interfaces powered by Tailwind CSS tokens, smooth glassmorphism, and micro-interactions.",
      tag: "Tailwind & A11y",
      gradient: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: LineChart,
      title: "SEO & Core Web Vitals Mastery",
      description:
        "Automated OpenGraph metadataBase generation, dynamic sitemaps, robots.txt management, and 100/100 Lighthouse compliance.",
      tag: "100 Lighthouse",
      gradient: "from-rose-500/20 to-pink-500/10",
      iconColor: "text-rose-400",
    },
    {
      icon: Boxes,
      title: "Scalable APIs & Cloud Workflows",
      description:
        "Seamless integration with cloud providers, PostgreSQL/Redis databases, payment gateways, and real-time streaming engines.",
      tag: "Microservices",
      gradient: "from-indigo-500/20 to-blue-500/10",
      iconColor: "text-indigo-400",
    },
  ];

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left md:text-center md:mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-100/80 px-3.5 py-1 text-xs font-semibold text-accent-cyan backdrop-blur-md">
            <span>Capabilities & Stack</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Engineered for Unmatched Velocity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Every component in the Rimslin ecosystem is designed from the ground up
            to deliver performance, security, and developer ergonomics.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-surface-100/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-brand-500/40 hover:bg-surface-200/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/10`}
                    >
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-400 border border-white/[0.06]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

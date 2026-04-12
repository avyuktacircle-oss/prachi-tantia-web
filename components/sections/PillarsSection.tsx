import { Building2, ChevronsRight, GraduationCap, Mountain, Users } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Users,
    title: "Superminds Tribe",
    subtitle: "DIGITAL MEMBERSHIP",
    body: "Master the vital basics of food, sleep, and routine. Join a global community to move from daily chaos to unshakeable focus.",
    footer: "Perfect for: Building a daily system for grounding and productivity.",
  },
  {
    icon: GraduationCap,
    title: "The Coaching Collective",
    subtitle: "PROFESSIONAL PROGRAMS",
    body: "Dive deep into Yoga Psychology. Gain professional-grade tools to heal yourself, earn your credentials, and become a certified leader.",
    footer: "Perfect for: Mastering the mind and building a purpose-driven career.",
  },
  {
    icon: Building2,
    title: "Avyukta Circle",
    subtitle: "PHYSICAL SANCTUARY",
    body: "Step into our flagship space for 30-Day Mind Resets and private Sound Immersions. Rewire your nervous system through frequency and silence.",
    footer: "Perfect for: Disconnecting from the noise to experience cellular healing.",
  },
  {
    icon: Mountain,
    title: "Avyukta Retreats",
    subtitle: "IMMERSIVE EXPERIENCES",
    body: "Boutique retreats in nature's most powerful corners. Experience a total mental detox through travel, minimal living, and deep mind work.",
    footer: "Perfect for: A radical energetic shift and returning deeply aligned.",
  },
];

export function PillarsSection() {
  return (
    <Reveal as="section" className="bg-[#050505] py-20 md:py-28">
      {/* Heading */}
      <div className="mb-4 px-4 text-center">
        <h2 className="font-sans text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          The Pillars of Transformation
        </h2>
      </div>

      {/* Swipe hint — mobile only */}
      <div
        aria-hidden="true"
        className="mb-8 flex items-center justify-center gap-1.5 md:hidden"
        id="pillars-swipe-hint"
      >
        <span className="font-body text-sm text-gray-500">Swipe to explore</span>
        <ChevronsRight aria-hidden className="h-4 w-4 animate-pulse text-yellow-500/50" />
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Right-edge gradient scrim — mobile / narrow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent md:hidden"
        />

        <div
          aria-describedby="pillars-swipe-hint"
          aria-label="Pillars of transformation"
          className="scrollbar-hidden-md flex snap-x snap-mandatory scroll-smooth overflow-x-auto px-4 pb-6 sm:px-8 lg:px-16"
          role="region"
        >
          {pillars.map(({ icon: Icon, title, subtitle, body, footer }, i) => (
            <div
              className="group mr-5 min-w-[300px] snap-start last:mr-0 sm:min-w-[350px]"
              key={title}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] sm:p-8">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </div>

                {/* Subtitle overline */}
                <p className="mb-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-yellow-500/70">
                  {subtitle}
                </p>

                {/* Title */}
                <h3 className="mb-4 font-sans text-xl font-bold text-white">
                  {title}
                </h3>

                {/* Body */}
                <p className="flex-1 font-body text-sm leading-relaxed text-gray-400 md:text-base">
                  {body}
                </p>

                {/* Footer */}
                <div className="mt-6 rounded-xl bg-white/[0.04] px-4 py-3">
                  <p className="font-body text-xs italic leading-relaxed text-gray-500">
                    {footer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

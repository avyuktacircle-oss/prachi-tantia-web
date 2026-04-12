import type React from "react";

import { ArrowRight, Lightbulb, Rocket, Sparkles, Target } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Card = {
  overline: string;
  icon: React.ElementType;
  title: string;
  intro: string;
  bullets?: string[];
  id?: string;
};

const cards: Card[] = [
  {
    overline: "PHILOSOPHY",
    icon: Lightbulb,
    title: "What I Believe",
    intro:
      "Your mess is your message. Your greatest struggles are actually the training grounds for your strength. The clarity you fight for today is the bridge that will help thousands tomorrow.",
    id: "story",
  },
  {
    overline: "MISSION",
    icon: Rocket,
    title: "What I'm Building",
    intro:
      "A global tribe of 1,000,000 conscious leaders. Inside the Superminds Tribe, we are helping you build:",
    bullets: [
      "Absolute focus.",
      "Deep emotional intelligence.",
      "A mind that acts as your greatest ally.",
    ],
  },
  {
    overline: "PURPOSE",
    icon: Target,
    title: "Who I Help",
    intro:
      "High-achievers ready to return to their power. You are in the right place if you want to silence overthinking and master your routines, whether you are:",
    bullets: [
      "A professional burnt out by the corporate grind.",
      "A student lost in the pressure of grades.",
      "A seeker looking for a scientific path to wisdom.",
    ],
  },
];

export function VisionSection() {
  return (
    <Reveal
      as="section"
      className="scroll-mt-20 bg-white py-20 md:py-28"
      id="vision"
    >
      <Container>
        {/* Header */}
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-xs tracking-wide text-neutral-500">
            <Sparkles aria-hidden className="h-3 w-3" strokeWidth={1.75} />
            The Vision
          </span>
          <h1 className="max-w-3xl font-sans text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Building the Future of Mental Clarity
          </h1>
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-500 md:text-lg">
            Redefining how the world values inner stability, focus, and human
            potential.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ overline, icon: Icon, title, intro, bullets, id }, i) => (
            <Reveal delay={i * 0.08} key={title}>
              <div
                className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
                id={id}
              >
                <p className="mb-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {overline}
                </p>
                <div className="mb-5 w-fit rounded-lg bg-neutral-200 p-2 text-neutral-500">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 font-sans text-xl font-semibold text-neutral-900">
                  {title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-neutral-600 md:text-base">
                  {intro}
                </p>
                {bullets && bullets.length > 0 && (
                  <ul className="mt-3 flex-1 space-y-1.5 font-body text-sm leading-relaxed text-neutral-600 md:text-base">
                    {bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {!bullets && <div className="flex-1" />}
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="font-body text-sm text-neutral-500">
            Join thousands of seekers in the movement
          </p>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-3 font-sans text-sm font-semibold text-white shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-shadow hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:text-base"
            href="/about#my-journey"
          >
            Discover My Story
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </a>
          <p className="font-body text-xs text-neutral-400">
            From mental chaos to sovereign clarity • 5 min read
          </p>
        </div>
      </Container>
    </Reveal>
  );
}

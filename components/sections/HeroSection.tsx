import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { accolades } from "@/lib/accolades";

const stats = [
  { value: "9+", label: "Years of Expertise in Yoga Psychology" },
  { value: "10,000+", label: "Lives Touched" },
  { value: "500+", label: "Coaches Trained" },
];

export function HeroSection() {
  return (
    <section className="relative bg-brand-ink overflow-hidden lg:min-h-[100dvh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-inkLight to-neutral-900"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-gold/5 via-transparent to-transparent"
      />

      {/* Mobile-only: full-bleed portrait at the very top, behind the fixed navbar */}
      <div className="relative w-full overflow-hidden lg:hidden" style={{ height: "58dvh" }}>
        <div className="absolute inset-0 pt-14">
          <Image
            alt="Prachi Tantia — Yoga Psychologist"
            className="object-contain object-bottom drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            fill
            priority
            sizes="100vw"
            src="/images/hero/prachi-portrait-cutout.png"
          />
        </div>
        {/* Bottom fade into section background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-ink to-transparent"
        />
      </div>

      <Container className="relative z-10 flex flex-col pb-12 pt-4 sm:pb-14 sm:pt-6 lg:min-h-[100dvh] lg:justify-center lg:pt-28 lg:pb-16">
        {/*
          Mobile:  simple flex-col — text, buttons, stats (image already rendered above)
          Desktop: 2-col grid — left = text/buttons/stats, right = image
        */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">

          {/* Headline + tagline + body */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <h1 className="font-sans text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem]">
              From School Failure{" "}
              <span className="text-brand-goldLight">to Yoga Psychologist</span>
            </h1>
            <p className="mt-4 font-sans text-base font-medium leading-snug text-white/65 sm:text-lg lg:text-xl">
              Mastering the Science of Mental Clarity
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-neutral-400 md:text-lg">
              How I moved from red marks and &apos;No Use&apos; to impacting
              10,000+ lives — raw, unfiltered, and real.
            </p>
          </Reveal>

          {/* Desktop-only: portrait in the right column spanning all rows */}
          <Reveal
            className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-span-3"
            delay={0.12}
          >
            <div className="relative mx-0 ml-auto flex w-full max-w-none justify-end">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 bottom-0 h-[min(480px,55vh)] w-[min(480px,45vw)] rounded-full bg-gradient-to-t from-brand-gold/10 via-brand-teal/5 to-transparent blur-3xl"
              />
              <div className="relative h-[min(480px,min(72vh,560px))] w-full max-w-md">
                <Image
                  alt="Prachi Tantia — Yoga Psychologist"
                  className="object-contain object-bottom drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
                  fill
                  priority
                  sizes="420px"
                  src="/images/hero/prachi-portrait-cutout.png"
                />
              </div>
            </div>
          </Reveal>

          {/* CTA buttons */}
          <Reveal className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-wrap gap-4">
              <Button
                className="px-8 py-4"
                href="https://avyuktacircle.com"
                rel="noopener noreferrer"
                target="_blank"
                variant="primary"
              >
                Join Avyukta Circle
              </Button>
              <Button
                className="border-white/20 px-8 py-4 text-white/90 hover:border-brand-goldLight hover:text-brand-goldLight"
                href="/about"
                variant="secondary"
              >
                My Story →
              </Button>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal className="lg:col-start-1 lg:row-start-3">
            <div className="border-t border-white/10 pt-8 lg:pt-10">
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/10">
                {stats.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={`flex shrink-0 flex-col sm:px-8 ${i === 0 ? "sm:pl-0" : ""}`}
                  >
                    <span className="font-sans text-3xl font-bold tracking-tight text-brand-goldLight sm:text-4xl">
                      {value}
                    </span>
                    <span className="mt-2 max-w-[180px] font-body text-sm leading-snug text-neutral-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Authority bar — always full-width below the grid */}
        <Reveal delay={0.06}>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-7 lg:mt-14 md:px-10 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className="shrink-0 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-neutral-500 md:text-[0.65rem]">
                As recognised by
              </p>
              <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-x-8">
                {accolades.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-col items-start gap-1.5 sm:items-center sm:text-center"
                  >
                    <Icon
                      aria-hidden
                      className="h-6 w-6 shrink-0 text-brand-goldLight/60"
                      strokeWidth={1.25}
                    />
                    <span className="min-w-0 font-body text-[0.7rem] font-medium leading-snug text-neutral-300">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

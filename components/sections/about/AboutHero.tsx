import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutHero() {
  return (
    <Reveal
      as="section"
      className="relative flex min-h-[90dvh] items-center overflow-hidden bg-brand-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-inkLight to-neutral-900"
      />

      <Container className="relative z-10 py-28 lg:py-36">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Text column */}
          <div className="max-w-xl">
            <p className="font-body text-base font-semibold uppercase tracking-widest text-brand-goldLight">
              Hi, I&apos;m Prachi Tantia — Founder of Avyukta Circle.
            </p>
            <h1 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-[3rem] lg:leading-[1.12]">
              Stop Managing Your Stress. Start Mastering Your Mind.
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-white/90 md:text-xl">
              I am a Yoga Psychologist and Mind Clarity Coach. I equip
              professionals, students, and seekers to silence the noise of
              overthinking and reclaim their focus through structured mental
              discipline.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-white/85 md:text-xl">
              My mission is to help 1,000,000 people master their minds and prove
              that a calm mind is the ultimate competitive advantage.
            </p>
            <div className="mt-10">
              <Button
                className="px-8 py-4"
                href="https://avyuktacircle.com"
                rel="noopener noreferrer"
                target="_blank"
                variant="primary"
              >
                Join the Circle
              </Button>
            </div>
          </div>

          {/* Portrait column */}
          <div className="relative mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:ml-auto lg:max-w-none lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 bottom-0 h-[min(420px,50vh)] w-[min(420px,90vw)] rounded-full bg-gradient-to-t from-brand-gold/10 via-transparent to-transparent blur-3xl lg:h-[min(480px,55vh)] lg:w-[min(480px,45vw)]"
            />
            <div className="relative h-[min(420px,60vh)] w-full max-w-sm lg:h-[min(520px,70vh)] lg:max-w-md">
              <Image
                alt="Prachi Tantia — Yoga Psychologist and Mind Clarity Coach"
                className="object-contain object-bottom drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                src="/images/about/prachi-portrait-cutout.png"
              />
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function SpeakingHero() {
  return (
    <Reveal
      as="section"
      className="relative flex min-h-[85dvh] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          alt="Prachi Tantia speaking on stage to a large audience"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/images/hero/prachi-hero.jpg"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-ink/95 via-brand-ink/88 to-brand-inkLight/80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-ink/92 via-transparent to-brand-ink/55"
        />
      </div>

      <Container className="relative z-10 py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-brand-goldLight">
            Speaking &amp; engagements
          </p>
          <h1 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
            The Voice of Clarity Culture.
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-white/90 md:text-xl">
            Empowering global audiences to silence the noise, break the
            &apos;Hustle Loop,&apos; and reclaim their mental sovereignty.
          </p>
          <div className="mt-10">
            <Button className="px-8 py-4" href="#book-prachi" variant="primary">
              Inquire for 2026 engagements
            </Button>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

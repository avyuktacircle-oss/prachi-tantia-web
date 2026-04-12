import { speakingOfferings } from "@/lib/speakingOfferings";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function SpeakingOfferingsSection() {
  return (
    <Reveal as="section" className="bg-brand-ink py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
            What Prachi offers
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-400 md:text-xl">
            Keynotes, workshops, sound journeys, retreats, and intimate circles — tailored to your audience.
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-14">
          {speakingOfferings.map((block, i) => (
            <Reveal delay={i * 0.04} key={block.category}>
              <div className="rounded-2xl border border-white/10 bg-brand-inkLight p-8 md:p-10">
                <h3 className="font-sans text-xl font-bold text-white md:text-2xl">
                  {block.category}
                </h3>
                <ul className="mt-6 space-y-5">
                  {block.items.map(({ title, description }) => (
                    <li key={title}>
                      <p className="font-sans text-base font-bold text-brand-goldLight">
                        {title}
                      </p>
                      <p className="mt-1 font-body text-base leading-relaxed text-neutral-300">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

import { BookMarked, Compass, Leaf, Shield } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const beliefs = [
  {
    Icon: BookMarked,
    title: "Structured Mental Discipline",
    body: `Mastering your mind is the ultimate competitive advantage. From 8-hour training sessions on the tennis court to 4 AM monastery wake-ups, I learned that focus is a muscle. I believe that in a world of endless distractions, a disciplined mind is your most valuable asset. It's built through the 'boring' consistency of disciplined food, sleep, and routines that create the muscle memory for greatness.`,
  },
  {
    Icon: Shield,
    title: "Radical Resilience",
    body: `Your past failures are not a life sentence; they are your training ground for empathy. Scoring a 0/10 in Chemistry taught me that the system's labels don't define your potential. I believe that every 'red mark' in your life is an opportunity to break old patterns and build a foundation of unshakeable inner strength.`,
  },
  {
    Icon: Compass,
    title: "Purposeful Exploration",
    body: `Growth begins where the 'safe' path ends. From grading diamonds to solo travels across the globe, I believe that true evolution requires the courage to be an independent seeker. Whether it's staying for months in unknown places or funding your own education, purposeful exploration is how you find the 'why' behind your existence.`,
  },
  {
    Icon: Leaf,
    title: "Conscious Simplicity",
    body: `A big mission requires a simple life and a clear heart. I believe in living with simple needs but carrying a massive vision. By choosing gratitude and mindfulness over 'Hustle Culture,' we return to our power. True success is having the clarity to give your best to your family, your community, and your mission without losing yourself in the process.`,
  },
];

export function BeliefsSection() {
  return (
    <Reveal as="section" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading title="What She Believes" />
        <div className="grid gap-8 md:grid-cols-2">
          {beliefs.map(({ Icon, title, body }, i) => (
            <Reveal delay={i * 0.08} key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-brand-sky/20 bg-brand-navy/[0.02] p-8 shadow-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-goldLight/25 text-brand-gold">
                  <Icon aria-hidden className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  {title}
                </h3>
                <p className="mt-2 font-body text-xs font-bold uppercase tracking-wide text-brand-gold">
                  The Belief
                </p>
                <p className="mt-3 flex-1 font-body text-base leading-relaxed text-brand-teal">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

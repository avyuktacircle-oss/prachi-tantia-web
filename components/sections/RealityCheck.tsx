import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const loops = [
  {
    title: 'Loop 1: The Overthinking Trap',
    symptom: 'The Symptom: Analysis Paralysis.',
    body: `You spend more time worrying about the decision than actually making it. Your mind is like a browser with 50 tabs open—none of them are loading, but they are all draining your battery. You are physically present, but mentally, you're stuck in a replay of yesterday or a rehearsal of tomorrow.`,
  },
  {
    title: 'Loop 2: The "Hustle" Burnout',
    symptom: 'The Symptom: Busy, but not Productive.',
    body: `You've been told that more work equals more success. So you sacrifice your sleep, your food, and your peace, only to wake up feeling more drained. You are running a race with no finish line, mistaking exhaustion for achievement. You've mastered the 'hustle,' but you've lost the 'clarity'.`,
  },
  {
    title: 'Loop 3: The Identity Gap',
    symptom: 'The Symptom: The "Not Enough" Syndrome.',
    body: `Just like my school days with red marks, you carry the heavy weight of labels. Whether it's 'not smart enough,' 'not successful enough,' or 'not ready yet,' these old stories are running your life. You are living the life society expected of you, while the person you were meant to be is buried under layers of mental clutter.`,
  },
];

export function RealityCheck() {
  return (
    <Reveal as="section" className="bg-brand-ink py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Why 'Hustle Culture' is failing you—and how your own mind is keeping you stuck."
          title="The Reality Check: The Three 'Loops' of Mental Chaos"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {loops.map(({ title, symptom, body }, i) => (
            <Reveal delay={i * 0.1} key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-brand-inkLight p-8 shadow-lg">
                <h3 className="font-sans text-lg font-bold leading-snug text-brand-goldLight md:text-xl">
                  {title}
                </h3>
                <p className="mt-3 font-sans text-sm font-bold uppercase tracking-wide text-white/70">
                  {symptom}
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-neutral-400">
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

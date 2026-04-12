import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function JourneyIntroSlim() {
  return (
    <Reveal
      as="section"
      id="my-journey"
      className="bg-brand-ink py-20 md:py-28"
    >
      <Container>
        <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-goldLight">
          My Journey
        </p>
        <h2 className="mt-4 max-w-3xl font-sans text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-[3rem] lg:leading-[1.12]">
          The Story: From Red Marks to Absolute Clarity.
        </h2>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/85 md:text-xl">
          A raw, unfiltered account of how a school failure became a Yoga
          Psychologist&mdash;and why every &lsquo;red mark&rsquo; in your story
          is actually a training ground for your greatest strength.
        </p>

        <div className="mt-12 flex items-center gap-3">
          <div className="h-[2px] w-12 bg-brand-goldLight" aria-hidden />
          <span className="font-body text-sm text-brand-goldLight">
            Scroll to read the story
          </span>
        </div>
      </Container>
    </Reveal>
  );
}

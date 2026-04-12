import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const beats = [
  {
    title: "The Struggle",
    body: `I've been there—as a failure. Rejected since my school days, scoring 0/10 in Chemistry and carrying the heavy weight of being told I was 'of no use,' I felt like I wasn't enough. The system's labels had become my reality, and I believed them for far too long.`,
  },
  {
    title: "The Rebellion",
    body: `But something inside me refused to stay small. I walked away from the safe, expected path—leaving the world of jewelry design and the traditional expectations of a Marwari family to seek something deeper: inner transformation. It was not the 'sensible' choice. It was the only honest one.`,
  },
  {
    title: "The Ashram Days",
    body: `I found my laboratory in the ashram. Waking at 4 AM, living without a roof over my head, studying under legendary teachers like Dr. Hansaji Yogendra—these were not hardships. They were the training ground for everything I now teach. By 20, I was standing in front of 300 students, not as someone who had it all figured out, but as someone who had chosen to transform their pain into purpose.`,
  },
];

export function OriginStory() {
  return (
    <Reveal as="section" className="bg-brand-navy/[0.03] py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Story text */}
          <div>
            <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-gold">
              The Origin Story
            </p>
            <h2 className="mt-3 font-sans text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              From a &ldquo;Failure&rdquo; to a Visionary.
            </h2>
            <div className="mt-10 space-y-8">
              {beats.map(({ title, body }) => (
                <div
                  className="border-l-4 border-brand-goldLight pl-6"
                  key={title}
                >
                  <h3 className="font-sans text-lg font-bold text-brand-navy">
                    {title}
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-brand-teal">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image: grayscale if real photo present, gradient placeholder otherwise */}
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-2xl shadow-xl lg:sticky lg:top-28">
              <div className="aspect-[3/4] bg-gradient-to-b from-brand-navy/80 via-brand-teal/60 to-brand-sky/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="font-body text-sm text-white/80">
                  Add{" "}
                  <code className="rounded bg-black/25 px-1 text-brand-goldLight">
                    public/images/about/prachi-origin.jpg
                  </code>{" "}
                  — a candid photo styled with a{" "}
                  <code className="rounded bg-black/25 px-1 text-brand-goldLight">
                    grayscale
                  </code>{" "}
                  CSS filter for the sepia/B&W look.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Reveal>
  );
}

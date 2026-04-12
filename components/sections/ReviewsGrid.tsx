import { Play } from "lucide-react";

import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const videoSlots = [
  { id: "1", label: "Testimonial 1" },
  { id: "2", label: "Testimonial 2" },
  { id: "3", label: "Testimonial 3" },
  { id: "4", label: "Testimonial 4" },
];

const written = [
  {
    before:
      "Before: Constant mental noise, guilt after every small mistake, and no energy left for what actually mattered.",
    after:
      "After: A calmer default state, clearer priorities, and routines that protect my focus instead of draining it.",
  },
  {
    before:
      "Before: I measured my worth by output and still felt empty—always one task away from 'enough.'",
    after:
      "After: I can observe my thoughts without drowning in them; my work finally feels aligned, not compulsive.",
  },
  {
    before:
      "Before: Overthinking every decision until deadlines forced me—then shame for 'wasting' time.",
    after:
      "After: I trust small daily practices; decisions feel lighter because my nervous system isn't on fire.",
  },
];

export function ReviewsGrid() {
  return (
    <Reveal as="section" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Stories from the Clarity Culture community — replace with your final cuts and quotes."
          title="Proof from the path"
        />

        <h3 className="mb-6 font-sans text-xl font-bold text-neutral-900 md:text-2xl">
          Video testimonials
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videoSlots.map(({ id }, i) => (
            <Reveal delay={i * 0.05} key={id}>
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-brand-ink shadow-md">
                <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-ink to-neutral-800 px-4">
                  <Play className="h-12 w-12 text-brand-goldLight" strokeWidth={1.25} />
                  <p className="text-center font-body text-xs text-neutral-400">
                    Add{" "}
                    <code className="rounded bg-white/10 px-1 text-brand-goldLight">
                      /videos/testimonial-{id}.mp4
                    </code>
                  </p>
                </div>
                <p className="px-3 py-2 text-center font-body text-xs text-neutral-500">
                  Replace with a{" "}
                  <code className="text-brand-teal">&lt;video&gt;</code> tag when ready.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-6 mt-16 font-sans text-xl font-bold text-neutral-900 md:text-2xl">
          Before &amp; after snapshots
        </h3>
        <div className="columns-1 gap-6 md:columns-2">
          {written.map((quote, i) => (
            <Reveal delay={i * 0.08} key={i}>
              <blockquote className="mb-6 break-inside-avoid rounded-xl border border-neutral-200 bg-brand-paper p-6 shadow-sm">
                <p className="font-body text-sm leading-relaxed text-neutral-500">
                  {quote.before}
                </p>
                <p className="mt-4 font-body text-sm font-semibold leading-relaxed text-neutral-900">
                  {quote.after}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-6 mt-16 font-sans text-xl font-bold text-neutral-900 md:text-2xl">
          From the community
        </h3>
        <InstagramGrid />
      </Container>
    </Reveal>
  );
}

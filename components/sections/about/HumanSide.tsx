import { Backpack, BookOpen, Globe, Heart, TreePine } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const traits = [
  {
    Icon: Backpack,
    title: "The Minimalist Explorer",
    body: `I love exploring new cities on foot or riding a bike alone through unknown streets. Whether it's hiking up a mountain or taking a deep dive into the ocean, I crave the raw beauty of the world. I travel with a backpack and only the essentials; carrying less makes me feel light and free, wherever I go.`,
  },
  {
    Icon: TreePine,
    title: "Nature's Student",
    body: `You'll often find me chasing sunsets or taking long nature walks. It's my way of hitting the reset button. I love driving with soulful podcasts or deep music playing, turning every journey into a moment of reflection.`,
  },
  {
    Icon: BookOpen,
    title: "The Curious Mind",
    body: `I can spend hours lost in a bookstore. I am a lifelong learner, always traveling for new trainings and meeting conscious people globally. For me, a vegetarian lifestyle and natural living aren't choices—they are the foundation of my energy.`,
  },
  {
    Icon: Heart,
    title: "The Devoted Mentor",
    body: `Nothing brings me more joy than giving my best to my students. Solving their problems and watching their mental "clutter" turn into clarity is what truly fuels my work.`,
  },
  {
    Icon: Globe,
    title: "The Global Soul",
    body: `I seek to travel every corner of the world—not as a tourist, but as a student of human potential. I believe in a minimal life: minimal clothing, minimal products, and a simple heart.`,
  },
];

export function HumanSide() {
  return (
    <Reveal as="section" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="A seeker, an explorer, and a lifelong student of life."
          title="The Woman Behind the Mission."
        />
        <p className="mx-auto mb-12 max-w-3xl text-center font-body text-lg leading-relaxed text-brand-teal">
          While my mission is global, my life is rooted in the simple joys that
          keep me grounded. To me, &lsquo;Clarity Culture&rsquo; isn&apos;t
          just something I teach—it&apos;s how I live every single day.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {traits.map(({ Icon, title, body }, i) => (
            <Reveal delay={i * 0.07} key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-brand-sky/20 bg-brand-navy/[0.02] p-8 shadow-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-goldLight/25 text-brand-gold">
                  <Icon aria-hidden className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  {title}
                </h3>
                <p className="mt-4 flex-1 font-body text-base leading-relaxed text-brand-teal">
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

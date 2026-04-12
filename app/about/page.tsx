import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStats } from "@/components/sections/about/AboutStats";
import { JourneyCTA } from "@/components/sections/journey/JourneyCTA";
import { JourneyIntroSlim } from "@/components/sections/journey/JourneyIntroSlim";
import { StoryNarrative } from "@/components/sections/journey/StoryNarrative";
import { TimelineSection } from "@/components/sections/journey/TimelineSection";

export const metadata: Metadata = {
  title: "About Prachi Tantia | Yoga Psychologist & Mind Clarity Coach",
  description:
    "From a student told she was 'of no use' to leading 10,000+ lives toward mental clarity. Yoga Psychologist, Mind Clarity Coach, and Founder of Avyukta Circle.",
  openGraph: {
    title: "About Prachi Tantia — From Red Marks to Absolute Clarity",
    description:
      "Yoga Psychologist, Mind Clarity Coach, and Founder of Avyukta Circle. The raw, unfiltered story of how a school failure built a global movement for the mind.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStats />
      <JourneyIntroSlim />
      <StoryNarrative />
      <TimelineSection />
      <JourneyCTA />
    </main>
  );
}

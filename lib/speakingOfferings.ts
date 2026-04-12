export type OfferingBlock = {
  category: string;
  items: { title: string; description: string }[];
};

export const speakingOfferings: OfferingBlock[] = [
  {
    category: "Signature Keynotes",
    items: [
      {
        title: "The Clarity Advantage",
        description:
          "Why a calm mind is the ultimate competitive advantage in a high-stress world.",
      },
      {
        title: "From Red Marks to Resilience",
        description:
          "Turning academic failure and labels into a roadmap for peak performance.",
      },
      {
        title: "Yoga Psychology",
        description:
          "A scientific approach to mastering your mental sovereignty and inner peace.",
      },
    ],
  },
  {
    category: "Mastery Workshops",
    items: [
      {
        title: "The 30-Day Mind Reset",
        description:
          'Building "muscle memory" through the discipline of food, sleep, and routine.',
      },
      {
        title: "The Focus Protocol",
        description:
          "Practical tools to break the overthinking loop and reclaim your attention.",
      },
      {
        title: "The Power of Presence",
        description:
          'Mastering conscious living and the art of being fully in the "now."',
      },
    ],
  },
  {
    category: "Mindful Movement & Posture",
    items: [
      {
        title: "The Anatomy of Focus",
        description:
          "Understanding how your physical posture dictates your mental state.",
      },
      {
        title: "Conscious Motion",
        description:
          "Simple, mindful movements to reset the nervous system during a busy workday.",
      },
    ],
  },
  {
    category: "Immersive Sound Journeys",
    items: [
      {
        title: "Frequency Reset",
        description:
          "Private and group immersions using sound to silence mental noise and induce deep relaxation.",
      },
      {
        title: "The Science of Silence",
        description:
          "Experience the profound psychological shift of high-vibration sound healing.",
      },
    ],
  },
  {
    category: "Mental Detox & Minimalism",
    items: [
      {
        title: "Clarity Meditations",
        description:
          "Breath-based visualizations designed to help you return to your authentic self.",
      },
      {
        title: "The Minimalist Mindset",
        description:
          'Learning to live "light" by decluttering your habits, products, and thoughts.',
      },
    ],
  },
  {
    category: "Fire-Side Chats & Moderated Panels",
    items: [
      {
        title: "Conscious Leadership Dialogues",
        description:
          "Discussing the future of education, mental health, and Indian philosophy in the digital age.",
      },
    ],
  },
  {
    category: "Tribe Meet & Greets",
    items: [
      {
        title: "Superminds Circle",
        description:
          "Intimate, unfiltered meet-and-greets to share stories and ground your energy.",
      },
    ],
  },
  {
    category: "Boutique Retreats",
    items: [
      {
        title: "The Ultimate Disconnect",
        description:
          "Curated global travel combining nature, minimalism, and deep mental work.",
      },
    ],
  },
];

import { Award, Globe, Medal, Trophy } from "lucide-react";

/** Grayscale recognition strip for the Speaking page (subset of full accolades). */
export const speakingRecognition = [
  {
    title: "Fox India",
    subtitle: "Top 100 Influential Indians",
    Icon: Globe,
  },
  {
    title: "High Flyers 50",
    subtitle: "South Asia",
    Icon: Trophy,
  },
  {
    title: "HelloMyYoga",
    subtitle: "Top 21 Young Yoga Teachers",
    Icon: Medal,
  },
  {
    title: "Global Excellence Award",
    subtitle: "",
    Icon: Award,
  },
] as const;

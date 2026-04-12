import { Award, Globe, Medal, Newspaper, Trophy } from "lucide-react";

export const accolades = [
  { label: "High Flyers 50 South Asia", Icon: Trophy },
  { label: "Top 21 Young Yoga Teachers (HelloMyYoga)", Icon: Medal },
  { label: "Global Excellence Award", Icon: Award },
  { label: "Top 100 Influential Indians (Fox India)", Icon: Globe },
  { label: "Dainik Bhaskar", Icon: Newspaper },
] as const;

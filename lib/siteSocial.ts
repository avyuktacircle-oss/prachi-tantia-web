import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Briefcase,
  Camera,
  Headphones,
  Image as ImageIcon,
  Podcast,
  Users,
  Video,
} from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

/** Official profiles — update hrefs if handles or show URLs change. */
export const siteSocialLinks: SocialLink[] = [
  {
    label: "Instagram (@PrachiTantia)",
    href: "https://www.instagram.com/prachitantia/",
    Icon: Camera,
  },
  {
    label: "YouTube (Avyukta Circle)",
    href: "https://www.youtube.com/@avyuktacircle",
    Icon: Video,
  },
  {
    label: "LinkedIn (Prachi Tantia)",
    href: "https://www.linkedin.com/in/prachitantia/",
    Icon: Briefcase,
  },
  {
    label: "Facebook (Prachi Tantia)",
    href: "https://www.facebook.com/prachitantia",
    Icon: Users,
  },
  {
    label: "Pinterest (Prachi Tantia)",
    href: "https://www.pinterest.com/prachitantia/",
    Icon: ImageIcon,
  },
  {
    label: "Spotify (Prachi Tantia)",
    href: "https://open.spotify.com/search/Prachi%20Tantia",
    Icon: Headphones,
  },
  {
    label: "X (Prachi Tantia)",
    href: "https://x.com/prachitantia",
    Icon: AtSign,
  },
  {
    label: "Apple Podcasts (Avyukta Circle)",
    href: "https://podcasts.apple.com/search?term=Avyukta%20Circle",
    Icon: Podcast,
  },
];

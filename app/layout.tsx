import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";

import { SiteChrome } from "@/components/ui/SiteChrome";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prachi Tantia",
  description:
    "Prachi Tantia — Founder, Avyukta Circle. Yoga and wellness coach.",
  icons: {
    icon: "/next.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${openSans.variable} font-body antialiased`}
      >
        <SiteChrome>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}

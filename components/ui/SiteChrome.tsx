"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/ui/Navbar";
import { SiteFooter } from "@/components/ui/SiteFooter";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <SiteFooter />}
    </>
  );
}

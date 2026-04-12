"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("err");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage("You’re in — watch your inbox on Monday.");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <form
        className="flex flex-col gap-4 sm:flex-row sm:items-stretch"
        onSubmit={onSubmit}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          autoComplete="email"
          className={cn(
            "min-h-[48px] flex-1 rounded-md border-2 border-white/30 bg-white/10 px-4 font-body text-white placeholder:text-white/50 focus:border-brand-goldLight focus:outline-none focus:ring-2 focus:ring-brand-goldLight/40",
          )}
          disabled={status === "loading"}
          id="newsletter-email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          type="email"
          value={email}
        />
        <Button
          className="min-h-[48px] shrink-0 border-0 sm:w-auto"
          disabled={status === "loading"}
          type="submit"
          variant="primary"
        >
          {status === "loading"
            ? "Signing up…"
            : "YES! SIGN ME UP FOR THE NEWSLETTER"}
        </Button>
      </form>
      {message ? (
        <p
          className={cn(
            "mt-3 font-body text-sm",
            status === "ok" ? "text-brand-goldLight" : "text-red-200",
          )}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const field =
  "w-full min-h-[48px] rounded-md border-2 border-white/10 bg-brand-ink px-4 font-body text-white placeholder:text-white/30 focus:border-brand-goldLight focus:outline-none focus:ring-2 focus:ring-brand-goldLight/35";

const label = "mb-1.5 block font-sans text-sm font-semibold text-neutral-300";

const REASONS = [
  "Press, Media, or Partnership Inquiry",
  "Speaking Event Request",
  "I Want Prachi to Appear On My Podcast",
  "General Inquiry",
] as const;

export function ConnectForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      reason: String(fd.get("reason") ?? "").trim(),
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      optInUpdates: fd.get("optInUpdates") === "on",
      optInNewsletter: fd.get("optInNewsletter") === "on",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("err");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage("Thank you — your message was sent to Prachi's team.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-ink p-8 shadow-md md:p-10">
      <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
        Send a message
      </h2>
      <p className="mt-3 font-body text-base leading-relaxed text-neutral-400">
        For all other inquiries, please use this form to get in touch with
        Prachi&apos;s team.
      </p>

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div>
          <label className={label} htmlFor="cf-reason">
            Reason for contact <span className="text-red-400">*</span>
          </label>
          <select
            className={cn(field, "cursor-pointer")}
            id="cf-reason"
            name="reason"
            required
          >
            <option value="" className="bg-brand-ink">Select…</option>
            {REASONS.map((r) => (
              <option key={r} value={r} className="bg-brand-ink">
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="cf-first">
              First name
            </label>
            <input
              className={field}
              id="cf-first"
              name="firstName"
              required
              type="text"
            />
          </div>
          <div>
            <label className={label} htmlFor="cf-last">
              Last name
            </label>
            <input
              className={field}
              id="cf-last"
              name="lastName"
              required
              type="text"
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="cf-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className={field}
            id="cf-email"
            name="email"
            required
            type="email"
          />
        </div>

        <div>
          <label className={label} htmlFor="cf-subject">
            Subject
          </label>
          <input className={field} id="cf-subject" name="subject" type="text" />
        </div>

        <div>
          <label className={label} htmlFor="cf-message">
            Message
          </label>
          <textarea
            className={cn(field, "min-h-[160px] py-3")}
            id="cf-message"
            name="message"
            required
            rows={6}
          />
        </div>

        <div className="space-y-3 font-body text-sm text-neutral-400">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              className="mt-1 h-4 w-4 shrink-0 accent-brand-goldLight"
              name="optInUpdates"
              type="checkbox"
            />
            <span>
              Yes! Please send occasional important updates from Prachi.
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              className="mt-1 h-4 w-4 shrink-0 accent-brand-goldLight"
              name="optInNewsletter"
              type="checkbox"
            />
            <span>Yes! Also, sign me up for Prachi&apos;s newsletter.</span>
          </label>
          <p className="text-xs text-neutral-600">
            You can unsubscribe from these communications at any time.
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          disabled={status === "loading"}
          type="submit"
          variant="primary"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>

        {message ? (
          <p
            className={cn(
              "font-body text-sm",
              status === "ok" ? "text-brand-goldLight" : "text-red-400",
            )}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

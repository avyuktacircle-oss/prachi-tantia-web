"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const field =
  "w-full min-h-[48px] rounded-md border-2 border-white/15 bg-brand-ink px-4 font-body text-white placeholder:text-neutral-500 focus:border-brand-goldLight focus:outline-none focus:ring-2 focus:ring-brand-goldLight/35";

const label = "mb-1.5 block font-sans text-sm font-semibold text-white";

export function BookPrachiForm() {
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

    const email = String(fd.get("email") ?? "").trim();
    const confirmEmail = String(fd.get("confirmEmail") ?? "").trim();
    if (email !== confirmEmail) {
      setStatus("err");
      setMessage("Email and confirmation must match.");
      return;
    }

    const formats: string[] = [];
    if (fd.get("formatKeynote")) formats.push("Keynote");
    if (fd.get("formatWorkshop")) formats.push("Workshop");
    if (fd.get("formatQA")) formats.push("Q&A");

    const body = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email,
      phone: String(fd.get("phone") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim(),
      eventMode: String(fd.get("eventMode") ?? "").trim(),
      inquiryDates: String(fd.get("inquiryDates") ?? "").trim(),
      sessionFormats: formats,
      sessionLength: String(fd.get("sessionLength") ?? "").trim(),
      topicsInterest: String(fd.get("topicsInterest") ?? "").trim(),
      budget: String(fd.get("budget") ?? "").trim(),
      publicTicketed: String(fd.get("publicTicketed") ?? "").trim(),
      recordingUse: String(fd.get("recordingUse") ?? "").trim(),
      eventLocation: String(fd.get("eventLocation") ?? "").trim(),
      attendeeCount: String(fd.get("attendeeCount") ?? "").trim(),
      audienceDescription: String(fd.get("audienceDescription") ?? "").trim(),
      eventWebsite: String(fd.get("eventWebsite") ?? "").trim(),
      eventReason: String(fd.get("eventReason") ?? "").trim(),
      speakerPromote: String(fd.get("speakerPromote") ?? "").trim(),
      pastSpeakers: String(fd.get("pastSpeakers") ?? "").trim(),
      otherSpeakers: String(fd.get("otherSpeakers") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/book-prachi", {
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
      setMessage(
        "Thank you — your inquiry was received. Prachi’s team will be in touch.",
      );
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-inkLight p-8 md:p-10">
      <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
        Book Prachi
      </h2>
      <p className="mt-3 font-body text-base leading-relaxed text-neutral-400">
        Please fill out the form below and provide as much information as
        possible.
      </p>

      <form className="mt-8 space-y-8" onSubmit={onSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="bp-firstName">
              First name
            </label>
            <input
              className={field}
              id="bp-firstName"
              name="firstName"
              required
              type="text"
            />
          </div>
          <div>
            <label className={label} htmlFor="bp-lastName">
              Last name
            </label>
            <input
              className={field}
              id="bp-lastName"
              name="lastName"
              required
              type="text"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="bp-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className={field}
              id="bp-email"
              name="email"
              required
              type="email"
            />
          </div>
          <div>
            <label className={label} htmlFor="bp-confirmEmail">
              Confirm email address
            </label>
            <input
              autoComplete="email"
              className={field}
              id="bp-confirmEmail"
              name="confirmEmail"
              required
              type="email"
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="bp-phone">
            Phone number
          </label>
          <input
            autoComplete="tel"
            className={field}
            id="bp-phone"
            name="phone"
            type="tel"
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-organization">
            Name of organization
          </label>
          <input className={field} id="bp-organization" name="organization" />
        </div>

        <div>
          <span className={label}>Is this event in-person or virtual?</span>
          <select className={field} id="bp-eventMode" name="eventMode" required>
            <option value="">Select…</option>
            <option value="in-person">In-person</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="bp-dates">
            What dates are you inquiring about?
          </label>
          <textarea
            className={cn(field, "min-h-[100px] py-3")}
            id="bp-dates"
            name="inquiryDates"
            rows={3}
          />
        </div>

        <fieldset>
          <legend className={cn(label, "mb-3")}>
            What is the format of the speaker session?
          </legend>
          <div className="flex flex-wrap gap-6 font-body text-neutral-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="formatKeynote"
                type="checkbox"
                value="1"
              />
              Keynote
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="formatWorkshop"
                type="checkbox"
                value="1"
              />
              Workshop
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="formatQA"
                type="checkbox"
                value="1"
              />
              Q&amp;A
            </label>
          </div>
        </fieldset>

        <div>
          <span className={label}>What is the length of the session?</span>
          <div className="mt-2 flex flex-wrap gap-6 font-body text-neutral-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="sessionLength"
                type="radio"
                value="1-2 hours"
              />
              1–2 hours
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="sessionLength"
                type="radio"
                value="Over 2 hours"
              />
              Over 2 hours
            </label>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="bp-topics">
            Which topics pique your interest?
          </label>
          <textarea
            className={cn(field, "min-h-[100px] py-3")}
            id="bp-topics"
            name="topicsInterest"
            rows={4}
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-budget">
            What is the proposed budget?
          </label>
          <input className={field} id="bp-budget" name="budget" type="text" />
        </div>

        <div>
          <span className={label}>
            Is this a publicly ticketed/marketed event?
          </span>
          <div className="mt-2 flex flex-wrap gap-6 font-body text-neutral-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="publicTicketed"
                type="radio"
                value="yes"
              />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="publicTicketed"
                type="radio"
                value="no"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="bp-recording">
            If recorded, what is the intended use?
          </label>
          <textarea
            className={cn(field, "min-h-[88px] py-3")}
            id="bp-recording"
            name="recordingUse"
            rows={3}
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-location">
            Event location
          </label>
          <input className={field} id="bp-location" name="eventLocation" />
        </div>

        <div>
          <label className={label} htmlFor="bp-attendees">
            # of attendees
          </label>
          <input className={field} id="bp-attendees" name="attendeeCount" />
        </div>

        <div>
          <label className={label} htmlFor="bp-audience">
            Audience description
          </label>
          <textarea
            className={cn(field, "min-h-[100px] py-3")}
            id="bp-audience"
            name="audienceDescription"
            rows={4}
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-website">
            Event website
          </label>
          <input
            className={field}
            id="bp-website"
            name="eventWebsite"
            type="url"
            placeholder="https://"
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-reason">
            Event reason
          </label>
          <textarea
            className={cn(field, "min-h-[88px] py-3")}
            id="bp-reason"
            name="eventReason"
            rows={3}
          />
        </div>

        <div>
          <span className={label}>
            Is the speaker required to promote the event?
          </span>
          <div className="mt-2 flex flex-wrap gap-6 font-body text-neutral-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="speakerPromote"
                type="radio"
                value="yes"
              />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="speakerPromote"
                type="radio"
                value="no"
              />
              No
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                className="h-4 w-4 accent-brand-goldLight"
                name="speakerPromote"
                type="radio"
                value="unsure"
              />
              Unsure
            </label>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="bp-past">
            Which speakers have you hosted in the past?
          </label>
          <textarea
            className={cn(field, "min-h-[88px] py-3")}
            id="bp-past"
            name="pastSpeakers"
            rows={3}
          />
        </div>

        <div>
          <label className={label} htmlFor="bp-other">
            Are there other confirmed speakers?
          </label>
          <textarea
            className={cn(field, "min-h-[88px] py-3")}
            id="bp-other"
            name="otherSpeakers"
            rows={3}
          />
        </div>

        <Button
          className="w-full sm:w-auto"
          disabled={status === "loading"}
          type="submit"
          variant="primary"
        >
          {status === "loading" ? "Sending…" : "Submit inquiry"}
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

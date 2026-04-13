import { CloudSchedulerClient } from "@google-cloud/scheduler";
import { NextResponse } from "next/server";

const ADMIN_SECRET = process.env.NEWSLETTER_ADMIN_SECRET;
const GCP_PROJECT = process.env.GOOGLE_CLOUD_PROJECT ?? process.env.GCLOUD_PROJECT ?? "";
const GCP_LOCATION = process.env.GCP_SCHEDULER_LOCATION ?? "asia-south1";
const SCHEDULER_JOB_NAME = process.env.SCHEDULER_JOB_NAME ?? "newsletter-broadcast";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prachitantia.com";

function auth(request: Request) {
  return request.headers.get("x-admin-secret") === ADMIN_SECRET && !!ADMIN_SECRET;
}

/** Convert day/hour/minute to a cron expression.
 *  day: 0=Sunday … 6=Saturday (matches JS getDay())
 */
function toCron(day: number, hour: number, minute: number): string {
  return `${minute} ${hour} * * ${day}`;
}

export async function POST(request: Request) {
  if (!auth(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!GCP_PROJECT) {
    return NextResponse.json(
      { ok: false, error: "GCP project not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const day = typeof b.day === "number" ? b.day : -1;
  const hour = typeof b.hour === "number" ? b.hour : -1;
  const minute = typeof b.minute === "number" ? b.minute : -1;
  const timezone = typeof b.timezone === "string" ? b.timezone : "Asia/Kolkata";

  if (day < 0 || day > 6 || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return NextResponse.json(
      { ok: false, error: "day (0-6), hour (0-23), minute (0-59) are required." },
      { status: 400 },
    );
  }

  const schedule = toCron(day, hour, minute);
  const jobPath = `projects/${GCP_PROJECT}/locations/${GCP_LOCATION}/jobs/${SCHEDULER_JOB_NAME}`;
  const targetUri = `${SITE_URL}/api/newsletter/broadcast`;

  const client = new CloudSchedulerClient();

  try {
    await client.updateJob({
      job: {
        name: jobPath,
        schedule,
        timeZone: timezone,
        httpTarget: {
          uri: targetUri,
          httpMethod: "POST" as const,
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": ADMIN_SECRET!,
          },
          body: Buffer.from(JSON.stringify({ useScheduledDraft: true })),
        },
      },
      updateMask: {
        paths: ["schedule", "time_zone", "http_target"],
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // If the job doesn't exist yet, create it
    if (msg.includes("NOT_FOUND")) {
      await client.createJob({
        parent: `projects/${GCP_PROJECT}/locations/${GCP_LOCATION}`,
        job: {
          name: jobPath,
          schedule,
          timeZone: timezone,
          httpTarget: {
            uri: targetUri,
            httpMethod: "POST" as const,
            headers: {
              "Content-Type": "application/json",
              "x-admin-secret": ADMIN_SECRET!,
            },
            body: Buffer.from(JSON.stringify({ useScheduledDraft: true })),
          },
        },
      });
    } else {
      console.error("[schedule] Cloud Scheduler update failed:", err);
      return NextResponse.json({ ok: false, error: "Failed to update scheduler." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, schedule, timezone });
}

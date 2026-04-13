import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";

const ADMIN_SECRET = process.env.NEWSLETTER_ADMIN_SECRET;

function auth(request: Request) {
  return request.headers.get("x-admin-secret") === ADMIN_SECRET && !!ADMIN_SECRET;
}

/** GET — return the current pending draft (if any) */
export async function GET(request: Request) {
  if (!auth(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  // Avoid orderBy to not require a composite index before it's deployed.
  // Fetch all pending and pick the most recently created in JS.
  let snap;
  try {
    snap = await db
      .collection("newsletter_drafts")
      .where("status", "==", "pending")
      .get();
  } catch (err) {
    console.error("[draft] Firestore query failed:", err);
    return NextResponse.json({ ok: true, draft: null });
  }

  if (snap.empty) {
    return NextResponse.json({ ok: true, draft: null });
  }

  const docs = snap.docs.sort((a, b) => {
    const aTime = a.data().createdAt as string ?? "";
    const bTime = b.data().createdAt as string ?? "";
    return bTime.localeCompare(aTime);
  });

  const doc = docs[0]!;
  return NextResponse.json({
    ok: true,
    draft: { id: doc.id, ...doc.data() },
  });
}

/** POST — create or replace the pending draft */
export async function POST(request: Request) {
  if (!auth(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const bodyHtml = typeof b.bodyHtml === "string" ? b.bodyHtml.trim() : "";
  const schedule = b.schedule as {
    day: number;
    hour: number;
    minute: number;
    timezone: string;
  } | undefined;

  if (!subject || !bodyHtml) {
    return NextResponse.json(
      { ok: false, error: "subject and bodyHtml are required." },
      { status: 400 },
    );
  }

  // Mark any existing pending drafts as superseded (best-effort)
  try {
    const existing = await db
      .collection("newsletter_drafts")
      .where("status", "==", "pending")
      .get();
    const batch = db.batch();
    existing.docs.forEach((d) => batch.update(d.ref, { status: "superseded" }));
    await batch.commit();
  } catch (err) {
    console.warn("[draft] Could not supersede old drafts (index may be building):", err);
  }

  const docRef = await db.collection("newsletter_drafts").add({
    subject,
    bodyHtml,
    status: "pending",
    schedule: schedule ?? null,
    createdAt: new Date().toISOString(),
    sentAt: null,
  });

  return NextResponse.json({ ok: true, id: docRef.id });
}

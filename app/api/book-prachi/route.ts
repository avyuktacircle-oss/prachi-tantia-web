import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const o = body as Record<string, unknown>;

  const firstName = str(o.firstName);
  const lastName = str(o.lastName);
  const email = str(o.email);
  const eventMode = str(o.eventMode);

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Please enter your first and last name." },
      { status: 400 },
    );
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!eventMode) {
    return NextResponse.json(
      { ok: false, error: "Please select whether the event is in-person or virtual." },
      { status: 400 },
    );
  }

  const sessionFormats = Array.isArray(o.sessionFormats)
    ? o.sessionFormats.filter((x): x is string => typeof x === "string")
    : [];

  // TODO: Send via Resend / CRM / email to team
  void sessionFormats;

  return NextResponse.json({ ok: true });
}

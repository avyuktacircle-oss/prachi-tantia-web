import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Contact endpoint not implemented yet." },
    { status: 501 }
  );
}

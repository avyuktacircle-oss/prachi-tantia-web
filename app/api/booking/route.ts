import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Booking endpoint not implemented yet." },
    { status: 501 }
  );
}

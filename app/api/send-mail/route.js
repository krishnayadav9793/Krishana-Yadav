import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  await sendMail(body);

  return NextResponse.json({ success: true });
}

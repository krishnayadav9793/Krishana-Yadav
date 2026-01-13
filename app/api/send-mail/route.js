import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function POST(req,res) {
  const body = await req.json();
  console.log(body + "from api")
  await sendMail(body);

  return NextResponse.json({ success: true });
}

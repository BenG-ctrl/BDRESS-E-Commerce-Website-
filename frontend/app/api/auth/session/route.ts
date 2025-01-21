import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const { token } = await request.json();

  // Update the session with the new token
  const session = await auth();
  if (session) {
    session.token = token;
  }

  return NextResponse.json({ success: true });
}
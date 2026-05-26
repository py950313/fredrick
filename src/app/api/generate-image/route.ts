import { NextResponse } from "next/server";
import { getDailyMember } from "@/lib/members";
import { getDailySpot } from "@/lib/ai";

export async function GET() {
  const today = new Date();
  const member = getDailyMember(today);
  const spot = getDailySpot(today);

  return NextResponse.json({ spot, member: member.name });
}

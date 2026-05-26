import { NextResponse } from "next/server";
import { getDailyMember } from "@/lib/members";
import { getKaohsiungWeather } from "@/lib/weather";
import { generateDailyReport } from "@/lib/ai";

export const revalidate = 3600;

export async function GET() {
  try {
    const member = getDailyMember();
    const weather = await getKaohsiungWeather();
    const report = await generateDailyReport(member, weather);

    return NextResponse.json({ member, weather, report });
  } catch (error) {
    console.error("Daily report error:", error);
    return NextResponse.json(
      { error: "Failed to generate daily report" },
      { status: 500 }
    );
  }
}

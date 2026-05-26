import { NextResponse } from "next/server";
import { getDailyMember } from "@/lib/members";
import { getKaohsiungWeather } from "@/lib/weather";
import { generateDailyReport, getDailySpot } from "@/lib/ai";

export const revalidate = 3600;

export async function GET() {
  try {
    const member = getDailyMember();
    const weather = await getKaohsiungWeather();
    const report = await generateDailyReport(member, weather);
    const spot = getDailySpot();

    return NextResponse.json({ member, weather, report, spot });
  } catch (error) {
    console.error("Daily report error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

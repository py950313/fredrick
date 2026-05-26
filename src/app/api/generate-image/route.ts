import { NextResponse } from "next/server";
import { getDailyMember } from "@/lib/members";
import { generateScenicPhoto } from "@/lib/ai";

export async function GET() {
  try {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const member = getDailyMember(today);
    const imageUrl = await generateScenicPhoto(member, dateStr);

    return NextResponse.json({ imageUrl, member: member.name, date: dateStr });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

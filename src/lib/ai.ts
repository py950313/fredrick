import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { WeatherData } from "./weather";
import type { Member } from "./members";

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface DailyReport {
  encouragement: string;
  restaurant: {
    name: string;
    area: string;
    cuisine: string;
    reason: string;
  };
}

export async function generateDailyReport(
  member: Member,
  weather: WeatherData
): Promise<DailyReport> {
  const prompt = `你是「${member.name}」，你的個性是：${member.personality}。
描述：${member.description}

今天高雄的天氣是：${weather.description}，氣溫 ${weather.temperature}°C（體感 ${weather.apparentTemperature}°C），濕度 ${weather.humidity}%，風速 ${weather.windSpeed} km/h。

請用你的個性說一句鼓勵大家的話（100字以內），然後推薦一間真實存在的高雄餐廳（給餐廳名稱、地區、料理類型、推薦理由）。

請用以下 JSON 格式回覆：
{
  "encouragement": "鼓勵的話",
  "restaurant": {
    "name": "餐廳名稱",
    "area": "區域（如：三民區、鹽埕區等）",
    "cuisine": "料理類型",
    "reason": "推薦理由（50字以內）"
  }
}`;

  const message = await getAnthropic().messages.create({
    model: "claude-opus-4-7",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");

  return JSON.parse(jsonMatch[0]) as DailyReport;
}

const TAIWAN_SPOTS = [
  "台北101",
  "九份老街",
  "太魯閣國家公園",
  "日月潭",
  "阿里山",
  "墾丁國家公園",
  "野柳地質公園",
  "平溪天燈",
  "花蓮七星潭",
  "清境農場",
  "奮起湖老街",
  "三峽老街",
  "金瓜石",
  "澎湖藍洞",
  "綠島",
  "蘭嶼",
  "台南安平古堡",
  "高雄西子灣",
  "夜市文化",
  "宜蘭礁溪",
];

export async function generateScenicPhoto(
  member: Member,
  dateStr: string
): Promise<string> {
  const seed = dateStr
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const spot = TAIWAN_SPOTS[seed % TAIWAN_SPOTS.length];

  const prompt = `A cute cartoon hamster character named "${member.name}" (${member.personality}) taking a happy tourist selfie photo at ${spot} in Taiwan. The hamster is wearing a tourist hat and holding a small camera. Kawaii anime art style, bright cheerful colors, detailed scenic background showing ${spot}. The scene looks like a fun vacation photo.`;

  const response = await getOpenAI().images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });

  return response.data?.[0]?.url ?? "";
}

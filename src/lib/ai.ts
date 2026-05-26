import { GoogleGenerativeAI } from "@google/generative-ai";
import type { WeatherData } from "./weather";
import type { Member } from "./members";

function getGemini() {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
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
  const model = getGemini().getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `你是「${member.name}」，你的個性是：${member.personality}。
描述：${member.description}

今天高雄的天氣是：${weather.description}，氣溫 ${weather.temperature}°C（體感 ${weather.apparentTemperature}°C），濕度 ${weather.humidity}%，風速 ${weather.windSpeed} km/h。

請用你的個性說一句鼓勵大家的話（100字以內），然後推薦一間真實存在的高雄餐廳（給餐廳名稱、地區、料理類型、推薦理由）。

請只回覆以下 JSON，不要加其他文字：
{
  "encouragement": "鼓勵的話",
  "restaurant": {
    "name": "餐廳名稱",
    "area": "區域（如：三民區、鹽埕區等）",
    "cuisine": "料理類型",
    "reason": "推薦理由（50字以內）"
  }
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");

  return JSON.parse(jsonMatch[0]) as DailyReport;
}

export interface ScenicSpot {
  name: string;
  emoji: string;
  description: string;
  county: string;
}

const TAIWAN_SPOTS: ScenicSpot[] = [
  { name: "台北101", emoji: "🏙️", description: "世界第一高樓，夜景超美，跨年煙火必去聖地！", county: "台北市" },
  { name: "九份老街", emoji: "🏮", description: "紅燈籠、石階、芋圓，宮崎駿電影的靈感來源", county: "新北市" },
  { name: "太魯閣國家公園", emoji: "🏔️", description: "壯觀峽谷、清澈溪水，台灣最壯麗的自然奇景", county: "花蓮縣" },
  { name: "日月潭", emoji: "🌊", description: "台灣最大湖泊，日出薄霧如夢似幻", county: "南投縣" },
  { name: "阿里山", emoji: "🌅", description: "雲海、日出、神木、小火車，四大絕景一次滿足", county: "嘉義縣" },
  { name: "墾丁國家公園", emoji: "🏖️", description: "南台灣的海灘天堂，浮潛、衝浪、夜市通通有", county: "屏東縣" },
  { name: "野柳地質公園", emoji: "🗿", description: "女王頭、蘑菇石，大自然的神奇雕塑作品", county: "新北市" },
  { name: "平溪天燈", emoji: "🏮", description: "放天燈許願，漫天燈火如繁星，浪漫指數破表", county: "新北市" },
  { name: "花蓮七星潭", emoji: "🌊", description: "礫石海灘、清澈海水，中央山脈環抱的祕境", county: "花蓮縣" },
  { name: "清境農場", emoji: "🐑", description: "雲端上的牧場，歐洲風情在台灣！", county: "南投縣" },
  { name: "澎湖藍洞", emoji: "🌀", description: "夢幻藍色海蝕洞，浮潛看見台灣最藍的海", county: "澎湖縣" },
  { name: "綠島", emoji: "🐢", description: "全球少數可以夜間賞海龜的神奇小島", county: "台東縣" },
  { name: "蘭嶼", emoji: "🛶", description: "達悟族文化、拼板舟、飛魚季，台灣最後祕境", county: "台東縣" },
  { name: "台南安平古堡", emoji: "🏯", description: "荷蘭人建造的台灣第一座城堡，台南必訪歷史古蹟", county: "台南市" },
  { name: "高雄西子灣", emoji: "🌇", description: "夕陽最美的地方，柴山、海港、餘暉三重奏", county: "高雄市" },
  { name: "宜蘭礁溪溫泉", emoji: "♨️", description: "離台北最近的溫泉鄉，泡完湯吃蔥油餅超幸福", county: "宜蘭縣" },
  { name: "金瓜石黃金博物館", emoji: "🪙", description: "礦業小鎮改建，可以親手抱金塊的博物館", county: "新北市" },
  { name: "台東伯朗大道", emoji: "🌾", description: "金城武坐過的茄苳樹，綠色稻田無邊無際", county: "台東縣" },
  { name: "嘉義奮起湖", emoji: "🚂", description: "阿里山小火車停靠站，便當超好吃的山城小鎮", county: "嘉義縣" },
  { name: "台中彩虹眷村", emoji: "🎨", description: "黃爺爺一個人畫出的彩虹天地，色彩繽紛超療癒", county: "台中市" },
];

export function getDailySpot(date: Date = new Date()): ScenicSpot {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return TAIWAN_SPOTS[seed % TAIWAN_SPOTS.length];
}

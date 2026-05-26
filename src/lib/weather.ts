export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  emoji: string;
}

const WMO_CODES: Record<number, { description: string; emoji: string }> = {
  0: { description: "晴空萬里", emoji: "☀️" },
  1: { description: "大致晴朗", emoji: "🌤️" },
  2: { description: "部分多雲", emoji: "⛅" },
  3: { description: "多雲", emoji: "☁️" },
  45: { description: "霧", emoji: "🌫️" },
  48: { description: "霧淞", emoji: "🌫️" },
  51: { description: "輕毛毛雨", emoji: "🌦️" },
  53: { description: "毛毛雨", emoji: "🌦️" },
  55: { description: "強毛毛雨", emoji: "🌧️" },
  61: { description: "小雨", emoji: "🌧️" },
  63: { description: "中雨", emoji: "🌧️" },
  65: { description: "大雨", emoji: "⛈️" },
  71: { description: "小雪", emoji: "🌨️" },
  73: { description: "中雪", emoji: "❄️" },
  75: { description: "大雪", emoji: "❄️" },
  80: { description: "陣雨", emoji: "🌦️" },
  81: { description: "中陣雨", emoji: "🌧️" },
  82: { description: "強陣雨", emoji: "⛈️" },
  95: { description: "雷雨", emoji: "⛈️" },
  96: { description: "雷雨夾冰雹", emoji: "⛈️" },
  99: { description: "強雷雨夾冰雹", emoji: "⛈️" },
};

export async function getKaohsiungWeather(): Promise<WeatherData> {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=22.6273&longitude=120.3014&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FTaipei";

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Failed to fetch weather");

  const data = await response.json();
  const current = data.current;
  const code = current.weather_code as number;
  const info = WMO_CODES[code] ?? { description: "天氣不明", emoji: "🌡️" };

  return {
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: code,
    description: info.description,
    emoji: info.emoji,
  };
}

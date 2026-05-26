"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Member } from "@/lib/members";
import type { WeatherData } from "@/lib/weather";
import type { DailyReport, ScenicSpot } from "@/lib/ai";

interface DailyData {
  member: Member;
  weather: WeatherData;
  report: DailyReport;
  spot: ScenicSpot;
}

export default function DailyReporter() {
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/daily-report")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-amber-700 font-medium">阿佛正在準備今日播報...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">
        <p className="font-bold mb-1">糟糕！出錯了</p>
        <p className="text-sm">{error}</p>
        <p className="text-xs mt-2 text-red-400">
          請確認 .env.local 中的 GEMINI_API_KEY 已正確設定
        </p>
      </div>
    );
  }

  if (!data) return null;

  const { member, weather, report, spot } = data;
  const today = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="space-y-6">
      {/* 播報員 + 天氣 */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-lg">
        <p className="text-center text-sm text-amber-500 font-medium mb-4">
          {today}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-40 h-40 flex-shrink-0">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-amber-500 font-medium mb-1">今日播報員</p>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">
              {member.name}
            </h2>
            <div className="bg-white/70 rounded-2xl p-4 shadow-sm">
              <p className="text-3xl mb-2">{weather.emoji}</p>
              <p className="text-xl font-bold text-gray-800">
                {weather.temperature}°C{" "}
                <span className="text-base font-normal text-gray-500">
                  體感 {weather.apparentTemperature}°C
                </span>
              </p>
              <p className="text-gray-600 font-medium">{weather.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>💧 濕度 {weather.humidity}%</span>
                <span>💨 風速 {weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 鼓勵話語 */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-6 shadow-lg border border-amber-100">
        <p className="text-amber-500 font-bold text-sm mb-2">
          💬 {member.name} 說：
        </p>
        <blockquote className="text-gray-700 text-lg leading-relaxed italic">
          &ldquo;{report.encouragement}&rdquo;
        </blockquote>
      </div>

      {/* 餐廳推薦 */}
      <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 shadow-lg border border-rose-100">
        <p className="text-rose-500 font-bold text-sm mb-3">🍽️ 今日餐廳推薦</p>
        <div className="bg-white/70 rounded-2xl p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {report.restaurant.name}
            </h3>
            <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-medium">
              {report.restaurant.cuisine}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            📍 {report.restaurant.area}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {report.restaurant.reason}
          </p>
        </div>
      </div>

      {/* 今日台灣景點 */}
      <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl p-6 shadow-lg border border-sky-100">
        <p className="text-sky-600 font-bold text-sm mb-3">
          📍 今日阿佛想去的台灣景點
        </p>
        <div className="bg-white/70 rounded-2xl p-5 text-center">
          <div className="text-6xl mb-3">{spot.emoji}</div>
          <h3 className="text-2xl font-black text-gray-800 mb-1">{spot.name}</h3>
          <p className="text-xs text-sky-500 font-medium bg-sky-50 inline-block px-3 py-1 rounded-full mb-3">
            📌 {spot.county}
          </p>
          <p className="text-gray-600 leading-relaxed">{spot.description}</p>
          <div className="mt-4 pt-4 border-t border-sky-100">
            <p className="text-sm text-gray-400 italic">
              {member.name} 今天想帶你去 {spot.name} 玩！✈️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

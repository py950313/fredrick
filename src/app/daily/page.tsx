import Link from "next/link";
import DailyReporter from "@/components/DailyReporter";

export default function DailyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-amber-800 tracking-tight">
              🎙️ 今日阿佛播報
            </h1>
            <p className="text-xs text-amber-500">高雄天氣 · 餐廳推薦 · 景點合照</p>
          </div>
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-800 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            ← 回成員列表
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-8">
        <DailyReporter />
      </section>

      <footer className="bg-amber-800 text-amber-200 text-center py-6 text-sm mt-8">
        <p>© 2024 田鼠阿佛世界 · 每天都有一隻阿佛在守護你 🌙</p>
      </footer>
    </main>
  );
}

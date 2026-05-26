import Link from "next/link";
import MemberCard from "@/components/MemberCard";
import { members, getDailyMember } from "@/lib/members";

export default function Home() {
  const todayMember = getDailyMember();

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-amber-800 tracking-tight">
              🐭 田鼠阿佛
            </h1>
            <p className="text-xs text-amber-500">阿佛世界成員大本營</p>
          </div>
          <Link
            href="/daily"
            className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-5 py-2 rounded-full shadow transition-colors text-sm"
          >
            🎙️ 今日播報
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-black text-amber-800 mb-3">
          歡迎來到阿佛世界 🌍
        </h2>
        <p className="text-amber-600 text-lg max-w-xl mx-auto">
          這裡住著一群可愛的田鼠，每個都有自己獨特的個性和故事。
          快來認識你最喜歡的阿佛吧！
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          今日播報員：{todayMember.name}
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-xl font-bold text-amber-700 mb-6 flex items-center gap-2">
          <span>🐾</span> 全體成員介紹
          <span className="text-sm font-normal text-amber-400">
            ({members.length} 位成員)
          </span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isToday={member.id === todayMember.id}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-amber-200 text-center py-6 text-sm">
        <p>© 2024 田鼠阿佛世界 · 每天都有一隻阿佛在守護你 🌙</p>
      </footer>
    </main>
  );
}

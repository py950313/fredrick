"use client";

import Image from "next/image";
import type { Member } from "@/lib/members";

interface Props {
  member: Member;
  isToday?: boolean;
}

export default function MemberCard({ member, isToday }: Props) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isToday ? "ring-4 ring-amber-400 ring-offset-2" : ""
      }`}
    >
      {isToday && (
        <div className="absolute top-3 right-3 z-10 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          今日播報員 🎙️
        </div>
      )}
      <div className="relative h-56 bg-amber-50">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-amber-800 mb-1">{member.name}</h3>
        <p className="text-xs text-amber-500 font-medium mb-2 bg-amber-50 inline-block px-2 py-0.5 rounded-full">
          {member.personality}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed h-20 overflow-y-auto">
          {member.description}
        </p>
      </div>
    </div>
  );
}

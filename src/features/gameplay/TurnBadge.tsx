import type { TurnType } from "../../types/game";

interface TurnBadgeProps {
  type: TurnType | null;
}

export default function TurnBadge({
  type,
}: TurnBadgeProps) {
  if (!type) {
    return null;
  }

  const config = {
    truth: {
      label: "TRUTH",
      emoji: "🟢",
      className:
        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    },
    dare: {
      label: "DARE",
      emoji: "🔴",
      className:
        "bg-red-500/15 text-red-400 border border-red-500/30",
    },
    random: {
      label: "EVENT",
      emoji: "⚡",
      className:
        "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    },
  } as const;

  const badge = config[type];

  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 ${badge.className}`}
      >
        <span>{badge.emoji}</span>

        <span>{badge.label}</span>
      </div>
    </div>
  );
}
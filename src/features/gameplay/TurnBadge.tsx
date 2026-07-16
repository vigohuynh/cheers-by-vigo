import { useEffect, useState } from "react";

import type { TurnType } from "../../types/game";

interface TurnBadgeProps {
  type: TurnType | null;
}

export default function TurnBadge({
  type,
}: TurnBadgeProps) {
  const [visibleType, setVisibleType] =
    useState<TurnType | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisibleType(type);
    });

    return () => cancelAnimationFrame(frame);
  }, [type]);

  if (!type) {
    return null;
  }

  const isVisible = visibleType === type;

  const config = {
    truth: {
      label: "TRUTH",
      emoji: "🟢",
      className:
        "bg-sky-500/15 text-sky-300 border border-sky-400/40",
    },
    dare: {
      label: "DARE",
      emoji: "🔴",
      className:
        "bg-rose-500/15 text-rose-300 border border-rose-500/40",
    },
    random: {
      label: "EVENT",
      emoji: "⚡",
      className:
        "bg-amber-500/15 text-amber-300 border border-amber-400/40",
    },
  } as const;

  const badge = config[type];

  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold tracking-[0.25em] uppercase transition-all duration-200 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0"
        } ${badge.className}`}
      >
        <span>{badge.emoji}</span>

        <span>{badge.label}</span>
      </div>
    </div>
  );
}

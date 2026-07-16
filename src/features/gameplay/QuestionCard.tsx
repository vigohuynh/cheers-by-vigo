import type { Card } from "../../types/card";
import type { CardAnimationState } from "./cardAnimation";

interface QuestionCardProps {
  card: Card | null;
  animationState: CardAnimationState;
  rolling: boolean;
  showCard: boolean;
}

export default function QuestionCard({
  card,
  animationState,
  rolling,
  showCard,
}: QuestionCardProps) {
  const isVisible = showCard && animationState === "visible";
  const isFadingOut = animationState === "flipping";

  const themeClass = {
    truth:
      "border-slate-500/40 bg-slate-900/70 text-slate-100",
    dare:
      "border-rose-700/50 bg-rose-950/80 text-rose-100",
    random:
      "border-amber-700/40 bg-amber-950/70 text-amber-100",
  }[card?.type ?? "random"];

  return (
    <div
      className={`flex min-h-[220px] items-center justify-center transition-opacity duration-[150ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isFadingOut ? "opacity-0" : ""}`}
    >
      <div
        className={`w-full rounded-2xl border px-4 py-6 transition-all duration-300 ease-out ${themeClass} transition-transform duration-[150ms] ease-out origin-center ${
          isFadingOut ? "scale-[0.97]" : "scale-100"
        }`}
      >
        {rolling ? (
          <p className="text-xl text-zinc-400">
            🎲 Đang chuẩn bị câu hỏi...
          </p>
        ) : (
          <p className="max-w-[90%] text-center text-2xl font-medium leading-10 text-zinc-100">
            {card?.content ?? ""}
          </p>
        )}
      </div>
    </div>
  );
}

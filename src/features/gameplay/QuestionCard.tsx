import type { Card } from "../../types/card";

interface QuestionCardProps {
  card: Card | null;
  rolling: boolean;
  showCard: boolean;
}

export default function QuestionCard({
  card,
  rolling,
  showCard,
}: QuestionCardProps) {
  return (
    <div
      className={`flex min-h-[220px] items-center justify-center transition-all duration-[250ms] ease-out ${
        showCard
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-[0.98] opacity-0"
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
  );
}

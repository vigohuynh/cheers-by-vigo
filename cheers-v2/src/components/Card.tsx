import type { Card as GameCard } from "../types/card";

type CardProps = {
  card: GameCard;
};

export default function Card({
  card,
}: CardProps) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-lg">
      <div className="text-center">

        <div className="text-sm uppercase text-red-500 tracking-widest">
          {card.type}
        </div>

        <h2 className="text-3xl font-bold mt-3">
          {card.title}
        </h2>

        <p className="text-zinc-300 mt-6 whitespace-pre-wrap">
          {card.description}
        </p>

      </div>
    </div>
  );
}
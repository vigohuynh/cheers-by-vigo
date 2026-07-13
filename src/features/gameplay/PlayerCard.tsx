interface PlayerCardProps {
  name: string;
  rolling: boolean;
}

export default function PlayerCard({
  name,
  rolling,
}: PlayerCardProps) {
  return (
    <div className="space-y-6">

      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
        NGƯỜI CHƠI
      </h2>

      <h1
        className={`text-4xl font-black text-red-500 transition-all duration-300 ${
          rolling
            ? "scale-95 opacity-70"
            : "scale-100 opacity-100"
        }`}
      >
        {name}
      </h1>

    </div>
  );
}
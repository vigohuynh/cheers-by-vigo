import { useEffect, useRef, useState } from "react";

interface PlayerCardProps {
  name: string;
  rolling: boolean;
}

export default function PlayerCard({
  name,
  rolling,
}: PlayerCardProps) {
  const [highlighted, setHighlighted] = useState(false);
  const wasRollingRef = useRef(rolling);

  useEffect(() => {
    if (wasRollingRef.current && !rolling) {
      setHighlighted(true);

      const highlightTimer = setTimeout(() => {
        setHighlighted(false);
      }, 900);

      return () => {
        clearTimeout(highlightTimer);
      };
    }

    wasRollingRef.current = rolling;
  }, [rolling]);

  return (
    <div
      className={`space-y-6 rounded-2xl border border-zinc-700 px-6 py-4 transition-all duration-300 ease-out ${
        highlighted
          ? "border-red-400 bg-zinc-800/90 shadow-[0_0_24px_rgba(248,113,113,0.35)]"
          : "border-zinc-700 bg-zinc-900/70"
      }`}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
        NGƯỜI CHƠI
      </h2>

      <h1
        className={`text-4xl font-black text-red-500 transition-all duration-[250ms] ease-out ${
          rolling
            ? "scale-95 opacity-70"
            : "scale-100 opacity-100 drop-shadow-[0_0_12px_rgba(239,68,68,0.45)]"
        } ${highlighted ? "brightness-125" : "brightness-100"}`}
      >
        {name}
      </h1>
    </div>
  );
}

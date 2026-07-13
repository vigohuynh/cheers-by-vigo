interface SelectionCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function SelectionCard({
  icon,
  title,
  subtitle,
  selected = false,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-3xl
        border
        p-6
        text-center
        transition-all
        duration-200
        active:scale-[0.98]

        ${
          selected
            ? "border-red-500 bg-red-500/10 shadow-xl shadow-red-500/10"
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
        }
      `}
    >
      <div className="mb-4 text-4xl">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-white">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {subtitle}
        </p>
      )}
    </button>
  );
}
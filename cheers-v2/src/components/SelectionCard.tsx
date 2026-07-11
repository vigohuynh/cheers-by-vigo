interface SelectionCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SelectionCard({
  title,
  subtitle,
  icon,
  selected = false,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-6
        transition-all
        duration-200

        ${
          selected
            ? "border-red-600 bg-red-600/10"
            : "border-zinc-800 bg-zinc-900 hover:border-red-500"
        }
      `}
    >
      {icon && (
        <div className="mb-4 text-4xl">
          {icon}
        </div>
      )}

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-zinc-400">
          {subtitle}
        </p>
      )}
    </button>
  );
}
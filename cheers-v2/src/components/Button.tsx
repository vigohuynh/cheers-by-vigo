interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const base =
    "h-14 w-full rounded-2xl font-semibold transition-all duration-200 active:scale-95";

  const primary =
    "bg-red-600 text-white hover:bg-red-700";

  const secondary =
    "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${
        variant === "primary"
          ? primary
          : secondary
      }`}
    >
      {children}
    </button>
  );
}
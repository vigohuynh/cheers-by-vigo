import { SoundEffectPlayer } from "../services/audio/SoundEffectPlayer";

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
    "h-16 w-full rounded-2xl text-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50";

  const primary =
    "bg-red-600 text-white hover:bg-red-700";

  const secondary =
    "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800";

  function handleClick() {
    void new SoundEffectPlayer().play("click");
    onClick?.();
  }

  return (
    <button
      type={type}
      onClick={handleClick}
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
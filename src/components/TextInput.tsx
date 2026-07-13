interface TextInputProps {
  value: string;
  placeholder?: string;
  onChange: (
    value: string
  ) => void;
}

export default function TextInput({
  value,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        h-14
        w-full
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900
        px-5
        text-lg
        text-white
        placeholder:text-zinc-500
        outline-none
        transition-all
        duration-200
        focus:border-red-500
        focus:ring-2
        focus:ring-red-500/20
      "
    />
  );
}
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
      outline-none
      transition

      focus:border-red-600
      focus:ring-2
      focus:ring-red-600/30
      "
    />
  );
}
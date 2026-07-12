interface TextInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
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
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900
        px-5
        py-4
        text-lg
        text-white
        placeholder:text-zinc-500
        outline-none
        transition
        focus:border-red-500
      "
    />
  );
}
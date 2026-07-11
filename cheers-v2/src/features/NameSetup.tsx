import { useState } from "react";

import Screen from "../components/Screen";
import Button from "../components/Button";

type NameSetupProps = {
  playerCount: number;
  onBack: () => void;
  onNext: (names: string[]) => void;
};

export default function NameSetup({
  playerCount,
  onBack,
  onNext,
}: NameSetupProps) {
  const [names, setNames] = useState<string[]>(
    Array(playerCount).fill("")
  );

  const handleChange = (
    index: number,
    value: string
  ) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleNext = () => {
    const result = names.map((name, index) =>
      name.trim() === ""
        ? `Người chơi ${index + 1}`
        : name.trim()
    );

    onNext(result);
  };

  return (
    <Screen
      title="Tên người chơi"
      subtitle="Nhập tên từng người tham gia"
    >
      <div className="space-y-4">
        {names.map((name, index) => (
          <input
            key={index}
            type="text"
            value={name}
            placeholder={`Người chơi ${index + 1}`}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              px-4
              py-4
              text-white
              outline-none
              transition
              focus:border-red-600
            "
          />
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={onBack}>
          QUAY LẠI
        </Button>

        <Button onClick={handleNext}>
          TIẾP TỤC
        </Button>
      </div>
    </Screen>
  );
}
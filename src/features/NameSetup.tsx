import { useState } from "react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";

import { useGame } from "../context/GameContext";
import type { Player } from "../types/player";

interface NameSetupProps {
  onBack: () => void;
  onNext: () => void;
}

export default function NameSetup({
  onBack,
  onNext,
}: NameSetupProps) {
  const { playerCount, setPlayers } = useGame();

  const [names, setNames] = useState<string[]>(
    Array(playerCount).fill("")
  );

  function handleChange(
    index: number,
    value: string
  ) {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  }

  function handleNext() {
    const players: Player[] = names.map(
      (name, index) => ({
        id: index + 1,
        name:
          name.trim() ||
          `Người chơi ${index + 1}`,
        selectedCount: 0,
        drinkCount: 0,
      })
    );

    setPlayers(players);

    onNext();
  }

  return (
    <Screen>
      <PageHeader
        title="Tên người chơi"
        subtitle="Nhập tên tất cả người tham gia"
      />

      <div className="mt-8 space-y-5">

        {names.map((name, index) => (
          <div
            key={index}
            className="space-y-2"
          >
            <p className="text-sm font-semibold text-zinc-400">
              Người chơi {index + 1}
            </p>

            <TextInput
              value={name}
              placeholder="Nhập tên..."
              onChange={(value) =>
                handleChange(index, value)
              }
            />
          </div>
        ))}

      </div>

      <div className="mt-10 flex gap-4">

        <Button
          variant="secondary"
          onClick={onBack}
        >
          QUAY LẠI
        </Button>

        <Button
          onClick={handleNext}
        >
          TIẾP TỤC
        </Button>

      </div>
    </Screen>
  );
}
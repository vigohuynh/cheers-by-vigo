import { useState } from "react";

import Button from "../components/Button";
import Screen from "../components/Screen";
import SelectionCard from "../components/SelectionCard";

interface PlayerSetupProps {
  onNext: (count: number) => void;
}

export default function PlayerSetup({
  onNext,
}: PlayerSetupProps) {
  const [selectedCount, setSelectedCount] =
    useState(4);

  const playerOptions = [
    2, 3, 4, 5, 6, 7, 8,
  ];

  return (
    <Screen
      title="Số người chơi"
      subtitle="Chọn số lượng người tham gia"
    >
      <div className="grid grid-cols-2 gap-4">
        {playerOptions.map((count) => (
          <SelectionCard
            key={count}
            icon="👥"
            title={`${count} Người`}
            selected={
              selectedCount === count
            }
            onClick={() =>
              setSelectedCount(count)
            }
          />
        ))}
      </div>

      <div className="mt-8">
        <Button
          onClick={() =>
            onNext(selectedCount)
          }
        >
          TIẾP TỤC
        </Button>
      </div>
    </Screen>
  );
}
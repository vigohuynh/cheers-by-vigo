import { useState } from "react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Screen from "../components/Screen";
import SelectionCard from "../components/SelectionCard";

import { useGame } from "../context/GameContext";

import type { GameMode } from "../types/game";

interface ModeSetupProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ModeSetup({
  onBack,
  onNext,
}: ModeSetupProps) {
  const { setMode } = useGame();

  const [selectedMode, setSelectedMode] =
    useState<GameMode>("late-night");

  function handleNext() {
    setMode(selectedMode);
    onNext();
  }

  return (
    <Screen>
      <PageHeader
        title="Chọn chế độ"
        subtitle="Lựa chọn cách chơi phù hợp với nhóm của bạn"
      />

      <div className="space-y-5">

        <SelectionCard
          icon="🌙"
          title="Late Night"
          subtitle="Vui vẻ, cân bằng, phù hợp mọi cuộc chơi."
          selected={selectedMode === "late-night"}
          onClick={() =>
            setSelectedMode("late-night")
          }
        />

        <SelectionCard
          icon="🔥"
          title="Hardcore"
          subtitle="Thử thách nhiều hơn dành cho hội chơi hết mình."
          selected={selectedMode === "hardcore"}
          onClick={() =>
            setSelectedMode("hardcore")
          }
        />

      </div>

      <div className="mt-8 flex gap-4">

        <Button
          variant="secondary"
          onClick={onBack}
        >
          QUAY LẠI
        </Button>

        <Button
          onClick={handleNext}
        >
          BẮT ĐẦU GAME
        </Button>

      </div>
    </Screen>
  );
}
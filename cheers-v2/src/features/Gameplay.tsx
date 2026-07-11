import { useEffect, useState } from "react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Screen from "../components/Screen";

import { GameSession } from "../engine/GameSession";

import type { Player } from "../types/player";
import type { Card } from "../types/card";

interface GameplayProps {
  session: GameSession;
  onRestart: () => void;
}

export default function Gameplay({
  session,
  onRestart,
}: GameplayProps) {
  const [currentPlayer, setCurrentPlayer] =
    useState<Player | null>(null);

  const [currentCard, setCurrentCard] =
    useState<Card | null>(null);

  const [round, setRound] = useState(1);

  function drawNextTurn() {
    const turn = session.nextTurn();

    setCurrentPlayer(turn.player);
    setCurrentCard(turn.card);
    setRound(session.getRound());
  }

  useEffect(() => {
    drawNextTurn();
  }, []);

  return (
    <Screen>
      <PageHeader
        title="Gameplay"
        subtitle={`Lượt ${round}`}
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          ĐẾN LƯỢT
        </p>

        <h2 className="mt-3 text-4xl font-bold text-red-500">
          {currentPlayer?.name ?? "-"}
        </h2>

        <div className="my-8 border-t border-zinc-700" />

        <p className="text-xl leading-9 text-zinc-100">
          {currentCard?.content ?? ""}
        </p>

      </div>

      <div className="mt-8 flex gap-4">

        <Button
          variant="secondary"
          onClick={onRestart}
        >
          KẾT THÚC
        </Button>

        <Button
          onClick={drawNextTurn}
        >
          LƯỢT TIẾP
        </Button>

      </div>
    </Screen>
  );
}
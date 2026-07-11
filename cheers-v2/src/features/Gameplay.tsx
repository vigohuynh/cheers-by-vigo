import { useEffect, useRef, useState } from "react";

import Button from "../components/Button";
import Screen from "../components/Screen";

import { GameSession } from "../engine/GameSession";

import type { Player } from "../types/player";
import type { Card } from "../types/card";

interface GameplayProps {
  session: GameSession;
}

export default function Gameplay({
  session,
}: GameplayProps) {
  const [player, setPlayer] =
    useState<Player | null>(null);

  const [card, setCard] =
    useState<Card | null>(null);

  const [round, setRound] =
    useState(1);

  const [rolling, setRolling] =
    useState(false);

  const timerRef =
    useRef<number | null>(null);

  function finishTurn() {
    const turn = session.nextTurn();

    setPlayer(turn.player);
    setCard(turn.card);
    setRound(session.getRound());

    setRolling(false);
  }

  function nextTurn() {
    if (rolling) return;

    setRolling(true);

    const players =
      session.getPlayers();

    let index = 0;

    const interval = window.setInterval(() => {
      setPlayer(players[index]);

      index++;

      if (index >= players.length) {
        index = 0;
      }
    }, 90);

    timerRef.current = window.setTimeout(() => {
      clearInterval(interval);

      finishTurn();
    }, 1200);
  }

  useEffect(() => {
    finishTurn();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Screen>
      <div className="space-y-8 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
          LƯỢT {round}
        </p>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <h1 className="text-5xl font-extrabold text-red-500">
            {player?.name ?? ""}
          </h1>

          <div className="my-8 border-t border-zinc-800" />

          <p className="min-h-[140px] text-xl leading-9 text-zinc-100">
            {rolling
              ? "🎲 Đang chọn người chơi..."
              : card?.content ?? ""}
          </p>

        </div>

        <Button
          disabled={rolling}
          onClick={nextTurn}
        >
          {rolling
            ? "ĐANG CHỌN..."
            : "ĐÃ XONG"}
        </Button>

      </div>
    </Screen>
  );
}
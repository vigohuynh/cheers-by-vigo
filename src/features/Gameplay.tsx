import { useEffect, useRef, useState } from "react";

import Button from "../components/Button";
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
  const [player, setPlayer] =
    useState<Player | null>(null);

  const [card, setCard] =
    useState<Card | null>(null);

  const [round, setRound] =
    useState(1);

  const [rolling, setRolling] =
    useState(false);

  const [showCard, setShowCard] =
    useState(true);

  const [finished, setFinished] =
    useState(false);

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  function finishTurn() {
    const turn = session.nextTurn();

    if (!turn) {
      setFinished(true);
      setRolling(false);
      return;
    }

    setPlayer(turn.player);
    setRound(session.getRound());

    setTimeout(() => {
      setCard(turn.card);
      setShowCard(true);
      setRolling(false);
    }, 200);
  }

  function nextTurn() {
    if (rolling || finished) return;

    setRolling(true);
    setShowCard(false);

    const players = session.getPlayers();

    let index = 0;

    intervalRef.current = setInterval(() => {
      setPlayer(players[index]);

      index++;

      if (index >= players.length) {
        index = 0;
      }
    }, 90);

    timerRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      finishTurn();
    }, 1200);
  }

  useEffect(() => {
    finishTurn();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (finished) {
    return (
      <Screen>
        <div className="space-y-8 text-center">
          <h1 className="text-6xl">
            🎉
          </h1>

          <h2 className="text-4xl font-bold">
            HẾT CÂU HỎI
          </h2>

          <p className="text-zinc-400">
            Cảm ơn mọi người đã chơi!
          </p>

          <Button onClick={onRestart}>
            CHƠI LẠI
          </Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="space-y-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
          LƯỢT {round}
        </p>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
          <h1
            className={`text-5xl font-extrabold text-red-500 transition-all duration-300 ${
              rolling
                ? "scale-95 opacity-70"
                : "scale-100 opacity-100"
            }`}
          >
            {player?.name ?? ""}
          </h1>

          <div className="my-8 border-t border-zinc-800" />

          <div
            className={`min-h-[140px] transition-all duration-300 ${
              showCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {rolling ? (
              <p className="text-xl text-zinc-400">
                🎲 Đang chọn người chơi...
              </p>
            ) : (
              <p className="text-xl leading-9 text-zinc-100">
                {card?.content ?? ""}
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={nextTurn}
          disabled={rolling}
        >
          {rolling
            ? "ĐANG CHỌN..."
            : "ĐÃ XONG"}
        </Button>
      </div>
    </Screen>
  );
}
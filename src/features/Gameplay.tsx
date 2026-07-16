import { useEffect, useRef, useState } from "react";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { GameSession } from "../engine/GameSession";
import { AudioPlayer } from "../services/audio/AudioPlayer";
import type { Card } from "../types/card";
import type { TurnType } from "../types/game";
import type { Player } from "../types/player";
import EndScreen from "./gameplay/EndScreen";
import PlayerCard from "./gameplay/PlayerCard";
import QuestionCard from "./gameplay/QuestionCard";
import TurnBadge from "./gameplay/TurnBadge";

interface GameplayProps {
  session: GameSession;
  onRestart: () => void;
  voiceEnabled: boolean;
}

export default function Gameplay({
  session,
  onRestart,
  voiceEnabled,
}: GameplayProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [turnType, setTurnType] = useState<TurnType | null>(null);
  const [round, setRound] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioPlayerRef = useRef(new AudioPlayer());

  function finishTurn() {
    if (session.getPlayers().length === 0) {
      setFinished(true);
      return;
    }

    const nextPlayer = session.selectPlayer();
    const nextTurnType = session.selectTurnType();
    const nextCard = session.drawCard();

    if (!nextCard) {
      setFinished(true);
      setRolling(false);
      return;
    }

    setPlayer(nextPlayer);
    setTurnType(nextTurnType);
    setRound(session.getRound());
    setRolling(false);

    badgeTimerRef.current = setTimeout(() => {
      setShowBadge(true);

      revealTimerRef.current = setTimeout(() => {
        setCard(nextCard);
        setShowCard(true);
      }, 200);
    }, 150);
  }

  function nextTurn() {
    if (rolling || finished || !showCard) return;

    setRolling(true);
    setShowBadge(false);
    setShowCard(false);

    const players = session.getPlayers();
    let index = 0;

    intervalRef.current = setInterval(() => {
      setPlayer(players[index]);

      index = index + 1 >= players.length ? 0 : index + 1;
    }, 90);

    timerRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      finishTurn();
    }, 1200);
  }

  useEffect(() => {
    // The initial turn must start as soon as Gameplay mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    finishTurn();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      audioPlayerRef.current.stop();
    };
    // finishTurn intentionally runs once for the initial turn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!voiceEnabled) {
      audioPlayerRef.current.stop();
      return;
    }

    if (!card) {
      return;
    }

    void audioPlayerRef.current
      .play(`/audio/cards/${card.id}.mp3`)
      .catch(() => {
        // Fail silently when the pre-generated MP3 file is unavailable.
      });
  }, [card, voiceEnabled]);

  if (finished) {
    return <EndScreen onRestart={onRestart} />;
  }

  return (
    <Screen>
      <div className="space-y-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-zinc-500">
          LƯỢT {round}
        </p>

        <div className="rounded-[32px] border border-zinc-700 bg-zinc-900 p-10 shadow-2xl">
          <PlayerCard
            name={player?.name ?? ""}
            rolling={rolling}
          />

          <div
            className={`mt-6 min-h-9 transition-all duration-200 ease-out ${
              showBadge
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0"
            }`}
          >
            <TurnBadge type={turnType} />
          </div>

          <div className="my-6 border-t border-zinc-700" />

          <QuestionCard
            card={card}
            rolling={rolling}
            showCard={showCard}
          />
        </div>

        <div className="pt-2">
          <Button onClick={nextTurn} disabled={rolling || !showCard}>
            {rolling
              ? "ĐANG CHỌN..."
              : "ĐÃ XONG"}
          </Button>
        </div>
      </div>
    </Screen>
  );
}

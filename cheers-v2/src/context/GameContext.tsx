import {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { Player } from "../types/player";
import type {
  Card,
  GameMode,
} from "../types/card";

interface GameContextType {
  players: Player[];
  setPlayers: React.Dispatch<
    React.SetStateAction<Player[]>
  >;

  currentPlayer: Player | null;
  setCurrentPlayer: React.Dispatch<
    React.SetStateAction<Player | null>
  >;

  currentCard: Card | null;
  setCurrentCard: React.Dispatch<
    React.SetStateAction<Card | null>
  >;

  mode: GameMode;

  setMode: React.Dispatch<
    React.SetStateAction<GameMode>
  >;

  lastPlayerId: number | null;

  setLastPlayerId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

const GameContext =
  createContext<GameContextType | null>(
    null
  );

export function GameProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [players, setPlayers] =
    useState<Player[]>([]);

  const [currentPlayer, setCurrentPlayer] =
    useState<Player | null>(null);

  const [currentCard, setCurrentCard] =
    useState<Card | null>(null);

  const [mode, setMode] =
    useState<GameMode>("late-night");

  const [lastPlayerId, setLastPlayerId] =
    useState<number | null>(null);

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,

        currentPlayer,
        setCurrentPlayer,

        currentCard,
        setCurrentCard,

        mode,
        setMode,

        lastPlayerId,
        setLastPlayerId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context =
    useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame must be used inside GameProvider"
    );
  }

  return context;
}
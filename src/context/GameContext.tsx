import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Player } from "../types/player";
import type { GameMode } from "../types/game";

import { GameSession } from "../engine/GameSession";

interface GameContextType {
  playerCount: number;
  setPlayerCount: (count: number) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;

  mode: GameMode | null;
  setMode: (mode: GameMode | null) => void;

  session: GameSession | null;
  setSession: (session: GameSession | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({
  children,
}: GameProviderProps) {
  const [playerCount, setPlayerCount] =
    useState<number>(4);

  const [players, setPlayers] =
    useState<Player[]>([]);

  const [mode, setMode] =
    useState<GameMode | null>(null);

  const [session, setSession] =
    useState<GameSession | null>(null);

  return (
    <GameContext.Provider
      value={{
        playerCount,
        setPlayerCount,

        players,
        setPlayers,

        mode,
        setMode,

        session,
        setSession,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame must be used within GameProvider."
    );
  }

  return context;
}
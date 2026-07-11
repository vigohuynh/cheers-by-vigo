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
  setMode: (mode: GameMode) => void;

  session: GameSession | null;
  setSession: (session: GameSession | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function GameProvider({
  children,
}: Props) {
  const [playerCount, setPlayerCount] =
    useState(4);

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

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame phải được dùng trong GameProvider."
    );
  }

  return context;
}
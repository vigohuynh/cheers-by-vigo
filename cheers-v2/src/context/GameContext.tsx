import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Player } from "../types/player";
import type { GameMode } from "../types/game";

interface GameContextType {
  playerCount: number;
  setPlayerCount: (count: number) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;

  mode: GameMode | null;
  setMode: (mode: GameMode) => void;

  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;

  round: number;
  setRound: (round: number) => void;
}

const GameContext = createContext<
  GameContextType | undefined
>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({
  children,
}: GameProviderProps) {
  const [playerCount, setPlayerCount] =
    useState(4);

  const [players, setPlayers] =
    useState<Player[]>([]);

  const [mode, setMode] =
    useState<GameMode | null>(null);

  const [currentPlayer, setCurrentPlayer] =
    useState<Player | null>(null);

  const [round, setRound] =
    useState(1);

  return (
    <GameContext.Provider
      value={{
        playerCount,
        setPlayerCount,

        players,
        setPlayers,

        mode,
        setMode,

        currentPlayer,
        setCurrentPlayer,

        round,
        setRound,
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
import { createContext, useContext, useState, ReactNode } from "react";

export type GameMode = "chill" | "drinking" | "latenight";

export interface Player {
  id: number;
  name: string;
}

interface GameContextType {
  playerCount: number;
  setPlayerCount: (count: number) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;

  mode: GameMode;
  setMode: (mode: GameMode) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [players, setPlayers] = useState<Player[]>([]);
  const [mode, setMode] = useState<GameMode>("drinking");

  return (
    <GameContext.Provider
      value={{
        playerCount,
        setPlayerCount,
        players,
        setPlayers,
        mode,
        setMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame phải được dùng trong GameProvider");
  }

  return context;
}
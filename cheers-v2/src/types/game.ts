import type { Player } from "./player";

export type GameMode =
  | "late-night"
  | "hardcore";

export interface GameState {
  playerCount: number;

  players: Player[];

  mode: GameMode | null;

  currentPlayer: Player | null;

  lastPlayerId: number | null;

  round: number;
}
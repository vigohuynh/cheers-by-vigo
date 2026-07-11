import type { Card } from "./card";
import type { Player } from "./player";

export interface GameState {
  players: Player[];

  currentPlayer: Player | null;

  currentCard: Card | null;

  lastPlayerId: number | null;
}
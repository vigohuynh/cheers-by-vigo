import { Card, GameMode } from "./card";
import { Player } from "./player";

export interface GameState {

  round: number;

  mode: GameMode;

  players: Player[];

  currentPlayer: Player | null;

  currentCard: Card | null;

}
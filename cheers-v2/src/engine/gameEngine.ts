import type { Player } from "../types/player";
import type {
  Card,
  GameMode,
} from "../types/card";

import { getNextPlayer } from "./playerEngine";
import { getRandomCard } from "./cardEngine";

export interface TurnResult {
  player: Player;
  card: Card;
}

export function nextTurn(
  players: Player[],
  mode: GameMode,
  lastPlayerId: number | null
): TurnResult {
  const player = getNextPlayer(
    players,
    lastPlayerId
  );

  player.selectedCount++;

  const card = getRandomCard(mode);

  return {
    player,
    card,
  };
}
import type { Player } from "../types/player";
import type { Card } from "../types/card";

import { getRandomPlayer } from "./playerEngine";
import { getRandomCard } from "./cardEngine";

export interface GameTurn {
  player: Player;
  card: Card;
}

export function nextTurn(
  players: Player[],
  cards: Card[],
  lastPlayerId: number | null,
  usedCardIds: number[]
): GameTurn {
  const player = getRandomPlayer(
    players,
    lastPlayerId
  );

  const card = getRandomCard(
    cards,
    usedCardIds
  );

  return {
    player,
    card,
  };
}
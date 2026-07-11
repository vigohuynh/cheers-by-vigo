import type { Player } from "../types/player";
import type { Card } from "../types/card";

import { nextTurn } from "./gameEngine";

export interface TurnResult {
  player: Player;
  card: Card;
}

export class GameSession {
  private players: Player[];

  private cards: Card[];

  private usedCardIds: number[] = [];

  private lastPlayerId: number | null = null;

  private round = 1;

  constructor(
    players: Player[],
    cards: Card[]
  ) {
    this.players = players;
    this.cards = cards;
  }

  nextTurn(): TurnResult {
    const result = nextTurn(
      this.players,
      this.cards,
      this.lastPlayerId,
      this.usedCardIds
    );

    this.lastPlayerId = result.player.id;

    this.usedCardIds.push(result.card.id);

    this.round++;

    return result;
  }

  getRound(): number {
    return this.round;
  }

  getPlayers(): Player[] {
    return [...this.players];
  }

  getUsedCards(): number[] {
    return [...this.usedCardIds];
  }

  reset() {
    this.usedCardIds = [];
    this.lastPlayerId = null;
    this.round = 1;
  }
}
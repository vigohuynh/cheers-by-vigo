import type { Player } from "../types/player";
import type { Card } from "../types/card";
import type { TurnType } from "../types/game";

import { getRandomPlayer } from "./playerEngine";
import { getRandomCard } from "./cardEngine";
import { getRandomTurnType } from "./gameEngine";

const TURN_TYPES: TurnType[] = [
  "truth",
  "dare",
  "random",
];

export class GameSession {
  private players: Player[];

  private cards: Card[];

  private usedCardIds: Record<TurnType, number[]> = {
    truth: [],
    dare: [],
    random: [],
  };

  private lastPlayerId: number | null = null;

  private round = 1;

  private currentPlayer: Player | null = null;

  private currentTurnType: TurnType | null = null;

  private currentCard: Card | null = null;

  constructor(
    players: Player[],
    cards: Card[]
  ) {
    this.players = players;
    this.cards = cards;
  }

  selectPlayer(): Player {
    this.currentPlayer = getRandomPlayer(
      this.players,
      this.lastPlayerId
    );

    this.lastPlayerId = this.currentPlayer.id;

    return this.currentPlayer;
  }

  selectTurnType(): TurnType {
    this.currentTurnType = getRandomTurnType();

    return this.currentTurnType;
  }

  private getUsedIds(type: TurnType): number[] {
    return this.usedCardIds[type];
  }

  private getAvailableTurnTypes(): TurnType[] {
    return TURN_TYPES.filter((type) => {
      const usedIds = this.getUsedIds(type);

      return this.cards.some(
        (card) =>
          card.type === type &&
          !usedIds.includes(card.id)
      );
    });
  }

  drawCard(): Card | null {
    if (!this.currentTurnType) {
      return null;
    }

    const availableTurnTypes =
      this.getAvailableTurnTypes();

    if (availableTurnTypes.length === 0) {
      this.currentCard = null;
      return null;
    }

    if (!availableTurnTypes.includes(this.currentTurnType)) {
      const randomIndex = Math.floor(
        Math.random() * availableTurnTypes.length
      );

      this.currentTurnType =
        availableTurnTypes[randomIndex];
    }

    const usedIds = this.getUsedIds(
      this.currentTurnType
    );

    const card = getRandomCard(
      this.cards,
      this.currentTurnType,
      usedIds
    );

    this.currentCard = card;
    usedIds.push(card.id);

    this.round++;

    return card;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getRound(): number {
    return this.round;
  }

  getCurrentPlayer(): Player | null {
    return this.currentPlayer;
  }

  getCurrentTurnType(): TurnType | null {
    return this.currentTurnType;
  }

  getCurrentCard(): Card | null {
    return this.currentCard;
  }

  reset(): void {
    this.usedCardIds = {
      truth: [],
      dare: [],
      random: [],
    };

    this.currentPlayer = null;
    this.currentTurnType = null;
    this.currentCard = null;

    this.lastPlayerId = null;
    this.round = 1;
  }
}

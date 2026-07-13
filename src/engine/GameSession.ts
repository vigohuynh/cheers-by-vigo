import type { Player } from "../types/player";
import type { Card } from "../types/card";
import type { TurnType } from "../types/game";

import { getRandomPlayer } from "./playerEngine";
import { getRandomCard } from "./cardEngine";
import { getRandomTurnType } from "./gameEngine";

export class GameSession {
  private players: Player[];

  private cards: Card[];

  private usedTruthIds: number[] = [];

  private usedDareIds: number[] = [];

  private usedRandomIds: number[] = [];

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

  drawCard(): Card {
    if (!this.currentTurnType) {
      throw new Error(
        "TurnType chưa được chọn."
      );
    }

    const usedIds =
      this.currentTurnType === "truth"
        ? this.usedTruthIds
        : this.currentTurnType === "dare"
        ? this.usedDareIds
        : this.usedRandomIds;

    this.currentCard = getRandomCard(
      this.cards,
      this.currentTurnType,
      usedIds
    );

    usedIds.push(this.currentCard.id);

    this.round++;

    return this.currentCard;
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
    this.usedTruthIds = [];
    this.usedDareIds = [];
    this.usedRandomIds = [];

    this.currentPlayer = null;
    this.currentTurnType = null;
    this.currentCard = null;

    this.lastPlayerId = null;
    this.round = 1;
  }
}
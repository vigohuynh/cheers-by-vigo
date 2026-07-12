import type { Card } from "../types/card";

export class CardRepository {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  getAll(): Card[] {
    return [...this.cards];
  }

  getById(id: number): Card | undefined {
    return this.cards.find(
      (card) => card.id === id
    );
  }

  count(): number {
    return this.cards.length;
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }
}
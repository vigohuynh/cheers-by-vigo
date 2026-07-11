import type {
  Card,
  GameMode,
} from "../types/card";

import { lateNightCards } from "../data/lateNight";
import { hardcoreCards } from "../data/hardcore";

const usedCards = new Set<number>();

export function resetCards() {
  usedCards.clear();
}

export function getRandomCard(
  mode: GameMode
): Card {
  const deck =
    mode === "late-night"
      ? lateNightCards
      : hardcoreCards;

  if (deck.length === 0) {
    throw new Error("Deck rỗng.");
  }

  if (usedCards.size >= deck.length) {
    resetCards();
  }

  const available = deck.filter(
    (card) => !usedCards.has(card.id)
  );

  const random =
    available[
      Math.floor(
        Math.random() *
          available.length
      )
    ];

  usedCards.add(random.id);

  return random;
}
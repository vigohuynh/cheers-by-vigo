import type { Card } from "../types/card";
import type { CardType } from "../types/card";

export function getRandomCard(
  cards: Card[],
  type: CardType,
  usedCardIds: number[]
): Card {
  const availableCards = cards.filter(
    (card) =>
      card.type === type &&
      !usedCardIds.includes(card.id)
  );

  if (availableCards.length === 0) {
    throw new Error(
      `Không còn câu hỏi loại "${type}".`
    );
  }

  const randomIndex = Math.floor(
    Math.random() * availableCards.length
  );

  return availableCards[randomIndex];
}
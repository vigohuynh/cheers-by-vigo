import type { Card } from "../types/card";

export function getRandomCard(
  cards: Card[],
  usedCardIds: number[]
): Card {
  if (cards.length === 0) {
    throw new Error("Không có lá bài nào.");
  }

  let availableCards = cards.filter(
    (card) => !usedCardIds.includes(card.id)
  );

  // Nếu đã dùng hết bài thì trộn lại bộ bài
  if (availableCards.length === 0) {
    availableCards = cards;
  }

  const randomIndex = Math.floor(
    Math.random() * availableCards.length
  );

  return availableCards[randomIndex];
}
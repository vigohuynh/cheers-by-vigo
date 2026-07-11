import { cards } from "../data/cards";

import {
  Card,
  Difficulty,
  GameMode,
} from "../types/card";

import {
  DRINKING_DIFFICULTY,
  LATE_NIGHT_DIFFICULTY,
} from "../constants/game";

const usedCards = new Set<number>();

function randomDifficulty(
  mode: GameMode
): Difficulty {

  const random = Math.random() * 100;

  const rate =
    mode === "drinking"
      ? DRINKING_DIFFICULTY
      : LATE_NIGHT_DIFFICULTY;

  if (random < rate.easy) {
    return "easy";
  }

  if (random < rate.easy + rate.medium) {
    return "medium";
  }

  return "hard";

}

export function getRandomCard(

  mode: GameMode,

  type: "truth" | "dare"

): Card {

  const difficulty =
    randomDifficulty(mode);

  let available = cards.filter(card =>

    card.mode === mode &&
    card.type === type &&
    card.difficulty === difficulty &&
    !usedCards.has(card.id)

  );

  if (available.length === 0) {

    usedCards.clear();

    available = cards.filter(card =>

      card.mode === mode &&
      card.type === type &&
      card.difficulty === difficulty

    );

  }

  const random = Math.floor(
    Math.random() * available.length
  );

  const selected = available[random];

  usedCards.add(selected.id);

  return selected;

}
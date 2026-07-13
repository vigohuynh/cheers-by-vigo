import { GAME_CONFIG } from "../config/gameConfig";

import type { TurnType } from "../types/game";

export function getRandomTurnType(): TurnType {
  const random = Math.random() * 100;

  if (random < GAME_CONFIG.truthChance) {
    return "truth";
  }

  if (
    random <
    GAME_CONFIG.truthChance +
      GAME_CONFIG.dareChance
  ) {
    return "dare";
  }

  return "random";
}
import {
  CHAOS_RATE,
  MINI_RATE,
} from "../constants/game";

export type GameEvent =
  | "truth"
  | "dare"
  | "mini"
  | "chaos";

export function resolveEvent(
  choice: "truth" | "dare"
): GameEvent {

  const random = Math.random() * 100;

  if (random < CHAOS_RATE) {
    return "chaos";
  }

  if (random < CHAOS_RATE + MINI_RATE) {
    return "mini";
  }

  return choice;

}
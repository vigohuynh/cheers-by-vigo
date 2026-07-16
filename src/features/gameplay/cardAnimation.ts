export type CardAnimationState = "idle" | "flipping" | "hidden" | "visible";

export const CARD_ANIMATION_DURATION_MS = 300;

export const CARD_ANIMATION_STATES: readonly CardAnimationState[] = [
  "idle",
  "flipping",
  "hidden",
  "visible",
];

export function isCardAnimationState(
  value: unknown,
): value is CardAnimationState {
  return CARD_ANIMATION_STATES.includes(value as CardAnimationState);
}

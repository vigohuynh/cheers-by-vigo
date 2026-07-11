export type CardType =
  | "truth"
  | "dare"
  | "penalty"
  | "special";

export type GameMode =
  | "late-night"
  | "hardcore";

export interface Card {
  id: number;

  type: CardType;

  mode: GameMode;

  title: string;

  description: string;

  drinks?: number;
}
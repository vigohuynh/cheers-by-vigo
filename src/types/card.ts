export type CardType =
  | "truth"
  | "dare"
  | "mini"
  | "chaos";

export type Difficulty =
  | "easy"
  | "medium"
  | "hard";

export type GameMode =
  | "drinking"
  | "late-night";

export interface Card {

  id: number;

  mode: GameMode;

  type: CardType;

  difficulty: Difficulty;

  text: string;
}
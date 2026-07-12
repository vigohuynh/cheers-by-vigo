export type CardCategory =
  | "challenge"
  | "truth"
  | "vote"
  | "skill"
  | "luck";

export interface Card {
  id: number;

  content: string;

  category: CardCategory;
}
export type CardType =
  | "truth"
  | "dare"
  | "random";

export interface Card {
  id: number;

  type: CardType;

  content: string;

  voice?: string;

  sound?: string;
}
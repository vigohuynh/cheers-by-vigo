import type { VoiceCard } from '../types/VoiceCard'

export interface VoiceProvider {
  initialize(): Promise<void>
  buildCard(id: number, text: string): Promise<void>
  buildMany(cards: readonly VoiceCard[]): Promise<void>
  dispose(): Promise<void>
  getProviderName(): string
}

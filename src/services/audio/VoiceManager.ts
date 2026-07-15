import type { VoiceProvider } from './providers/VoiceProvider'

export interface VoiceBuildRequest {
  id: string
  text: string
}

export class VoiceManager {
  private readonly provider: VoiceProvider

  constructor(provider: VoiceProvider) {
    this.provider = provider
  }

  async initialize(): Promise<void> {
    await this.provider.initialize()
  }

  async dispose(): Promise<void> {
    await this.provider.dispose()
  }

  async buildCard(id: string, text: string): Promise<void> {
    await this.provider.build(id, text)
  }

  async buildAllCards(cards: readonly VoiceBuildRequest[]): Promise<void> {
    for (const card of cards) {
      await this.buildCard(card.id, card.text)
    }
  }
}

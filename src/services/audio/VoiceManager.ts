import type { VoiceProvider } from './providers/VoiceProvider'
import { VoiceProviderFactory } from './providers/VoiceProviderFactory'
import type { VoiceCard } from './types/VoiceCard'

export class VoiceManager {
  private readonly provider: VoiceProvider

  constructor(provider: VoiceProvider = VoiceProviderFactory.create()) {
    this.provider = provider
  }

  async initialize(): Promise<void> {
    await this.provider.initialize()
  }

  async dispose(): Promise<void> {
    await this.provider.dispose()
  }

  async buildCard(id: number, text: string): Promise<void> {
    await this.provider.buildCard(id, text)
  }

  async buildMany(cards: readonly VoiceCard[]): Promise<void> {
    await this.provider.buildMany(cards)
  }

  getCurrentProvider(): string {
    return this.provider.getProviderName()
  }
}

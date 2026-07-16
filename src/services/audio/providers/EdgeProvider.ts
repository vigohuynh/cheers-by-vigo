import { mkdir, open, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

import { VOICE_CONFIG } from '../../../config/voice'
import { getCardVoiceOutputPath } from '../VoiceOutput'
import type { VoiceCard } from '../types/VoiceCard'
import type { VoiceProvider } from './VoiceProvider'

export class EdgeProvider implements VoiceProvider {
  async initialize(): Promise<void> {
    // Intentionally no-op: each buildCard() creates and closes its own TTS client.
  }

  async buildCard(id: number, text: string): Promise<void> {
    const client = new MsEdgeTTS()

    await client.setMetadata(
      VOICE_CONFIG.voice,
      OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3,
      {
        voiceLocale: VOICE_CONFIG.language,
      },
    )

    const outputPath = getCardVoiceOutputPath(id)
    const outputDirectory = path.dirname(outputPath)

    await mkdir(outputDirectory, { recursive: true })

    // Always overwrite when VoiceBuilder has decided regeneration is needed.
    const outputFile = await open(outputPath, 'w')

    try {
      const { audioStream } = client.toStream(text, {
        rate: VOICE_CONFIG.rate,
        pitch: VOICE_CONFIG.pitch,
        volume: VOICE_CONFIG.volume,
      })

      await pipeline(audioStream, outputFile.createWriteStream())

      await outputFile.close()

      const info = await stat(outputPath)

      if (info.size === 0) {
        throw new Error(
          'Microsoft Edge Neural Voice returned an empty audio file',
        )
      }
    } catch (error) {
      try {
        await outputFile.close()
      } catch {}

      await rm(outputPath, { force: true })

      throw error
    } finally {
      client.close()
    }
  }

  async buildMany(cards: readonly VoiceCard[]): Promise<void> {
    for (const card of cards) {
      await this.buildCard(card.id, card.text)
    }
  }

  async dispose(): Promise<void> {
    // Intentionally no-op: each buildCard() owns its own client lifecycle.
  }

  getProviderName(): string {
    return 'Microsoft Edge Neural Voice'
  }
}
import { access } from 'node:fs/promises'
import { createHash } from 'node:crypto'

import { VOICE_CONFIG } from '../../config/voice'
import type { VoiceCacheService } from '../../../scripts/VoiceCacheService'
import { VoiceManager } from './VoiceManager'
import { getCardVoiceOutputPath } from './VoiceOutput'
import type { VoiceCard } from './types/VoiceCard'

export type VoiceBuildStatus = 'generated' | 'skipped' | 'failed'

export interface VoiceBuildProgress {
  readonly current: number
  readonly total: number
  readonly percent: number
  readonly cardId: number
  readonly status: VoiceBuildStatus
}

export interface VoiceBuildStatistics {
  readonly generated: number
  readonly skipped: number
  readonly failed: number
  readonly elapsedMilliseconds: number
}

export interface VoiceBuilderOptions {
  readonly force?: boolean
  readonly onProgress?: (progress: VoiceBuildProgress) => void
}

export class VoiceBuilder {
  private readonly force: boolean
  private readonly manager: VoiceManager
  private readonly cache: VoiceCacheService
  private readonly onProgress?: (progress: VoiceBuildProgress) => void

  constructor(
    manager: VoiceManager,
    cache: VoiceCacheService,
    options: VoiceBuilderOptions = {},
  ) {
    this.manager = manager
    this.cache = cache
    this.force = options.force ?? false
    this.onProgress = options.onProgress
  }

  async build(cards: readonly VoiceCard[]): Promise<VoiceBuildStatistics> {
    const startedAt = performance.now()

    let generated = 0
    let skipped = 0
    let failed = 0

    const failedCards: number[] = []

    await this.cache.load()

    for (const [index, card] of cards.entries()) {
      const hash = createVoiceHash(card.text)

      const shouldGenerate =
        this.force ||
        this.cache.readHash(card.id) !== hash ||
        !(await hasAudioFile(card.id))

      let status: VoiceBuildStatus = 'skipped'

      if (!shouldGenerate) {
        skipped++
        status = 'skipped'
      } else {
        let buildSucceeded = false

        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            await this.manager.buildCard(card.id, card.text)
            buildSucceeded = true
            break
          } catch (error) {
            if (attempt < 3) {
              console.log(`Retry ${attempt}/3 for Card ${card.id}`)
              await delay(2000)
              continue
            }

            failed++
            status = 'failed'
            failedCards.push(card.id)

            console.error('====================================')
            console.error('FAILED CARD')
            console.error('====================================')
            console.error('')
            console.error('Card ID:')
            console.error(card.id)
            console.error('')

            if (error instanceof Error) {
              console.error('Error:')
              console.error(error.message)
              console.error('')
              console.error('Stack:')
              console.error(error.stack)
            } else {
              console.error('Error:')
              console.error(error)
            }

            console.error('')
            console.error('====================================')
            break
          }
        }

        if (buildSucceeded) {
          this.cache.writeHash(card.id, hash)
          generated++
          status = 'generated'
        }
      }

      this.reportProgress(index + 1, cards.length, card.id, status)
    }

    await this.cache.save()

    if (failedCards.length > 0) {
      console.log('====================================')
      console.log('FAILED CARDS')
      console.log('====================================')
      console.log('')

      for (const id of failedCards) {
        console.log(`Card ID: ${id}`)
      }

      console.log('')
      console.log('====================================')
    }

    return {
      generated,
      skipped,
      failed,
      elapsedMilliseconds: performance.now() - startedAt,
    }
  }

  private reportProgress(
    current: number,
    total: number,
    cardId: number,
    status: VoiceBuildStatus,
  ): void {
    this.onProgress?.({
      current,
      total,
      percent: total === 0 ? 100 : Math.round((current / total) * 100),
      cardId,
      status,
    })
  }
}

export function createVoiceHash(text: string): string {
  return createHash('sha256')
    .update(
      JSON.stringify({
        text,
        voice: VOICE_CONFIG.voice,
        rate: VOICE_CONFIG.rate,
        pitch: VOICE_CONFIG.pitch,
        language: VOICE_CONFIG.language,
      }),
    )
    .digest('hex')
}

async function hasAudioFile(id: number): Promise<boolean> {
  try {
    await access(getCardVoiceOutputPath(id))
    return true
  } catch {
    return false
  }
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}
import { appendFile, writeFile } from 'node:fs/promises'

import { VOICE_CONFIG } from '../src/config/voice.ts'
import { VoiceBuilder } from '../src/services/audio/VoiceBuilder.ts'
import { VoiceManager } from '../src/services/audio/VoiceManager.ts'
import { VoiceProviderFactory } from '../src/services/audio/providers/VoiceProviderFactory.ts'
import type { VoiceCard } from '../src/services/audio/types/VoiceCard.ts'
import { cards } from '../src/data/cards.ts'
import { VoiceCacheService } from './VoiceCacheService.ts'

const logPath = 'voice-debug.log'
await writeFile(logPath, '', 'utf8')

const originalConsoleLog = console.log.bind(console)
const originalConsoleError = console.error.bind(console)

console.log = (...args: unknown[]) => {
  void appendFile(logPath, `${args.map((arg) => String(arg)).join(' ')}\n`, 'utf8')
  originalConsoleLog(...args)
}

console.error = (...args: unknown[]) => {
  void appendFile(logPath, `${args.map((arg) => String(arg)).join(' ')}\n`, 'utf8')
  originalConsoleError(...args)
}

const manager = new VoiceManager(VoiceProviderFactory.create())
const cache = new VoiceCacheService()
const productionCards: readonly VoiceCard[] = cards.map((card) => ({
  id: card.id,
  text: card.voice ?? card.content,
}))
const builder = new VoiceBuilder(manager, cache, {
  onProgress: (progress) => {
    console.log(
      `[${progress.current}/${progress.total}] ${progress.percent}% Card ${progress.cardId}: ${progress.status}`,
    )
  },
})

try {
  await manager.initialize()
  const statistics = await builder.build(productionCards)

  console.log('====================================')
  console.log('CHEERS Voice Studio')
  console.log(`Provider : ${manager.getCurrentProvider()}`)
  console.log(`Voice : ${VOICE_CONFIG.voice}`)
  console.log(`Output : ${VOICE_CONFIG.outputDirectory}`)
  console.log(`Generated : ${statistics.generated}`)
  console.log(`Skipped : ${statistics.skipped}`)
  console.log(`Failed : ${statistics.failed}`)
  console.log(`Elapsed Time : ${(statistics.elapsedMilliseconds / 1000).toFixed(2)}s`)
  console.log('====================================')
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown voice generation error'
  console.error(`CHEERS Voice Studio failed: ${message}`)
  process.exitCode = 1
} finally {
  await manager.dispose()
  await appendFile(logPath, '', 'utf8')
}


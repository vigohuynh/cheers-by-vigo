import path from 'node:path'

import { VOICE_CONFIG } from '../../config/voice'

export function getCardVoiceOutputPath(id: number): string {
  return path.resolve(VOICE_CONFIG.outputDirectory, `${id}.mp3`)
}

import { VOICE_CONFIG } from '../../../config/voice'
import type { VoiceProvider } from './VoiceProvider'
import { EdgeProvider } from './EdgeProvider'

export interface VoiceProviderFactoryOptions {
  readonly force?: boolean
}

export class VoiceProviderFactory {
  static create(options: VoiceProviderFactoryOptions = {}): VoiceProvider {
    switch (VOICE_CONFIG.provider) {
      case 'edge':
        return new EdgeProvider(options)
      case 'azure':
      case 'openai':
      case 'elevenlabs':
        throw new Error(`Unsupported provider: ${VOICE_CONFIG.provider}`)
      default:
        throw new Error(`Unsupported provider: ${VOICE_CONFIG.provider}`)
    }
  }
}

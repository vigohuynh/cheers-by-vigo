export type VoiceProviderId = 'edge' | 'azure' | 'openai' | 'elevenlabs'

export const VOICE_CONFIG: {
  readonly provider: VoiceProviderId
  readonly voice: string
  readonly language: string
  readonly rate: string
  readonly pitch: string
  readonly volume: string
  readonly outputDirectory: string
} = {
  provider: 'edge',
  voice: 'vi-VN-NamMinhNeural',
  language: 'vi-VN',
  rate: '0%',
  pitch: '0Hz',
  volume: '100%',
  outputDirectory: 'public/audio/cards',
} as const

export interface VoiceProvider {
  initialize(): Promise<void>
  build(id: string, text: string): Promise<void>
  dispose(): Promise<void>
}

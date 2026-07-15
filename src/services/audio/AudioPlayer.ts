export class AudioPlayer {
  private audio: HTMLAudioElement | null = null

  async play(url: string): Promise<void> {
    this.stop()
    this.audio = new Audio(url)
    await this.audio.play()
  }

  stop(): void {
    if (this.audio === null) {
      return
    }

    this.audio.pause()
    this.audio.currentTime = 0
  }

  pause(): void {
    this.audio?.pause()
  }

  async resume(): Promise<void> {
    if (this.audio !== null) {
      await this.audio.play()
    }
  }

  async replay(): Promise<void> {
    if (this.audio === null) {
      return
    }

    this.audio.currentTime = 0
    await this.audio.play()
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused && !this.audio.ended
  }
}

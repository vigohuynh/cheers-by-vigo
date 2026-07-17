type SoundEffectName =
  | "click"
  | "card-flip"
  | "roulette"
  | "countdown"
  | "next"
  | "winner"
  | "start";

export class SoundEffectPlayer {
  async play(name: SoundEffectName): Promise<void> {
    const audio = new Audio(`/audio/sfx/${name}.mp3`);

    try {
      await audio.play();
    } catch {
      // Fail silently when an SFX file is unavailable.
    }
  }
}

# CHEERS Voice Studio

## Architecture

Voice Studio separates voice configuration, provider contracts, orchestration, and browser playback. The provider layer will later create audio files, while `AudioPlayer` handles playback through the browser's native `HTMLAudioElement`.

## Folder Structure

```text
src/
  config/voice.ts
  services/audio/
    AudioPlayer.ts
    VoiceManager.ts
    providers/VoiceProvider.ts
scripts/
  build-voice.ts
  voice-cache.json
public/audio/
  cards/
  intro/
  sfx/
```

## Current Sprint

Sprint 1 establishes the Voice Studio foundation. It defines the Edge voice configuration, provider interface, voice manager API, audio player, build command, cache placeholder, and public audio directories. It does not generate audio or change gameplay.

## Next Sprint

Sprint 2 will implement the Edge Provider behind the `VoiceProvider` interface.

## Roadmap

1. Sprint 1: Foundation
2. Sprint 2: Edge Provider
3. Sprint 3: Voice Generation
4. Sprint 4: Gameplay Integration
5. Sprint 5: Narrator
6. Sprint 6: Intro Engine

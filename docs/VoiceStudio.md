# CHEERS Voice Studio

## Architecture

Voice Studio uses the Provider Pattern. `VoiceManager` coordinates voice work through the `VoiceProvider` contract and never knows the provider implementation. `AudioPlayer` continues to handle browser playback through the native `HTMLAudioElement`.

## Dependency Injection

`VoiceManager` accepts a `VoiceProvider` interface, allowing tests or future application composition to inject a provider without changing manager logic. When no provider is supplied, the manager asks `VoiceProviderFactory` for the configured provider.

## Factory

`VoiceProviderFactory` reads `VOICE_CONFIG.provider` and creates the matching provider. The current `edge` selection creates `EdgeProvider`; Azure, OpenAI, and ElevenLabs are recognized but intentionally unsupported until their providers are implemented.

## Future Providers

The architecture supports Microsoft Edge Neural Voice today as a stub, with planned provider implementations for Microsoft Azure, OpenAI, and ElevenLabs. Adding a provider requires implementing `VoiceProvider` and registering it in the factory.

## Folder Structure

```text
src/
  config/voice.ts
  services/audio/
    AudioPlayer.ts
    VoiceManager.ts
    providers/
      VoiceProvider.ts
      VoiceProviderFactory.ts
      EdgeProvider.ts
scripts/
  build-voice.ts
  voice-cache.json
public/audio/
  cards/
  intro/
  sfx/
```

## Current Sprint

Sprint 2 adds the provider-based voice architecture. Edge is a stub only: no external service is called and no audio is generated.

## Next Sprint

Sprint 3 will add voice generation to the configured provider.

## Roadmap

1. Sprint 1: Foundation
2. Sprint 2: Provider Architecture
3. Sprint 3: Voice Generation
4. Sprint 4: Gameplay Integration
5. Sprint 5: Narrator
6. Sprint 6: Intro Engine

# CHEERS Architecture

## Current Architecture

```text
Gameplay
  ↓
VoiceManager
  ↓
Provider Factory
  ↓
VoiceProvider
  ↓
EdgeProvider
```

Gameplay calls `VoiceManager` and has no dependency on a provider implementation. `VoiceManager` uses only the `VoiceProvider` interface for its operations. `VoiceProviderFactory` selects the configured implementation, currently `EdgeProvider`.

This dependency inversion keeps gameplay independent of Microsoft Edge, Azure, OpenAI, ElevenLabs, or any later provider. A new provider only needs to implement `VoiceProvider` and be registered in the factory; gameplay does not need to change.

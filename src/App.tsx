import { useEffect, useRef, useState } from "react";

import Welcome from "./features/Welcome";
import PlayerSetup from "./features/PlayerSetup";
import NameSetup from "./features/NameSetup";
import ModeSetup from "./features/ModeSetup";
import Countdown from "./features/Countdown";
import Gameplay from "./features/Gameplay";

import { useGame } from "./context/GameContext";

import { GameSession } from "./engine/GameSession";
import { cards } from "./data/cards";
import { SoundEffectPlayer } from "./services/audio/SoundEffectPlayer";

type Screen =
  | "welcome"
  | "player-setup"
  | "name-setup"
  | "mode-setup"
  | "countdown"
  | "gameplay";

export default function App() {
  const [screen, setScreen] =
    useState<Screen>("welcome");
  const soundEffectPlayerRef = useRef(new SoundEffectPlayer());
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    try {
      const savedSetting = window.localStorage.getItem("cheers-voice-enabled");
      return savedSetting === null ? true : savedSetting === "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("cheers-voice-enabled", String(voiceEnabled));
    } catch {
      // Ignore storage failures and keep the current in-memory setting.
    }
  }, [voiceEnabled]);

  const {
    players,
    setPlayerCount,
    setPlayers,
    setMode,
    session,
    setSession,
  } = useGame();

  function startGame() {
    const newSession = new GameSession(
      players,
      cards
    );

    setSession(newSession);

    setScreen("countdown");
  }

  function restartGame() {
    session?.reset();

    setSession(null);
    setPlayers([]);
    setPlayerCount(4);
    setMode(null);

    setScreen("welcome");
  }

  return (
    <>
      <div className="fixed right-4 top-4 z-10">
        <button
          type="button"
          onClick={() => {
            void soundEffectPlayerRef.current.play("click");
            setVoiceEnabled((current) => !current);
          }}
          className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100"
        >
          {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>
      </div>

      {screen === "welcome" && (
        <Welcome
          onStart={() => {
            void soundEffectPlayerRef.current.play("start");
            setScreen("player-setup");
          }}
        />
      )}

      {screen === "player-setup" && (
        <PlayerSetup
          onNext={(count) => {
            void soundEffectPlayerRef.current.play("click");
            setPlayerCount(count);
            setScreen("name-setup");
          }}
        />
      )}

      {screen === "name-setup" && (
        <NameSetup
          onBack={() => {
            void soundEffectPlayerRef.current.play("click");
            setScreen("player-setup");
          }}
          onNext={() => {
            void soundEffectPlayerRef.current.play("click");
            setScreen("mode-setup");
          }}
        />
      )}

      {screen === "mode-setup" && (
        <ModeSetup
          onBack={() => {
            void soundEffectPlayerRef.current.play("click");
            setScreen("name-setup");
          }}
          onNext={() => {
            void soundEffectPlayerRef.current.play("start");
            startGame();
          }}
        />
      )}

      {screen === "countdown" && (
        <Countdown
          onFinish={() => {
            void soundEffectPlayerRef.current.play("countdown");
            setScreen("gameplay");
          }}
        />
      )}

      {screen === "gameplay" &&
        session && (
          <Gameplay
            session={session}
            onRestart={restartGame}
            voiceEnabled={voiceEnabled}
          />
        )}
    </>
  );
}
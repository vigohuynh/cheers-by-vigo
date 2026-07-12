import { useState } from "react";

import Welcome from "./features/Welcome";
import PlayerSetup from "./features/PlayerSetup";
import NameSetup from "./features/NameSetup";
import ModeSetup from "./features/ModeSetup";
import Countdown from "./features/Countdown";
import Gameplay from "./features/Gameplay";

import { useGame } from "./context/GameContext";

import { GameSession } from "./engine/GameSession";
import { cards } from "./data/cards";

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
      {screen === "welcome" && (
        <Welcome
          onStart={() =>
            setScreen("player-setup")
          }
        />
      )}

      {screen === "player-setup" && (
        <PlayerSetup
          onNext={(count) => {
            setPlayerCount(count);
            setScreen("name-setup");
          }}
        />
      )}

      {screen === "name-setup" && (
        <NameSetup
          onBack={() =>
            setScreen("player-setup")
          }
          onNext={() =>
            setScreen("mode-setup")
          }
        />
      )}

      {screen === "mode-setup" && (
        <ModeSetup
          onBack={() =>
            setScreen("name-setup")
          }
          onNext={startGame}
        />
      )}

      {screen === "countdown" && (
        <Countdown
          onFinish={() =>
            setScreen("gameplay")
          }
        />
      )}

      {screen === "gameplay" &&
        session && (
          <Gameplay
            session={session}
            onRestart={restartGame}
          />
        )}
    </>
  );
}
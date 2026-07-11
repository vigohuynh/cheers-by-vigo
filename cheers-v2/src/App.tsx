import { useState } from "react";

import Welcome from "./features/Welcome";
import PlayerSetup from "./features/PlayerSetup";
import NameSetup from "./features/NameSetup";
import ModeSetup from "./features/ModeSetup";
import Countdown from "./features/Countdown";
import Gameplay from "./features/Gameplay";

import { useGame } from "./context/GameContext";

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
    setPlayerCount,
    setPlayers,
    setMode,
    setCurrentPlayer,
    setRound,
  } = useGame();

  function restartGame() {
    setPlayerCount(4);
    setPlayers([]);
    setMode(null);
    setCurrentPlayer(null);
    setRound(1);

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
          onNext={() =>
            setScreen("countdown")
          }
        />
      )}

      {screen === "countdown" && (
        <Countdown
          onFinish={() =>
            setScreen("gameplay")
          }
        />
      )}

      {screen === "gameplay" && (
        <Gameplay
          onRestart={restartGame}
        />
      )}
    </>
  );
}
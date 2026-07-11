import { useState } from "react";

import Welcome from "./features/Welcome";
import PlayerSetup from "./features/PlayerSetup";
import NameSetup from "./features/NameSetup";
import ModeSetup from "./features/ModeSetup";
import Countdown from "./features/Countdown";
import Gameplay from "./features/Gameplay";

type Screen =
  | "welcome"
  | "players"
  | "names"
  | "mode"
  | "countdown"
  | "game";

type GameMode = "drinking" | "late-night";

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const [playerCount, setPlayerCount] = useState(4);

  const [players, setPlayers] = useState<string[]>([]);

  const [mode, setMode] = useState<GameMode>("drinking");

  const [currentPlayer, setCurrentPlayer] = useState("");

  switch (screen) {
    case "welcome":
      return (
        <Welcome
          onStart={() => setScreen("players")}
        />
      );

    case "players":
      return (
        <PlayerSetup
          onNext={(count) => {
            setPlayerCount(count);
            setScreen("names");
          }}
        />
      );

    case "names":
      return (
        <NameSetup
          playerCount={playerCount}
          onBack={() => setScreen("players")}
          onNext={(playerList) => {
            setPlayers(playerList);
            setScreen("mode");
          }}
        />
      );

    case "mode":
      return (
        <ModeSetup
          onBack={() => setScreen("names")}
          onNext={(selectedMode) => {
            setMode(selectedMode);

            // Chọn ngẫu nhiên người chơi đầu tiên
            const randomIndex = Math.floor(
              Math.random() * players.length
            );

            setCurrentPlayer(players[randomIndex]);

            setScreen("countdown");
          }}
        />
      );

    case "countdown":
      return (
        <Countdown
          onFinish={() => setScreen("game")}
        />
      );

    case "game":
      return (
        <Gameplay
          playerName={currentPlayer}
        />
      );

    default:
      return null;
  }
}

export default App;
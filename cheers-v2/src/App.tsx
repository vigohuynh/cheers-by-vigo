import { useState } from "react";

import Welcome from "./features/Welcome";
import PlayerSetup from "./features/PlayerSetup";

type Screen =
  | "welcome"
  | "player-setup";

export default function App() {
  const [screen, setScreen] =
    useState<Screen>("welcome");

  const [playerCount, setPlayerCount] =
    useState(4);

  switch (screen) {
    case "welcome":
      return (
        <Welcome
          onStart={() =>
            setScreen("player-setup")
          }
        />
      );

    case "player-setup":
      return (
        <PlayerSetup
          onNext={(count) => {
            setPlayerCount(count);

            console.log(
              "Số người chơi:",
              count
            );

            alert(
              `Đã chọn ${count} người chơi.\n\nModule 2 sẽ tiếp tục màn hình nhập tên.`
            );
          }}
        />
      );

    default:
      return null;
  }
}
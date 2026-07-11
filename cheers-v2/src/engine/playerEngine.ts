import type { Player } from "../types/player";

export function getRandomPlayer(
  players: Player[],
  lastPlayerId: number | null
): Player {
  if (players.length === 0) {
    throw new Error("Danh sách người chơi đang trống.");
  }

  if (players.length === 1) {
    return players[0];
  }

  const availablePlayers = players.filter(
    (player) => player.id !== lastPlayerId
  );

  const randomIndex = Math.floor(
    Math.random() * availablePlayers.length
  );

  return availablePlayers[randomIndex];
}
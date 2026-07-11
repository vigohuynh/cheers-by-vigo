import type { Player } from "../types/player";

/**
 * Chọn người chơi tiếp theo
 * - Không chọn người vừa chơi
 * - Ưu tiên người có số lượt thấp nhất
 */
export function getNextPlayer(
  players: Player[],
  lastPlayerId: number | null
): Player {
  if (players.length === 0) {
    throw new Error("Không có người chơi.");
  }

  if (players.length === 1) {
    return players[0];
  }

  const availablePlayers = players.filter(
    (player) => player.id !== lastPlayerId
  );

  const minSelected = Math.min(
    ...availablePlayers.map(
      (player) => player.selectedCount
    )
  );

  const candidates = availablePlayers.filter(
    (player) =>
      player.selectedCount === minSelected
  );

  const randomIndex = Math.floor(
    Math.random() * candidates.length
  );

  return candidates[randomIndex];
}
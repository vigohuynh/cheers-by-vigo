import { Player } from "../types/player";

/**
 * Chọn người chơi công bằng
 */
export function getNextPlayer(
  players: Player[],
  lastPlayerId?: number
): Player {

  if (players.length === 0) {
    throw new Error("Không có người chơi");
  }

  let candidates = players;

  // Không chọn người vừa chơi nếu còn người khác
  if (lastPlayerId !== undefined && players.length > 1) {

    const filtered = players.filter(
      player => player.id !== lastPlayerId
    );

    if (filtered.length > 0) {
      candidates = filtered;
    }
  }

  const minSelected = Math.min(
    ...candidates.map(player => player.selectedCount)
  );

  candidates = candidates.filter(
    player => player.selectedCount === minSelected
  );

  const random =
    Math.floor(Math.random() * candidates.length);

  return candidates[random];

}
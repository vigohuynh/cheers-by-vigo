import { useState } from "react";

type NameSetupProps = {
  playerCount: number;
  onBack: () => void;
  onNext: (players: string[]) => void;
};

export default function NameSetup({
  playerCount,
  onBack,
  onNext,
}: NameSetupProps) {
  const [players, setPlayers] = useState<string[]>(
    Array(playerCount).fill("")
  );

  const handleChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleNext = () => {
    const result = players.map((p, index) =>
      p.trim() === "" ? `Người chơi ${index + 1}` : p.trim()
    );

    onNext(result);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">
          👥 Nhập tên người chơi
        </h1>

        <div className="mt-8 space-y-4">

          {players.map((player, index) => (
            <div key={index}>
              <label className="block text-slate-300 mb-2">
                Người chơi {index + 1}
              </label>

              <input
                type="text"
                value={player}
                placeholder={`Người chơi ${index + 1}`}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>
          ))}

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onBack}
            className="flex-1 rounded-xl bg-slate-700 py-3 font-bold"
          >
            ← Quay lại
          </button>

          <button
            onClick={handleNext}
            className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-bold"
          >
            Tiếp tục →
          </button>

        </div>

      </div>
    </div>
  );
}
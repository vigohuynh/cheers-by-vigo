import { Player } from "../types/player";

type Props = {
  player: Player;
};

export default function GameScreen({ player }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

        <div className="text-center">

          <div className="text-5xl">
            🍻
          </div>

          <p className="mt-4 text-slate-400">
            ĐẾN LƯỢT
          </p>

          <h1 className="mt-4 text-5xl font-black text-orange-400">
            {player.name}
          </h1>

        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">

          <button
            className="rounded-2xl bg-green-600 py-6 text-xl font-bold hover:scale-105 transition"
          >
            ❤️

            <br />

            Truth
          </button>

          <button
            className="rounded-2xl bg-red-600 py-6 text-xl font-bold hover:scale-105 transition"
          >
            🔥

            <br />

            Dare
          </button>

        </div>

      </div>

    </div>
  );
}
type GameplayProps = {
  playerName: string;
};

export default function Gameplay({ playerName }: GameplayProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8 text-center">

        <h2 className="text-slate-400 text-lg">
          🍻 ĐẾN LƯỢT
        </h2>

        <h1 className="text-5xl font-black mt-4 text-orange-400">
          {playerName}
        </h1>

        <div className="mt-10 rounded-2xl bg-slate-800 p-6">

          <div className="text-2xl font-bold text-green-400">
            ❤️ TRUTH
          </div>

          <p className="mt-6 text-xl">
            Đây sẽ là nơi hiển thị câu hỏi.
          </p>

        </div>

        <button
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-lg font-bold"
        >
          ✓ HOÀN THÀNH
        </button>

      </div>

    </div>
  );
}
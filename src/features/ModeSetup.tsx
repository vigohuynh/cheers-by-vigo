import { useState } from "react";

type GameMode = "drinking" | "late-night";

type ModeSetupProps = {
  onBack: () => void;
  onNext: (mode: GameMode) => void;
};

export default function ModeSetup({
  onBack,
  onNext,
}: ModeSetupProps) {

  const [mode, setMode] = useState<GameMode>("drinking");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">
          🍻 Chọn chế độ chơi
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Hãy chọn chế độ phù hợp với nhóm của bạn
        </p>

        <div className="mt-8 space-y-4">

          <button
            onClick={() => setMode("drinking")}
            className={`w-full rounded-2xl p-5 border transition ${
              mode === "drinking"
                ? "border-orange-500 bg-orange-500/20"
                : "border-slate-700 bg-slate-800"
            }`}
          >
            <div className="text-2xl">🍺 Drinking</div>

            <div className="text-sm text-slate-400 mt-2">
              Truth • Dare • Drink • Mini Game • Chaos
            </div>
          </button>

          <button
            onClick={() => setMode("late-night")}
            className={`w-full rounded-2xl p-5 border transition ${
              mode === "late-night"
                ? "border-pink-500 bg-pink-500/20"
                : "border-slate-700 bg-slate-800"
            }`}
          >
            <div className="text-2xl">
              🌙 Late Night
            </div>

            <div className="text-sm text-slate-400 mt-2">
              Chỉ dành cho người từ 18 tuổi trở lên
            </div>
          </button>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onBack}
            className="flex-1 rounded-xl bg-slate-700 py-3 font-bold"
          >
            ← Quay lại
          </button>

          <button
            onClick={() => onNext(mode)}
            className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-bold"
          >
            BẮT ĐẦU
          </button>

        </div>

      </div>

    </div>
  );
}
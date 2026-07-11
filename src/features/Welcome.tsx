type WelcomeProps = {
  onStart: () => void;
};

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8 text-center">

        <div className="text-7xl mb-6">
          🍻
        </div>

        <h1 className="text-5xl font-black tracking-wide">
          CHEERS
        </h1>

        <p className="mt-4 text-slate-400">
          Trò chơi uống cùng bạn bè
        </p>

        <button
          onClick={onStart}
          className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-lg font-bold transition hover:scale-105"
        >
          BẮT ĐẦU
        </button>

        <div className="mt-8 text-sm text-slate-500">
          <p>Phiên bản 0.1.0</p>
          <p className="mt-2">
            Thiết kế & Phát triển bởi{" "}
            <span className="font-semibold text-slate-300">Vigo</span>
          </p>
        </div>

      </div>
    </div>
  );
}
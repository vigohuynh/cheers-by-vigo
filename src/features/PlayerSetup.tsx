type PlayerSetupProps = {
  onNext: (count: number) => void;
};

const options = [4, 5, 6, 7, 8];

export default function PlayerSetup({ onNext }: PlayerSetupProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">
          👥 CHEERS
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Có bao nhiêu người chơi?
        </p>

        <div className="mt-8 space-y-3">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => onNext(item)}
              className="w-full rounded-xl bg-slate-800 hover:bg-orange-500 transition py-4 text-lg font-semibold"
            >
              {item} người
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
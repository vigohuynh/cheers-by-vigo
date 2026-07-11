import { useEffect, useState } from "react";

type CountdownProps = {
  onFinish: () => void;
};

export default function Countdown({ onFinish }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const timer = setTimeout(() => {
        onFinish();
      }, 800);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">

        <div className="text-8xl font-black text-orange-500">
          {count === 0 ? "GO!" : count}
        </div>

        <p className="mt-6 text-slate-400">
          Chuẩn bị bắt đầu...
        </p>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

import Screen from "../components/Screen";

interface CountdownProps {
  onFinish: () => void;
}

export default function Countdown({
  onFinish,
}: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const timer = setTimeout(() => {
        onFinish();
      }, 500);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <Screen>
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-8xl font-bold text-red-600">
          {count === 0 ? "GO!" : count}
        </h1>
      </div>
    </Screen>
  );
}
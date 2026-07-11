import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Screen from "../components/Screen";

interface GameplayProps {
  onRestart: () => void;
}

export default function Gameplay({
  onRestart,
}: GameplayProps) {
  return (
    <Screen>
      <PageHeader
        title="Gameplay"
        subtitle="Module 3 sẽ bắt đầu từ đây"
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-lg text-zinc-300">
          🎉 Chúc mừng!
        </p>

        <p className="mt-4 text-zinc-400">
          Bạn đã hoàn thành Module 2.
        </p>
      </div>

      <div className="mt-8">
        <Button onClick={onRestart}>
          VỀ TRANG CHỦ
        </Button>
      </div>
    </Screen>
  );
}
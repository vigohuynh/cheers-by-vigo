import Button from "../../components/Button";
import Screen from "../../components/Screen";

interface EndScreenProps {
  onRestart: () => void;
}

export default function EndScreen({
  onRestart,
}: EndScreenProps) {
  return (
    <Screen>
      <div className="space-y-8 text-center">

        <div className="text-7xl">
          🎉
        </div>

        <div className="space-y-3">

          <h1 className="text-4xl font-black text-white">
            HẾT CÂU HỎI
          </h1>

          <p className="text-zinc-400">
            Cảm ơn mọi người đã chơi!
          </p>

        </div>

        <Button onClick={onRestart}>
          CHƠI LẠI
        </Button>

      </div>
    </Screen>
  );
}
import Button from "../components/Button";
import Screen from "../components/Screen";
import logo from "../assets/logo.png";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({
  onStart,
}: WelcomeProps) {
  return (
    <Screen
      title="CHEERS"
      subtitle="Game uống bia cùng hội bạn"
    >
      <div className="mb-8 flex justify-center">
        <img
          src={logo}
          alt="CHEERS Logo"
          className="h-24 w-24 object-contain"
        />
      </div>

      <div className="space-y-8">
        <Button onClick={onStart}>
          BẮT ĐẦU
        </Button>

        <p className="text-center text-sm text-zinc-500">
          By: <span className="font-semibold">Vigo</span>
        </p>
      </div>
    </Screen>
  );
}
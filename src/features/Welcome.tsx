import Button from "../components/Button";
import Screen from "../components/Screen";
import PageHeader from "../components/PageHeader";

import logo from "../assets/logo.png";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({
  onStart,
}: WelcomeProps) {
  return (
    <Screen>
      <div className="mb-8 flex justify-center">
        <img
          src={logo}
          alt="CHEERS"
          className="h-24 w-24 object-contain"
        />
      </div>

      <PageHeader
        title="CHEERS"
        subtitle="Game uống bia cùng hội bạn"
      />

      <Button onClick={onStart}>
        BẮT ĐẦU
      </Button>

      <p className="mt-6 text-center text-sm text-zinc-500">
        By: <span className="font-semibold">Vigo</span>
      </p>
    </Screen>
  );
}
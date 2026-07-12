import type { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({
  children,
}: ScreenProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
        {children}
      </div>
    </main>
  );
}
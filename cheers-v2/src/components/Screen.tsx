import type { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({
  children,
}: ScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <section className="w-full max-w-md">
        {children}
      </section>
    </main>
  );
}
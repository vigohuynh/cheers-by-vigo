import type { ReactNode } from "react";

interface ScreenProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Screen({
  title,
  subtitle,
  children,
}: ScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <section className="w-full max-w-md">

        <h1 className="text-center text-5xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-center text-zinc-400">
            {subtitle}
          </p>
        )}

        <div className="mt-12">
          {children}
        </div>

      </section>
    </main>
  );
}
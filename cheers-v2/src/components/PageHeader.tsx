interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-center text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-center text-base text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
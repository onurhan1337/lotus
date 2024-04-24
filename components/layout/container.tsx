export default function Container({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="relative h-full rounded-lg border border-dashed shadow-sm p-4">
        {children}
      </div>
    </main>
  );
}

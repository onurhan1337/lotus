import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex py-12 flex-col items-center justify-between p-24">
      <p>hello world</p>
      <UserButton />
    </main>
  );
}

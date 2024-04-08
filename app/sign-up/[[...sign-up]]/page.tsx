import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <SignUp />
    </div>
  );
}

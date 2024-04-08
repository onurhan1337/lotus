import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] px-4">
      <div className="space-y-4 text-center">
        <Frown className="mx-auto h-12 w-12" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
            Page Not Found
          </h1>
          <p className="md:text-xl lg:text-base xl:text-xl tracking-tighter text-muted-foreground">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button className="mt-4" variant={"outline"}>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

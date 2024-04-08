"use client";

import { usePathname, useRouter } from "next/navigation";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AdminSearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
        className="ml-auto flex-1 sm:flex-initial flex items-center gap-2"
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Search users..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>

        <Button variant={"outline"} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

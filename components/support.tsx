"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SupportCard = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Support me</CardTitle>
        <CardDescription>
          If you like my work, you can support me by buying me a coffee.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button
          onClick={() => router.push("https://www.buymeacoffee.com/onurhan")}
          size="sm"
          className="w-full bg-yellow-300/80 hover:bg-yellow-300 text-yellow-950 dark:text-yellow-600 leading-relaxed tracking-wider dark:bg-yellow-950 dark:hover:bg-yellow-950/90"
        >
          Support
        </Button>
      </CardContent>
    </Card>
  );
};

export const MobileSupportCard = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support me</CardTitle>
        <CardDescription>
          If you like my work, you can support me by buying me a coffee.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => router.push("https://www.buymeacoffee.com/onurhan")}
          size="sm"
          className="w-full bg-blue-500 hover:bg-blue-600/90"
        >
          Support
        </Button>
      </CardContent>
    </Card>
  );
};

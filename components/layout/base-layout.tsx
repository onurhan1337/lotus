"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Home, Menu, Fan, Swords, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SideNavItem, MobileSideNavItem } from "./side-nav-item";
import { SupportCard, MobileSupportCard } from "../support";
import { ModeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";

const HEADER_ITEMS = [
  {
    href: "/",
    icon: <Home className="h-5 w-5" />,
    text: "Dashboard",
    current: false,
  },
  {
    href: "/challenges",
    icon: <Swords className="h-5 w-5" />,
    text: "Challenges",
    current: false,
  },
  {
    href: "/leaderboard",
    icon: <Trophy className="h-5 w-5" />,
    text: "Leaderboard",
    current: false,
  },
];

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Fan className="h-6 w-6" />
              <span className="">Lotus</span>
            </Link>
            <ModeToggle />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {HEADER_ITEMS.map((item) => {
                const current = pathname === item.href;

                return (
                  <SideNavItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    text={item.text}
                    isCurrent={current}
                  />
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <SupportCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Fan className="h-6 w-6" />
                  <span className="sr-only">Lotus</span>
                </Link>
                {HEADER_ITEMS.map((item) => {
                  const current = pathname === item.href;

                  return (
                    <MobileSideNavItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      text={item.text}
                      isCurrent={current}
                    />
                  );
                })}
              </nav>
              <div className="mt-auto">
                <MobileSupportCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <UserButton />
        </header>
        {children}
      </div>
    </div>
  );
}

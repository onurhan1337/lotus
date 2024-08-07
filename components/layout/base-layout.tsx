"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Fan, Menu, MessageCircle, Sword, Swords, Users2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { MobileSupportCard, SupportCard } from "../support";
import { ModeToggle } from "../theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MobileSideNavItem, SideNavItem } from "./side-nav-item";

const HEADER_ITEMS = [
  {
    href: "/",
    icon: <Swords className="h-5 w-5" />,
    text: "Challenges",
    current: false,
  },
];

const HEADER_ADMIN_ITEMS = [
  {
    href: "/admin/challenges",
    icon: <Sword className="h-5 w-5" />,
    text: "Challenges",
    current: false,
  },
  {
    href: "/admin/users",
    icon: <Users2 className="h-5 w-5" />,
    text: "Users",
    current: false,
  },
  {
    href: "/admin/feedbacks",
    icon: <MessageCircle className="h-5 w-5" />,
    text: "Feedbacks",
    current: false,
  },
];

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user } = useUser();
  const admin = user?.publicMetadata.role === "admin";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-max flex-col gap-2">
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

              {admin && (
                <div>
                  <div className="flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-xs font-semibold text-muted-foreground uppercase">
                      Admin
                    </span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
                  {HEADER_ADMIN_ITEMS.map((item) => {
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
                </div>
              )}
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

                {admin && (
                  <div>
                    <div className="flex items-center">
                      <hr className="flex-grow border-t border-gray-300" />
                      <span className="px-2 text-xs font-semibold text-muted-foreground uppercase">
                        Admin
                      </span>
                      <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    {HEADER_ADMIN_ITEMS.map((item) => {
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
                  </div>
                )}
              </nav>
              <div className="mt-auto">
                <MobileSupportCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <div className="md:hidden">
            <ModeToggle />
          </div>
          <UserButton />
        </header>
        {children}
      </div>
    </div>
  );
}

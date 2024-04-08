"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SideNavItemProps {
  href: string;
  icon: ReactNode;
  text: string;
  isCurrent: boolean;
}

export function SideNavItem({
  href,
  icon,
  text,
  isCurrent = false,
}: SideNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        isCurrent
          ? "bg-muted text-primary hover:text-primary"
          : "text-muted-foreground hover:text-foreground",
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      )}
    >
      {icon}
      {text}
    </Link>
  );
}

export function MobileSideNavItem({
  href,
  icon,
  text,
  isCurrent = false,
}: SideNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        isCurrent
          ? "bg-muted text-primary hover:text-primary"
          : "text-muted-foreground hover:text-foreground",
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
      )}
    >
      {icon}
      {text}
    </Link>
  );
}

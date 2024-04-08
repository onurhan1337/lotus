"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface SideNavItemProps {
  href: string;
  icon: ReactNode;
  text: string;
}

export function SideNavItem({ href, icon, text }: SideNavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      {icon}
      {text}
    </Link>
  );
}

export function MobileSideNavItem({ href, icon, text }: SideNavItemProps) {
  return (
    <Link
      href={href}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    >
      {icon}
      {text}
    </Link>
  );
}

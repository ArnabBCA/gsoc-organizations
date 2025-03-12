"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/timeline",
      label: "Timeline",
    },
  ];
  const activeRoute = routes.find((route) => route.href === pathname);
  return (
    <ul className="flex gap-4 items-center">
      {routes.map((route) => (
        <li key={route.href}>
          <Link
            className={cn(
              activeRoute?.href === route.href && "font-semibold",
              "text-neutral-800"
            )}
            href={route.href}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;

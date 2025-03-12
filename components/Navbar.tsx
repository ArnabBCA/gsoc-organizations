import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import Link from "next/link";

const Navbar = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  return (
    <header
      className={cn(
        "bg-card/60 backdrop-blur flex items-center min-h-[56.8px] justify-center px-4 py-2 border-b w-full sticky top-0 z-10"
      )}
    >
      <div
        className={cn(
          !isHomePage && "max-w-6xl",
          "flex w-full gap-2 justify-between items-center flex-col sm:flex-row"
        )}
      >
        <div className="flex items-center gap-4 w-full justify-between sm:justify-start sm:w-auto">
          {isHomePage && (
            <SidebarTrigger className="h-10 w-10" variant={"secondary"} />
          )}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/LoaderImg.svg"
                alt="GSoC Organizations Logo"
                height={30}
                width={30}
              />
              <h1 className="text-neutral-800 whitespace-nowrap">
                <span className="font-semibold">GSoC</span> Organizations
              </h1>
            </Link>
            <NavLinks />
          </div>
        </div>
        {isHomePage && <Searchbar />}
      </div>
    </header>
  );
};

export default Navbar;

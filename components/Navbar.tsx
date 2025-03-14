import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Navbar = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  return (
    <header
      className={cn(
        "bg-card/60 backdrop-blur flex min-h-[56.8px] border-b w-full sticky top-0 z-10 items-center"
      )}
    >
      {isHomePage && (
        <SidebarTrigger
          className="min-h-10 min-w-10 ml-4 sticky left-0 custom2k:absolute hidden sm:flex"
          variant={"secondary"}
        />
      )}
      <div
        className={cn(
          !isHomePage ? "max-w-6xl" : "max-w-screen-desktop",
          "flex px-4 py-2  mx-auto w-full gap-2 justify-between items-center flex-col sm:flex-row"
        )}
      >
        <div className="flex items-center gap-2 w-full justify-between">
          {isHomePage && (
            <SidebarTrigger
              className="min-h-10 min-w-10 sm:ml-4 sticky left-0 custom2k:absolute sm:hidden"
              variant={"secondary"}
            />
          )}
          <div className="flex items-center gap-4">
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
            <NavLinks className="hidden gap-4 md:flex" />
          </div>
          <div className="sm:hidden">
            <MobileMenu />
          </div>
        </div>
        <div className="flex items-center w-full justify-end gap-4">
          {isHomePage && <Searchbar />}
          <div className="hidden sm:flex md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

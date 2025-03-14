import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import SocialLinks from "./SocialLinks";
import Logo from "../assets/LoaderImg.svg";

const Navbar = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  return (
    <header
      className={cn(
        "bg-card/60 backdrop-blur flex min-h-[56.8px] border-b w-full sticky top-0 z-[5] items-center"
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
          "flex px-4 py-2 mx-auto w-full justify-between items-center flex-col sm:flex-row gap-4"
        )}
      >
        <div className="flex items-center w-full gap-4 justify-between">
          {isHomePage && (
            <SidebarTrigger
              className="min-h-10 min-w-10 sm:ml-4 sticky left-0 custom2k:absolute sm:hidden"
              variant={"secondary"}
            />
          )}
          <div className="flex items-center gap-5">
            <Link href="/" className="w-max flex items-center gap-2">
              <Image
                src={Logo}
                alt="GSoC Organizations Logo"
                height={30}
                width={30}
              />
              <h1 className="text-neutral-800 whitespace-nowrap">
                <span className="font-semibold">GSoC</span> Organizations
              </h1>
            </Link>
            <NavLinks className="hidden gap-4 lg:flex" />
          </div>
          <div className="flex items-center gap-4">
            <MobileMenu
              className={cn(isHomePage ? "sm:hidden" : "lg:hidden")}
            />
            <div className="hidden lg:flex">
              <SocialLinks />
            </div>
          </div>
        </div>
        {isHomePage && <Searchbar />}
      </div>
    </header>
  );
};

export default Navbar;

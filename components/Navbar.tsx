import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="bg-sidebar flex px-4 py-2 border-b border-separate justify-between w-full sticky top-0 z-10 items-center">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-10 w-10" variant={"secondary"} />
        <div className="flex items-center gap-2">
          <Image
            src="/assets/LoaderImg.svg"
            alt="GSoC Organizations Logo"
            height={30}
            width={30}
          />
          <h1 className="text-muted-foreground">GSoC Organizations</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Searchbar />
        {/*<div className="flex items-center gap-2">
          <Button>Home</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Timeline</Button>
          <Button variant="ghost">FAQs</Button>
        </div>*/}
      </div>
    </header>
  );
};

export default Navbar;

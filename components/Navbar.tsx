import React, { Suspense } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full sticky top-0 bg-background z-10 items-center">
      <SidebarTrigger />
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
    </header>
  );
};

export default Navbar;

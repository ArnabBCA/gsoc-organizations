import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <header className="bg-sidebar flex px-4 py-2.5 border-b border-separate justify-between w-full sticky top-0 z-10 items-center">
      <SidebarTrigger className="h-10 w-10" variant={"secondary"}/>
      <Searchbar />
    </header>
  );
};

export default Navbar;

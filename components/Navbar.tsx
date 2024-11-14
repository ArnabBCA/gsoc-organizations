import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full sticky top-0 bg-background z-10 items-center">
      <SidebarTrigger />
      <div className="relative max-w-lg w-full">
        <Search className="h-4 w-4 top-3 absolute right-3 text-slate-600 dark:text-slate-200" />
        <Input placeholder="Search Organizations" />
      </div>
    </header>
  );
};

export default Navbar;

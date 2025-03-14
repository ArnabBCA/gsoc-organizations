import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import MobileMenu from "./MobileMenu";

interface SearchInputProps {
  query?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="flex items-center gap-4 w-full sm:max-w-max justify-end">
      <div className="relative w-full sm:min-w-60 md:min-w-80">
        <Search className="h-4 top-3 absolute right-3 text-slate-600 dark:text-slate-200" />
        <Input
          className="w-full"
          name="search"
          placeholder="Search Organizations..."
          value={props.query || ""}
          onChange={props.handleSearchChange || (() => {})}
        />
      </div>
      <MobileMenu className="hidden sm:flex lg:hidden" />
    </div>
  );
};

export default SearchInput;

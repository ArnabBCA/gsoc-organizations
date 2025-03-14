import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

interface SearchInputProps {
  query?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="relative w-full sm:max-w-80">
      <Search className="h-4 top-3 absolute right-3 text-slate-600 dark:text-slate-200" />
      <Input
        className="w-full"
        name="search"
        placeholder="Search Organizations..."
        value={props.query || ""}
        onChange={props.handleSearchChange || (() => {})}
      />
    </div>
  );
};

export default SearchInput;

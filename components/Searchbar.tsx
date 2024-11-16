import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useQueryParams } from "@/hooks/useQueryParams";

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  const { getAllParams } = useQueryParams();

  useEffect(() => {
    const filterCards = () => {
      const params = getAllParams();
      const categoryFilters = params.category || [];
      const yearFilters = params.years || [];

      const cards = Array.from(document.querySelectorAll(".organization-card"));

      // If no filters or query, show all cards
      if (!categoryFilters.length && !yearFilters.length && !query) {
        cards.forEach((card) => card.classList.remove("hidden"));
        return;
      }

      // Step 1: Filter by year
      let filteredCards = cards;
      if (yearFilters.length) {
        filteredCards = filteredCards.filter((card) => {
          const orgYears = Array.from(card.querySelectorAll(".org-year")).map(
            (yearElem) => yearElem.textContent?.trim().toLowerCase() || ""
          );
          return yearFilters.some((filter: string) =>
            orgYears.includes(filter.toLowerCase())
          );
        });
      }

      // Step 2: Further filter by category within the filtered years
      if (categoryFilters.length) {
        filteredCards = filteredCards.filter((card) => {
          const orgCategory =
            card.querySelector(".org-category")?.textContent?.toLowerCase() ||
            "";
          return categoryFilters.some((filter: string) =>
            orgCategory.includes(filter.toLowerCase())
          );
        });
      }

      // Step 3: Further filter by query within the filtered category and year
      if (query) {
        filteredCards = filteredCards.filter((card) => {
          const orgName =
            card.querySelector(".org-name")?.textContent?.toLowerCase() || "";
          return orgName.includes(query.toLowerCase());
        });
      }

      // Step 4: Show matched cards and hide others
      cards.forEach((card) => {
        if (filteredCards.includes(card)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    };

    filterCards();
  }, [query, getAllParams]); // Run when query or params change

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative max-w-lg w-full">
      <Search className="h-4 w-4 top-3 absolute right-3 text-slate-600 dark:text-slate-200" />
      <Input
        placeholder="Search Organizations"
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Searchbar;

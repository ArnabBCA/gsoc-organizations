import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchInput from "./SearchInput";

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  const { getAllParams } = useQueryParams();
  // Ref to cache card elements and their attributes
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const filterCards = useCallback(() => {
    const params = getAllParams();
    const categoryFilters = params.category || [];
    const yearFilters = params.years || [];
    const queryLower = query.toLowerCase();

    cardsRef.current.forEach((card) => {
      const orgName =
        card.querySelector(".org-name")?.textContent?.toLowerCase() || "";
      const orgCategory =
        card.querySelector(".org-category")?.textContent?.toLowerCase() || "";
      const orgYears = Array.from(card.querySelectorAll(".org-year")).map(
        (yearElem) => yearElem.textContent?.trim().toLowerCase() || ""
      );

      const matchesQuery = queryLower ? orgName.includes(queryLower) : true;
      const matchesCategory = categoryFilters.length
        ? categoryFilters.some((filter: string) =>
            orgCategory.includes(filter.toLowerCase())
          )
        : true;
      const matchesYear = yearFilters.length
        ? yearFilters.some((filter: string) =>
            orgYears.includes(filter.toLowerCase())
          )
        : true;

      if (matchesQuery && matchesCategory && matchesYear) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }, [query, getAllParams]);

  useEffect(() => {
    cardsRef.current = Array.from(
      document.querySelectorAll(".organization-card")
    );
    filterCards();
  }, [query, getAllParams, filterCards]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return <SearchInput query={query} handleSearchChange={handleSearchChange} />;
};

export default Searchbar;

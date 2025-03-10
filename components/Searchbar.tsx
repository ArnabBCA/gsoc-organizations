"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchInput from "./SearchInput";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getAllParams } = useQueryParams();
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Store extracted organization data
  const [orgData, setOrgData] = useState<
    {
      name: string;
      categories: string[];
      years: string[];
      topics: string[];
      techs: string[];
    }[]
  >([]);

  const matchesFilter = (filters: string[], values: string[]) =>
    filters.length === 0 ||
    filters.some((filter) =>
      values.map((v) => v.toLowerCase()).includes(filter.toLowerCase())
    );

  const filterCards = () => {
    const params = getAllParams();
    const {
      categories = [],
      years = [],
      topics = [],
      techs = [],
      favorite = [],
    } = params;
    const isFavoriteModeEnabled = favorite[0] === "true";

    const favoriteOrgs = isFavoriteModeEnabled
      ? new Set(
          Object.keys(localStorage)
            .filter((key) => localStorage.getItem(key) === "true")
            .map((key) => key.toLowerCase())
        )
      : new Set();

    //let isAllHidden = false;

    cardsRef.current.forEach((card, index) => {
      const org = orgData[index]; // Use the pre-extracted data
      const isMatch =
        (!searchQuery || org.name.includes(searchQuery)) &&
        matchesFilter(categories, org.categories) &&
        matchesFilter(years, org.years) &&
        matchesFilter(topics, org.topics) &&
        matchesFilter(techs, org.techs) &&
        (!isFavoriteModeEnabled || favoriteOrgs.has(org.name));
      //if (!isMatch) isAllHidden = true;
      card.classList.toggle("hidden", !isMatch);
    });
  };

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".organization-card"));
    cardsRef.current = cards as HTMLDivElement[];

    const extractedData = cards.map((card) => {
      return {
        name: card.querySelector(".org-name")?.textContent?.toLowerCase() || "",
        categories: Array.from(card.querySelectorAll(".org-category")).map(
          (elem) => elem.textContent || ""
        ),
        years: Array.from(card.querySelectorAll(".org-year")).map(
          (elem) => elem.textContent || ""
        ),
        topics: Array.from(card.querySelectorAll(".org-topic")).map(
          (elem) => elem.textContent || ""
        ),
        techs: Array.from(card.querySelectorAll(".org-tech")).map(
          (elem) => elem.textContent || ""
        ),
      };
    });
    setOrgData(extractedData);
  }, []);

  useEffect(() => {
    if (orgData.length > 0) {
      filterCards();
    }
  }, [searchQuery, getAllParams, orgData]);

  return (
    <SearchInput
      query={searchQuery}
      handleSearchChange={(e) =>
        setSearchQuery(e.target.value.toLowerCase().trim())
      }
    />
  );
};

export default Searchbar;

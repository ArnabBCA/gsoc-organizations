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
      isfirstTime: boolean;
    }[]
  >([]);

  const matchesFilter = (filters: string[], values: string[]) =>
    filters.length === 0 ||
    filters.some((filter) => values.includes(filter.toLowerCase()));

  const filterCards = () => {
    const params = getAllParams();
    const {
      categories = [],
      years = [],
      topics = [],
      techs = [],
      favorite = [],
      others = [],
    } = params;
    const isFavoriteModeEnabled = favorite[0] === "true";
    const isFirstTimeOrgsEnabled = others.includes("First time organizations");

    const favoriteOrgs = isFavoriteModeEnabled
      ? new Set(
          Object.keys(localStorage)
            .filter((key) => localStorage.getItem(key) === "true")
            .map((key) => key.toLowerCase())
        )
      : new Set();

    //let isAllHidden = false;

    const searchQueryValue = searchQuery.toLowerCase().trim();

    cardsRef.current.forEach((card, index) => {
      const org = orgData[index];
      const isMatch =
        (!searchQueryValue || org.name.includes(searchQueryValue)) &&
        matchesFilter(categories, org.categories) &&
        matchesFilter(years, org.years) &&
        matchesFilter(topics, org.topics) &&
        matchesFilter(techs, org.techs) &&
        (isFirstTimeOrgsEnabled ? org.isfirstTime : true) &&
        (isFavoriteModeEnabled ? favoriteOrgs.has(org.name) : true);
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
          (elem) => elem.textContent?.toLocaleLowerCase() || ""
        ),
        years: Array.from(card.querySelectorAll(".org-year")).map(
          (elem) => elem.textContent?.toLocaleLowerCase() || ""
        ),
        topics: Array.from(card.querySelectorAll(".org-topic")).map(
          (elem) => elem.textContent?.toLocaleLowerCase() || ""
        ),
        techs: Array.from(card.querySelectorAll(".org-tech")).map(
          (elem) => elem.textContent?.toLocaleLowerCase() || ""
        ),
        isfirstTime: card.querySelector(".org-first-time") ? true : false,
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
      handleSearchChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default Searchbar;

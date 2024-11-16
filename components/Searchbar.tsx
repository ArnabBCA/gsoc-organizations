import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Input } from "./ui/input";

// Utility function to normalize IDs (replace special characters with spaces)
const normalizeId = (id: string) => {
  return id
    .replace(/[^\w\s]/g, " ") // Replace any non-alphanumeric characters with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .toLowerCase(); // Convert to lowercase for case-insensitive matching
};

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
  };

  useEffect(() => {
    // Get all the organization cards
    const orgCards =
      document.querySelectorAll<HTMLDivElement>(".organization-card");

    // Create a list of objects from the DOM, using only the normalized id
    const orgData = Array.from(orgCards).map((org) => ({
      id: org.id, // Only use the ID of the card for search
      normalizedId: normalizeId(org.id), // Normalize the id for better search matching
    }));

    // Configure Fuse.js for fuzzy search based on the normalized `id`
    const fuse = new Fuse(orgData, {
      keys: ["normalizedId"], // Only search by normalized `id`
      threshold: 0.3, // Fuzzy match sensitivity
    });

    if (query.trim() === "") {
      // If query is empty, show all organization cards
      orgCards.forEach((org) => {
        if (org.style.display === "none") return;
        org.style.display = "block";
      });
    } else {
      // Normalize the query to ensure it matches the normalized `id` format
      const normalizedQuery = normalizeId(query);

      // Perform fuzzy search
      const results = fuse.search(normalizedQuery);

      const matchingIds = results.map((result) => result.item.id);

      // Show or hide cards based on matching IDs
      orgCards.forEach((org) => {
        if (org.style.display === "none") return;
        if (matchingIds.includes(org.id)) {
          org.style.display = "block"; // Show matching cards
        } else {
          org.style.display = "none"; // Hide non-matching cards
        }
      });
    }
  }, [query]); // Run whenever the query changes

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

import { useState, useEffect } from "react";

// Custom hook for debouncing the search query
export const useDebouncedSearch = (query: string, delay: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Set the debounced value after the delay
    }, delay);

    // Clean up the timeout if the component unmounts or query changes
    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]); // Runs when `query` changes

  return debouncedQuery;
};

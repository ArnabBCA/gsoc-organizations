"use client";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useQueryParams } from "@/hooks/useQueryParams";

const StarButton = ({ navUrl }: { navUrl: string }) => {
  const [isStarred, setIsStarred] = useState(false);
  const { getAllParams, handleChange: handleItemChange } = useQueryParams(
    "stared",
    []
  );

  useEffect(() => {
    setIsStarred(localStorage.getItem(navUrl) === "true");
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const params = getAllParams();
    const isFavoriteModeEnabled = params.favorite ? params.favorite[0] : "";
    event.preventDefault();
    if (isFavoriteModeEnabled === "true") {
      handleItemChange(navUrl, !!isStarred);
    }
    localStorage.setItem(navUrl, (!isStarred).toString());
    setIsStarred((prev) => !prev);
  };

  return (
    <Star
      onClick={handleClick}
      className={cn(
        "absolute z-10 right-[1rem] top-[1rem] transition-colors hover:fill-yellow-300 hover:text-yellow-300",
        isStarred
          ? "fill-yellow-300 text-yellow-300"
          : "hidden group-hover:block fill-gray-300 text-gray-300"
      )}
    />
  );
};

export default StarButton;

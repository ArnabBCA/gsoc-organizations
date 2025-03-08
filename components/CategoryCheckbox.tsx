"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { CATEGORIES } from "@/constants";

const CategoryCheckbox = () => {
  const {
    selectedValues: selectedCategories,
    handleChange: handleCategoryChange,
  } = useQueryParams("categories", []);

  return (
    <CheckboxList
      items={Object.keys(CATEGORIES)}
      selectedItems={selectedCategories}
      handleItemChange={handleCategoryChange}
      labelFn={(categoryName) => {
        return `${categoryName} (${CATEGORIES[categoryName]})`;
      }}
    />
  );
};

export default CategoryCheckbox;

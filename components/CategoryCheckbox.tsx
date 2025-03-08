"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { SidebarMenuItem } from "./ui/sidebar";
import { CATEGORIES } from "@/constants";

const CategoryCheckbox = () => {
  const {
    selectedValues: selectedCategories,
    handleChange: handleCategoryChange,
  } = useQueryParams("category", []);

  return (
    <SidebarMenuItem className="p-2">
      <CheckboxList
        items={Object.keys(CATEGORIES)}
        selectedItems={selectedCategories}
        handleItemChange={handleCategoryChange}
        labelFn={(categoryName) => {
          return `${categoryName} (${CATEGORIES[categoryName]})`;
        }}
      />
    </SidebarMenuItem>
  );
};

export default CategoryCheckbox;

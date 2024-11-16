"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { SidebarMenuItem } from "./ui/sidebar";
import { Category } from "@/types/types";
import { categories } from "@/catagory/data"; // Assuming you have the categories array

const CategoryCheckbox = () => {
  const {
    selectedValues: selectedCategories,
    handleChange: handleCategoryChange,
  } = useQueryParams("category", []);

  return (
    <SidebarMenuItem className="p-2">
      <CheckboxList
        items={categories.map((cat: Category) => cat.name)}
        selectedItems={selectedCategories}
        handleItemChange={handleCategoryChange}
        labelFn={(categoryName) => {
          const category = categories.find((cat) => cat.name === categoryName);
          return category
            ? `${category.name} (${category.count})`
            : categoryName;
        }}
      />
    </SidebarMenuItem>
  );
};

export default CategoryCheckbox;

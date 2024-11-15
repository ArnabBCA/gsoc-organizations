"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/types";
import { categories } from "@/catagory/data"; // Assuming you have the categories array here
import { SidebarMenuItem } from "./ui/sidebar";

const CategoryCheckbox = () => {
  // State to keep track of selected categories
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  // This function handles category changes (checkbox toggle)
  const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
    const updatedCategories = new Set(selectedCategories);
    if (isChecked) {
      updatedCategories.add(categoryName);
    } else {
      updatedCategories.delete(categoryName);
    }
    setSelectedCategories(updatedCategories);
  };

  // Effect hook to filter organization cards based on selected categories
  useEffect(() => {
    const orgCards =
      document.querySelectorAll<HTMLDivElement>(".organization-card");

    if (selectedCategories.size > 0) {
      orgCards.forEach((org) => {
        const categoryElement = org.querySelector(".category");
        const orgCategory = categoryElement?.textContent?.trim() || "";

        if (selectedCategories.has(orgCategory)) {
          org.style.display = "block"; // Show matching cards
        } else {
          org.style.display = "none"; // Hide non-matching cards
        }
      });
    } else {
      // Show all cards when no category is selected
      orgCards.forEach((org) => {
        org.style.display = "block";
      });
    }
  }, [selectedCategories]);

  // Function to render each category checkbox
  const renderCategoryCheckbox = (category: Category) => {
    const checked = selectedCategories.has(category.name);
    return (
      <div key={category.name} className="flex items-center gap-2">
        <Checkbox
          id={category.name}
          checked={checked}
          onCheckedChange={(value) =>
            handleCategoryChange(category.name, !!value)
          } // Handle checkbox change
        />
        <label htmlFor={category.name} className="text-sm">
          {category.name} ({category.count})
        </label>
      </div>
    );
  };

  return (
    <SidebarMenuItem className="p-2">
      {categories.map((category: Category) => renderCategoryCheckbox(category))}
    </SidebarMenuItem>
  );
};

export default CategoryCheckbox;

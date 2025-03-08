"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { SidebarMenuItem } from "./ui/sidebar";
import { YEARS } from "@/constants";

const YearCheckbox = () => {
  const { selectedValues: selectedYears, handleChange: handleYearChange } =
    useQueryParams("years", []);

  return (
    <SidebarMenuItem className="p-2">
      <CheckboxList
        items={YEARS.map(String)}
        selectedItems={selectedYears}
        handleItemChange={handleYearChange}
        labelFn={(year) => year}
      />
    </SidebarMenuItem>
  );
};

export default YearCheckbox;

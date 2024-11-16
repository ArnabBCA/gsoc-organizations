"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { SidebarMenuItem } from "./ui/sidebar";

const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

const YearCheckbox = () => {
  const { selectedValues: selectedYears, handleChange: handleYearChange } =
    useQueryParams("years", []);

  return (
    <SidebarMenuItem className="p-2">
      <CheckboxList
        items={years.map(String)}
        selectedItems={selectedYears}
        handleItemChange={handleYearChange}
        labelFn={(year) => year}
      />
    </SidebarMenuItem>
  );
};

export default YearCheckbox;

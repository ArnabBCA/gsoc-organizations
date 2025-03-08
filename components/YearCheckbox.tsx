"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { YEARS } from "@/constants";

const YearCheckbox = () => {
  const { selectedValues: selectedYears, handleChange: handleYearChange } =
    useQueryParams("years", []);

  return (
    <CheckboxList
      items={YEARS.map(String)}
      selectedItems={selectedYears}
      handleItemChange={handleYearChange}
      labelFn={(year) => year}
    />
  );
};

export default YearCheckbox;

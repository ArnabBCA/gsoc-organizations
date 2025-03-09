"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { TECHS } from "@/constants";

const TechCheckbox = () => {
  const { selectedValues: selectedTechs, handleChange: handleTechChange } =
    useQueryParams("techs", []);

  return (
    <CheckboxList
      items={Object.keys(TECHS)}
      selectedItems={selectedTechs}
      handleItemChange={handleTechChange}
      labelFn={(techName) => {
        return `${techName} (${TECHS[techName]})`;
      }}
    />
  );
};

export default TechCheckbox;

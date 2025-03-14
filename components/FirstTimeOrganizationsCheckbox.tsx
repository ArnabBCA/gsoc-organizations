"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import React from "react";
import { CheckboxList } from "./CheckboxList";
import { FIRST_TIME_ORGANOZATIONS } from "@/constants";

const FirstTimeOrganizationsCheckbox = () => {
  const { selectedValues: selectedItem, handleChange: handleItemChange } =
    useQueryParams("others", []);

  return (
    <CheckboxList
      items={["First time organizations"]}
      selectedItems={selectedItem}
      handleItemChange={handleItemChange}
      labelFn={(item) => `${item} (${FIRST_TIME_ORGANOZATIONS})`}
      hideDialog={true}
    />
  );
};

export default FirstTimeOrganizationsCheckbox;

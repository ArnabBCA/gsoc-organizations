import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxListProps = {
  items: string[];
  selectedItems: string[];
  handleItemChange: (item: string, checked: boolean) => void;
  labelFn: (item: string) => string; // Function to generate label text
};

export const CheckboxList = ({
  items,
  selectedItems,
  handleItemChange,
  labelFn,
}: CheckboxListProps) => {
  return (
    <>
      {items.map((item) => {
        const checked = selectedItems.includes(item);
        return (
          <div key={item} className="flex items-center gap-2">
            <Checkbox
              id={item}
              checked={checked}
              onCheckedChange={(value) => handleItemChange(item, !!value)}
            />
            <label htmlFor={item} className="text-sm cursor-pointer">
              {labelFn(item)}
            </label>
          </div>
        );
      })}
    </>
  );
};

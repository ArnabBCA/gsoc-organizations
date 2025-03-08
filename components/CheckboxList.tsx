import React, { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxListProps = {
  items: string[];
  selectedItems: string[];
  handleItemChange: (item: string, checked: boolean) => void;
  labelFn: (item: string) => string;
};

export const CheckboxList = ({
  items,
  selectedItems,
  handleItemChange,
  labelFn,
}: CheckboxListProps) => {

  // Sort items: selected items come first
  const sortedItems = useMemo(() => {
    console.log("Sorting items");
    return [...items].sort((a, b) => {
      const aSelected = selectedItems.includes(a) ? -1 : 1;
      const bSelected = selectedItems.includes(b) ? -1 : 1;
      return aSelected - bSelected;
    });
  }, [items, selectedItems]);

  return (
    <div className="flex flex-col gap-1">
      {sortedItems.map((item) => {
        const checked = selectedItems.includes(item);
        const labelId = `label-${item}`;
        const labelText = labelFn(item);

        return (
          <div key={item} className="flex items-center gap-2">
            <Checkbox
              id={item}
              aria-labelledby={labelId}
              aria-label={labelText}
              checked={checked}
              onCheckedChange={(value) => handleItemChange(item, !!value)}
            />
            <label
              id={labelId}
              htmlFor={item}
              className="text-sm cursor-pointer"
            >
              {labelText}
            </label>
          </div>
        );
      })}
    </div>
  );
};

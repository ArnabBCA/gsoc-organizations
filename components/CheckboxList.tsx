import React, { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

type CheckboxListProps = {
  items: string[];
  selectedItems: string[];
  handleItemChange: (item: string, checked: boolean) => void;
  labelFn: (item: string) => string;
};

const CheckboxItem = ({
  item,
  checked,
  handleItemChange,
  labelFn,
}: {
  item: string;
  checked: boolean;
  handleItemChange: (item: string, checked: boolean) => void;
  labelFn: (item: string) => string;
}) => {
  const labelId = `label-${item}`;
  const labelText = labelFn(item);
  const name=`${item}-checkbox`;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={item}
        name={name}
        aria-labelledby={labelId}
        aria-label={labelText}
        checked={checked}
        onCheckedChange={(value) => handleItemChange(item, !!value)}
      />
      <label id={labelId} htmlFor={item} className="text-sm cursor-pointer">
        {labelText}
      </label>
    </div>
  );
};

export const CheckboxList = ({
  items,
  selectedItems,
  handleItemChange,
  labelFn,
}: CheckboxListProps) => {
  const [searchItem, setSearchItem] = useState("");

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        (selectedItems.includes(a) ? -1 : 1) -
        (selectedItems.includes(b) ? -1 : 1)
    );
  }, [items, selectedItems]);

  const filteredItems = useMemo(() => {
    return sortedItems.filter((item) =>
      labelFn(item).toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [sortedItems, searchItem, labelFn]);

  return (
    <div className="flex flex-col gap-2">
      {sortedItems.slice(0, 5).map((item) => (
        <CheckboxItem
          key={item}
          item={item}
          checked={selectedItems.includes(item)}
          handleItemChange={handleItemChange}
          labelFn={labelFn}
        />
      ))}
      {filteredItems.length > 5 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 max-h-min">
              View All
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-max min-w-[36rem] w-full max-h-[30rem] flex flex-col p-4">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Search Filters"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            {filteredItems.length != 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-full overflow-y-scroll">
                {filteredItems.map((item) => (
                  <CheckboxItem
                    key={item}
                    item={item}
                    checked={selectedItems.includes(item)}
                    handleItemChange={handleItemChange}
                    labelFn={labelFn}
                  />
                ))}
              </div>
            ) : (
              <span className="text-center text-sm text-muted-foreground">
                No Filters Found
              </span>
            )}
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

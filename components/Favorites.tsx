"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Star } from "lucide-react";

const Favorites = () => {
  const { selectedValues: selectedItem, handleChange: handleItemChange } =
    useQueryParams("favorite", []);

  return (
    <div className="flex items-center w-full justify-between">
      <Label
        htmlFor="favorites-mode"
        className="text-base flex items-center gap-2"
      >
        {<Star className="fill-yellow-300 text-yellow-300" />}Favorites (12)
      </Label>
      <Switch
        checked={selectedItem.includes("true")}
        id="favorites-mode"
        onCheckedChange={(value) => handleItemChange("true", !!value)}
      />
    </div>
  );
};

export default Favorites;

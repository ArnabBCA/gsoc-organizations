import { useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useQueryParams = (
  paramKey: string,
  defaultValues: string[] = []
) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const queryParam = searchParams.get(paramKey);
  const initialValues = queryParam ? queryParam.split(",") : defaultValues;

  const [selectedValues, setSelectedValues] = useState<string[]>(initialValues);

  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      let updatedValues;
      if (checked) {
        updatedValues = [...selectedValues, value];
      } else {
        updatedValues = selectedValues.filter((v) => v !== value);
      }

      setSelectedValues(updatedValues);

      // Construct the query string
      const updatedQueryString = new URLSearchParams();

      // Add the current parameter with updated values
      if (updatedValues.length > 0) {
        updatedQueryString.set(paramKey, updatedValues.join(","));
      } else {
        updatedQueryString.delete(paramKey); // Remove the parameter if no values are selected
      }

      // Add other query parameters (to preserve years or other filters)
      searchParams.forEach((value, key) => {
        if (key !== paramKey) {
          updatedQueryString.set(key, value);
        }
      });

      // Update the URL
      window.history.pushState(
        {},
        "",
        `${pathName}?${updatedQueryString.toString()}`
      );
    },
    [selectedValues, pathName, searchParams, paramKey]
  );

  return { selectedValues, handleChange };
};

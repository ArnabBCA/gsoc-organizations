import { useState, useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useQueryParams = (
  paramKey?: string, // Make paramKey optional
  defaultValues: string[] = []
) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // Get the initial values for the specified paramKey or use defaults
  const queryParam = paramKey ? searchParams.get(paramKey) : null;
  const initialValues = queryParam ? queryParam.split(",") : defaultValues;

  const [selectedValues, setSelectedValues] = useState<string[]>(initialValues);

  // Sync state with URL parameters on changes
  useEffect(() => {
    setSelectedValues(initialValues);
  }, []);

  // Update the specified paramKey values in the query string
  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      if (!paramKey) return; // No updates if no paramKey is provided

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

  // Fetch all query parameters
  const getAllParams = useCallback(() => {
    const params: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      params[key] = value.split(",");
    });
    return params;
  }, [searchParams]);

  return {
    selectedValues, // Returns selected values for the specified paramKey
    handleChange, // Updates the specified paramKey in the query string
    getAllParams, // Fetches all query parameters
  };
};

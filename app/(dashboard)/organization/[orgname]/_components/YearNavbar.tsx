"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

const YearNavbar = ({ projectYears }: { projectYears: number[] }) => {
  const [selectedYear, setSelectedYear] = useState(projectYears[0]);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  const filterProjects = useCallback(() => {
    projectsRef.current.forEach((project) => {
      const matchesYear =
        selectedYear && project.classList.contains(`${selectedYear}`);

      if (matchesYear) {
        project.classList.remove("hidden");
        project.removeAttribute("style");
      } else {
        project.classList.add("hidden");
      }
    });
  }, [selectedYear]);

  useEffect(() => {
    projectsRef.current = Array.from(
      document.querySelectorAll(".project-year")
    );
  }, []);

  useEffect(() => {
    filterProjects();
  }, [selectedYear]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {projectYears.map((year, index) => {
        return (
          <Button
            key={index}
            variant={null}
            className={cn(
              "text-muted-foreground",
              selectedYear === year
                ? "bg-primary text-white"
                : "hover:bg-secondary"
            )}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
};

export default YearNavbar;

"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePathname } from "next/navigation"; // For getting the organization name from the URL

export function OrganizationChart() {
  const [chartData, setChartData] = useState<
    { year: string; projects: number }[]
  >([]);
  const pathname = usePathname(); // Getting the current URL
  const orgname = pathname?.split("/").pop(); // Assuming orgname is the last part of the URL

  const fetchChartData = async () => {
    try {
      const response = await fetch(`/analytics/${orgname}.json`); // Fetch the JSON for the org
      if (!response.ok) throw new Error("Failed to fetch chart data");
      const data = await response.json();

      const years: number[] = [
        2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
      ];

      // Map over the hardcoded years and ensure each year has a value (default to 0)
      const transformedData = years.map((year) => ({
        year: year.toString(),
        projects: Number(data.projects_by_year?.[year] || 0),
      }));

      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    if (!orgname) return; // Don't fetch if orgname is not available
    fetchChartData();
  }, [orgname]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    projects: {
      label: "Projects",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full p-4 h-full sm:max-w-[665.6px]">
      <h2 className="text-lg font-semibold org-name">
        Number of pojects per year
      </h2>
      <p className="text-muted-foreground">
        {chartData[0] &&
          chartData[0].year + "-" + chartData[chartData.length - 1].year}
      </p>
      <ChartContainer config={chartConfig}>
        <LineChart
          key={JSON.stringify(chartData)} // Ensure re-rendering with new data
          accessibilityLayer
          data={chartData}
          margin={{
            top: 18,
            left: 18,
            right: 18,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 4)} // Display full year (e.g., 2024)
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="projects"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)",
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}

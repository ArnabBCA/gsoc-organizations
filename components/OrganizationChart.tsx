"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

      // Transform the 'projects_by_year' data into the format for the chart
      const transformedData = Object.entries(data.projects_by_year).map(
        ([year, projects]) => ({
          year,
          projects: Number(projects),
        })
      );

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
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Number of pojects per year</CardTitle>
        <CardDescription className="min-h-5">
          {chartData[0] &&
            chartData[0].year + "-" + chartData[chartData.length - 1].year}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

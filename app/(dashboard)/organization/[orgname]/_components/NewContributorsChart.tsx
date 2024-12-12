"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePathname } from "next/navigation"; // For getting the organization name from the URL

export function NewContributorsChart() {
  const [chartData, setChartData] = useState<{ count: number; date: string }[]>(
    []
  );
  const pathname = usePathname(); // Getting the current URL
  const orgname = pathname?.split("/").pop(); // Assuming orgname is the last part of the URL

  const fetchChartData = async () => {
    try {
      const response = await fetch(`/analytics/${orgname}.json`); // Fetch the JSON for the org
      if (!response.ok) throw new Error("Failed to fetch chart data");
      const data = await response.json();
      console.log(data);
      // Process data to format it for the chart
      const formattedData = data.newContributorsData
        ?.map((entry: { newContributors: number; createdAt: string }) => ({
          count: entry.newContributors,
          date: new Date(entry.createdAt).toLocaleDateString(), // Format date as a readable string
        }))
        .slice(1);

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    if (!orgname) return;
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
    <Card className="max-w-md p-4 h-full w-full">
      <h2 className="text-lg font-semibold org-name">
        New Contributors Over Time
      </h2>
      <ChartContainer config={chartConfig} className="h-36 w-full">
        <LineChart
          key={JSON.stringify(chartData)} // Ensure re-rendering with new data
          data={chartData}
          margin={{
            top: 18,
            left: 18,
            right: 18,
            bottom: 18,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="count"
            type="monotone"
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

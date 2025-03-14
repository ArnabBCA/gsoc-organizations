"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { YEARS } from "@/constants";

export function OrganizationChart({
  yearsAppearedData,
}: {
  yearsAppearedData: any;
}) {
  const [chartData, setChartData] = useState<
    { year: string; projects: number }[]
  >([]);

  const fetchChartData = async () => {
    const transformedData = YEARS.map((year) => {
      if (YEARS[0] === year && !yearsAppearedData[year]) {
        return;
      }
      return {
        year: year.toString(),
        projects: yearsAppearedData[year] || 0,
      };
    });

    const filteredData = transformedData
      .filter((data) => data !== undefined)
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    setChartData(filteredData);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const chartConfig = {
    projects: {
      label: "Projects",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  const isDataAvailable: boolean =
    chartData[0] && Object.keys(yearsAppearedData).length > 0;

  return (
    <Card className="relative p-4 h-full max-w-full sm:max-w-md w-full flex flex-col justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold org-name">
          Number of pojects per year
        </h2>
        {isDataAvailable ? (
          <p className="text-muted-foreground">
            {chartData[0].year + "-" + chartData[chartData.length - 1].year}
          </p>
        ) : (
          <p className="text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No data available
          </p>
        )}
      </div>
      {isDataAvailable && (
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            accessibilityLayer
            margin={{
              top: 28,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)} // Display full year (e.g., 2024)
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent color="hsl(var(--primary))" />}
            />
            <Bar dataKey="projects" className="fill-primary" radius={8}>
              <LabelList position="top" offset={12} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
    </Card>
  );
}

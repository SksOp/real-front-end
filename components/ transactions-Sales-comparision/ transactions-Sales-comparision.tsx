"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TransactionVsSalesType } from "@/transcation/types";

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

const chartConfig = {
  sales: {
    label: "sales",
    color: "hsl(var(--chart-3))",
  },
  Transactions: {
    label: "Transactions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartDataType = {
  [year: string]: {
    month: string;
    sales: number;
    Transactions: number;
  }[];
};

function transformData(data: TransactionVsSalesType): ChartDataType {
  const accumulatedData: ChartDataType = {};

  for (const year in data) {
    if (!accumulatedData[year]) {
      accumulatedData[year] = [];
    }
    for (const month in data[year]) {
      accumulatedData[year].push({
        month,
        sales: data[year][month].sales,
        Transactions: data[year][month].Transactions,
      });
    }
  }

  return accumulatedData;
}

export function TransactionVsSales({ data }: { data: TransactionVsSalesType }) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  if (!data) {
    return <p>No data available</p>;
  }

  const chartData = transformData(data);
  const years = Object.keys(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Bar Chart - Multiple"}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          </CardTitle>
        <CardDescription className="flex justify-between items-center">
          {"Aggregated Monthly Data"}
          </CardDescription>
      {/* <CardDescription>Aliquam porta nisl dolor, molestie pellentesque</CardDescription> */}
      </CardHeader>
      <CardContent>
      
        {selectedYear && (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData[selectedYear]}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={4} />
              <Bar dataKey="Transactions" fill="hsl(var(--chart-2))" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

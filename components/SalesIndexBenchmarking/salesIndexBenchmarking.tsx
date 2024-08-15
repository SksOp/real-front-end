"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { fetchSalesIndexBenchmarkType, TransactionVsSalesType } from "@/transcation/types";

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

export function SalesIndexBenchmarking({ data }: { data: fetchSalesIndexBenchmarkType }) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  if (!data) {
    return <p>No data available</p>;
  }

  // console.log("data:", data)

  const chartData = transformData(data);
  const years = Object.keys(chartData);

  // Extract sales data for the selected year and convert to millions
  const salesData = chartData[selectedYear]?.map((item) => (item.sales / 1000000)) || [];

  // console.log(salessalesData)



  // Calculate 25th and 75th percentiles
  const percentile25 = calculatePercentile(salesData, 0.25);
  const percentile75 = calculatePercentile(salesData, 0.75);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Sales Index Benchmarking"}
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
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="h-4 flex gap-1">
          <div className="w-1/4 h-4 rounded-lg bg-green-500"></div>
          <div className="w-1/2 h-4 rounded-lg bg-yellow-500"></div>
          <div className="w-1/4 h-4 rounded-lg bg-red-500"></div>
          </div>
          <div className="flex justify-between text-gray-600 mt-2 text-sm">
            <div className="w-full flex justify-center">
              <span>${percentile25.toFixed(2)}M</span>
            </div>
            <div className="w-full flex justify-center">
              <span>${percentile75.toFixed(2)}M</span>
            </div>
          </div>
        </div>
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

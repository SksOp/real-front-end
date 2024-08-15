"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
// import { Bar, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { SalesTransactionsType } from "@/transcation/types";

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
import React, { useState } from "react";
import { SalesTransactions } from "@/actions/salestransaction";

const chartConfig = {
  desktop: {
    label: "Transactions",
    color: "#A9A1F4",
  },
} satisfies ChartConfig;

export interface SalesChartDataTypeYearly {
  duration: string;
  property_count: number;
}

export interface SalesChartDataTypeQuaterly {
  duration: string;
  property_count: number;
}
export interface SalesChartDataTypeMonthly {
  duration: string;
  property_count: number;
}

export function SalesMarketTrend({
  data,
}: {
  data: SalesTransactionsType;
}) {
  // Add a check to handle the case where data is undefined or null
  const [selectedOption, setSelectedOption] = React.useState<string>("Yearly");
  const salestransaction = new SalesTransactions();
  const [chartData, setChartData] = React.useState<
    | SalesChartDataTypeYearly[]
    | SalesChartDataTypeQuaterly[]
    | SalesChartDataTypeMonthly[]
  >(salestransaction.getYearlySalesData({ data }));
  const Option = ["Yearly", "Qaterly", "Monthly"];
  if (!data) {
    return <>No data available</>;
  }
  const years = Object.keys(data);

  if (!data) return null;

  const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // const Transaction = new Transactions;
    if (selectedValue === "Yearly") {
    const datat = salestransaction.getYearlySalesData({data});
    setChartData(datat);
    setSelectedOption(selectedValue); 
    }else if(selectedValue === "Qaterly"){
      const datat = salestransaction.getQuarterlySalesData({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }else if(selectedValue === "Monthly"){
      const datat = salestransaction.getMonthlySalesData({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }
  }

  return (
    <Card className="py-2 border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Sales Market Value Trend"}
          <select
            value={selectedOption}
            onChange={handelOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {Option.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </CardTitle>
        <CardDescription>
          Aliquam porta nisl dolor, molestie pellentesque
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="duration"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="property_count"
              fill="var(--color-desktop)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
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

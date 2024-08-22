"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
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
import { SalesChartDataTypeMonthly, SalesChartDataTypeQuaterly, SalesChartDataTypeYearly } from "../sales-market-trend/sales-market-trend";

const chartConfig = {
  desktop: {
    label: "Sales",
    color: "#A9A1F4",
  },
} satisfies ChartConfig;

export function GrowthChart({ data }: { data: SalesTransactionsType}) {
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
          {"Sales Transactions"}
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
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                left: 4,
                right: 4,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="duration"
                tickLine={false}
                axisLine={false}
                tickMargin={1}
                // tickFormatter={(value) => value.slice(0, 4)}
              />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Area
                type="natural"
                dataKey="property_count"
                stroke="#A9A1F4"
                fillOpacity={0.4}
                fill="#A9A1F4"
                dot={{
                  fill: "#A9A1F4",
                }}
              />
              <Line
                dataKey="property_count"
                type="natural"
                stroke="#A9A1F4"
                strokeWidth={2}
                dot={true}
              />
            </AreaChart>
          </ResponsiveContainer>
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

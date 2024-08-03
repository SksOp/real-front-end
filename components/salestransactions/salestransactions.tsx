"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { SalesTransactionsType } from "@/transcation/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useState } from "react"

const chartConfig = {
  desktop: {
    label: "Transactions",
    color: "#A9A1F4",
  },
} satisfies ChartConfig

export function GrowthChart({ data }: { data: SalesTransactionsType }) {
  // Add a check to handle the case where data is undefined or null
  if (!data) {
    return <p>No data available</p>
  }

  //sort in reverse order that means the largest comes first
  const years = Object.keys(data).sort().reverse();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const ChartData = data[selectedYear];

  const chartDataArray = Object.entries(ChartData).map(([month, transactions]) => ({
    month,
    transactions: transactions.Transactions,
  }));

  return (
    <Card className="py-2 border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Sales Transactions"} 
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
        <CardDescription>Aliquam porta nisl dolor, molestie pellentesque</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartDataArray}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="transactions"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
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
  )
}

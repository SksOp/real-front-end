"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import { LocationSalesTransaction } from "@/transcation/types"
import { useState } from "react"

interface ChartDataType {
  [year: string]: { location: string; Transaction: number }[]
}

const chartConfig = {
    Transaction: {
    label: "Transaction",
    color: "#A9A1F4",
  },
} satisfies ChartConfig

const convertData = (data: LocationSalesTransaction): ChartDataType => {
  const result: ChartDataType = {}

  for (const year in data) {
    if (!result[year]) {
      result[year] = []
    }

    const locationSales = data[year]

    for (const location in locationSales) {
      const existingLocation = result[year].find(
        (loc) => loc.location === location
      )

      if (existingLocation) {
        existingLocation.Transaction += locationSales[location].Transactions
      } else {
        result[year].push({
          location: location,
          Transaction: locationSales[location].Transactions,
        })
      }
    }
    result[year].sort((a, b) => b.Transaction - a.Transaction);
  }

  return result
}

export function LocationTransaction({ data }: { data: LocationSalesTransaction }) {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  if (!data) {
    return <p>No data available</p>;
  }

  const chartData = convertData(data)

  
  const years = Object.keys(data);


  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Transactions
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          </CardTitle>
        <CardDescription>
          Showing total Transaction at a location
        </CardDescription>
      </CardHeader>
      <div className="overflow-x-auto scrollbar-hide">
        <CardContent className="w-[15000px] h-[300px]">
          <ChartContainer config={chartConfig} className="w-[15000px] h-[300px]">
            <AreaChart
              accessibilityLayer
              data={chartData["2024"]}
              margin={{
                left: 12,    
                right: 12, 
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="location"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="Transaction"
                type="natural"
                fill="#A9A1F4"
                fillOpacity={0.4}
                stroke="#A9A1F4"
                dot={{
                  fill:"#A9A1F4"
                }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

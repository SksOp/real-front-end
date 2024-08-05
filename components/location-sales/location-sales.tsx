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

interface ChartDataType {
  [year: string]: { location: string; sales: number }[]
}

const chartConfig = {
  sales: {
    label: "sales",
    color: "hsl(var(--chart-1))",
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
        existingLocation.sales += locationSales[location].sales
      } else {
        result[year].push({
          location: location,
          sales: locationSales[location].sales,
        })
      }
    }
  }

  return result
}

export function LocationSales({ data }: { data: LocationSalesTransaction }) {
  const chartData = convertData(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
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

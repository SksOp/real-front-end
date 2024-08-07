"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"

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
import { BedroomType } from "@/transcation/types"

// Example chart configuration, update the colors as needed
const chartConfig: ChartConfig = {
  "1 B/R": { label: "1 B/R", color: "#f0f9ff" },
  "2 B/R": { label: "2 B/R", color: "#60a5fa" },
  "3 B/R": { label: "3 B/R", color: "#93c5fd" },
  "4 B/R": { label: "4 B/R", color: "#bfdbfe" },
  "5 B/R": { label: "5 B/R", color: "#e0f2fe" },
  "6 B/R": { label: "6 B/R", color: "#3b82f6" },
  "7 B/R": { label: "7 B/R", color: "#2563eb" },
  "9 B/R": { label: "9 B/R", color: "#0891b2" },
  "GYM": { label: "GYM", color: "#22d3ee" },
  "Office": { label: "Office", color: "#0ea5e9" },
  "PENTHOUSE": { label: "PENTHOUSE", color: "#1d4ed8" },
  "Shop": { label: "Shop", color: "#1e40af" },
  "Single Room": { label: "Single Room", color: "#1e3a8a" },
  "Studio": { label: "Studio", color: "#6366f1" },
}

export function Bedrooms({ data }: { data: BedroomType[] }) {
  const totalProperties = data.reduce((acc, curr) => acc + curr.property_count, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="property_count"
              nameKey="bedrooms"
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((entry, index) => {
                const color = chartConfig[entry.bedrooms]?.color || "#000000";
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProperties.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Properties
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total properties for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

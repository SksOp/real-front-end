"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ResidentialVsCommercialType } from "@/transcation/types";
import { useState } from "react";

export function ResidentialVsCommercial({
  data,
}: {
  data: ResidentialVsCommercialType;
}) {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  if (!data) {
    return <p>No data available</p>;
  }

  const years = Object.keys(data);

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Residential Vs Commercial"}
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
          {"You're averaging more steps a day this year than last year."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {data[selectedYear]?.Residential}
            <span className="text-sm font-normal text-muted-foreground">
              Residential
            </span>
          </div>
          <ChartContainer
            config={{
              residential: {
                label: "Residential",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: selectedYear,
                  residential: data[selectedYear]?.Residential,
                },
              ]}
            >
              <Bar dataKey="residential" fill="#60a5fa" radius={4} barSize={32}>
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="white"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="residential" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {data[selectedYear]?.Commercial}
            <span className="text-sm font-normal text-muted-foreground">
              Commercial
            </span>
          </div>
          <ChartContainer
            config={{
              commercial: {
                label: "Commercial",
                color: "hsl(var(--muted))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: selectedYear,
                  commercial: data[selectedYear]?.Commercial,
                },
              ]}
            >
              <Bar
                dataKey="commercial"
                fill="var(--color-commercial)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="hsl(var(--muted-foreground))"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="commercial" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

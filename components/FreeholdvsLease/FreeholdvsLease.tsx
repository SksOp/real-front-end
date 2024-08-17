"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { FreeholdVsLeaseType } from "@/transcation/types"
import React from "react"
import { FrVsRe } from "@/actions/freeholdvs"

export interface FrvReChartDataTypeYearly {
  Freehold: number;
  Lease: number;
}

export interface FrvReChartDataTypeQuaterly {
  Freehold: number;
  Lease: number;
}
export interface FrvReChartDataTypeMonthly {
  Freehold: number;
  Lease: number;
}

export function FreeholdvsLease({data}:{data: FreeholdVsLeaseType}) {

  const [selectedOption, setSelectedOption] = React.useState<string>("Yearly");
  const frvsre = new FrVsRe;
  const [chartData, setChartData] = React.useState<
    | FrvReChartDataTypeYearly
    | FrvReChartDataTypeQuaterly
    | FrvReChartDataTypeMonthly
  >(frvsre.getYearlyData({ data }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  console.log("data", data);
  console.log("chart data", chartData);

  const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // const Transaction = new Transactions;
    if (selectedValue === "Yearly") {
    const datat = frvsre.getYearlyData({data});
    setChartData(datat);
    setSelectedOption(selectedValue); 
    }else if(selectedValue === "Qaterly"){
      const datat = frvsre.getQuarterlyData({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }else if(selectedValue === "Monthly"){
      const datat = frvsre.getMonthlyData({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Freehold vs Lease
          <select
            value={selectedOption}
            onChange={handelOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {Option.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          </CardTitle>
        <CardDescription>
          {"You're average more steps a day this year than last year."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          {chartData?.Freehold}
            <span className="text-sm font-normal text-muted-foreground">
              Freehold
            </span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: "Freehold",
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
                  date: selectedOption,
                  steps: chartData?.Freehold,
                },
              ]}
            >
              <Bar
                dataKey="freehold"
                fill="var(--color-steps)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="white"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="freehold" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          {chartData?.Lease}
            <span className="text-sm font-normal text-muted-foreground">
              Ready
            </span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: "Ready",
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
                  date: selectedOption,
                  steps: chartData?.Lease,
                },
              ]}
            >
              <Bar
                dataKey="commercial"
                fill="var(--color-steps)"
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
              <XAxis dataKey="lease" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

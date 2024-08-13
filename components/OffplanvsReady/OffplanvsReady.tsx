"use client"

import { useState } from "react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { OffplanvsReadyType } from "@/transcation/types"

type Timeframe = "monthly" | "quarterly" | "yearly"

function transformData(
  data: OffplanvsReadyType,
  timeframe: Timeframe,
  period: string[]
) {
  let transformedData = []

  if (timeframe === "monthly") {
    transformedData = period.map((month) => {
      const [year, monthKey] = month.split("-")
      const offplan = data[year]?.[monthKey]?.["1"] || 0
      const ready = data[year]?.[monthKey]?.["0"] || 0
      return { date: month, offplan, ready }
    })
  } else if (timeframe === "quarterly") {
    transformedData = period.map((quarter) => {
      const [year, quarterKey] = quarter.split("-")
      const quarterMonths = ["01", "04", "07", "10"]
      let offplan = 0
      let ready = 0
      quarterMonths.forEach((month) => {
        offplan += data[year]?.[month]?.["1"] || 0
        ready += data[year]?.[month]?.["0"] || 0
      })
      return { date: quarter, offplan, ready }
    })
  } else {
    transformedData = period.map((year) => {
      let offplan = 0
      let ready = 0
      Object.keys(data[year] || {}).forEach((month) => {
        offplan += data[year][month]["1"] || 0
        ready += data[year][month]["0"] || 0
      })
      return { date: year, offplan, ready }
    })
  }

  return transformedData
}

export function OffplanvsReady({ data }: { data: OffplanvsReadyType }) {

  console.log("offplan vs ready", data)
  
  const [timeframe, setTimeframe] = useState<Timeframe>("yearly")
  const [period, setPeriod] = useState<string[]>(data ? Object.keys(data).slice(-12):[])
  if(!data)return null
  
  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe)

    if (newTimeframe === "yearly") {
      setPeriod(Object.keys(data).slice(-12))
    } else if (newTimeframe === "monthly") {
      const months = []
      for (let i = 0; i < 12; i++) {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1 - i
        months.push(`${year}-${String(month).padStart(2, "0")}`)
      }
      setPeriod(months.reverse())
    } else if (newTimeframe === "quarterly") {
      const quarters = []
      const currentDate = new Date()
      for (let i = 0; i < 12; i++) {
        const year = currentDate.getFullYear()
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1 - i
        quarters.push(`${year}-Q${quarter}`)
      }
      setPeriod(quarters.reverse())
    }
  }

  const chartData = transformData(data, timeframe, period)

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Offplan vs Ready</CardTitle>
    //     <CardDescription>
    //       {`You're comparing ${timeframe} data over the last 12 periods.`}
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="grid gap-4">
    //     <div className="grid auto-rows-min gap-2">
    //       <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
    //         Offplan
    //         <span className="text-sm font-normal text-muted-foreground">
    //           vs Ready
    //         </span>
    //       </div>
    //       <div className="flex gap-4">
    //         <button onClick={() => handleTimeframeChange("monthly")}>
    //           Monthly
    //         </button>
    //         <button onClick={() => handleTimeframeChange("quarterly")}>
    //           Quarterly
    //         </button>
    //         <button onClick={() => handleTimeframeChange("yearly")}>
    //           Yearly
    //         </button>
    //       </div>
    //       <ChartContainer
    //         config={{
    //           steps: {
    //             label: "Steps",
    //             color: "#A9A1F4",
    //           },
    //         }}
    //         className="aspect-auto h-[200px] w-full"
    //       >
    //         <BarChart
    //           accessibilityLayer
    //           layout="vertical"
    //           margin={{
    //             left: 0,
    //             top: 0,
    //             right: 0,
    //             bottom: 0,
    //           }}
    //           data={chartData}
    //         >
    //           <Bar
    //             dataKey="offplan"
    //             fill="#A9A1F4"
    //             radius={4}
    //             barSize={32}
    //           >
    //             <LabelList
    //               position="insideLeft"
    //               dataKey="offplan"
    //               offset={8}
    //               fontSize={12}
    //               fill="white"
    //             />
    //           </Bar>
    //           <Bar
    //             dataKey="ready"
    //             fill="var(--color-steps)"
    //             radius={4}
    //             barSize={32}
    //           >
    //             <LabelList
    //               position="insideRight"
    //               dataKey="ready"
    //               offset={8}
    //               fontSize={12}
    //               fill="hsl(var(--muted-foreground))"
    //             />
    //           </Bar>
    //           <YAxis dataKey="date" type="category" tickCount={1} hide />
    //           <XAxis dataKey="offplan" type="number" hide />
    //         </BarChart>
    //       </ChartContainer>
    //     </div>
    //   </CardContent>
    // </Card>
    <>hello</>
  )
}

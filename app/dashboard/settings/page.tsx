"use client";
import AreaChartComponent from "@/components/chart/areachart/area";
import Barchart from "@/components/chart/barchart/barchart";
import ChartWrapper from "@/components/chart/chartWrapper";
import DualBarchart from "@/components/chart/dualbarchart/dualBarChart";
import PieChartComponent from "@/components/chart/piechart/piechart";
import { ChartConfig } from "@/components/ui/chart";
import Layout from "@/layout";
import React from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const data = [
  { name: "Dubai Marina", value: 20, colorClass: "bg-[#FFC8C8]" },
  { name: "Dubai Central", value: 12, colorClass: "bg-[#EFEEFC]" },
  { name: "Dubai East", value: 21, colorClass: "bg-[#D1F6DB]" },
  { name: "Dubai West", value: 6, colorClass: "bg-[#FCF8D1]" },
];

const chartConfig2 = {
  "Dubai Marina": { color: "#FFC8C8" },
  "Dubai Central": { color: "#EFEEFC" },
  "Dubai East": { color: "#D1F6DB" },
  "Dubai West": { color: "#FCF8D1" },
} as ChartConfig;

function SettingsPage() {
  const sampleData = [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 73 },
    { month: "May", value: 209 },
    { month: "June", value: 214 },
  ];

  const sampleData2 = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
  ];

  return (
    <Layout page="settings">
      <div className="flex flex-col gap-2 mb-20">
        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
        >
          <Barchart
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKey={"value"}
          />
        </ChartWrapper>

        <div className="w-full justify-between items-center">
          <ChartWrapper
            title="Number of Transactions"
            description="Number of transactions over time in Dubai."
            isFilter={false}
          >
            <PieChartComponent
              chartConfig={chartConfig2}
              data={data}
              dataKey="value"
              nameKey="name"
            />
            <div className="grid grid-cols-2  gap-2 w-fullpl-4">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-sm border border-secondary ${item.colorClass}`}
                  ></span>
                  <span>{item.name}</span>
                  <span className="text-secondary font-semibold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </ChartWrapper>
        </div>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <AreaChartComponent
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKey={"value"}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
        >
          <DualBarchart
            chartConfig={chartConfig}
            data={sampleData2}
            xAxisDataKey={"month"}
            yAxisDataKey1={"desktop"}
            yAxisDataKey2={"mobile"}
          />
        </ChartWrapper>
      </div>
    </Layout>
  );
}

export default SettingsPage;

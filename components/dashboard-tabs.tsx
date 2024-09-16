"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SecondaryChartWrapper from "./secondaryChartWrapper";
import Barchart from "./chart/barchart/barchart";
import { ChartConfig } from "./ui/chart";
import HorizontalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
import InsightCard from "./insightCard";

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

function DashboardTabs() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full gap-3 items-center justify-start bg-background mt-2 mb-3 p-0">
        <TabsTrigger
          value="all"
          className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="residential"
          className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
        >
          Residential
        </TabsTrigger>
        <TabsTrigger
          value="commercial"
          className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
        >
          Commercial
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className=" m-0 p-0 flex flex-col gap-4 w-full">
        <SecondaryChartWrapper title="Sale Type">
          <div className="flex flex-col gap-2 pb-4">
            <HorizontalBarChartComponent
              chartConfig={chartConfig}
              data={[
                { name: "Freehold", value: 65, fill: "#FCF8D1" },
                { name: "Lease", value: 100, fill: "#CBE5FB" },
              ]}
              xAxisDataKey={"name"}
              yAxisDataKey={"value"}
              className="max-h-[90px]"
            />
            <InsightCard className="bg-purple-50">
              This type of properties has high demand in this area and demand is
              10% higher than the overall Dubai overage.
            </InsightCard>
          </div>
        </SecondaryChartWrapper>

        <SecondaryChartWrapper title="First Sale/Re Sale">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "First Sale", value: 65, fill: "#DDF8E4" },
              { name: "Re Sale", value: 100, fill: "#EFEEFC" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[90px]"
          />
        </SecondaryChartWrapper>

        <SecondaryChartWrapper title="Property Status">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "Ready", value: 65, fill: "#DDF8E4" },
              { name: "Offplan", value: 100, fill: "#FFDBDB" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[90px]"
          />
        </SecondaryChartWrapper>

        <SecondaryChartWrapper title="Transaction Type">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "Sales", value: 65, fill: "#EFEEFC" },
              { name: "Gift", value: 100, fill: "#CBE5FB" },
              { name: "Mortgage", value: 75, fill: "#DDF8E4" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[140px]"
          />
        </SecondaryChartWrapper>

        <SecondaryChartWrapper title="Property Type">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "Ready", value: 65, fill: "#DDF8E4" },
              { name: "Shop", value: 100, fill: "#EFEEFC" },
              { name: "Gym", value: 100, fill: "#FFDBDB" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[140px]"
          />
        </SecondaryChartWrapper>

        <SecondaryChartWrapper title="No. of Bedrooms (Residential)">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "Studio", value: 65, fill: "#DDF8E4" },
              { name: "1 BHK", value: 75, fill: "#EFEEFC" },
              { name: "3 BHK", value: 85, fill: "#FCF8D1" },
              { name: "4 BHK", value: 95, fill: "#CBE5FB" },
              { name: "5 BHK +", value: 105, fill: "#E0E0E0" },
              { name: "Penthouse", value: 115, fill: "#FFDBDB" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="min-h-[280px]"
          />
        </SecondaryChartWrapper>
      </TabsContent>
    </Tabs>
  );
}

export default DashboardTabs;

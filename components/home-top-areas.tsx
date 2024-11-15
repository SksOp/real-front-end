"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs as UnderlineTabs,
  TabsContent as UnderlineTabsContent,
  TabsList as UnderlineTabsList,
  TabsTrigger as UnderlineTabsTrigger,
} from "./ui/underline-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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

const sampleData = [
  { month: "Al Warsan 1", value: 100, fill: "#FCF8D1" },
  { month: "Jabal Ali 1", value: 80, fill: "#CBE5FB" },
  { month: "Business Bay", value: 75, fill: "#FFDBDB" },
  { month: "Marsa Dubai", value: 63, fill: "#EFEEFC" },
  { month: "Al Barsha South 4", value: 60, fill: "#DDF8E4" },
  { month: "The palm jumeirah", value: 57, fill: "#FCF8D1" },
  { month: "Dubai Creek Harbour", value: 55, fill: "#CBE5FB" },
  { month: "Shobha Heartland", value: 50, fill: "#FFDBDB" },
  { month: "Marsa Dubai", value: 45, fill: "#EFEEFC" },
  { month: "Dubai Marina", value: 43, fill: "#DDF8E4" },
];

function HomeTopAreas() {
  return (
    <UnderlineTabs defaultValue="sales">
      <UnderlineTabsList className="w-full border border-border items-center justify-center rounded-t-xl gap-3 px-3">
        <UnderlineTabsTrigger
          value="sales"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Top Sales Area
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger
          value="rental"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Top Rental Area
        </UnderlineTabsTrigger>
      </UnderlineTabsList>
      <Card className="rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col gap-4">
        <UnderlineTabsContent value="sales">
          {" "}
          {/* <CardHeader className="w-full p-0">
            <CardTitle className="text-base font-semibold text-secondary">
              Top Areas (Sales)
            </CardTitle>
          </CardHeader> */}
          <CardContent className="p-0 w-full mt-2">
            <Tabs defaultValue="volume">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="volume"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Volume
                </TabsTrigger>
                <TabsTrigger
                  value="price"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  price per SQFT
                </TabsTrigger>
              </TabsList>
              <CardDescription className="truncate text-accent font-normal text-sm mb-4 mt-2">
                Compare top areas by their performances using various metrics.
                Number of transactions or price per square feet or expected
                return, we have it all covered.
              </CardDescription>
              <TabsContent value="volume" className="p-0">
                <HorizontalBarChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  yAxisDataKey={"value"}
                  className="min-h-[450px]"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="p-0 mt-3">
            <InsightCard>
              Top 10 rental areas in Dubai represent 30% of the total rental
              transactions, highlighting key demand zones.
            </InsightCard>
          </CardFooter>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          {/* <CardHeader className="w-full p-0">
            <CardTitle className="text-base font-semibold text-secondary">
              Top Areas (Rental)
            </CardTitle>
          </CardHeader> */}
          <CardContent className="p-0 w-full mt-2">
            <Tabs defaultValue="volume">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="volume"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Volume
                </TabsTrigger>
                <TabsTrigger
                  value="rent"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Unit Rent
                </TabsTrigger>
              </TabsList>
              <CardDescription className="truncate text-accent font-normal text-sm mb-4 mt-2">
                Compare top areas by their performances using various metrics.
                Number of transactions or price per square feet or expected
                return, we have it all covered.
              </CardDescription>
              <TabsContent value="volume" className="p-0">
                <HorizontalBarChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  yAxisDataKey={"value"}
                  className="min-h-[450px]"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="p-0 mt-3">
            <InsightCard>
              Top 10 rental areas in Dubai represent 30% of the total rental
              transactions, highlighting key demand zones.
            </InsightCard>
          </CardFooter>
        </UnderlineTabsContent>
      </Card>
    </UnderlineTabs>
  );
}

export default HomeTopAreas;

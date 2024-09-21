import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import HorizontalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
import { ChartConfig } from "./ui/chart";

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
    <Card className="border rounded-xl bg-background w-full p-0">
      <CardHeader className="w-full p-4 pb-2">
        <CardTitle className="text-base font-semibold text-secondary">
          Top Areas (Sales)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-0 pb-4 w-full">
        <Tabs defaultValue="volume">
          <TabsList className="w-full gap-3 items-center justify-start bg-background ">
            <TabsTrigger
              value="volume"
              className="rounded-full border border-muted text-center font-medium  text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              Volume
            </TabsTrigger>
            <TabsTrigger
              value="price"
              className="rounded-full border border-muted text-center font-medium  text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              price per SQFT
            </TabsTrigger>
          </TabsList>
          <h3 className="truncate text-accent font-normal text-base mb-4 mt-2 ml-2">
            Compare top areas by their performances using various metrics.
            Number of transactions or price per square feet or expected return,
            we have it all covered.
          </h3>
          <TabsContent value="volume" className="">
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
    </Card>
  );
}

export default HomeTopAreas;

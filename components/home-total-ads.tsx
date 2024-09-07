import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronDownCircle } from "lucide-react";
import VerticalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
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

function HomeTotalAds() {
  const data = [
    { name: "Property Finder (50%)", value: 65, fill: "#FCF8D1" },
    { name: "Bayut (50%)", value: 100, fill: "#CBE5FB" },
    { name: "Dubizzle (50%)", value: 75, fill: "#FFC8C8" },
    { name: "Others (50%)", value: 50, fill: "#EFEEFC" },
  ];
  return (
    <Card className="border-2 rounded-xl bg-background w-full p-0">
      <CardHeader className="w-full ">
        <CardTitle className="text-lg font-semibold text-secondary">
          Total Online Ads - Today (135000)
        </CardTitle>
        <h3 className="text-base text-muted-foreground truncate">
          Get a holistic view listings and property ads in the region.
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {/* <div className="flex justify-between items-center w-full gap-4 p-0"><ChevronDownCircle size={24} /></div> */}
        <VerticalBarChartComponent
          data={data}
          xAxisDataKey={"name"}
          yAxisDataKey={"value"}
          chartConfig={chartConfig}
        />
      </CardContent>
    </Card>
  );
}

export default HomeTotalAds;

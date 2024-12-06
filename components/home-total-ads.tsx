"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChevronDownCircle } from "lucide-react";
import { ChartConfig } from "./ui/chart";
import { cn } from "@/lib/utils";
import InsightCard from "./insightCard";
import HorizontalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";

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
    {
      name: "Property Finder (50%)",
      value: 65,
      fill: "#FCF8D1",
      imgUrl: "/pf.png",
    },
    { name: "Bayut (50%)", value: 90, fill: "#CBE5FB", imgUrl: "/bayut.png" },
    { name: "Dubizzle (50%)", value: 75, fill: "#FFC8C8", imgUrl: "/dub.svg" },
    { name: "Others (50%)", value: 50, fill: "#EFEEFC" },
  ];
  return (
    <Card className=" border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-7">
      <CardHeader className="w-full p-0 flex flex-col gap-1">
        <CardTitle className="text-sm font-semibold text-secondary">
          Total Online Ads - Today (135000)
        </CardTitle>
        <h3 className="text-base text-accent font-normal line-clamp-2 ">
          Get a holistic view listings and property ads in the region.
        </h3>
      </CardHeader>
      <CardContent className=" p-0">
        {/* <div className="flex justify-between items-center w-full gap-4 p-0"><ChevronDownCircle size={24} /></div> */}
        <HorizontalBarChartComponent
          data={data}
          xAxisDataKey={"name"}
          yAxisDataKey={"value"}
          chartConfig={chartConfig}
        />
      </CardContent>
      <CardFooter className=" p-0 mt-2">
        <InsightCard linkText="Explore full market index here.">
          Dubai’s top 10 areas account for 30% of total sales transactions in
          the market.
        </InsightCard>
      </CardFooter>
    </Card>
  );
}

export default HomeTotalAds;

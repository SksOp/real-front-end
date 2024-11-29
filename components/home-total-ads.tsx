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

interface DataItem {
  name: string;
  value: number;
  fill: string;
  imgUrl?: string;
}

interface HorizontalBarChartProps {
  data: DataItem[];
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value));
  return (
    <div className="flex flex-col gap-6">
      {data.map((item, idx) => (
        <div className="flex flex-col gap-0.5" key={idx}>
          <h3 className="font-medium text-secondary text-[0.688rem] mb-1">
            {item.name}
          </h3>
          <div className="flex justify-start items-center gap-2">
            <div
              className={cn(
                `h-[1.52rem] border-[1.9px] border-secondary rounded-sm max-w-[85%] bg-[${item.fill}]`
              )}
              style={{
                width: `${(item.value / maxValue) * 100}%`,
              }}
            />
            {item.imgUrl && (
              <img
                src={item.imgUrl}
                alt="logo"
                className="w-6 h-6 object-cover"
              />
            )}
            <h3 className="text-muted-foreground font-semibold text-xs">
              {item.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

function HomeTotalAds() {
  const data = [
    {
      name: "Property Finder (50%)",
      value: 65,
      fill: "#FCF8D1",
      imgUrl: "/pf.png",
    },
    { name: "Bayut (50%)", value: 100, fill: "#CBE5FB", imgUrl: "/bayut.png" },
    { name: "Dubizzle (50%)", value: 75, fill: "#FFC8C8", imgUrl: "/dub.svg" },
    { name: "Others (50%)", value: 50, fill: "#EFEEFC" },
  ];
  return (
    <Card className=" border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-7">
      <CardHeader className="w-full p-0 flex flex-col gap-1">
        <CardTitle className="text-sm font-semibold text-secondary">
          Total Online Ads - Today (135000)
        </CardTitle>
        <h3 className="text-base text-accent font-normal line-clamp-2">
          Get a holistic view listings and property ads in the region.
        </h3>
      </CardHeader>
      <CardContent className=" p-0">
        {/* <div className="flex justify-between items-center w-full gap-4 p-0"><ChevronDownCircle size={24} /></div> */}
        {/* <VerticalBarChartComponent
          data={data}
          xAxisDataKey={"name"}
          yAxisDataKey={"value"}
          chartConfig={chartConfig}
        /> */}
        <HorizontalBarChart data={data} />
      </CardContent>
      <CardFooter className=" p-0 mt-3">
        <InsightCard linkText="Explore full market index here.">
          Dubai’s top 10 areas account for 30% of total sales transactions in
          the market.
        </InsightCard>
      </CardFooter>
    </Card>
  );
}

export default HomeTotalAds;

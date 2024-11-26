"use client";
import React, { useEffect } from "react";
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
import ChartWrapper from "./chart/chartWrapper";
import { MarketPulseApi } from "@/config/utility";

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

const chartColor = [
  "#FCF8D1",
  "#CBE5FB",
  "#E5F0FF",
  "#E5FFE5",
  "#F0E5FF",
  "#FFEDE5",
  "#FFE5F0",
  "#E5FFF5",
  "#F5F5F5",
  "#EFEEFC",
];

function HomeTopAreas() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await MarketPulseApi();

      const chartData = response.map((item: any, idx: number) => {
        return {
          area: item.area_name,
          value: item.no_of_transactions,
          fill: chartColor[idx],
        };
      });
      setData(chartData);
      console.log("top: ", response);
    };
    fetchData();
  }, []);

  return (
    <ChartWrapper
      title="Top Areas"
      description="Get a holistic view listings and property ads in the region.Get a holistic view listings and property ads in the region."
    >
      <div className="flex flex-col gap-3">
        <HorizontalBarChartComponent
          chartConfig={chartConfig}
          data={data}
          xAxisDataKey={"area"}
          yAxisDataKey={"value"}
        />
        <InsightCard>
          Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum
          morbi eu elit. Neque Average price: 750000.{" "}
        </InsightCard>
      </div>
    </ChartWrapper>
  );
}

export default HomeTopAreas;

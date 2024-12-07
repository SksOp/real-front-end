"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import AreaChartComponent from "./chart/areachart/area";
import { FormatValue } from "@/utils/formatNumbers";

interface MarketPulseCardProps {
  type: "sales" | "rental";
  area_name: string;
  total_supply: number;
  avg_price: number;
  avg_price_per_sqft: number;
  no_of_transactions: number;
  monthly_transactions: any[];
}

const chartConfig = {
  xAxisDataKey: "name",
  areas: [
    {
      dataKey: "price",
      stroke: "#FFA500",
      fill: "#FFA500",
    },
  ],
};

function MarketPulseCard({
  type,
  area_name,
  total_supply,
  avg_price,
  avg_price_per_sqft,
  no_of_transactions,
  monthly_transactions,
}: MarketPulseCardProps) {
  const RenderChart = () => {
    return (
      <AreaChartComponent
        chartConfig={chartConfig}
        data={monthly_transactions}
        xAxisDataKey={"year"}
        areas={[{ yAxisDataKey: "value1" }]}
        className="min-w-full"
      />
    );
  };
  return (
    <Card className="relative border rounded-2xl bg-background w-full p-3 flex flex-col gap-3">
      <CardHeader className="p-0 flex flex-col gap-1">
        <Badge
          variant="outline"
          className="bg-[#CBE5FB] text-muted-foreground font-semibold py-1 truncate w-fit"
        >
          {area_name}
        </Badge>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/4 ">
            <h3 className="text-muted-foreground text-sm font-normal max-w-14">
              {type === "sales" ? "Total Supply" : "Total Units"}
            </h3>
            <h2 className="text-secondary/90 font-medium text-base">
              {FormatValue(total_supply)}
            </h2>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <h3 className="text-muted-foreground text-sm font-normal max-w-14">
              {type === "sales" ? "Avg Price" : "Avg Rent"}
            </h3>
            <h2 className="text-secondary/90 font-medium text-base">
              {FormatValue(avg_price)}
            </h2>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <h3 className="text-muted-foreground text-sm font-normal max-w-20">
              {type === "sales" ? "Avg Price Per sq. ft" : "Renewal Rate"}
            </h3>
            <h2 className="text-secondary/90 font-medium text-base">
              {FormatValue(avg_price_per_sqft)}
            </h2>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <h3 className="text-muted-foreground text-sm font-normal max-w-14">
              No. of Transactions
            </h3>
            <h2 className="text-secondary/90 font-medium text-base">
              {FormatValue(no_of_transactions)}
            </h2>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 ">{RenderChart()}</CardContent>
    </Card>
  );
}

export default MarketPulseCard;

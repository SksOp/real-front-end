"use client";
import React from "react";
import ExploreFormats from "./explore-formats";
import { Bar, BarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  desktop: {
    label: "Demand",
    color: "#A9A1F4",
  },
} satisfies ChartConfig;

function ExploreDemand() {
  return (
    <ExploreFormats
      title={"Demand"}
      description="Here are all the properties you have listed, switch to slaes or rental views for indepth insights of your listings and online presence."
    >
      <div>
        <h3>Rentals</h3>
      </div>
    </ExploreFormats>
  );
}

export default ExploreDemand;

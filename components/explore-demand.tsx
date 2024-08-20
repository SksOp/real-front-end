"use client";
import React from "react";
import ExploreFormats from "./explore-formats";
import HorizontalBarChart from "./chart/horixontalBarChart/horizontalBarChart";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { CardWrapper } from "./chart/card";

const chartData = [
  { name: "Rentals", value: 100 },
  { name: "Sales", value: 200 },
  { name: "Lease", value: 150 },
  { name: "Commercial", value: 190 },
];

function ExploreDemand() {
  return (
    <ExploreFormats
      title={"Demand"}
      description="Here are all the properties you have listed, switch to slaes or rental views for indepth insights of your listings and online presence."
    >
      <div>
        <h3>Rentals</h3>
        <HorizontalBarChart
          title="Rentals"
          data={chartData}
          xAxisDataKey="value"
          yAxisDataKey="name"
        />
      </div>
    </ExploreFormats>
  );
}

export default ExploreDemand;

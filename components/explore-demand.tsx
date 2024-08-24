"use client";
import React from "react";
import ExploreFormats from "./explore-formats";
import VerticalBarChartComponent from "./chart/verticalbarchart/verticalbarchart";
import { ChevronDownCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ChartWrapper from "./chart/chartWrapper";

function ExploreDemand() {
  return (
    <ChartWrapper
      title="Demand"
      description={
        "Here are all the properties you have listed, switch to slaes or rental views for indepth insights of your listings and online presence."
      }
    >
      <div className="flex justify-between items-center w-full gap-4 p-0">
        <VerticalBarChartComponent
          dataKey={""}
          value={100}
          color={"#D1F6DB"}
          selectedOption={""}
        />
        <ChevronDownCircle size={24} />
      </div>
    </ChartWrapper>
  );
}

export default ExploreDemand;

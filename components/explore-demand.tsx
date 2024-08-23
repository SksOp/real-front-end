"use client";
import React from "react";
import ExploreFormats from "./explore-formats";
import VerticalBarChartComponent from "./chart/verticalbarchart/verticalbarchart";
import { ChevronDownCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function ExploreDemand() {
  return (
    <ExploreFormats
      title={"Demand"}
      description="Here are all the properties you have listed, switch to slaes or rental views for indepth insights of your listings and online presence."
    >
      <Card className="p-0 border-0">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-medium">Rentals</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center w-full gap-4 p-0">
          <VerticalBarChartComponent
            dataKey={""}
            value={100}
            color={"#D1F6DB"}
            selectedOption={""}
          />
          <ChevronDownCircle size={24} />
        </CardContent>
      </Card>
    </ExploreFormats>
  );
}

export default ExploreDemand;

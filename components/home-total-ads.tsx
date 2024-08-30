import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronDownCircle } from "lucide-react";
import VerticalBarChartComponent from "./chart/verticalbarchart/verticalbarchart";

function HomeTotalAds() {
  return (
    <Card className="border-2 rounded-xl w-full p-0">
      <CardHeader className="w-full ">
        <CardTitle className="text-lg font-semibold text-secondary">
          Total Online Ads - Today (135000)
        </CardTitle>
        <h3 className="text-base text-muted-foreground truncate">
          Get a holistic view listings and property ads in the region.
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center w-full gap-4 p-0">
          <VerticalBarChartComponent
            dataKey={"Property Finder (50%)"}
            value={65}
            color={"#FCF8D1"}
            selectedOption={""}
          />
          <ChevronDownCircle size={24} />
        </div>
        <div className="flex justify-between items-center w-full gap-4 p-0">
          <VerticalBarChartComponent
            dataKey={"Bayut (50%)"}
            value={100}
            color={"#CBE5FB"}
            selectedOption={""}
          />
          <ChevronDownCircle size={24} />
        </div>
        <div className="flex justify-between items-center w-full gap-4 p-0">
          <VerticalBarChartComponent
            dataKey={"Dubizzle (50%)"}
            value={75}
            color={"#FFC8C8"}
            selectedOption={""}
          />
          <ChevronDownCircle size={24} />
        </div>
        <div className="flex justify-between items-center w-full gap-4 p-0">
          <VerticalBarChartComponent
            dataKey={"Others (50%)"}
            value={50}
            color={"#EFEEFC"}
            selectedOption={""}
          />
          <ChevronDownCircle size={24} />
        </div>
      </CardContent>
    </Card>
  );
}

export default HomeTotalAds;

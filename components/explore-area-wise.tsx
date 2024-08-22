import React from "react";
import ExploreFormats from "./explore-formats";
import PieChartComponent from "./chart/piechart/piechart";
import { ChartConfig } from "./ui/chart";

const data = [
  { name: "Dubai Marina", value: 20, colorClass: "bg-[#FFC8C8]" },
  { name: "Dubai Central", value: 12, colorClass: "bg-[#EFEEFC]" },
  { name: "Dubai East", value: 21, colorClass: "bg-[#D1F6DB]" },
  { name: "Dubai West", value: 6, colorClass: "bg-[#FCF8D1]" },
];

const chartConfig = {
  "Dubai Marina": { color: "#FFC8C8" },
  "Dubai Central": { color: "#EFEEFC" },
  "Dubai East": { color: "#D1F6DB" },
  "Dubai West": { color: "#FCF8D1" },
} as ChartConfig;

function ExploreAreaWise() {
  return (
    <ExploreFormats title="Area wise">
      <div className="w-full justify-between items-center">
        <PieChartComponent
          title=""
          description=""
          chartConfig={chartConfig}
          footer=""
          footerDescription=""
          data={data}
          dataKey="value"
          nameKey="name"
        />
        <div className="flex flex-col gap-2 w-1/2 pl-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className={`inline-block w-3 h-3 rounded-full ${item.colorClass}`}
              ></span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ExploreFormats>
  );
}

export default ExploreAreaWise;

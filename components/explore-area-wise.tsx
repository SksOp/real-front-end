import React from "react";
import ExploreFormats from "./explore-formats";
import PieChartContainer from "./chart/pieChart/pieChart";

const chartData = [
  { name: "Dubai Marina", value: 20, fill: "#000" },
  { name: "Dubai central", value: 12, fill: "red" },
  { name: "Dubai east", value: 21, fill: "blue" },
  { name: "Dubai west", value: 6, fill: "green" },
];

function ExploreAreaWise() {
  return (
    <ExploreFormats title="Area Wise">
      <PieChartContainer
        title={"Chart"}
        data={chartData}
        centerText={"50"}
        xAxisDataKey={"name"}
        yAxisDataKey={"value"}
      />
    </ExploreFormats>
  );
}

export default ExploreAreaWise;

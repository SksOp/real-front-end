import React from "react";
import ExploreFormats from "./explore-formats";
import InsightCard from "./insightCard";
import HorizontalBarChart from "./chart/horixontalBarChart/horizontalBarChart";

const chartData = [
  { name: "Property Finder (50%)", value: 65000 },
  { name: "Bayut (50%)", value: 100000 },
  { name: "Dubizzle (50%)", value: 75000 },
  { name: "Others (50%)", value: 50000 },
];

function ExploreTotalSales() {
  return (
    <ExploreFormats
      title="Total Sales for Today (135000)"
      description="Aliquam porta nisl dolor, molestie pellentesque"
    >
      <HorizontalBarChart
        title="Total Sales"
        data={chartData}
        xAxisDataKey={"value"}
        yAxisDataKey={"name"}
      />
      <InsightCard>
        <span>
          Total <span className="font-bold text-secondary">13500</span> Sales
          happened today. Lorem ipsum{" "}
          <span className="font-bold text-secondary">4%</span> sit amet
          consectetur. Gravida augue aliquam interdum morbi.
        </span>
      </InsightCard>
    </ExploreFormats>
  );
}

export default ExploreTotalSales;

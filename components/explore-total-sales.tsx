import React from "react";
import ExploreFormats from "./explore-formats";
import InsightCard from "./insightCard";

function ExploreTotalSales() {
  return (
    <ExploreFormats
      title="Total Sales for Today (135000)"
      description="Aliquam porta nisl dolor, molestie pellentesque"
    >
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

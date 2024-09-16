import React from "react";
import ExploreFormats from "./explore-formats";
import InsightCard from "./insightCard";
import VerticalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
import SalesIndexCardComponent from "./chart/salesIndexcard/salesIndexcard";

function ExploreListingIndex() {
  return (
    <ExploreFormats
      title={"Listing index"}
      description="See how you compare against other brokers in Dubai."
    >
      <SalesIndexCardComponent percentile25={247685} percentile75={566778} />
      <InsightCard>
        <span>
          50 listings is the top average in your area, most people tend to have
          20-40 listings, but 5o is outstanding! higher listings tend to more
          lead gen!
        </span>
      </InsightCard>
    </ExploreFormats>
  );
}

export default ExploreListingIndex;

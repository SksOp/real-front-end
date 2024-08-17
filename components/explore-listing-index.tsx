import React from "react";
import ExploreFormats from "./explore-formats";
import InsightCard from "./insightCard";

function ExploreListingIndex() {
  return (
    <ExploreFormats
      title={"Listing index"}
      description="See how you compare against other brokers in Dubai."
    >
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

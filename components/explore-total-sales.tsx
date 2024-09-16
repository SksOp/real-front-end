import React from "react";
import ExploreFormats from "./explore-formats";
import InsightCard from "./insightCard";
import VerticalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
import { ChevronDownCircle } from "lucide-react";

function ExploreTotalSales() {
  return (
    <ExploreFormats
      title="Total Sales for Today (135000)"
      description="Aliquam porta nisl dolor, molestie pellentesque"
    >
      testing...
      {/* <div className="flex flex-col gap-2">
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
      </div> */}
      {/* <InsightCard>
        <span>
          Total <span className="font-bold text-secondary">13500</span> Sales
          happened today. Lorem ipsum{" "}                    
          <span className="font-bold text-secondary">4%</span> sit amet
          consectetur. Gravida augue aliquam interdum morbi.
        </span>
      </InsightCard> */}
    </ExploreFormats>
  );
}

export default ExploreTotalSales;

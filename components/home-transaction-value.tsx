"use client";
import React, { useEffect } from "react";
import ChartWrapper from "./chart/chartWrapper";
import DonutChartComponent from "./chart/donutChart/donutChart";
import SalesIndexCardComponent from "./chart/salesIndexcard/salesIndexcard";
import ChartException from "./chartException";
import InsightCard from "./insightCard";
import SecondaryChartWrapper from "./secondaryChartWrapper";
import { SalesIndex, SalesPriceRanges } from "@/config/sales";
import { ChartDescription } from "@/config/types";

function HomeTransactionValue() {
  const [salesIndex, setSalesIndex] = React.useState<any[]>([]);
  const [priceRange, setPriceRange] = React.useState<ChartDescription>();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date().getFullYear();
      const response = await SalesIndex({ end_year: date });
      const response2 = await SalesPriceRanges({ end_year: date });
      setPriceRange(response2);
      setSalesIndex(response.data);
      console.log(response2);
    };
    fetchData();
  }, []);

  return (
    <ChartWrapper
      title="Transactions Value Index"
      description="Analyze property value trends across low, medium, and high segments with detailed price distribution. Understand the market landscape and uncover opportunities for every budget range."
    >
      <div className="flex justify-center items-stretch  gap-3">
        <SecondaryChartWrapper className="flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-between items-center gap-10 ">
            <SalesIndexCardComponent
              percentile25={salesIndex[0]}
              percentile75={salesIndex[1]}
              knob={(salesIndex[1] + salesIndex[0]) / 2}
            />
            <InsightCard>
              Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam
              interdum morbi eu elit. Neque Average price: 750000.{" "}
            </InsightCard>
          </div>
        </SecondaryChartWrapper>
        <SecondaryChartWrapper>
          {priceRange ? (
            <DonutChartComponent
              chartConfig={priceRange?.chartConfig}
              data={priceRange.data}
              dataKey="value"
              nameKey="name"
            />
          ) : (
            <ChartException />
          )}
        </SecondaryChartWrapper>
      </div>
    </ChartWrapper>
  );
}

export default HomeTransactionValue;

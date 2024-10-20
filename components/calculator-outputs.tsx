import React from "react";
import CalculatorResultCard from "./calculator-resultCard";
import CalculatorCompareCard from "./calculator-compareCard";
import { OutputField, SubChart } from "@/config/types";
import ChartWrapper from "./chart/chartWrapper";
import PieChartComponent from "./chart/pieChart/pieChart";
import { ChartConfig } from "./ui/chart";
import StackedBarchart from "./chart/stackedChart/stackedChart";
import SimilarTransaction from "./similar-transaction";
import InsightCard from "./insightCard";
import Barchart from "./chart/barchart/barchart";
import EstimationCard from "./estimationCard";
import AreaChartComponent from "./chart/areachart/area";

interface CalculatorOutputsProps {
  type: string;
  title: string;
  secondary_output?: OutputField;
  value: any;
  chartConfig?: ChartConfig;
  subChart?: SubChart[];
  secondaryValue?: number;
  percentage?: number;
}

function CalculatorOutputs({
  type,
  title,
  secondary_output,
  value,
  secondaryValue = 0,
  chartConfig,
  subChart,
  percentage,
}: CalculatorOutputsProps) {
  switch (type) {
    case "metric":
      return (
        <CalculatorResultCard
          title={title}
          value={value}
          percentage={percentage}
        />
      );

    case "comparison":
      return (
        <CalculatorCompareCard
          title1={title}
          title2={secondary_output?.label ?? ""}
          value1={value}
          value2={secondaryValue}
        />
      );

    case "estimationCard":
      return (
        <EstimationCard title={title} value={value} confidenceLevel={80} />
      );
    case "pie_chart":
      console.log(value);
      return (
        <ChartWrapper title={title}>
          <PieChartComponent
            data={value}
            dataKey="value"
            nameKey="name"
            chartConfig={chartConfig}
          />
        </ChartWrapper>
      );

    case "stacked_bar_chart":
      return (
        <ChartWrapper title={title}>
          <StackedBarchart
            data={value}
            chartConfig={chartConfig}
            xAxisDataKey="year"
            yAxisDataKeys={["principal", "interest"]}
          />
        </ChartWrapper>
      );

    case "table":
      return <ChartWrapper title={title}></ChartWrapper>;

    case "bar_chart":
      return (
        <ChartWrapper title={title}>
          <Barchart
            data={value}
            chartConfig={chartConfig}
            xAxisDataKey="category"
            yAxisDataKeys={["value"]}
            showInsideLabel={true}
          />
        </ChartWrapper>
      );

    case "line_chart":
      return (
        <ChartWrapper title={title}>
          <AreaChartComponent
            data={value}
            chartConfig={chartConfig}
            xAxisDataKey="year"
            areas={[
              { yAxisDataKey: "rental_income", areaColor: "#8177E5" },
              {
                yAxisDataKey: "capital_appreciation",
                areaColor: "#121212",
              },
            ]}
            tickFormatter={(value) => value.toString()}
          />
        </ChartWrapper>
      );

    case "insights":
      return <InsightCard>{value}</InsightCard>;
  }
}

export default CalculatorOutputs;

"use client";
import React, { useState } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import HomeAffordibilityCalculator from "./home-affordibility-calculator";
import ChartException from "./chartException";

interface CalculatorOutputsProps {
  type: string;
  title: string;
  secondary_output?: OutputField;
  value: any;
  chartConfig?: ChartConfig;
  subChart?: SubChart[];
  secondaryValue?: number;
  percentage?: number;
  output?: any;
}

function CalculatorOutputs({
  type,
  title,
  secondary_output,
  value,
  secondaryValue = 0,
  chartConfig,
  subChart,
  output,
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

    case "variable_output":
      console.log("variable_output", output);
      return <HomeAffordibilityCalculator inputs={output} />;

    case "estimationCard":
      console.log(output.confidenceLevel);
      return (
        <EstimationCard
          title={title}
          value={value}
          confidenceLevel={output?.confidenceLevel}
        />
      );

    case "pie_chart":
      console.log("output", value);

      return (
        <ChartWrapper title={title}>
          {value?.length === 0 ? (
            <ChartException />
          ) : (
            <PieChartComponent
              data={value}
              dataKey="value"
              nameKey="name"
              chartConfig={chartConfig}
            />
          )}
        </ChartWrapper>
      );

    case "stacked_bar_chart":
      console.log("stacked_bar_chart", value);
      const keys = Object.keys(value[0]);
      return (
        <ChartWrapper title={title}>
          <StackedBarchart
            data={value}
            chartConfig={chartConfig}
            xAxisDataKey={keys[0]}
            lineKey={keys[3]}
            line={true}
            yAxisDataKeys={[keys[1], keys[2]]}
          />
        </ChartWrapper>
      );

    case "table":
      console.log(value);
      return <SimilarTransaction data={value.data} columns={value.columns} />;

    case "bar_chart":
      console.log(chartConfig);
      return (
        <ChartWrapper title={title}>
          {value?.length === 0 ? (
            <ChartException />
          ) : (
            <Barchart
              data={value}
              chartConfig={chartConfig}
              xAxisDataKey="category"
              yAxisDataKeys={["value"]}
              showInsideLabel={true}
            />
          )}
        </ChartWrapper>
      );

    case "line_chart":
      console.log("line_chart", value);
      return (
        <ChartWrapper title={title}>
          {value?.length === 0 ? (
            <ChartException />
          ) : (
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
          )}
        </ChartWrapper>
      );

    case "insights":
      return <InsightCard>{value}</InsightCard>;
  }
}

export default CalculatorOutputs;

"use client";
import React, { use, useEffect, useState } from "react";
import HorizontalBarChartComponent from "./chart/horizontalbarchart/horizontalbarchart";
import Barchart from "./chart/barchart/barchart";
import { ChartConfig } from "./ui/chart";
import AreaChartComponent from "./chart/areachart/area";
import DonutChartComponent from "./chart/donutChart/donutChart";
import SalesIndexCardComponent from "./chart/salesIndexcard/salesIndexcard";
import ChartWrapper from "./chart/chartWrapper";
import SimilarTransaction from "./similar-transaction";
import ChartException from "./chartException";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import SecondaryChartWrapper from "./secondaryChartWrapper";

interface DashboardChartsProps {
  type: string;
  title: string;
  description?: string;
  viewAll?: boolean;
  chartConfig: ChartConfig;
  data: any;
  columns?: string[];
  filters?: any[];
  otherInfo?: number | string;
  subCharts?: any[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  type,
  title,
  description,
  viewAll,
  chartConfig,
  data,
  columns = [],
  filters,
  otherInfo,
  subCharts,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(
    filters ? filters[0] : null
  );

  const renderChart = (
    type: string,
    data: any[],
    chartConfig: ChartConfig,
    selectedFilter?: any,
    columns?: string[]
  ) => {
    switch (type) {
      case "horizontal_bar":
        return (
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={data}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[140px]"
          />
        );
      case "bar":
        return (
          <Barchart
            chartConfig={chartConfig}
            data={selectedFilter?.data ?? data}
            xAxisDataKey={"year"}
            yAxisDataKeys={["value"]}
          />
        );
      case "line":
        return (
          <AreaChartComponent
            chartConfig={chartConfig}
            data={selectedFilter?.data ?? data}
            xAxisDataKey="year"
            areas={[{ yAxisDataKey: "value1" }]}
            tickFormatter={(value) => value.toString()}
          />
        );
      case "donut":
        console.log("donut", data);
        return (
          <DonutChartComponent
            chartConfig={chartConfig}
            data={data}
            dataKey="value"
            nameKey="name"
          />
        );
      case "sales_index":
        return (
          <SalesIndexCardComponent
            percentile25={247685}
            percentile75={566778}
          />
        );
      case "table":
        return (
          <SimilarTransaction
            data={data}
            columns={columns ?? []}
            headerValue={String(otherInfo)}
            headerText="Average sales price"
          />
        );

      default:
        return <ChartException />;
    }
  };

  return (
    <ChartWrapper title={title} description={description} viewAll={viewAll}>
      {filters && filters.length > 0 && (
        <Tabs defaultValue={filters[0]}>
          <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-4">
            {filters?.map((filter) => (
              <TabsTrigger
                value={filter}
                key={filter?.key}
                onClick={() => setSelectedFilter(filter)}
                className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
              >
                {filter?.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {renderChart(type, data, chartConfig, selectedFilter, columns)}
      <div className="flex flex-col gap-3 mt-4">
        {subCharts?.map((chart) => (
          <SecondaryChartWrapper key={chart.key} title={chart.name}>
            {renderChart(chart.chart_type, chart.data, chart.chartConfig)}
          </SecondaryChartWrapper>
        ))}
      </div>
    </ChartWrapper>
  );
};

export default DashboardCharts;

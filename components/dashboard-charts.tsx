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
import PriceChangesTable from "./price-changes-table";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import InsightCard from "./insightCard";
import StackedBarchart from "./chart/stackedChart/stackedChart";

interface DashboardChartsProps {
  dashboardType: "sales" | "rental" | null;
  type: string;
  title: string;
  description?: string;
  viewAll?: boolean;
  chartConfig: ChartConfig;
  data: any;
  columns?: string[];
  filters?: any[];
  otherInfo?: { name: string; value: string }[];
  subCharts?: any[];
  insights?: string;
  className?: ClassValue;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  dashboardType,
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
  insights,
  className,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(
    filters?.[0]?.key ?? null
  );
  const [subChartFilter, setSubChartFilter] = useState(
    subCharts && subCharts?.length > 0 && subCharts[0].filters?.length > 0
      ? subCharts[0].filters[0].key
      : null
  );

  useEffect(() => {
    setSelectedFilter(filters?.[0]?.key ?? null);
  }, [data, filters]);

  const getSelectedFilterData = () => {
    return (
      filters?.find((filter) => filter.key === selectedFilter)?.data ?? data
    );
  };

  const renderChart = (
    type: string,
    data: any[],
    chartConfig: ChartConfig,
    selectedFilter?: any,
    columns?: string[],
    className?: ClassValue
  ) => {
    if (data?.length === 0 || !data) {
      return <ChartException />;
    }

    switch (type) {
      case "horizontal_bar":
        return (
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={data}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
          />
        );
      case "bar":
        return (
          <Barchart
            chartConfig={chartConfig}
            data={selectedFilter?.data ?? data}
            xAxisDataKey={"year"}
            yAxisDataKeys={["value"]}
            showXAxis={otherInfo && otherInfo[0]?.value === "true"}
          />
        );

      case "dual_bar":
        return (
          <Barchart
            chartConfig={chartConfig}
            data={selectedFilter?.data ?? data}
            xAxisDataKey={"year"}
            yAxisDataKeys={["value1", "value2"]}
          />
        );

      case "stacked_bar":
        return (
          <StackedBarchart
            chartConfig={chartConfig}
            data={selectedFilter?.data ?? data}
            xAxisDataKey={"month"}
            yAxisDataKeys={["offplan", "ready"]}
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
      case "percentile_bar":
        return (
          <SalesIndexCardComponent
            percentile25={data[0]}
            percentile75={data[1]}
          />
        );
      case "table":
        return (
          <SimilarTransaction
            data={data}
            columns={columns ?? []}
            headerValue={otherInfo && otherInfo[0]?.value}
            headerText={otherInfo && otherInfo[0]?.name}
            headerValue2={otherInfo && otherInfo[1]?.value}
            headerText2={otherInfo && otherInfo[1]?.name}
          />
        );
      case "comparison_table":
        return (
          <PriceChangesTable
            data={data}
            selectedRow={selectedFilter}
            type={dashboardType || "sales"}
          />
        );

      default:
        return <ChartException />;
    }
  };

  return (
    <ChartWrapper
      title={title}
      description={description}
      viewAll={viewAll}
      className={cn("", className)}
    >
      {filters && filters.length > 0 && (
        <Tabs defaultValue={selectedFilter} key={selectedFilter}>
          <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-4">
            {filters.map((filter) => (
              <TabsTrigger
                value={filter.key}
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      <div className="overflow-scroll">
        {renderChart(
          type,
          getSelectedFilterData(),
          chartConfig,
          selectedFilter,
          columns,
          className
        )}
      </div>

      {subCharts &&
        subCharts.length > 0 &&
        subCharts[0]?.filters?.length > 0 && (
          <Tabs defaultValue={subChartFilter} key={subChartFilter}>
            <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mt-4">
              {subCharts[0]?.filters.map((filter: any) => (
                <TabsTrigger
                  value={filter.key}
                  key={filter.key}
                  onClick={() => setSubChartFilter(filter.key)}
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 mb-2">
        {subCharts?.map((chart, idx, arr) => {
          const filterData = chart.filters?.find(
            (f: any) => f.key === subChartFilter
          )?.data;

          return (
            <SecondaryChartWrapper
              key={chart.key}
              title={
                chart.key === "rooms"
                  ? subChartFilter === "commercial"
                    ? "Property Sub Type"
                    : "Rooms"
                  : chart.name
              }
              className={cn(
                "overflow-scroll ",
                arr.length % 2 !== 0 && idx === arr.length - 1
                  ? "col-span-2"
                  : ""
              )}
            >
              {renderChart(
                chart.chart_type,
                filterData || chart.data,
                chart.chartConfig,
                selectedFilter,
                columns,
                chart.styles
              )}
            </SecondaryChartWrapper>
          );
        })}
      </div>
      {insights && <InsightCard>{insights}</InsightCard>}
    </ChartWrapper>
  );
};

export default DashboardCharts;

import React from "react";
import { ChartConfig } from "./ui/chart";
import { ClassValue } from "clsx";
import Barchart from "./chart/barchart/barchart";
import AreaChartComponent from "./chart/areachart/area";
import SalesIndexCardComponent from "./chart/salesIndexcard/salesIndexcard";
import SimilarTransaction from "./similar-transaction";
import PriceChangesTable from "./price-changes-table";
import ChartException from "./chartException";
import ChartWrapper from "./chart/chartWrapper";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import DonutChartComponent from "./chart/donutChart/donutChart";

interface TransactionInsightsChartProps {
  dashboardType: "sales" | "rental" | null;
  type: string;
  title: string;
  description?: string;
  viewAll?: boolean;
  chartConfig: ChartConfig;
  data: any;
  columns?: string[];
  filters?: any[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  otherInfo?: { name: string; value: string }[];
  className?: ClassValue;
}

function TransactionInsightsChart({
  dashboardType,
  type,
  title,
  description,
  chartConfig,
  data,
  columns = [],
  selectedFilter,
  setSelectedFilter,
  otherInfo,
  className,
}: TransactionInsightsChartProps) {
  const renderChart = (
    type: string,
    data: any[],
    chartConfig: ChartConfig,
    columns?: string[],
    className?: ClassValue
  ) => {
    if (data?.length === 0 || !data) {
      return <ChartException />;
    }
    switch (type) {
      case "bar":
        return (
          <Barchart
            chartConfig={chartConfig}
            data={data}
            xAxisDataKey={"year"}
            yAxisDataKeys={["value"]}
          />
        );

      case "line":
        return (
          <AreaChartComponent
            chartConfig={chartConfig}
            data={data}
            xAxisDataKey="year"
            areas={[{ yAxisDataKey: "value1" }]}
            tickFormatter={(value) => value.toString()}
          />
        );

      case "percentile_bar":
        return (
          <SalesIndexCardComponent
            percentile25={data[0]}
            percentile75={data[1]}
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

      case "table":
        console.log("table", columns);
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
            selectedRow={3}
            type={dashboardType || "sales"}
          />
        );

      default:
        return <ChartException />;
    }
  };

  return (
    <ChartWrapper title={title} description={description}>
      <Tabs
        value={selectedFilter}
        onValueChange={(value: string) => setSelectedFilter(value)}
      >
        <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-4">
          <TabsTrigger
            value={"sales"}
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value={"rental"}
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Rental
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {renderChart(type, data, chartConfig, columns, className)}
    </ChartWrapper>
  );
}

export default TransactionInsightsChart;

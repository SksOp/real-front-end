"use client";
import AreaChartComponent from "@/components/chart/areachart/area";
import Barchart from "@/components/chart/barchart/barchart";
import ChartWrapper from "@/components/chart/chartWrapper";
import DualBarchart from "@/components/chart/dualbarchart/dualBarChart";
import HorizontalBarChartComponent from "@/components/chart/horizontalbarchart/horizontalbarchart";
import LineChartComponent from "@/components/chart/lineChart/lineChart";
import PieChartComponent from "@/components/chart/piechart/piechart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import Feedback from "@/components/feedback";
import MatrixRow from "@/components/matrix-row";
import PriceChangesTable from "@/components/price-changes-table";
import SimilarTransaction from "@/components/similar-transaction";
import TransactionTable from "@/components/transactionTable";
import { ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import Layout from "@/layout";
import React from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const data = [
  { name: "Dubai Marina", value: 20, colorClass: "bg-[#FFC8C8]" },
  { name: "Dubai Central", value: 12, colorClass: "bg-[#EFEEFC]" },
  { name: "Dubai East", value: 21, colorClass: "bg-[#D1F6DB]" },
  { name: "Dubai West", value: 6, colorClass: "bg-[#FCF8D1]" },
];

const chartConfig2 = {
  "Dubai Marina": { color: "#FFC8C8" },
  "Dubai Central": { color: "#EFEEFC" },
  "Dubai East": { color: "#D1F6DB" },
  "Dubai West": { color: "#FCF8D1" },
} as ChartConfig;

function SettingsPage() {
  const sampleData = [
    { month: "January", value: 186, fill: "#FCF8D1" },
    { month: "February", value: 305, fill: "#CBE5FB" },
    { month: "March", value: 237, fill: "#FFDBDB" },
    { month: "April", value: 73, fill: "#EFEEFC" },
    { month: "May", value: 209, fill: "#DDF8E4" },
  ];

  const sampleData2 = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
  ];

  return (
    <Layout page="settings">
      <div className="flex flex-col m-4 gap-2 mb-20">
        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
        >
          <Barchart
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKeys={["value"]}
          />
        </ChartWrapper>

        <div className="w-full justify-between items-center">
          <ChartWrapper
            title="Number of Transactions"
            description="Number of transactions over time in Dubai."
            isFilter={false}
          >
            <PieChartComponent
              chartConfig={chartConfig2}
              data={data}
              dataKey="value"
              nameKey="name"
            />
            {/* <div className="grid grid-cols-2  gap-2 w-full pl-4">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-sm border border-secondary ${item.colorClass}`}
                  ></span>
                  <span>{item.name}</span>
                  <span className="text-secondary font-semibold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div> */}
          </ChartWrapper>
        </div>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <AreaChartComponent
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKey={"value"}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
        >
          <Barchart
            chartConfig={chartConfig}
            data={sampleData2}
            xAxisDataKey={"month"}
            yAxisDataKeys={["desktop", "mobile"]}
            referance="Average"
            referanceValue={150}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <SalesIndexCardComponent
            percentile25={50}
            percentile75={150}
            knob={25}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <LineChartComponent
            chartConfig={chartConfig}
            data={[
              { month: "January", value1: 186, value2: 80 },
              { month: "February", value1: 305, value2: 200 },
              { month: "March", value1: 237, value2: 120 },
              { month: "April", value1: 73, value2: 190 },
              { month: "May", value1: 209, value2: 130 },
              { month: "June", value1: 214, value2: 140 },
            ]}
            xAxisDataKey="month"
            yAxisDataKey="value1"
            lines={[
              { dataKey: "value1", color: "#B6B1F0" },
              { dataKey: "value2", color: "#121212" },
            ]}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <LineChartComponent
            chartConfig={chartConfig}
            data={[
              { month: "January", value1: 186 },
              { month: "February", value1: 305 },
              { month: "March", value1: 237 },
              { month: "April", value1: 73 },
              { month: "May", value1: 209 },
              { month: "June", value1: 214 },
            ]}
            xAxisDataKey="month"
            yAxisDataKey="value1"
            lines={[{ dataKey: "value1", color: "#B6B1F0" }]}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <Barchart
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKeys={["value"]}
            showXAxis={false}
          />
        </ChartWrapper>

        <ChartWrapper
          title="Number of Transactions"
          description="Number of transactions over time in Dubai."
          isFilter={false}
        >
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={sampleData}
            xAxisDataKey={"month"}
            yAxisDataKey={"value"}
          />
          <MatrixRow />
        </ChartWrapper>

        <SimilarTransaction />

        <PriceChangesTable selectedRow={2} />
        <Feedback />
      </div>
    </Layout>
  );
}

export default SettingsPage;

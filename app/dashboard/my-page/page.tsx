"use client";
import AreaChartComponent from "@/components/chart/areachart/area";
import Barchart from "@/components/chart/barchart/barchart";
import ChartWrapper from "@/components/chart/chartWrapper";
import HorizontalBarChartComponent from "@/components/chart/horizontalbarchart/horizontalbarchart";
import LineChartComponent from "@/components/chart/lineChart/lineChart";
import PieChartComponent from "@/components/chart/piechart/piechart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import DashboardTabs from "@/components/dashboard-tabs";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import HomeTransactionCard from "@/components/home-transaction-card";
import InsightCard from "@/components/insightCard";
import MatrixCard from "@/components/matrix-card";
import PriceChangesTable from "@/components/price-changes-table";
import SecondaryChartWrapper from "@/components/secondaryChartWrapper";
import SimilarTransaction from "@/components/similar-transaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
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

const chartConfig2 = {
  "Dubai Marina": { color: "#FFC8C8" },
  "Dubai Central": { color: "#EFEEFC" },
  "Dubai East": { color: "#D1F6DB" },
  "Dubai West": { color: "#FCF8D1" },
} as ChartConfig;

const chartConfig3 = {
  Residential: { color: "#FFDBDB" },
  Commercial: { color: "#DDF8E4" },
} as ChartConfig;

const data = [
  { name: "Dubai Marina", value: 20, colorClass: "bg-[#FFC8C8]" },
  { name: "Dubai Central", value: 12, colorClass: "bg-[#EFEEFC]" },
  { name: "Dubai East", value: 21, colorClass: "bg-[#D1F6DB]" },
  { name: "Dubai West", value: 6, colorClass: "bg-[#FCF8D1]" },
];

const sampleData1 = [
  { year: "2018", value: 28 },
  { year: "2019", value: 39 },
  { year: "2020", value: 18 },
  { year: "2021", value: 35 },
  { year: "2022", value: 30 },
  { year: "2023", value: 34 },
  { year: "2024", value: 32 },
];

function MyPage() {
  const matrixData = [
    { title: "Average Rental Value", value: "120 K", growth: -21 },
    { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
    { title: "Total Value", value: "165 K", growth: 21 },
    { title: "No of Transactions", value: "20", growth: -21 },
  ];

  return (
    <>
      <Filters />
      <div className="mx-3 my-4 mt-20 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-3 w-full">
          {matrixData.map((item, index) => (
            <MatrixCard
              key={index}
              title={item.title}
              value={item.value}
              growth={item.growth}
            />
          ))}
        </div>
        <SecondaryChartWrapper title="Transaction Type">
          <HorizontalBarChartComponent
            chartConfig={chartConfig}
            data={[
              { name: "Cash", value: 90, fill: "#DDF8E4" },
              { name: "Mortgage", value: 30, fill: "#EFEEFC" },
              { name: "Gifts", value: 20, fill: "#FFDBDB" },
            ]}
            xAxisDataKey={"name"}
            yAxisDataKey={"value"}
            className="max-h-[140px]"
          />
        </SecondaryChartWrapper>
        <ChartWrapper
          title="Transactions Value Trend"
          description="Compare transactional total value and value per sqft over time."
          filters={["Total Value", "Value per SQFT"]}
        >
          <div className="flex flex-col gap-2">
            <Barchart
              chartConfig={chartConfig}
              data={sampleData1}
              xAxisDataKey={"year"}
              yAxisDataKeys={["value"]}
            />
            <InsightCard className="bg-purple-50">
              Lorem ipsum <span className="font-bold">4%</span> sit amet
              consectetur. Gravida augue aliquam interdum morbi eu elit. Neque
              <br />
              Average price: <span className="font-bold">750000.</span>
            </InsightCard>
          </div>
        </ChartWrapper>
        <ChartWrapper
          title="Sales Transactions Trend"
          description="Compare number of transactions over time!"
          filters={["Monthly", "Quarterly", "Yearly"]}
        >
          <div className="flex flex-col gap-2">
            <AreaChartComponent
              chartConfig={chartConfig}
              data={[
                { month: "January", value1: 186 },
                { month: "March", value1: 305 },
                { month: "May", value1: 237 },
                { month: "Jul", value1: 73 },
                { month: "Sep", value1: 209 },
                { month: "Dec", value1: 214 },
              ]}
              xAxisDataKey="month"
              yAxisDataKey="value1"
            />
            <InsightCard className="bg-purple-50">
              This type of properties has high demand in this area and demand is
              10% higher than the overall Dubai overage.
            </InsightCard>
          </div>
        </ChartWrapper>

        <ChartWrapper
          title="Sales Index"
          description="This is overall sales value index in Dubai."
          viewAll={true}
        >
          <div className="flex flex-col gap-2">
            <SalesIndexCardComponent
              percentile25={247685}
              percentile75={566778}
            />
            <InsightCard className="bg-purple-50">
              Above chart indicates that most properties sold in Dubai ranges
              between 2.4 Million to 5.6 Million. Average price:{" "}
              <span className="font-bold">750000.</span>
            </InsightCard>
            <PieChartComponent
              chartConfig={chartConfig2}
              data={data}
              dataKey="value"
              nameKey="name"
            />
          </div>
        </ChartWrapper>
        <SimilarTransaction />
        <Card>
          <CardHeader className="flex flex-row justify-between items-center text-center p-4 w-full ">
            <h3 className="text-lg font-semibold text-secondary">
              Price Comparison
            </h3>
            <h3 className="text-base font-semibold text-primary">View all</h3>
          </CardHeader>
          <CardContent className="px-4 py-0 pb-4 w-full">
            <PriceChangesTable selectedRow={2} />
          </CardContent>
        </Card>

        <ChartWrapper
          title="Sales segmentation"
          description="Compare sales segmentation across residential and commercial."
        >
          <div className="flex flex-col gap-2">
            <PieChartComponent
              chartConfig={chartConfig3}
              data={[
                { name: "Residential", value: 30, colorClass: "bg-[#FFDBDB]" },
                { name: "Commercial", value: 20, colorClass: "bg-[#DDF8E4]" },
              ]}
              dataKey="value"
              nameKey="name"
            />
            <DashboardTabs />
          </div>
        </ChartWrapper>

        <Feedback />
      </div>
    </>
  );
}

export default MyPage;

"use client";
import AreaChartComponent from "@/components/chart/areachart/area";
import Barchart from "@/components/chart/barchart/barchart";
import ChartWrapper from "@/components/chart/chartWrapper";
import HorizontalBarChartComponent from "@/components/chart/horizontalbarchart/horizontalbarchart";
import LineChartComponent from "@/components/chart/lineChart/lineChart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import DashboardTabs from "@/components/dashboard-tabs";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import HomeTransactionCard from "@/components/home-transaction-card";
import InsightCard from "@/components/insightCard";
import MatrixCard from "@/components/matrix-card";
import PriceChangesTable from "@/components/price-changes-table";
import SimilarTransaction from "@/components/similar-transaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import Layout from "@/layout";
import React from "react";
import DonutChartComponent from "@/components/chart/donutChart/donutChart";
import { Pie } from "recharts";
import PieChartComponent from "@/components/chart/pieChart/pieChart";

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
      <div className="bg-gradient-to-b from-background to-[#FAFAFA] px-3 mb-4 mt-16 flex flex-col gap-3">
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
        {/* <ChartWrapper title="Transaction Type" description="">
          <St />
        </ChartWrapper> */}
        <ChartWrapper title="Transaction Type" description="">
          <PieChartComponent
            chartConfig={chartConfig2}
            data={data}
            dataKey="value"
            nameKey="name"
          />
        </ChartWrapper>
        <ChartWrapper title="Transaction Type" description="">
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
        </ChartWrapper>
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
                { month: "January", value1: 10 },
                { month: "March", value1: 20 },
                { month: "May", value1: 30 },
                { month: "Jul", value1: 20 },
                { month: "Sep", value1: 10 },
                { month: "Dec", value1: 30 },
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
          <div className="flex flex-col gap-4">
            <SalesIndexCardComponent
              percentile25={247685}
              percentile75={566778}
            />
            <InsightCard className="bg-purple-50">
              Above chart indicates that most properties sold in Dubai ranges
              between 2.4 Million to 5.6 Million. Average price:{" "}
              <span className="font-bold">750000.</span>
            </InsightCard>
            <DonutChartComponent
              chartConfig={chartConfig2}
              data={data}
              dataKey="value"
              nameKey="name"
            />
          </div>
        </ChartWrapper>
        <ChartWrapper title="Similar Transactions" viewAll={true}>
          <SimilarTransaction
            columns={["Date", "Sell Price", "Area (ft)"]}
            data={[
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
              {
                Date: "17/Jun/24",
                "Sell Price": "750,000",
                "Area (ft)": "494",
              },
            ]}
            headerText="Average sales price"
            headerValue={"2345678"}
          />
        </ChartWrapper>
        <ChartWrapper title="Price Comparison" viewAll={true}>
          <PriceChangesTable selectedRow={2} />
        </ChartWrapper>

        <ChartWrapper
          title="Sales segmentation"
          description="Compare sales segmentation across residential and commercial."
        >
          <div className="flex flex-col gap-2">
            <DonutChartComponent
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

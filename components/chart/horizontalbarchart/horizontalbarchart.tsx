"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface HorizontalBarChartComponentProps {
  chartConfig: any;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
}

const HorizontalBarChartComponent: React.FC<
  HorizontalBarChartComponentProps
> = ({ chartConfig, data, xAxisDataKey, yAxisDataKey }) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          right: 30,
        }}
      >
        <YAxis
          dataKey={xAxisDataKey}
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey={yAxisDataKey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey={yAxisDataKey}
          layout="vertical"
          stroke={"#121212"}
          radius={4}
          barSize={30}
          spacing={20}
        >
          <LabelList
            dataKey={xAxisDataKey}
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={14}
          />
          <LabelList
            dataKey={yAxisDataKey}
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default HorizontalBarChartComponent;

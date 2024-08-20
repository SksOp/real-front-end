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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardWrapper } from "../card";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

interface HorizontalBarChartProps {
  title: string;
  data: any;
  xAxisDataKey: string;
  yAxisDataKey: string;
  barColor?: string;
  barRadius?: number;
  gridStroke?: string;
  tickColor?: string;
  tickFontSize?: string;
  tickFormatter?: (value: any) => string;
  tooltipContent?: React.ReactElement;
  tickLine?: boolean;
  tickMargin?: number;
  axisLine?: boolean;
  customBarProps?: Record<string, any>;
  customXAxisProps?: Record<string, any>;
  customYAxisProps?: Record<string, any>;
  customGridProps?: Record<string, any>;
  customTooltipProps?: Record<string, any>;
}

export default function HorizontalBarChart({
  title,
  data,
  xAxisDataKey,
  yAxisDataKey,
  barColor = "var(--color-desktop)",
  barRadius = 4,
  gridStroke = "var(--color-label)",
  tickColor = "var(--color-label)",
  tickFontSize = "12px",
  tickFormatter = (value) => value.slice(0, 3),
  tooltipContent = <ChartTooltipContent indicator="line" />,
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  customBarProps = {},
  customXAxisProps = {},
  customYAxisProps = {},
  customGridProps = {},
  customTooltipProps = {},
}: HorizontalBarChartProps) {
  return (
    <CardWrapper title={title} chartConfig={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey={yAxisDataKey}
          type={"category"}
          tickLine={tickLine}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey={xAxisDataKey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey={xAxisDataKey}
          layout="vertical"
          fill="var(--color-desktop)"
          radius={4}
        >
          <LabelList
            dataKey={yAxisDataKey}
            position={"insideLeft"}
            offset={8}
            className="fill-foreground text-secondary text-left"
            fontSize={14}
          />

          <LabelList
            dataKey={xAxisDataKey}
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </CardWrapper>
  );
}

"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LabelPosition } from "recharts/types/component/Label";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface HorizontalBarChartComponentProps {
  chartConfig: any;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  position?: LabelPosition;
  className?: ClassValue;
}

const HorizontalBarChartComponent: React.FC<
  HorizontalBarChartComponentProps
> = ({
  chartConfig,
  data,
  xAxisDataKey,
  yAxisDataKey,
  position,
  className,
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("min-h-full w-full", className)}
    >
      <ResponsiveContainer className="h-full">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            right: 30,
            left: 10,
          }}
          barCategoryGap={30}
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
            spacing={40}
          >
            <LabelList
              dataKey={xAxisDataKey}
              position={position ?? "insideLeft"}
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
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default HorizontalBarChartComponent;

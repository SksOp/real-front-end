"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
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
  chartConfig: ChartConfig;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  position?: LabelPosition;
  className?: ClassValue;
  minBarLength?: number; // New prop to set minimum bar length
}

const formatYAxisTick = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(0) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "K";
  } else {
    return value.toString();
  }
};

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
  const maxDataValue = Math.max(...data.map((item) => item[yAxisDataKey]));
  const minDataValue = Math.min(...data.map((item) => item[yAxisDataKey]));

  return (
    <ChartContainer config={chartConfig} className={cn(" w-full", className)}>
      <ResponsiveContainer>
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            right: 30,
            left: 10,
          }}
          barCategoryGap={10}
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

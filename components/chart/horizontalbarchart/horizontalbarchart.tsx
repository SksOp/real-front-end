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
  minBarLength?: number; // Minimum bar length for display
  maxBarLength?: number; // Maximum bar length for display
}

const formatValue = (value: number): string => {
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
  minBarLength = 25,
  maxBarLength = 100, // Define a maximum bar length to limit extreme values
}) => {
  // Determine max and min values of the original y-axis data
  // const maxDataValue = Math.max(...data.map((item) => item[yAxisDataKey]));
  // const minDataValue = Math.min(...data.map((item) => item[yAxisDataKey]));

  // const isUniformData = maxDataValue === minDataValue;

  // // Apply linear normalization or set a fixed value if all data is uniform
  // const normalizedData = data.map((item) => {
  //   const value = item[yAxisDataKey];
  //   const normalizedValue = isUniformData
  //     ? minBarLength // Set to minBarLength if all values are the same
  //     : ((value - minDataValue) / (maxDataValue - minDataValue)) *
  //         (maxBarLength - minBarLength) +
  //       minBarLength; // Scale to fit within min and max range

  //   return {
  //     ...item,
  //     normalizedValue, // Normalized bar length for display
  //   };
  // });
  const chartHeight = 40 * data.length;
  console.log(className);

  return (
    <ChartContainer config={chartConfig} className={cn("w-full ", className)}>
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
          barGap={10}
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
          <XAxis type="number" hide />
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
            {/* Label for category name */}
            <LabelList
              dataKey={xAxisDataKey}
              position={position ?? "insideLeft"}
              offset={8}
              className="fill-[--color-label]"
              fontSize={14}
            />
            {/* Label for original value */}
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

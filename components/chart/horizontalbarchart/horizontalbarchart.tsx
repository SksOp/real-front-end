"use client";

import { Info, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  LabelProps,
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
import { Tooltip } from "@/components/ui/tooltip";
import { FormatValue } from "@/utils/formatNumbers";
import { Label } from "@/components/ui/label";

interface HorizontalBarChartComponentProps {
  chartConfig: ChartConfig;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  position?: LabelPosition;
  className?: ClassValue;
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
  customGridProps?: Record<string, any>;
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
  barRadius = 4,
  gridStroke = "#F2F2F2",
  tickColor = "black",
  tickFontSize = "12px",
  tickFormatter = (value) => value,
  tooltipContent = <Tooltip />,
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  customBarProps = {},
  customXAxisProps = {},
  customGridProps = {},
}) => {
  // Filter out the data points where the value is 0 and collect categories with 0 values
  const filteredData = data.filter((item) => item[yAxisDataKey] > 0);
  const categoriesWithZeroValues = data
    .filter((item) => item[yAxisDataKey] === 0)
    .map((item) => item[xAxisDataKey]);

  const modifiedData = filteredData?.map((item) => ({
    ...item,
    originalValue: item[yAxisDataKey],
    [`${yAxisDataKey}_scaled`]: Math.log(item[yAxisDataKey] + 1), // Add 1 to avoid log(0)
  }));

  const maxValue = Math.max(
    ...modifiedData?.map((item) => item[`${yAxisDataKey}_scaled`])
  );
  const yAxisDomain = [0, maxValue * 1.1]; // Add padding for visual clarity

  // Dynamically calculate chart height based on the number of data items
  const minHeight = (data?.length - categoriesWithZeroValues?.length) * 50; // 50px per item, minimum 150px

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className={cn("w-full", className)}
        style={{ height: `${minHeight}px` }}
      >
        <BarChart
          data={modifiedData}
          layout="vertical"
          margin={{
            top: 5,
            right: 60,
            left: 10,
          }}
          barCategoryGap={10}
          barGap={20}
        >
          <YAxis
            dataKey={xAxisDataKey}
            type="category"
            tickLine={tickLine}
            tickMargin={tickMargin}
            axisLine={axisLine}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey={`${yAxisDataKey}`}
            layout="vertical"
            stroke="#121212"
            radius={barRadius}
            barSize={30}
            {...customBarProps}
          >
            {/* label for category */}
            <LabelList
              dataKey={xAxisDataKey}
              position={position ?? "insideLeft"}
              offset={8}
              className="fill-[--color-label] truncate"
              fontSize={14}
              textBreakAll={false}
              formatter={(value: string) => value}
              content={({ x, y, value, width }: LabelProps) => (
                <foreignObject
                  x={Number(x) + 8}
                  y={Number(y) + 5}
                  width={width}
                  height={20}
                >
                  <div
                    style={{
                      maxWidth: "80%", // Ensure it doesn't exceed the width of the bar
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Truncate text with ellipsis
                      whiteSpace: "nowrap", // Prevent text from wrapping
                    }}
                    className="text-[--color-label]"
                  >
                    {value}
                  </div>
                </foreignObject>
              )}
            />
            {/* Value labels */}
            <LabelList
              dataKey={yAxisDataKey}
              position="right" // Positions to the right of the bar
              offset={8} // Adjust spacing from the bar
              className={cn("fill-foreground")}
              fontSize={16}
              formatter={(value: number) => FormatValue(value)}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      {categoriesWithZeroValues.length > 0 && (
        <div className="flex gap-1 justify-start items-start mt-2">
          <Info size={20} className="stroke-accent" />
          <h3 className="text-sm font-normal text-accent">
            {categoriesWithZeroValues.join(", ")} have zero values and are
            excluded from the chart.
          </h3>
        </div>
      )}
    </div>
  );
};

export default HorizontalBarChartComponent;

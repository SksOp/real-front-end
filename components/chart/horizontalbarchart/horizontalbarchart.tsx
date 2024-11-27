"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
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
import { Tooltip } from "@/components/ui/tooltip";
import { FormatValue } from "@/utils/formatNumbers";

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
  const modifiedData = data?.map((item) => ({
    ...item,
    originalValue: item[yAxisDataKey],
    [`${yAxisDataKey}_scaled`]: Math.log(item[yAxisDataKey] + 1), // Add 1 to avoid log(0)
  }));

  const maxValue = Math.max(
    ...modifiedData?.map((item) => item[`${yAxisDataKey}_scaled`])
  );
  const yAxisDomain = [0, maxValue * 1.1]; // Add padding for visual clarity

  // Dynamically calculate chart height based on the number of data items
  const minHeight = data?.length * 70; // 50px per item, minimum 150px

  console.log(data?.length);
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("w-full", "")}
      style={{ height: `${minHeight}px` }}
    >
      <BarChart
        data={modifiedData}
        layout="vertical"
        margin={{
          top: 5,
          right: 45,
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
          dataKey={`${yAxisDataKey}_scaled`}
          layout="vertical"
          stroke="#121212"
          radius={barRadius}
          barSize={30}
          // {...customBarProps}
        >
          {/* label for category */}
          <LabelList
            dataKey={xAxisDataKey}
            position={position ?? "insideLeft"}
            offset={8}
            className="fill-[--color-label]"
            fontSize={14}
            textBreakAll={false}
            formatter={(value: string) => value}
          />
          {/* Custom label for zero values */}
          <LabelList
            dataKey={yAxisDataKey}
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) =>
              value === 0 ? `(0)` : FormatValue(value)
            }
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default HorizontalBarChartComponent;

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
  const maxValue = Math.max(...data.map((item) => item[yAxisDataKey]));

  // Add some padding to the top of the chart
  const yAxisDomain = [0, maxValue * 1.1]; // 10% padding

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("w-full min-h-full", className)}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          right: 50,
          left: 10,
        }}
        barCategoryGap={10}
        barGap={20}
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
            position={position ?? "insideTopLeft"}
            offset={8}
            className="fill-[--color-label]"
            formatter={(value: string) => ""}
            fontSize={14}
          />
          {/* Label for original value */}
          <LabelList
            dataKey={yAxisDataKey}
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) =>
              value > 0 ? FormatValue(value) : "0"
            }
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default HorizontalBarChartComponent;

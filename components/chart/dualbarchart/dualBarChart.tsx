import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  ReferenceLine,
  Label,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface DualBarChartComponentProps {
  chartConfig: any;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKeys: string[];
  barColors?: string[];
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
  referance?: string;
  referanceValue?: number;
  showXAxis?: boolean;
  showInsideLabel?: boolean;
  className?: ClassValue;
}

const formatYAxisTick = (value: number): string => {
  if (value >= 1e9) return (value / 1e9).toFixed(0) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(0) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(0) + "K";
  return value.toString();
};

const DualBarchart: React.FC<DualBarChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKeys,
  barColors = ["#DDDAF9", "#F2F2F2"],
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
  referance,
  referanceValue,
  showXAxis = true,
  showInsideLabel = false,
  className,
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "min-h-[280px] max-h-[400px] w-full min-w-fit overflow-x-auto",
        className
      )}
    >
      <ResponsiveContainer height={400}>
        <BarChart data={data} margin={{ left: -15, top: 10 }}>
          <CartesianGrid
            vertical={false}
            stroke={gridStroke}
            {...customGridProps}
          />
          {showXAxis && (
            <XAxis
              dataKey={xAxisDataKey}
              tickLine={tickLine}
              tickMargin={tickMargin}
              axisLine={axisLine}
              tickFormatter={tickFormatter}
              interval={"preserveStartEnd"}
            />
          )}
          <YAxis
            tickLine={tickLine}
            tickFormatter={formatYAxisTick}
            tickMargin={0}
            axisLine={axisLine}
            domain={[0, "auto"]}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />

          {yAxisDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]}
              radius={barRadius}
              stroke={"#121212"}
              {...customBarProps}
            >
              {!showXAxis && (
                <LabelList
                  dataKey={xAxisDataKey}
                  position="insideBottomLeft"
                  angle={-90}
                  offset={18}
                  fontSize={14}
                />
              )}
              {showInsideLabel && (
                <LabelList
                  dataKey={key}
                  position="insideTop"
                  angle={0}
                  offset={8}
                  fontSize={16}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DualBarchart;

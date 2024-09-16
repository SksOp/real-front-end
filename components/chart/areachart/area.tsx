import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AreaChartComponentProps {
  chartConfig: any;
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  areaColor?: string;
  areaOpacity?: number;
  gridStroke?: string;
  tickColor?: string;
  tickFontSize?: string;
  tickFormatter?: (value: any) => string;
  tooltipContent?: React.ReactElement;
  tickLine?: boolean;
  tickMargin?: number;
  axisLine?: boolean;
  customAreaProps?: Record<string, any>;
  customXAxisProps?: Record<string, any>;
  customGridProps?: Record<string, any>;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKey,
  areaColor = "#B6B1F0",
  areaOpacity = 0.4,
  gridStroke = "#F2F2F2",
  tickColor = "black",
  tickFontSize = "12px",
  tickFormatter = (value) => value.slice(0, 3),
  tooltipContent = <Tooltip />,
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  customAreaProps = {},
  customXAxisProps = {},
  customGridProps = {},
}) => {
  // Adjust the width calculation to account for a constant area component
  const chartWidth = Math.max(data.length * 30, 500); // 80 pixels per data point, minimum 500px width
  const chartHeight = 250;

  const aspect = chartWidth / chartHeight;

  // Custom tick formatting with customizable styles
  const customTickFormatter = (value: any): string => {
    const result = tickFormatter(value);
    return result !== undefined ? result.toString() : "";
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer aspect={aspect} height={chartHeight}>
        <AreaChart data={data} margin={{ left: -20 }}>
          {/* Define a gradient in the defs section */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={areaColor}
                stopOpacity={areaOpacity}
              />
              <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke={gridStroke}
            {...customGridProps}
          />
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={tickLine}
            tickMargin={tickMargin}
            axisLine={axisLine}
            stroke={"#C2C2C2"}
            tickFormatter={customTickFormatter}
            tickCount={data.length}
            {...customXAxisProps}
          />
          <YAxis
            dataKey={yAxisDataKey}
            tickLine={tickLine}
            tickMargin={tickMargin}
            stroke={"#C2C2C2"}
            axisLine={axisLine}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          {/* Use the gradient as the fill for the Area */}
          <Area
            type={"natural"}
            dataKey={yAxisDataKey}
            fill="url(#areaGradient)"
            stroke={areaColor}
            strokeWidth={2}
            dot={true}
            activeDot={{
              fill: areaColor || "var(--color-default)",
              r: 4,
            }}
            {...customAreaProps}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AreaChartComponent;

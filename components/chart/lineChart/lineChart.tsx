"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface LineProps {
  dataKey: string;
  color?: string;
  strokeWidth?: number;
}

interface LineChartComponentProps {
  chartConfig: any; // Adjust this type according to the actual ChartConfig type
  data: any[]; // You can make this more specific if you know the shape of your data
  xAxisDataKey: string;
  yAxisDataKey: string;
  lines: LineProps[]; // Array of line configurations
  gridStroke?: string;
  tickColor?: string;
  tickFontSize?: string;
  tickFormatter?: (value: any) => string;
  tooltipContent?: React.ReactElement;
  tickLine?: boolean;
  tickMargin?: number;
  axisLine?: boolean;
  customXAxisProps?: Record<string, any>;
  customGridProps?: Record<string, any>;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKey,
  lines, // Array of line configurations
  gridStroke = "#F2F2F2",
  tickColor = "black",
  tickFontSize = "12px",
  tickFormatter = (value) => value.slice(0, 3),
  tooltipContent = <></>,
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  customXAxisProps = {},
  customGridProps = {},
}) => {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <LineChart margin={{ left: -40 }} data={data}>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke={gridStroke}
          strokeOpacity={0.5}
          {...customGridProps}
        />
        <YAxis
          dataKey={yAxisDataKey}
          tickLine={tickLine}
          tickMargin={0}
          axisLine={axisLine}
        />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={tickLine}
          axisLine={axisLine}
          tickMargin={tickMargin}
          tickFormatter={tickFormatter}
          {...customXAxisProps}
        />
        <ChartTooltip content={<ChartTooltipContent />} />

        {lines.map((line, index) => (
          <Line
            key={index}
            dataKey={line.dataKey}
            stroke={line.color || "var(--color-default)"}
            strokeWidth={line.strokeWidth || 2}
            type="natural"
            dot={true}
            activeDot={{
              fill: line.color || "var(--color-default)",
              r: 4,
            }}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default LineChartComponent;

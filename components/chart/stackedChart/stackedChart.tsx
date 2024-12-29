"use client";

import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  ReferenceLine,
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
import { Tooltip } from "@/components/ui/tooltip";

interface StackedBarChartComponentProps {
  chartConfig: any; // Adjust this type according to the actual ChartConfig type
  data: any[]; // You can make this more specific if you know the shape of your data
  xAxisDataKey: string;
  yAxisDataKeys: string[]; // Array of keys for multiple bars
  barColors?: string[]; // Array of colors for each bar
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
  line?: boolean;
  lineKey?: string;
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

const StackedBarchart: React.FC<StackedBarChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKeys,
  barColors = ["#F0FCF3", "#FFEDED"], // Default to one color if not provided
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
  line = false,
  lineKey,
}) => {
  const maxValue = Math.max(
    ...data.flatMap((item) => yAxisDataKeys.map((key) => item[key]))
  );

  // Add padding (e.g., 10%) to the Y-axis maximum value
  const yAxisPadding = maxValue * 0.1;
  const yAxisMax = maxValue + yAxisPadding;

  // Explicitly define ticks based on the max value and desired steps
  const numberOfTicks = 5; // Change this to control the number of ticks
  const tickInterval = Math.ceil(yAxisMax / numberOfTicks);
  const yAxisTicks = Array.from(
    { length: numberOfTicks + 1 },
    (_, i) => i * tickInterval
  );
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[280px] max-h-[400px] min-w-fit w-full overflow-x-scroll "
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ left: -10, top: 10 }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={false}
            tickMargin={tickMargin}
            axisLine={axisLine}
            tickFormatter={tickFormatter}
          />
          <YAxis
            tickLine={tickLine}
            tickMargin={tickMargin}
            tickFormatter={formatYAxisTick}
            axisLine={axisLine}
            domain={[0, yAxisMax]} // Use the padded Y-axis max
            ticks={yAxisTicks}
          />
          {line && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={tickLine}
              tickMargin={tickMargin}
              tickFormatter={formatYAxisTick}
              hide={true}
              axisLine={axisLine}
            />
          )}
          <Bar
            dataKey={yAxisDataKeys[0]}
            stackId="a"
            stroke={"#121212"}
            fill={barColors[0]}
            radius={[0, 0, 5, 5]}
          />
          <Bar
            dataKey={yAxisDataKeys[1]}
            stackId="a"
            stroke={"#121212"}
            fill={barColors[1]}
            className="-translate-y-0.5"
            radius={[5, 5, 0, 0]}
          />
          {line && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={lineKey}
              stroke="#ff7300"
              dot={true}
              strokeWidth={2} // You can adjust the stroke width as needed
            />
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StackedBarchart;

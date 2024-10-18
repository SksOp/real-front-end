"use client";

import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
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
  showXAxis?: boolean;
}

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
  showXAxis = true,
}) => {
  const lineData = data.map((entry, index) => {
    if (index === 0) {
      // First data point (top-left): sum of the yAxis values for the stacked bars
      return {
        [xAxisDataKey]: entry[xAxisDataKey],
        y: entry[yAxisDataKeys[0]] + entry[yAxisDataKeys[1]], // Sum of the stacked bar heights
      };
    } else if (index === data.length - 1) {
      // Last data point (bottom-right): y = 0
      return {
        [xAxisDataKey]: entry[xAxisDataKey],
        y: 0,
      };
    } else {
      // In-between points: Create a smooth slope between the first and last
      const firstY = data[0][yAxisDataKeys[0]] + data[0][yAxisDataKeys[1]];
      return {
        [xAxisDataKey]: entry[xAxisDataKey],
        y: ((firstY * (data.length - 1 - index)) / (data.length - 1)).toFixed(
          2
        ),
      };
    }
  });

  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart accessibilityLayer data={data}>
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            return new Date(value).toLocaleDateString("en-US", {
              weekday: "short",
            });
          }}
        />
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
          style={{ transform: "translate(0,-6px)" }}
          radius={[5, 5, 0, 0]}
        />
        <Line
          type="monotone"
          data={lineData}
          dataKey="y"
          stroke="#ff7300"
          dot={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      kcal
                    </span>
                  </div>
                </div>
              )}
            />
          }
          cursor={false}
          defaultIndex={1}
        />
      </ComposedChart>
    </ChartContainer>
  );
};

export default StackedBarchart;

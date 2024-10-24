"use client";

import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  ReferenceLine,
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
  showXAxis?: boolean;
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
  showXAxis = true,
  line = false,
  lineKey,
}) => {
  const lineData = data.map((entry, index) => {
    return { x: entry[xAxisDataKey], y: entry[lineKey ?? ""] };
  });

  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart data={data} margin={{ left: -18 }}>
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tickMargin={tickMargin}
          axisLine={axisLine}
        />
        <YAxis
          tickLine={tickLine}
          tickMargin={tickMargin}
          tickFormatter={formatYAxisTick}
          axisLine={axisLine}
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
          style={{ transform: "translate(0,-6px)" }} // Adjust this if necessary
          radius={[5, 5, 0, 0]}
        />
        {line && (
          <Line
            type="monotone"
            data={lineData}
            dataKey="y"
            stroke="#ff7300"
            dot={false}
            strokeWidth={2} // You can adjust the stroke width as needed
          />
        )}
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

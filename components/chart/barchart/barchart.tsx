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

interface BarChartComponentProps {
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
  showInsideLabel?: boolean;
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

const Barchart: React.FC<BarChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKeys,
  barColors = ["#DDDAF9", "#F2F2F2"], // Default to one color if not provided
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
}) => {
  // Calculate chart width based on the number of data points
  const chartWidth = Math.max(data.length * 35, 450); // 80 pixels per data point, minimum 500px width
  const chartHeight = 250;

  const aspect = chartWidth / chartHeight;

  // Custom tick rendering with customizable styles
  const customTickFormatter = (value: any): string => {
    const result = tickFormatter(value);
    return result !== undefined ? result.toString() : "";
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer aspect={aspect} height={chartHeight}>
        <BarChart data={data} margin={{ left: -30 }} barGap={10}>
          <CartesianGrid
            vertical={false}
            stroke={gridStroke}
            {...customGridProps}
          />
          {showXAxis ? (
            <XAxis
              dataKey={xAxisDataKey}
              tickLine={tickLine}
              tickMargin={tickMargin}
              axisLine={axisLine}
              tickFormatter={customTickFormatter}
              {...customXAxisProps}
            />
          ) : null}
          <YAxis
            tickLine={tickLine}
            tickFormatter={formatYAxisTick}
            tickMargin={0}
            axisLine={axisLine}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />

          {yAxisDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]} // Cycle through colors
              radius={barRadius}
              stroke={"#121212"}
              spacing={20}
              {...customBarProps}
            >
              {!showXAxis && (
                <LabelList
                  dataKey={xAxisDataKey}
                  position="insideBottomLeft"
                  angle={-90}
                  offset={18}
                  fontSize={14}
                  className="fill-[--color-label]"
                />
              )}
              {showInsideLabel && (
                <LabelList
                  dataKey={key}
                  position="insideTop"
                  angle={0}
                  offset={8}
                  fontSize={16}
                  stroke="2"
                  fill="#121212"
                />
              )}
            </Bar>
          ))}

          {referance && (
            <ReferenceLine
              y={referanceValue}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value={referance}
                className="text-lg "
                offset={10}
                fill="#353535"
              />
              <Label
                position="insideTopLeft"
                value={referanceValue}
                className="text-lg"
                fill="#353535"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Barchart;

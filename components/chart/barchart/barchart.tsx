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
  LabelProps,
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
}) => {
  // Find the maximum value across all yAxisDataKeys
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
        <BarChart data={data} margin={{ left: -15, top: 10 }} barGap={10}>
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
              tickFormatter={tickFormatter}
              interval={"preserveStart"}
              {...customXAxisProps}
            />
          ) : null}
          <YAxis
            tickLine={tickLine}
            tickFormatter={formatYAxisTick}
            tickMargin={0}
            axisLine={axisLine}
            domain={[0, yAxisMax]} // Use the padded Y-axis max
            ticks={yAxisTicks} // Explicitly set ticks
          />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />

          {yAxisDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]}
              radius={barRadius}
              stroke={"#121212"}
              overflow={"scroll"}
              {...customBarProps}
            >
              {!showXAxis && (
                <LabelList
                  dataKey={xAxisDataKey}
                  position="insideBottomLeft"
                  angle={-90}
                  offset={18}
                  fontSize={14}
                  textBreakAll={false}
                  className="fill-[--color-label] "
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

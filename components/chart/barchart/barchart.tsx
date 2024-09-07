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
}

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
  tickFormatter = (value) => value.slice(0, 3),
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
  // Calculate chart width based on the number of data points
  const chartWidth = Math.max(data.length * 30, 400); // 80 pixels per data point, minimum 500px width
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
        <BarChart data={data} margin={{ left: -50 }} barGap={10}>
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
          <YAxis tickLine={tickLine} tickMargin={0} axisLine={axisLine} />
          <ChartTooltip content={<ChartTooltipContent />} />

          {yAxisDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]} // Cycle through colors
              radius={barRadius}
              stroke={"#121212"}
              barSize={30}
              spacing={20}
              {...customBarProps}
            >
              {!showXAxis && (
                <LabelList
                  dataKey={xAxisDataKey}
                  position="insideBottom"
                  angle={-90}
                  offset={26}
                  fontSize={12}
                  fill="#5C5C5C"
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

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

interface BarChartComponentProps {
  chartConfig: any; // Adjust this type according to the actual ChartConfig type
  data: any[]; // You can make this more specific if you know the shape of your data
  xAxisDataKey: string;
  yAxisDataKey1: string;
  yAxisDataKey2: string;
  barColor1?: string;
  barColor2?: string;
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
}

const DualBarchart: React.FC<BarChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  yAxisDataKey1,
  yAxisDataKey2,
  barColor1 = "#DDDAF9",
  barColor2 = "#F2F2F2",
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
        <BarChart data={data} margin={{ left: -50 }}>
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
            tickFormatter={customTickFormatter}
            {...customXAxisProps}
          />
          <YAxis
            dataKey={yAxisDataKey1}
            tickLine={tickLine}
            tickMargin={tickMargin}
            axisLine={axisLine}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar
            dataKey={yAxisDataKey1}
            fill={barColor1}
            radius={barRadius}
            stroke={"#121212"}
            barSize={30}
            spacing={20}
            {...customBarProps}
          />
          <Bar
            dataKey={yAxisDataKey2}
            fill={barColor2}
            radius={barRadius}
            stroke={"#121212"}
            barSize={30}
            spacing={20}
            {...customBarProps}
          />

          {referance && (
            <ReferenceLine
              y={referanceValue}
              stroke="#353535"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value={referance}
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={referanceValue}
                className="text-lg"
                fill="hsl(var(--foreground))"
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

export default DualBarchart;

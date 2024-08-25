import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
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
  title: React.ReactNode;
  description: React.ReactNode;
  chartConfig: any; // Adjust this type according to the actual ChartConfig type
  footer: React.ReactNode;
  footerDescription: string;
  data: any[]; // You can make this more specific if you know the shape of your data
  xAxisDataKey: string;
  yAxisDataKey: string;
  barColor?: string;
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
}

const Barchart: React.FC<BarChartComponentProps> = ({
  data,
  title,
  description,
  chartConfig,
  footer,
  footerDescription,
  xAxisDataKey,
  yAxisDataKey,
  barColor = "#A9A1F4",
  barRadius = 4,
  gridStroke = "#FFFFFF",
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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              width: chartWidth,
              height: chartHeight,
              overflowY: "hidden",
            }}
          >
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer aspect={aspect} height={chartHeight}>
                <BarChart data={data}>
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey={yAxisDataKey}
                    fill={barColor}
                    radius={barRadius}
                    barSize={30}
                    spacing={20}
                    {...customBarProps}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">{footer}</div>
        <div className="leading-none text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Barchart;

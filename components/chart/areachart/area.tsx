import React from "react";
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from "recharts";
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
  title: React.ReactNode;
  description: React.ReactNode;
  chartConfig: any;
  footer: React.ReactNode;
  footerDescription: string;
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
  title,
  description,
  chartConfig,
  footer,
  footerDescription,
  xAxisDataKey,
  yAxisDataKey,
  areaColor = "#A9A1F4",
  areaOpacity = 0.4,
  gridStroke = "#FFFFFF",
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
  // Calculate chart width based on the number of data points
  const chartWidth = Math.max(data.length * 30, 400); // 30 pixels per data point, minimum 400px width

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
          <div style={{ width: chartWidth }}>
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={data}
                width={chartWidth}
                height={400}
                className="overflow-y-auto"
                margin={{
                  top: 0,
                  right: 10,
                  bottom: 0,
                  left: 10,
                }}
              >
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
                <Area
                  dataKey={yAxisDataKey}
                  fill={areaColor}
                  fillOpacity={areaOpacity}
                  stroke={areaColor}
                  {...customAreaProps}
                />
              </AreaChart>
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

export default AreaChartComponent;
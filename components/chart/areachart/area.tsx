import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface AreaConfig {
  yAxisDataKey: string;
  areaColor?: string;
  areaOpacity?: number;
  customAreaProps?: Record<string, any>;
}

interface AreaChartComponentProps {
  chartConfig: any;
  data: any[];
  xAxisDataKey: string;
  areas: AreaConfig[]; // Now we can pass multiple area configurations
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
  className?: ClassValue;
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

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  data,
  chartConfig,
  xAxisDataKey,
  areas, // Array of area configurations
  gridStroke = "#F2F2F2",
  tickColor = "black",
  tickFontSize = "12px",
  tickFormatter = (value) => value,
  tooltipContent = <Tooltip />,
  tickLine = false,
  tickMargin = 15,
  axisLine = false,
  customXAxisProps = {},
  customGridProps = {},
  className,
}) => {
  const chartWidth = Math.max(data?.length * 30, 500);
  const chartHeight = 350;

  const customTickFormatter = (value: any): string => {
    const result = tickFormatter(value);
    return result ? result.toString() : value.toString();
  };

  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "min-h-[280px] min-w-fit w-full overflow-x-scroll ",
        className
      )}
    >
      <ResponsiveContainer height={"100%"}>
        <AreaChart
          data={data}
          margin={{ left: 0, top: 35, right: 10, bottom: 4 }}
        >
          <CartesianGrid
            vertical={false}
            stroke={gridStroke}
            {...customGridProps}
          />
          <defs>
            {areas.map((area, index) => (
              <linearGradient
                key={`areaGradient-${index}`}
                id={`areaGradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={area.areaColor || "#B6B1F0"}
                  stopOpacity={area.areaOpacity || 0.4}
                />
                <stop
                  offset="95%"
                  stopColor={area.areaColor || "#B6B1F0"}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>

          <XAxis
            dataKey={xAxisDataKey}
            tickLine={tickLine}
            tickMargin={tickMargin}
            axisLine={axisLine}
            stroke={"#C2C2C2"}
            tickFormatter={customTickFormatter}
            tickCount={data?.length}
          />
          <YAxis
            tickLine={tickLine}
            tickMargin={tickMargin}
            stroke={"#C2C2C2"}
            axisLine={axisLine}
            tickFormatter={formatYAxisTick}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          {areas.map((area, index) => (
            <Area
              key={`area-${index}`}
              type={"monotone"}
              dataKey={area.yAxisDataKey}
              fillOpacity={1}
              fill={`url(#areaGradient-${index})`}
              stroke={area.areaColor || "#B6B1F0"}
              strokeWidth={2}
              activeDot={{
                fill: area.areaColor || "var(--color-default)",
                r: 4,
              }}
              {...area.customAreaProps}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AreaChartComponent;

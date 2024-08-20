import React from "react";
import { CardWrapper } from "../card";
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

interface PieChartProps {
  title: string;
  data: any;
  centerText: string;
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
  customYAxisProps?: Record<string, any>;
  customGridProps?: Record<string, any>;
  customTooltipProps?: Record<string, any>;
}

function PieChartContainer({
  title,
  data,
  centerText,
  xAxisDataKey,
  yAxisDataKey,
  barColor = "var(--color-desktop)",
  barRadius = 4,
  gridStroke = "var(--color-label)",
  tickColor = "var(--color-label)",
  tickFontSize = "12px",
  tickFormatter = (value) => value.slice(0, 3),
  tooltipContent = <ChartTooltipContent indicator="line" />,
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  customBarProps = {},
  customXAxisProps = {},
  customYAxisProps = {},
  customGridProps = {},
  customTooltipProps = {},
}: PieChartProps) {
  return (
    <CardWrapper title={title} chartConfig={chartConfig}>
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey={yAxisDataKey}
          nameKey={xAxisDataKey}
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {centerText.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </CardWrapper>
  );
}

export default PieChartContainer;

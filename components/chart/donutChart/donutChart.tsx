import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DonutChartComponentProps {
  chartConfig: any;
  data: any[];
  dataKey: string;
  nameKey: string;
  innerRadius?: number;
  outerRadius?: number;
  strokeWidth?: number;
  className?: string;
  totalLabel?: string;
  cornerRadius?: number;
  padAngle?: number;
}

const formatValue = (value: number): string => {
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

const DonutChartComponent: React.FC<DonutChartComponentProps> = ({
  chartConfig,
  data,
  dataKey,
  nameKey,
  innerRadius = 60,
  outerRadius = 80,
  strokeWidth = 1,
  className = "mx-auto aspect-square max-h-[250px]",
  totalLabel = "Total",
  cornerRadius = 5,
  padAngle = 4,
}) => {
  // Helper function to format numbers with suffixes
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  // Calculate total properties count for the label in the middle of the Pie chart
  const totalProperties = data.reduce((acc, item) => acc + item[dataKey], 0);

  // Map the data to include the fill color from the chartConfig
  const updatedData = data.map((d) => ({
    ...d,
    fill: chartConfig[d[nameKey]]?.color || "#ccc", // Fallback color
  }));

  return (
    <div>
      <ChartContainer config={chartConfig} className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={updatedData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              stroke={"#121212"}
              strokeWidth={strokeWidth}
              cornerRadius={cornerRadius}
              paddingAngle={padAngle}
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatNumber(totalProperties)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {totalLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="w-full grid grid-cols-2 gap-x-8 gap-4 ">
        {data.map((item) => (
          <div key={item.name} className="flex items-start w-full gap-2">
            <span
              className={`min-w-3 w-3 h-3 mt-1 rounded-sm border border-secondary ${item.colorClass}`}
            />
            <div className="flex flex-col gap-1 ">
              <div className="flex  gap-2 justify-center items-center">
                <span className="text-sm truncate">{item.name}</span>
              </div>
              <span className="text-secondary text-sm font-semibold">
                {formatValue(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartComponent;

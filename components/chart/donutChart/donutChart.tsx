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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FormatValue } from "@/utils/formatNumbers";

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
                          {FormatValue(totalProperties)}
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
      <div className="flex flex-col items-center justify-center mt-4">
        <div className=" grid grid-cols-2 md:grid-cols-3  justify-items-start gap-x-8 gap-6 ">
          {updatedData.map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-center  gap-2"
            >
              <span
                className={`min-w-3 w-3 h-3 mt-1 rounded-sm border border-secondary `}
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex flex-col gap-1 ">
                <div className="flex  gap-2 justify-center items-center">
                  <span className="text-sm truncate">{item.name}</span>
                </div>
                <span className="text-secondary text-sm font-semibold">
                  {FormatValue(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartComponent;

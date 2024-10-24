import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Cell, Label, LabelList, Pie, PieChart } from "recharts";

interface PieChartComponentProps {
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

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  chartConfig,
  data,
  dataKey,
  nameKey,
  strokeWidth = 1,
  className = "mx-auto aspect-square max-h-[250px]",
  totalLabel = "Properties",
  cornerRadius = 5,
  padAngle = 0,
}) => {
  // Calculate total properties count for the label in the middle of the Pie chart
  const totalProperties = data.reduce(
    (acc, item) => acc + parseFloat(item[dataKey]),
    0
  );

  // Map the data to include the fill color from the chartConfig
  const updatedData = data.map((d) => ({
    ...d,
    fill: chartConfig[d[nameKey]]?.color || "#ccc", // Fallback color
    percentage: `${((parseFloat(d[dataKey]) / totalProperties) * 100).toFixed(
      2
    )} %`,
  }));
  return (
    <div>
      <ChartContainer config={chartConfig} className={className}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
          />
          <Pie
            data={updatedData}
            dataKey={dataKey}
            nameKey={nameKey}
            stroke={"#121212"}
            strokeWidth={strokeWidth}
            cornerRadius={cornerRadius}
            paddingAngle={padAngle}
          >
            <LabelList
              dataKey="percentage"
              className="fill-[#121212] text-sm"
              stroke="none"
              fontSize={16}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="w-full grid grid-cols-2 gap-x-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center  text-base w-full  gap-2"
          >
            <span
              className={` min-w-3 w-3 h-3 rounded-sm border border-secondary ${item.colorClass}`}
            />
            <span className="text-sm truncate">{item.name}</span>
            <span className="text-secondary text-sm font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;

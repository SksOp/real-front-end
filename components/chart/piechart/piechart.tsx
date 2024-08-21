import React from "react";
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
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

interface PieChartComponentProps {
  title: React.ReactNode;
  description: React.ReactNode;
  chartConfig: any;
  footer: React.ReactNode;
  footerDescription: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  innerRadius?: number;
  outerRadius?: number;
  strokeWidth?: number;
  className?: string;
  totalLabel?: string;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  title,
  description,
  chartConfig,
  footer,
  footerDescription,
  data,
  dataKey,
  nameKey,
  innerRadius = 60,
  outerRadius = 80,
  strokeWidth = 5,
  className = "mx-auto aspect-square max-h-[250px]",
  totalLabel = "Properties",
}) => {
  // Calculate total properties count for the label in the middle of the Pie chart
  const totalProperties = data.reduce((acc, item) => acc + item[dataKey], 0);

  // Map the data to include the fill color from the chartConfig
  const updatedData = data.map((d) => ({
    ...d,
    fill: chartConfig[d[nameKey]]?.color || "#ccc", // Fallback color
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className={className}>
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
              strokeWidth={strokeWidth}
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
                          {totalProperties.toLocaleString()}
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {footer}
        </div>
        <div className="leading-none text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;

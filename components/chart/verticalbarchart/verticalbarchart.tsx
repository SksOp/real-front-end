import React from "react";
import { BarChart, Bar, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface VerticalBarChartComponentProps {
  title: React.ReactNode;
  description: React.ReactNode;
  dataKey: string;
  value: number;
  color: string;
  selectedOption: string;
  className?: string;
}

const VerticalBarChartComponent: React.FC<VerticalBarChartComponentProps> = ({
  title,
  description,
  dataKey,
  value,
  color,
  selectedOption,
  className = "aspect-auto h-[32px] w-full",
}) => {
  return (
    <div className="grid auto-rows-min gap-2">
      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
        {value}
        <span className="text-sm font-normal text-muted-foreground">
          {dataKey}
        </span>
      </div>
      <ChartContainer
        config={{
          [dataKey]: {
            label: dataKey,
            color: color,
          },
        }}
        className={className}
      >
        <BarChart
          accessibilityLayer
          layout="vertical"
          margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
          data={[
            {
              date: selectedOption,
              [dataKey]: value,
            },
          ]}
        >
          <Bar dataKey={dataKey} fill={color} radius={4} barSize={32}>
            <LabelList
              position="insideLeft"
              dataKey="date"
              offset={8}
              fontSize={12}
              fill="white"
            />
          </Bar>
          <YAxis dataKey="date" type="category" tickCount={1} hide />
          <XAxis dataKey={dataKey} type="number" hide />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default VerticalBarChartComponent;

import React from "react";
import { BarChart, Bar, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface VerticalBarChartComponentProps {
  dataKey: string;
  value: number;
  color: string;
  selectedOption: string;
  className?: string;
}

const VerticalBarChartComponent: React.FC<VerticalBarChartComponentProps> = ({
  dataKey,
  value,
  color,
  selectedOption,
  className = "aspect-auto h-[32px] w-full",
}) => {
  return (
    <div className="grid auto-rows-min gap-2 w-full">
      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
        <span className="text-sm font-normal text-muted-foreground">
          {dataKey}
        </span>
      </div>
      <div className="flex gap-2">
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
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={4}
              barSize={32}
              stroke={"#121212"}
            >
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
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default VerticalBarChartComponent;

"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { RecieveDataType } from "@/transcation/types";
import { RealEstateData } from "@/actions/flatvsvillavsland";
import { useState } from "react";

export default function FlatvsVillavsLand({
  data,
}: {
  data: {
    rowsFlat: RecieveDataType[];
    rowsVilla: RecieveDataType[];
    rowsLand: RecieveDataType[];
  };
}) {
  const fvl = new RealEstateData();
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const [flat, setFlat] = useState<{ sales: number; transaction: number }>(
    fvl.getYearlyData(data.rowsFlat)
  );
  const [villa, setVilla] = useState<{ sales: number; transaction: number }>(
    fvl.getYearlyData(data.rowsVilla)
  );
  const [land, setLand] = useState<{ sales: number; transaction: number }>(
    fvl.getYearlyData(data.rowsLand)
  );
  const Option = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      setFlat(fvl.getYearlyData(data.rowsFlat));
      setVilla(fvl.getYearlyData(data.rowsVilla));
      setLand(fvl.getYearlyData(data.rowsLand));
    } else if (selectedValue === "Qaterly") {
      setFlat(fvl.getQuarterlyData(data.rowsFlat));
      setVilla(fvl.getQuarterlyData(data.rowsVilla));
      setLand(fvl.getQuarterlyData(data.rowsLand));
    } else if (selectedValue === "Monthly") {
      setFlat(fvl.getMonthlyData(data.rowsFlat));
      setVilla(fvl.getMonthlyData(data.rowsVilla));
      setLand(fvl.getMonthlyData(data.rowsLand));
    }
    setSelectedOption(selectedValue);
  };

  function formatInMillions(value: number) {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    return value.toString();
  }

  return (
    <Card>
      <select
        value={selectedOption}
        onChange={handleOption}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {Option.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            move: {
              label: "Flat",
              color: "hsl(var(--chart-1))",
            },
            stand: {
              label: "Villa",
              color: "hsl(var(--chart-2))",
            },
            exercise: {
              label: "Land",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            data={[
              {
                activity: "Flat",
                value: flat.transaction,
                label: flat.transaction,
                fill: "var(--color-stand)",
              },
              {
                activity: "Villa",
                value: villa.transaction,
                label: villa.transaction,
                fill: "var(--color-exercise)",
              },
              {
                activity: "Land",
                value: land.transaction,
                label: land.transaction,
                fill: "var(--color-move)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t ">
        <div className="flex w-fit items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Flat</div>
            <div className="flex items-baseline gap-1 font-size:text-sm font-bold tabular-nums leading-none">
              {formatInMillions(flat.sales)}
              {/* <span className="text-sm font-normal text-muted-foreground"></span> */}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Villa</div>
            <div className="flex items-baseline gap-1 font-size:text-sm font-bold tabular-nums leading-none">
              {formatInMillions(villa.sales)}
              {/* <span className="text-sm font-normal text-muted-foreground"></span> */}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Land</div>
            <div className="flex items-baseline gap-1 font-size:text-sm font-bold tabular-nums leading-none">
              {formatInMillions(land.sales)}
              {/* <span className="text-sm font-normal text-muted-foreground"></span> */}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

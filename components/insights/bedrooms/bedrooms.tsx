// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart, Cell } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { BedroomType } from "@/transcation/types";
// import { Bedroom } from "@/actions/bedroom";

// // Example chart configuration, update the colors as needed
// const chartConfig: ChartConfig = {
//   "1 B/R": { label: "1 B/R", color: "#f0f9ff" },
//   "2 B/R": { label: "2 B/R", color: "#60a5fa" },
//   "3 B/R": { label: "3 B/R", color: "#93c5fd" },
//   "4 B/R": { label: "4 B/R", color: "#bfdbfe" },
//   "5 B/R": { label: "5 B/R", color: "#e0f2fe" },
//   "6 B/R": { label: "6 B/R", color: "#3b82f6" },
//   "7 B/R": { label: "7 B/R", color: "#2563eb" },
//   "9 B/R": { label: "9 B/R", color: "#0891b2" },
//   "GYM": { label: "GYM", color: "#22d3ee" },
//   "Office": { label: "Office", color: "#0ea5e9" },
//   "PENTHOUSE": { label: "PENTHOUSE", color: "#1d4ed8" },
//   "Shop": { label: "Shop", color: "#1e40af" },
//   "Single Room": { label: "Single Room", color: "#1e3a8a" },
//   "Studio": { label: "Studio", color: "#6366f1" },
// };

// type BedRoomProps = {
//   bedrooms: string;
//   property_count: number;
//   fill?: string;
// };

// export interface BedroomChartDataTypeYearly {
//   bedrooms: string;
//   property_count: number;
// }

// export interface BedroomChartDataTypeQuaterly {
//   bedrooms: string;
//   property_count: number;
// }
// export interface BedroomChartDataTypeMonthly {
//   bedrooms: string;
//   property_count: number;
// }

// export function Bedrooms({ data }: { data: BedroomType }) {
//   const [selectedOption, setSelectedOption] = React.useState<string>("Yearly");
//   const bedroom = new Bedroom;
//   const [chartData, setChartData] = React.useState<BedroomChartDataTypeYearly[] | BedroomChartDataTypeQuaterly[] | BedroomChartDataTypeMonthly[]>(bedroom.getYearlyBedroomData({data}));
//   const Option = ["Yearly", "Qaterly", "Monthly"];
//   if (!data) {
//     return <>No data available</>;
//   }
//   const years = Object.keys(data);

//   if (!data) return null;

//   const chartDataUpdated : BedRoomProps[] = chartData.map((d) => ({ ...d, fill: chartConfig[d.bedrooms]?.color}))
//   let totalProperties = 0;
//   chartData.forEach((val) => {
//     totalProperties += val.property_count;
//   });

//   // console.log("chart data", chartDataUpdated);
//   // console.log("total properties", totalProperties);

//   const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     // const Transaction = new Transactions;
//     if (selectedValue === "Yearly") {
//     const datat = bedroom.getYearlyBedroomData({data});
//     setChartData(datat);
//     setSelectedOption(selectedValue);
//     }else if(selectedValue === "Qaterly"){
//       const datat = bedroom.getQuarterlyBedroomData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }else if(selectedValue === "Monthly"){
//       const datat = bedroom.getMonthlyBedroomData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }
//   }

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>
//           Bedrooms
//           <select
//             value={selectedOption}
//             onChange={handelOption}
//             className="ml-2 p-0.5 rounded text-sm"
//           >
//             {Option.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </CardTitle>
//         <CardDescription>2023-2024`</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartDataUpdated}
//               dataKey="property_count"
//               nameKey="bedrooms"
//               innerRadius={60}
//               outerRadius={80}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalProperties.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Properties
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total properties for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import PieChartComponent from "../../chart/piechart/piechart"; // Adjust the import path according to your project structure
import { BedroomType } from "@/transcation/types";
import { Bedroom } from "@/actions/bedroom";

const chartConfig = {
  "1 B/R": { label: "1 B/R", color: "#f0f9ff" },
  "2 B/R": { label: "2 B/R", color: "#60a5fa" },
  "3 B/R": { label: "3 B/R", color: "#93c5fd" },
  "4 B/R": { label: "4 B/R", color: "#bfdbfe" },
  "5 B/R": { label: "5 B/R", color: "#e0f2fe" },
  "6 B/R": { label: "6 B/R", color: "#3b82f6" },
  "7 B/R": { label: "7 B/R", color: "#2563eb" },
  "9 B/R": { label: "9 B/R", color: "#0891b2" },
  GYM: { label: "GYM", color: "#22d3ee" },
  Office: { label: "Office", color: "#0ea5e9" },
  PENTHOUSE: { label: "PENTHOUSE", color: "#1d4ed8" },
  Shop: { label: "Shop", color: "#1e40af" },
  "Single Room": { label: "Single Room", color: "#1e3a8a" },
  Studio: { label: "Studio", color: "#6366f1" },
};

export interface BedroomChartDataTypeYearly {
  bedrooms: string;
  property_count: number;
}

export interface BedroomChartDataTypeQuaterly {
  bedrooms: string;
  property_count: number;
}
export interface BedroomChartDataTypeMonthly {
  bedrooms: string;
  property_count: number;
}

export function Bedrooms({ data }: { data: BedroomType }) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const bedroom = new Bedroom();
  const [chartData, setChartData] = useState<
    | BedroomChartDataTypeYearly[]
    | BedroomChartDataTypeQuaterly[]
    | BedroomChartDataTypeMonthly[]
  >(bedroom.getYearlyBedroomData({ data }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  if (!data) {
    return <>No data available</>;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = bedroom.getYearlyBedroomData({ data });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = bedroom.getQuarterlyBedroomData({ data });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = bedroom.getMonthlyBedroomData({ data });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  const title = (
    <div className="flex justify-between items-center">
      Bedrooms
      <select
        value={selectedOption}
        onChange={handleOption}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {Option.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );

  const description = "2023-2024";
  const footer = (
    <>
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </>
  );
  const footerDescription = "Showing total properties for the last 6 months";

  return (
    <PieChartComponent
      title={title}
      description={description}
      chartConfig={chartConfig}
      footer={footer}
      footerDescription={footerDescription}
      data={chartData}
      dataKey="property_count"
      nameKey="bedrooms"
      innerRadius={60}
      outerRadius={80}
      strokeWidth={5}
    />
  );
}

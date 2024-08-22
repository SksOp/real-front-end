// "use client";

// import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartContainer } from "@/components/ui/chart";
// import { ResidentialVsCommercialType } from "@/transcation/types";
// import React, { useState } from "react";
// import { ResvsCo } from "@/actions/residentialvscommercial";

// export interface RandCChartDataTypeYearly {
//   Residential: number;
//   Commercial: number;
// }

// export interface RandCChartDataTypeQuaterly {
//   Residential: number;
//   Commercial: number;
// }
// export interface RandCChartDataTypeMonthly {
//   Residential: number;
//   Commercial: number;
// }

// export function ResidentialVsCommercial({
//   data,
// }: {
//   data: ResidentialVsCommercialType;
// }) {
//   const [selectedOption, setSelectedOption] = React.useState<string>("Yearly");
//   const revsco = new ResvsCo;
//   const [chartData, setChartData] = React.useState<
//     | RandCChartDataTypeYearly
//     | RandCChartDataTypeQuaterly
//     | RandCChartDataTypeMonthly
//   >(revsco.getYearlyData({ data }));
//   const Option = ["Yearly", "Qaterly", "Monthly"];

//   if (!data) {
//     return <p>No data available</p>;
//   }

//   const years = Object.keys(data);

//   const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     // const Transaction = new Transactions;
//     if (selectedValue === "Yearly") {
//     const datat = revsco.getYearlyData({data});
//     setChartData(datat);
//     setSelectedOption(selectedValue);
//     }else if(selectedValue === "Qaterly"){
//       const datat = revsco.getQuarterlyData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }else if(selectedValue === "Monthly"){
//       const datat = revsco.getMonthlyData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }
//   }

//   return (
//     <Card className="border-none">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           {"Residential Vs Commercial"}
//           <select
//             value={selectedOption}
//             onChange={handelOption}
//             className="ml-2 p-0.5 rounded text-sm"
//           >
//             {Option.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </CardTitle>
//         <CardDescription>
//           {"You're averaging more steps a day this year than last year."}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div className="grid auto-rows-min gap-2">
//           <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//             {chartData?.Residential}
//             <span className="text-sm font-normal text-muted-foreground">
//               Residential
//             </span>
//           </div>
//           <ChartContainer
//             config={{
//               residential: {
//                 label: "Residential",
//                 color: "hsl(var(--chart-1))",
//               },
//             }}
//             className="aspect-auto h-[32px] w-full"
//           >
//             <BarChart
//               accessibilityLayer
//               layout="vertical"
//               margin={{
//                 left: 0,
//                 top: 0,
//                 right: 0,
//                 bottom: 0,
//               }}
//               data={[
//                 {
//                   date: selectedOption,
//                   residential: chartData?.Residential,
//                 },
//               ]}
//             >
//               <Bar dataKey="residential" fill="#60a5fa" radius={4} barSize={32}>
//                 <LabelList
//                   position="insideLeft"
//                   dataKey="date"
//                   offset={8}
//                   fontSize={12}
//                   fill="white"
//                 />
//               </Bar>
//               <YAxis dataKey="date" type="category" tickCount={1} hide />
//               <XAxis dataKey="residential" type="number" hide />
//             </BarChart>
//           </ChartContainer>
//         </div>
//         <div className="grid auto-rows-min gap-2">
//           <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//             {chartData?.Commercial}
//             <span className="text-sm font-normal text-muted-foreground">
//               Commercial
//             </span>
//           </div>
//           <ChartContainer
//             config={{
//               commercial: {
//                 label: "Commercial",
//                 color: "hsl(var(--muted))",
//               },
//             }}
//             className="aspect-auto h-[32px] w-full"
//           >
//             <BarChart
//               accessibilityLayer
//               layout="vertical"
//               margin={{
//                 left: 0,
//                 top: 0,
//                 right: 0,
//                 bottom: 0,
//               }}
//               data={[
//                 {
//                   date: selectedOption,
//                   commercial: chartData?.Commercial,
//                 },
//               ]}
//             >
//               <Bar
//                 dataKey="commercial"
//                 fill="var(--color-commercial)"
//                 radius={4}
//                 barSize={32}
//               >
//                 <LabelList
//                   position="insideLeft"
//                   dataKey="date"
//                   offset={8}
//                   fontSize={12}
//                   fill="hsl(var(--muted-foreground))"
//                 />
//               </Bar>
//               <YAxis dataKey="date" type="category" tickCount={1} hide />
//               <XAxis dataKey="commercial" type="number" hide />
//             </BarChart>
//           </ChartContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import React, { useState } from "react";
import VerticalBarChartComponent from "../../chart/verticalbarchart/verticalbarchart"; // Adjust the import path according to your project structure
import { ResidentialVsCommercialType } from "@/transcation/types";
import { ResvsCo } from "@/actions/residentialvscommercial";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface RandCChartDataTypeYearly {
  Residential: number;
  Commercial: number;
}

export interface RandCChartDataTypeQuaterly {
  Residential: number;
  Commercial: number;
}
export interface RandCChartDataTypeMonthly {
  Residential: number;
  Commercial: number;
}

export function ResidentialVsCommercial({
  data,
}: {
  data: ResidentialVsCommercialType;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const revsco = new ResvsCo();
  const [chartData, setChartData] = useState<
    | RandCChartDataTypeYearly
    | RandCChartDataTypeQuaterly
    | RandCChartDataTypeMonthly
  >(revsco.getYearlyData({ data }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  if (!data) {
    return <p>No data available</p>;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = revsco.getYearlyData({ data });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = revsco.getQuarterlyData({ data });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = revsco.getMonthlyData({ data });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Residential Vs Commercial"}
          <select
            value={selectedOption}
            onChange={handleOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {Option.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </CardTitle>
        <CardDescription>
          {"You're averaging more steps a day this year than last year."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VerticalBarChartComponent
          title="Residential"
          description="Residential data"
          dataKey="Residential"
          value={chartData?.Residential || 0}
          color="hsl(var(--chart-1))"
          selectedOption={selectedOption}
        />
        <VerticalBarChartComponent
          title="Commercial"
          description="Commercial data"
          dataKey="Commercial"
          value={chartData?.Commercial || 0}
          color="var(--color-commercial)"
          selectedOption={selectedOption}
        />
      </CardContent>
    </Card>
  );
}

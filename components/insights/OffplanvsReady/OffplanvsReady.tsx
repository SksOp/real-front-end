// "use client"

// import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { ChartContainer } from "@/components/ui/chart"
// import { FreeholdVsLeaseType, OffplanvsReadyType } from "@/transcation/types"
// import React from "react"
// import { FrVsRe } from "@/actions/freeholdvs"
// import { OfVsRe } from "@/actions/offplanvsready"

// export interface OfReChartDataTypeYearly {
//   Ofplan: number;
//   Ready: number;
// }

// export interface OfReChartDataTypeQuaterly {
//   Ofplan: number;
//   Ready: number;
// }
// export interface OfReChartDataTypeMonthly {
//   Ofplan: number;
//   Ready: number;
// }

// export function OffplanvsReady({data}:{data: OffplanvsReadyType}) {

//   const [selectedOption, setSelectedOption] = React.useState<string>("Yearly");
//   const frvsre = new OfVsRe;
//   const [chartData, setChartData] = React.useState<
//     | OfReChartDataTypeYearly
//     | OfReChartDataTypeQuaterly
//     | OfReChartDataTypeMonthly
//   >(frvsre.getYearlyData({ data }));
//   const Option = ["Yearly", "Qaterly", "Monthly"];

//   console.log("data", data);
//   console.log("chart data", chartData);

//   const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     // const Transaction = new Transactions;
//     if (selectedValue === "Yearly") {
//     const datat = frvsre.getYearlyData({data});
//     setChartData(datat);
//     setSelectedOption(selectedValue);
//     }else if(selectedValue === "Qaterly"){
//       const datat = frvsre.getQuarterlyData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }else if(selectedValue === "Monthly"){
//       const datat = frvsre.getMonthlyData({data});
//       setChartData(datat);
//       setSelectedOption(selectedValue);
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           OffPlan vs Ready
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
//           </CardTitle>
//         <CardDescription>
//           {"You're average more steps a day this year than last year."}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div className="grid auto-rows-min gap-2">
//           <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//           {chartData?.Ofplan}
//             <span className="text-sm font-normal text-muted-foreground">
//               Freehold
//             </span>
//           </div>
//           <ChartContainer
//             config={{
//               steps: {
//                 label: "Ofplan",
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
//                   steps: chartData?.Ofplan,
//                 },
//               ]}
//             >
//               <Bar
//                 dataKey="Ofplan"
//                 fill="var(--color-steps)"
//                 radius={4}
//                 barSize={32}
//               >
//                 <LabelList
//                   position="insideLeft"
//                   dataKey="date"
//                   offset={8}
//                   fontSize={12}
//                   fill="white"
//                 />
//               </Bar>
//               <YAxis dataKey="date" type="category" tickCount={1} hide />
//               <XAxis dataKey="Ofplan" type="number" hide />
//             </BarChart>
//           </ChartContainer>
//         </div>
//         <div className="grid auto-rows-min gap-2">
//           <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//           {chartData?.Ready}
//             <span className="text-sm font-normal text-muted-foreground">
//               Ready
//             </span>
//           </div>
//           <ChartContainer
//             config={{
//               steps: {
//                 label: "Ready",
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
//                   steps: chartData?.Ready,
//                 },
//               ]}
//             >
//               <Bar
//                 dataKey="Ready"
//                 fill="var(--color-steps)"
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
//               <XAxis dataKey="Ready" type="number" hide />
//             </BarChart>
//           </ChartContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import React, { useEffect, useState } from "react";
import VerticalBarChartComponent from "../../chart/horizontalbarchart/horizontalbarchart"; // Adjust the import path according to your project structure
import { OffplanvsReadyType } from "@/transcation/types";
import { OfVsRe } from "@/actions/offplanvsready";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getOffplanVsReady } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

export interface OfReChartDataTypeYearly {
  Ofplan: number;
  Ready: number;
}

export interface OfReChartDataTypeQuaterly {
  Ofplan: number;
  Ready: number;
}
export interface OfReChartDataTypeMonthly {
  Ofplan: number;
  Ready: number;
}

export function OffplanvsReady() {
  const {
    data: offplanvsready,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getOffplanVsReady());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const frvsre = new OfVsRe();
  const [chartData, setChartData] = useState<
    | OfReChartDataTypeYearly
    | OfReChartDataTypeQuaterly
    | OfReChartDataTypeMonthly
  >(frvsre.getYearlyData({ data: offplanvsready! }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = frvsre.getYearlyData({ data: offplanvsready! });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = frvsre.getQuarterlyData({ data: offplanvsready! });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = frvsre.getMonthlyData({ data: offplanvsready! });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    if (offplanvsready) {
      const frvsre = new OfVsRe();
      const datat = frvsre.getYearlyData({ data: offplanvsready! });
      setChartData(datat);
    }
  }, [offplanvsready]);

  if (isLoading || !offplanvsready) {
    return <Skeleton />;
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"OffPlan vs Ready"}
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
        {/* <VerticalBarChartComponent
          // title="Offplan"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Ofplan"
          value={chartData?.Ofplan || 0}
          color="hsl(var(--chart-1))"
          selectedOption={selectedOption}
        />

        <VerticalBarChartComponent
          // title="Ready"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Ready"
          value={chartData?.Ready || 0}
          color="hsl(var(--muted))"
          selectedOption={selectedOption}
        /> */}
      </CardContent>
    </Card>
  );
}

// "use client";

// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, BarChart, Bar, CartesianGrid, XAxis } from "recharts";

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
// import { LocationSalesTransaction } from "@/transcation/types";
// import { useState } from "react";

// interface ChartDataType {
//   [year: string]: { location: string; sales: number }[];
// }

// const chartConfig = {
//   sales: {
//     label: "sales",
//     color: "#A9A1F4",
//   },
// } satisfies ChartConfig;

// const convertData = (data: LocationSalesTransaction): ChartDataType => {
//   const result: ChartDataType = {};

//   for (const year in data) {
//     if (!result[year]) {
//       result[year] = [];
//     }

//     const locationSales = data[year];

//     for (const location in locationSales) {
//       const existingLocation = result[year].find(
//         (loc) => loc.location === location
//       );

//       if (existingLocation) {
//         existingLocation.sales += locationSales[location].sales;
//       } else {
//         result[year].push({
//           location: location,
//           sales: locationSales[location].sales,
//         });
//       }
//     }

//     // Sort locations by sales in descending order
//     result[year].sort((a, b) => b.sales - a.sales);
//   }

//   return result;
// };

// export function LocationSales({ data }: { data: LocationSalesTransaction }) {
//   const chartData = convertData(data);
//   const [selectedYear, setSelectedYear] = useState<number>(2024);

//   if(!data) {
//     return null
//   }

//   const years = Object.keys(data);
//   return (
//     <Card className="border-none">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           Sales
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//             className="ml-2 p-0.5 rounded text-sm"
//           >
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//           </CardTitle>
//         <CardDescription>
//           Showing total Sales at a location
//         </CardDescription>
//       </CardHeader>
//       <div className="overflow-x-scroll scrollbar-hide overflow:hidden">
//         <CardContent>
//           <ChartContainer
//             config={chartConfig}
//             className="w-[15000px] h-[300px]"
//           >

//             <BarChart
//               data={chartData["2024"]}
//               className="w-[15000px] h-[300px]"
//             >
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="location"
//                 tickLine={true}
//                 tickMargin={10}
//                 axisLine={true}
//                 tickFormatter={(value) => value.slice(0, 3)}
//               />
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Bar dataKey="sales" fill="#A9A1F4" radius={8} fillOpacity={0.5} />
//             </BarChart>

            
//           </ChartContainer>
//         </CardContent>
//       </div>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               January - June 2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// // // Add this CSS to your global stylesheet or in a relevant CSS/SCSS file
// // <style jsx global>{`
// //   .scrollbar-hide {
// //     -ms-overflow-style: none;  /* IE and Edge */
// //     scrollbar-width: none;  /* Firefox */
// //   }

// //   .scrollbar-hide::-webkit-scrollbar {
// //     display: none;  /* Safari and Chrome */
// //   }
// // `}</style>


"use client";

import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import { useState } from "react";
import { CardWrapper } from "../chart/card";
import Barchart from "../chart/barchart/barchart";
import { LocationSalesTransaction } from "@/transcation/types";

interface ChartDataType {
  [year: string]: { location: string; sales: number }[];
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#A9A1F4",
  },
};

const convertData = (data: LocationSalesTransaction): ChartDataType => {
  const result: ChartDataType = {};

  for (const year in data) {
    if (!result[year]) {
      result[year] = [];
    }

    const locationSales = data[year];

    for (const location in locationSales) {
      const existingLocation = result[year].find(
        (loc) => loc.location === location
      );

      if (existingLocation) {
        existingLocation.sales += locationSales[location].sales;
      } else {
        result[year].push({
          location: location,
          sales: locationSales[location].sales,
        });
      }
    }

    // Sort locations by sales in descending order
    result[year].sort((a, b) => b.sales - a.sales);
  }

  return result;
};

export function LocationSales({ data }: { data: LocationSalesTransaction }) {
  const chartData = convertData(data);
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  if (!data) {
    return null;
  }

  const years = Object.keys(data);

  const title = (
    <div className="flex justify-between items-center">
      Sales
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );

  const description: ReactNode = "Showing total Sales at a location";
  const footer: ReactNode = (
    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </div>
  );

  const footerDescription: string = "January - June 2024";

  return (
    <CardWrapper
      title={title}
      description={description}
      chartConfig={chartConfig}
      footer={footer}
      footerDescription={footerDescription}
    >
      <Barchart
        data={chartData[selectedYear.toString()]}
        gridStroke="#ccc"
        xAxisDataKey="location"
        yAxisDataKey="sales"
        tickLine= {true}
        barColor="#A9A1F4"
        barRadius={8}
        tickColor="black"
        tickFontSize="12px"
        tickFormatter={(value) => value.slice(0, 3)}
      />
    </CardWrapper>
  );
}

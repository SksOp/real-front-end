"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LocationSalesTransaction } from "@/transcation/types"
import { useState } from "react"
import { Transactions } from "@/actions/sales"

interface ChartDataType {
  [year: string]: { [month:string] : {location: string; Transaction: number} }
}

const chartConfig = {
    Transaction: {
    label: "Transaction",
    color: "#A9A1F4",
  },
} satisfies ChartConfig



export interface TransactionsChartDataTypeYearly {
  location: string;
  transactions: number;
}

export interface TransactionsChartDataTypeQuaterly {
  location: string;
  transactions: number;
}
export interface TransactionsChartDataTypeMonthly {
  location: string;
  transactions: number;
}

export function LocationTransaction({ data }: { data: LocationSalesTransaction }) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const Transaction = new Transactions;
  const [chartData, setChartData] = useState<TransactionsChartDataTypeYearly[] | TransactionsChartDataTypeQuaterly[] | TransactionsChartDataTypeMonthly[]>(Transaction.getYearlyTransactions({data}));
  const Option = ["Yearly", "Qaterly", "Monthly"];
  if (!data) {
    return <>No data available</>;
  }
  const years = Object.keys(data);


  const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // const Transaction = new Transactions;
    if (selectedValue === "Yearly") {
    const datat = Transaction.getYearlyTransactions({data});
    setChartData(datat);
    setSelectedOption(selectedValue); 
    }else if(selectedValue === "Qaterly"){
      const datat = Transaction.getQuarterlyTransactions({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }else if(selectedValue === "Monthly"){
      const datat = Transaction.getMonthlyTransactions({data});
      setChartData(datat);
      setSelectedOption(selectedValue);
    }
  }


  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Transactions
          <select
            value={selectedOption}
            onChange={handelOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {Option.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          </CardTitle>
        <CardDescription>
          Showing total Transaction at a location
        </CardDescription>
      </CardHeader>
      <div className="overflow-x-auto scrollbar-hide">
        <CardContent className="w-[15000px] h-[300px]">
          <ChartContainer config={chartConfig} className="w-[15000px] h-[300px]">
            <AreaChart
              accessibilityLayer
              data={chartData}
              height={900}
              margin={{
                left: 12,    
                right: 12, 
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="location"
                tickLine={true}
                axisLine={true}
                tickMargin={1000}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="transactions"
                type="natural"
                fill="#A9A1F4"
                fillOpacity={0.4}
                stroke="#A9A1F4"
                dot={{
                  fill:"#A9A1F4"
                }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

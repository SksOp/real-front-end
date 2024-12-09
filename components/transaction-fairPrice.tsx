"use client";
import React, { use, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { BASE_URL } from "@/config/constant";
import { FormatValue } from "@/utils/formatNumbers";

interface TransactionFairPriceProps {
  priceperSqft?: number;
  className?: string;
}

function TransactionFairPrice({
  priceperSqft,
  className,
}: TransactionFairPriceProps) {
  const [avgPrice, setAvgPrice] = React.useState<number | string>(0);
  const [fairPrice, setFairPrice] = React.useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/transaction/index`);
        const data = response.data.data;
        const fairPriceResponse = `${FormatValue(
          data.quartiles[0].average.toFixed(2)
        )} - ${FormatValue(data.quartiles[3].average.toFixed(2))}`;
        setAvgPrice(FormatValue(data.q1_q2_average.toFixed(2)));
        setFairPrice(fairPriceResponse);
      } catch (e) {
        console.error("error getting transaction", e);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <div className="bg-gradient-to-r w-full from-[#5681EB] to-[#D36774] p-[2px] rounded-xl">
      <Card
        className={cn(
          "w-full p-4 bg-gradient-to-br rounded-xl flex flex-col gap-2",
          "from-[#5483ED1C] to-[#FFFFFF1C]",
          "border border-transparent",
          className
        )}
      >
        <div className="text-muted-foreground text-base flex gap-3 items-center w-full">
          <div className="flex items-center justify-center flex-shrink-0 h-10 w-10">
            <img
              src="/svg/Vector.svg"
              alt="insights"
              className="object-cover  shrink-0"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-1/3 gap-2">
              <h3 className="text-muted-foreground text-xs font-normal">
                Avg Price
              </h3>
              <h2 className="text-secondary font-semibold text-sm ">
                {avgPrice}
              </h2>
            </div>
            {priceperSqft && (
              <div className="flex flex-col w-1/3 gap-2">
                <h3 className="text-muted-foreground text-xs font-normal">
                  Smart Avg per Sqft
                </h3>
                <h2 className="text-secondary font-semibold text-sm ">
                  {priceperSqft}
                </h2>
              </div>
            )}
            <div className="flex flex-col w-1/3 gap-2">
              <h3 className="text-muted-foreground text-xs font-normal">
                Fair Price
              </h3>
              <h2 className="text-secondary font-semibold text-sm ">
                {fairPrice}
              </h2>
            </div>
          </div>{" "}
        </div>
      </Card>
    </div>
  );
}

export default TransactionFairPrice;

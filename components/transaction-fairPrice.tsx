"use client";
import React, { use, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { BASE_URL } from "@/config/constant";
import { FormatValue } from "@/utils/formatNumbers";
import ApiService from "@/utils/apiService";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "./ui/skeleton";

interface TransactionFairPriceProps {
  location_name: string;
  className?: string;
}

function TransactionFairPrice({
  location_name,
  className,
}: TransactionFairPriceProps) {
  const [avgPrice, setAvgPrice] = React.useState<number | string>("");
  const [fairPrice, setFairPrice] = React.useState<number | string>("");
  const [smartPrice, setSmartPrice] = React.useState<number | string>("");
  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const token = await auth.user?.getIdToken(true);
        const response = await ApiService(
          "transaction",
          "index",
          {
            location: location_name,
          },
          token
        );
        const data = response.result;
        const fairPrice = `${FormatValue(
          data.quartiles[0].avg_sqft_value.toFixed(2)
        )} - ${FormatValue(data.quartiles[3].avg_sqft_value.toFixed(2))}`;
        setAvgPrice(FormatValue(data.overall_average.toFixed(2)));
        setFairPrice(fairPrice);
        setSmartPrice(FormatValue(data.fair_sqft.toFixed(2)));
        setIsLoading(false);
      } catch (e) {
        console.error("error getting transaction", e);
      }
    };
    fetchTransactions();
  }, [location_name]);
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
                Avg Price (Per Unit)
              </h3>
              {isLoading ? (
                <Skeleton className="h-3 w-[60%]" />
              ) : (
                <h2 className="text-secondary font-semibold text-sm ">
                  {avgPrice}
                </h2>
              )}
            </div>
            <div className="flex flex-col w-1/3 gap-2">
              <h3 className="text-muted-foreground text-xs font-normal">
                Smart Avg (SQFT)
              </h3>
              {isLoading ? (
                <Skeleton className="h-3 w-[60%]" />
              ) : (
                <h2 className="text-secondary font-semibold text-sm ">
                  {smartPrice}
                </h2>
              )}
            </div>

            <div className="flex flex-col w-1/3 gap-2">
              <h3 className="text-muted-foreground text-xs font-normal">
                Fair Price (SQFT)
              </h3>
              {isLoading ? (
                <Skeleton className="h-3 w-[60%]" />
              ) : (
                <h2 className="text-secondary font-semibold text-sm ">
                  {fairPrice}
                </h2>
              )}
            </div>
          </div>{" "}
        </div>
      </Card>
    </div>
  );
}

export default TransactionFairPrice;

"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/card";
import { ReportCard } from "../ui/reportCard";
import { fetchAverageValues, fetchLocationSales } from "@/actions/functions";
import { getTransactionData } from "@/transcation/charts";
import { UpIcon, DownIcon } from "@/public/svg/Indicator";
import { GrowthChart } from "../salestransactions/salestransactions";
import { LocationSalesTransaction, SalesTransactionsType, TransactionAverageValues } from "@/transcation/types";
import { SalesMarketTrend } from "../sales-market-trend/sales-market-trend";
import { TransactionVsSales } from "../ transactions-Sales-comparision/ transactions-Sales-comparision";
import { LocationSales } from "../location-sales/location-sales";

export const Report = () => {
  const [averageValue, setAverageValue] = React.useState("");
  const [totalValue, setTotalValue] = React.useState("");
  const [yoyGrowth, setYoYGrowth] = React.useState("");
  const [totalTransactions, setTotalTransactions] = React.useState("");

  const [growthAverageValue, setGrowthAverageValue] = React.useState("");
  const [growthTotalValue, setGrowthTotalValue] = React.useState("");
  const [growthYoyValue, setGrowthYoyValue] = React.useState("");
  const [growthTotalTransactions, setGrowthTotalTransactions] =
    React.useState("");
<<<<<<< Updated upstream
  const [salesTransactions, setSalesTransactions] = React.useState<SalesTransactionsType | null>()
=======
  const [salesTransactions, setSalesTransactions] =
    React.useState<SalesTransactionsType | null>();

  const [data, setData] = React.useState<TransactionAverageValues>({})
  const [locationSales, setLocationSales] = React.useState<LocationSalesTransaction | null>(null);
  const [locationTransction , setLocationTransction] = React.useState<LocationSalesTransaction | null>(null);
>>>>>>> Stashed changes
  useEffect(() => {
    console.log("fetching data");
    fetchAverageValues().then((data) => {
      const {
        averageValue,
        totalValue,
        yoyGrowth,
        totalTransactions,
        growthAverageValue,
        growthTotalValue,
        growthYoyValue,
        growthTotalTransactions,
        SalesTransactions,
      } = getTransactionData(data!);
      if (data) {
        setAverageValue(averageValue);
        setTotalValue(totalValue);
        setYoYGrowth(yoyGrowth);
        setTotalTransactions(totalTransactions);

        setGrowthAverageValue(growthAverageValue);
        setGrowthTotalValue(growthTotalValue);
        setGrowthYoyValue(growthYoyValue);
        setGrowthTotalTransactions(growthTotalTransactions);
<<<<<<< Updated upstream
        setSalesTransactions(SalesTransactions)
      }
    });
  },[]);
=======
        setSalesTransactions(SalesTransactions);
        setData(data);
      }
    });


    fetchLocationSales().then((data) => {
      console.log("outside component:",data)
      setLocationSales(data);
      setLocationTransction(data);
    })
  }, []);
>>>>>>> Stashed changes

  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-3">
        <ReportCard
          title="Average Sales Value"
          value={averageValue || 5000}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {growthAverageValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    growthAverageValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${growthAverageValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{`vs last year`}</p>
              </div>
            </>
          }
        />
        <ReportCard
          title="Total Sales Value"
          value={totalValue || "$3.5 M"}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {growthTotalValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    growthTotalValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${growthTotalValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
              </div>
            </>
          }
        />

        <ReportCard
          title="YoY Growth"
          value={yoyGrowth}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {growthYoyValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    growthYoyValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${growthYoyValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
              </div>
            </>
          }
        />
        <ReportCard
          title="Total Sales Transactions"
          value={totalTransactions}
          color="green"
          description={
            <div className="flex items-center justify-center">
              {growthTotalTransactions[0] !== "-" ? (
                <UpIcon className={{ width: "20", hight: "20" }} />
              ) : (
                <DownIcon />
              )}
              <p
                className={`text-xs font-semibold ${
                  growthTotalTransactions[0] !== "-"
                    ? "text-[#0AAE11]"
                    : "text-[#EB3C70]"
                }`}
              >
                {`${growthTotalTransactions}`}
              </p>
              <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
            </div>
          }
        />
      </div>
<<<<<<< Updated upstream
      <SalesMarketTrend data = {salesTransactions} />
      <GrowthChart data={salesTransactions} />
=======
      <SalesMarketTrend data={salesTransactions!} />
      <GrowthChart data={salesTransactions!} />
      <TransactionVsSales data={data!}/>
      <LocationSales data={locationSales!}/>

>>>>>>> Stashed changes
    </>
  );
};

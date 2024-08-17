"use client";
import React from "react";
import { ReportCard } from "../ui/reportCard";
import {
  fetchAverageValues,
  fetchBedrooms,
  fetchLocationSales,
  fetchResidentialVsCommercialType,
} from "@/actions/functions";
import { getTransactionData } from "@/transcation/charts";
import { UpIcon, DownIcon } from "@/public/svg/Indicator";
import { GrowthChart } from "../salestransactions/salestransactions";
import {
  BedroomType,
  LocationSalesTransaction,
  ResidentialVsCommercialType,
  SalesTransactionsType,
  TransactionAverageValues,
} from "@/transcation/types";
import { SalesMarketTrend } from "../sales-market-trend/sales-market-trend";
import { TransactionVsSales } from "../ transactions-Sales-comparision/ transactions-Sales-comparision";
import { LocationSales } from "../location-sales/location-sales";
import { LocationTransaction } from "../location-transaction/location-transaction";
import { Bedrooms } from "../bedrooms/bedrooms";
import {ResidentialVsCommercial} from "../ResidentialVsCommercial/ResidentialVsCommercial";
import { FreeholdvsLease } from "../FreeholdvsLease/FreeholdvsLease";
import { OffplanvsReady } from "../OffplanvsReady/OffplanvsReady";
import FlatvsVillavsLand from "../FlatvsVillavsLand/FlatvsVillavsLand";
import { SalesIndexBenchmarking } from "../SalesIndexBenchmarking/salesIndexBenchmarking";

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
  const [salesTransactions, setSalesTransactions] =
<<<<<<< Updated upstream
   
    React.useState<SalesTransactionsType | null>(null);;
=======
    React.useState<SalesTransactionsType | null>(null);
>>>>>>> Stashed changes

  const [data, setData] = React.useState<TransactionAverageValues|null>(null);
  const [locationSales, setLocationSales] =
    React.useState<LocationSalesTransaction | null>(null);
  const [locationTransction, setLocationTransction] =
    React.useState<LocationSalesTransaction | null>(null);

  const [bedrooms, setBedrooms] = React.useState<BedroomType | null>(null);

  const [residentialVsCommercialData, setResidentialVsCommercialData] = React.useState<ResidentialVsCommercialType | null>(null);
  useEffect(() => {
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
        setSalesTransactions(SalesTransactions);;
=======
        setSalesTransactions(SalesTransactions);
>>>>>>> Stashed changes
        setData(data);
      }
    });

    fetchLocationSales().then((data) => {
      setLocationSales(data);
      setLocationTransction(data);
    });

    fetchBedrooms().then((data) => {
      if (data) {
        setBedrooms(data);
      }
      
    });
<<<<<<< Updated upstream
  });
=======

    fetchResidentialVsCommercialType().then((data) => {
      setResidentialVsCommercialData(data);
    });
  },[]);
>>>>>>> Stashed changes

  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-3">
        <ReportCard
          title="Average Sales Value"
          value={transactionData.averageValue || 5000}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {transactionData.growthAverageValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    transactionData.growthAverageValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${transactionData.growthAverageValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{`vs last year`}</p>
              </div>
            </>
          }
        />
        <ReportCard
          title="Total Sales Value"
          value={transactionData.totalValue || "$3.5 M"}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {transactionData.growthTotalValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    transactionData.growthTotalValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${transactionData.growthTotalValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
              </div>
            </>
          }
        />

        <ReportCard
          title="YoY Growth"
          value={transactionData.yoyGrowth}
          color="green"
          description={
            <>
              <div className="flex items-center justify-center">
                {transactionData.growthYoyValue[0] !== "-" ? (
                  <UpIcon className={{ width: "20", hight: "20" }} />
                ) : (
                  <DownIcon />
                )}
                <p
                  className={`text-xs font-semibold ${
                    transactionData.growthYoyValue[0] !== "-"
                      ? "text-[#0AAE11]"
                      : "text-[#EB3C70]"
                  }`}
                >
                  {`${transactionData.growthYoyValue}`}
                </p>
                <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
              </div>
            </>
          }
        />
        <ReportCard
          title="Total Sales Transactions"
          value={transactionData.totalTransactions}
          color="green"
          description={
            <div className="flex items-center justify-center">
              {transactionData.growthTotalTransactions[0] !== "-" ? (
                <UpIcon className={{ width: "20", hight: "20" }} />
              ) : (
                <DownIcon />
              )}
              <p
                className={`text-xs font-semibold ${
                  transactionData.growthTotalTransactions[0] !== "-"
                    ? "text-[#0AAE11]"
                    : "text-[#EB3C70]"
                }`}
              >
                {`${transactionData.growthTotalTransactions}`}
              </p>
              <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
            </div>
          }
        />
      </div>
      <SalesMarketTrend data={salesTransactions!} />
      <GrowthChart data={salesTransactions!} />
      {/* <TransactionVsSales data={data!} /> */}
      <SalesIndexBenchmarking data={data!} />
      <LocationTransaction data={locationTransction!} />
      <LocationSales data={locationSales!} />
      <Bedrooms data={bedrooms!} />
      <ResidentialVsCommercial data={residentialVsCommercialData!} />
      <FreeholdvsLease/>
      <OffplanvsReady/>
      <FlatvsVillavsLand/>
    </>
  );
};

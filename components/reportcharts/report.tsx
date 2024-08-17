"use client";
import React, { useEffect, useState } from "react";
import { ReportCard } from "../ui/reportCard";
import { getTransactionData } from "@/transcation/dataConverter";
import { UpIcon, DownIcon } from "@/public/svg/Indicator";
import { GrowthChart } from "../salestransactions/salestransactions";
import {
  BedroomType,
  fetchSalesIndexBenchmarkType,
  FreeholdVsLeaseType,
  LocationSalesTransaction,
  OffplanvsReadyType,
  ResidentialVsCommercialType,
  SalesTransactionsType,
  TransactionAverageValues,
} from "@/transcation/types";
import { SalesMarketTrend } from "../sales-market-trend/sales-market-trend";
import {
  getAverageValues,
  getBedrooms,
  getLocationSales,
  getResidentialVsCommercialType,
} from "@/repository/tanstack/queries/functions.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LocationSales } from "../location-sales/location-sales";
import { LocationTransaction } from "../location-transaction/location-transaction";
import { Bedrooms } from "../bedrooms/bedrooms";
import { ResidentialVsCommercial } from "../ResidentialVsCommercial/ResidentialVsCommercial";
import { FreeholdvsLease } from "../FreeholdvsLease/FreeholdvsLease";
import { OffplanvsReady } from "../OffplanvsReady/OffplanvsReady";
import FlatvsVillavsLand from "../FlatvsVillavsLand/FlatvsVillavsLand";
import { SalesIndexBenchmarking } from "../SalesIndexBenchmarking/salesIndexBenchmarking";
import {
  fetchFreeholdVsLease,
  fetchOffplanVsLease,
  fetchSalesIndexBenchmark,
} from "@/actions/functions";

export const Report = () => {
  const [freeholdvsLease, setFreeholdvsLease] = useState<FreeholdVsLeaseType>(
    {}
  );
  const [offplanvsready, setOffplanvsready] = useState<OffplanvsReadyType>({});

  const [salesIndexBenchmark, setSalesIndexBenchmark] =
    useState<fetchSalesIndexBenchmarkType>({});

  useEffect(() => {
    fetchFreeholdVsLease().then((res) => {
      console.log("freeholdvsLease", res);
      if (res) setFreeholdvsLease(res);
    });

    fetchOffplanVsLease().then((res) => {
      if (res) setOffplanvsready(res!);
    });

    fetchSalesIndexBenchmark().then((res) => {
      if (res) setSalesIndexBenchmark(res);
    });
  });

  const {
    data: avgValue,
    isLoading: isLoading1,
    isError: isError1,
  } = useSuspenseQuery(getAverageValues());
  const {
    data: locationSales,
    isLoading: isLoading2,
    isError: isError2,
  } = useSuspenseQuery(getLocationSales());
  const {
    data: bedrooms,
    isLoading: isLoading3,
    isError: isError3,
  } = useSuspenseQuery(getBedrooms());
  const {
    data: residentialVsCommercialData,
    isLoading: isLoading4,
    isError: isError4,
  } = useSuspenseQuery(getResidentialVsCommercialType());

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
    return <div>Loading...</div>;
  }
  if (isError1 || isError2 || isError3 || isError4) {
    return <div>Error</div>;
  }

  const transactionData = getTransactionData(avgValue!);

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
      <SalesMarketTrend data={transactionData.SalesTransactions!} />
      <GrowthChart data={transactionData.SalesTransactions!} />
      {/* <SalesIndexBenchmarking data={salesIndexBenchmark!} /> */}
      <LocationTransaction data={locationSales!} />
      <LocationSales data={locationSales!} />
      <Bedrooms data={bedrooms!} />
      <ResidentialVsCommercial data={residentialVsCommercialData!} />
      <FreeholdvsLease data={freeholdvsLease!} />
      <OffplanvsReady data={offplanvsready} />
      {/* <FlatvsVillavsLand /> */}
    </>
  );
};

{
  /* <TransactionVsSales data={data!} /> */
}

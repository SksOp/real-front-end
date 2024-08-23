"use client";
import React, { useEffect, useState } from "react";
import { ReportCard } from "../ui/reportCard";
import { getTransactionData } from "@/transcation/dataConverter";
import { UpIcon, DownIcon } from "@/public/svg/Indicator";
import { GrowthChart } from "../insights/salestransactions/salestransactions";
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
import { SalesMarketTrend } from "../insights/sales-market-trend/sales-market-trend";
import {
  getAverageValues,
  getBedrooms,
  getFlatVillaLand,
  getFreeholdVsLease,
  getIQR,
  getLocationSales,
  getOffplanVsReady,
  getResidentialVsCommercialType,
} from "@/repository/tanstack/queries/functions.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LocationSales } from "../insights/location-sales/location-sales";
import { LocationTransaction } from "../insights/location-transaction/location-transaction";
import { Bedrooms } from "../insights/bedrooms/bedrooms";
import { ResidentialVsCommercial } from "../insights/ResidentialVsCommercial/ResidentialVsCommercial";
import { FreeholdvsLease } from "../insights/FreeholdvsLease/FreeholdvsLease";
import { OffplanvsReady } from "../insights/OffplanvsReady/OffplanvsReady";
import FlatvsVillavsLand from "../insights/FlatvsVillavsLand/FlatvsVillavsLand";
import { SalesIndexBenchmarking } from "../insights/SalesIndexBenchmarking/salesIndexBenchmarking";

export const Report = () => {
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
  const {
    data: offplanvsready,
    isLoading: isLoading5,
    isError: isError5,
  } = useSuspenseQuery(getOffplanVsReady());
  const {
    data: freeholdbslease,
    isLoading: isLoading6,
    isError: isError6,
  } = useSuspenseQuery(getFreeholdVsLease());
  const {
    data: IQR,
    isLoading: isLoading7,
    isError: isError7,
  } = useSuspenseQuery(getIQR());

  const {
    data: dataFlatvsVillavsLand,
    isLoading: isLoading8,
    isError: isError8,
  } = useSuspenseQuery(getFlatVillaLand());

  if (
    isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading6 ||
    isLoading7 ||
    isLoading8
  ) {
    return <div>Loading...</div>;
  }
  if (
    isError1 ||
    isError2 ||
    isError3 ||
    isError4 ||
    isError5 ||
    isError6 ||
    isError7 ||
    isError8
  ) {
    return <div>Error</div>;
  }

  console.log(IQR);

  const transactionData = getTransactionData(avgValue!);

  return (
    <div className="h-fit">
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
      <SalesIndexBenchmarking data={IQR!} />
      <LocationTransaction data={locationSales!} />
      <LocationSales data={locationSales!} />
      <Bedrooms data={bedrooms!} />
      <ResidentialVsCommercial data={residentialVsCommercialData!} />
      <FreeholdvsLease data={freeholdbslease!} />
      <OffplanvsReady data={offplanvsready!} />
      <FlatvsVillavsLand data={dataFlatvsVillavsLand!} />
    </div>
  );
};

"use client";
import React, { useContext } from "react";
import { ReportCard } from "../ui/reportCard";
import { getTransactionData } from "@/transcation/dataConverter";
import { UpIcon, DownIcon } from "@/public/svg/Indicator";
import { GrowthChart } from "../insights/salestransactions/salestransactions";
import { SalesMarketTrend } from "../insights/sales-market-trend/sales-market-trend";
import { getAverageValues } from "@/repository/tanstack/queries/functions.queries";
import { useQuery } from "@tanstack/react-query";
import { LocationSales } from "../insights/location-sales/location-sales";
import { LocationTransaction } from "../insights/location-transaction/location-transaction";
import { Bedrooms } from "../insights/bedrooms/bedrooms";
import { ResidentialVsCommercial } from "../insights/ResidentialVsCommercial/ResidentialVsCommercial";
import { FreeholdvsLease } from "../insights/FreeholdvsLease/FreeholdvsLease";
import { OffplanvsReady } from "../insights/OffplanvsReady/OffplanvsReady";
import FlatvsVillavsLand from "../insights/FlatvsVillavsLand/FlatvsVillavsLand";
import { SalesIndexBenchmarking } from "../insights/SalesIndexBenchmarking/salesIndexBenchmarking";
import { FilterContext } from "@/context/filter/filter-provider";
import ReportSection from "../insights/reportsection/reportsection";

export const Report = () => {
  const {
    data: avgValue,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery(getAverageValues());

  const props = useContext(FilterContext);

  const transactionData = getTransactionData(avgValue!);

  return (
    <div className="h-fit">
      <ReportSection transactionData={transactionData} />
      <SalesMarketTrend data={transactionData.SalesTransactions!} />
      <GrowthChart data={transactionData.SalesTransactions!} />
      <SalesIndexBenchmarking />
      <LocationTransaction />
      <LocationSales />
      <Bedrooms />
      <ResidentialVsCommercial />
      <FreeholdvsLease />
      <OffplanvsReady />
      <FlatvsVillavsLand />
    </div>
  );
};

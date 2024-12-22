"use client";

import Exceptions from "@/components/exceptions";
import InsightDrawerView from "@/components/insightDrawerView";
import LoadingWidget from "@/components/loadingWidget";
import MatrixSkeleton from "@/components/matrixSkeleton";
import TransactionsList from "@/components/transaction-list";
import TransactionTabs from "@/components/transaction-tabs";
import TransactionTable from "@/components/transactionTable";
import { BASE_URL } from "@/config/constant";
import {
  RentalMatrix,
  RentalTransactionApi,
  SalesMatrix,
  SalesTransactionApi,
} from "@/config/utility";
import Layout from "@/layout/secondary";
import { SelectDataException } from "@/public/svg/exceptions";
import {
  getRentalMatrix,
  getSalesMatrix,
} from "@/repository/tanstack/queries/matrices.queries";
import {
  RentalApiResponse,
  SalesApiResponse,
} from "@/types/apiResponses/matrices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function TransactionPage() {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = React.useState<string>("sales");
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [MatrixDataPage, setMatrixDataPage] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [filters, setFilters] = React.useState<{
    [key: string]: string | number;
  }>({});
  const {
    data: SalesTransactions,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    ...filters,
  });

  const {
    data: rentalTransactions,
    isLoading: isRentalLoading,
    isError: isRentalError,
  } = getRentalMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    ...filters,
  });

  const {
    data: mortageTransactions,
    isLoading: isMortageLoading,
    isError: isMortageError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    group_en: "Mortgage",
    ...filters,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const type = searchParams.get("type");
    setSelectedTab(type || "sales");
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Start loading
      try {
        const date = new Date();
        const presentYear = date.getFullYear();

        const filterParams = {
          ...filters,
          start_year: presentYear - 1,
          end_year: presentYear,
        };

        if (selectedTab === "sales") {
          const response = await SalesTransactionApi(1, filters);
          setTotalPages(response.totalPages);
          setTransactions(response.transactions);
        } else if (selectedTab === "rental") {
          const response = await RentalTransactionApi(1, filters);

          setTotalPages(response.totalPages);
          setTransactions(response.transactions);
        } else if (selectedTab === "mortgage" && !isMortageLoading) {
          const response = await SalesTransactionApi(1, {
            ...filterParams,
            group_en: "Mortgage",
          });

          setTotalPages(response.totalPages);
          setTransactions(response.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    setSelectedRow(null);
    if (selectedTab === "sales" && !isSalesLoading) {
      const matrixOutputSales = SalesMatrix(
        SalesTransactions as SalesApiResponse
      );
      setMatrixDataPage(matrixOutputSales);
    } else if (selectedTab === "rental" && !isRentalLoading) {
      const matrixOutputRental = RentalMatrix(
        rentalTransactions as RentalApiResponse
      );
      setMatrixDataPage(matrixOutputRental);
    } else if (selectedTab === "mortgage" && !isMortageLoading) {
      const matrixOutput = SalesMatrix(mortageTransactions as SalesApiResponse);
      setMatrixDataPage(matrixOutput);
    }

    fetchTransactions();
  }, [
    selectedTab,
    filters,
    SalesTransactions,
    rentalTransactions,
    mortageTransactions,
  ]);

  const getLocationname = () => {
    return transactions.find(
      (transaction) => transaction.transactionId === selectedRow
    )?.areaName;
  };

  const getPricePerSqft = () => {
    if (selectedTab === "rental") return;
    return transactions.find(
      (transaction) => transaction.transactionId === selectedRow
    )?.pricePerSqFt;
  };
  console.log("filters", filters);
  return (
    <Layout page="transactions" title="Transactions">
      <div className="flex flex-col gap-3 px-3  pt-12 md:hidden">
        <TransactionTabs
          matrixData={MatrixDataPage}
          defaultTab={selectedTab}
          selectedTab={selectedTab}
          filters={filters}
          setFilters={setFilters}
          setSelectedTab={setSelectedTab}
          isLoading={isLoading}
        />
        <TransactionsList selectedTab={selectedTab} filters={filters} />
      </div>

      <div className="hidden md:flex w-full gap-3 px-3 pt-20  max-h-screen ">
        <div className="w-2/3 flex flex-col gap-3 max-h-full overflow-y-auto ">
          <TransactionTabs
            matrixData={MatrixDataPage}
            defaultTab={selectedTab}
            selectedTab={selectedTab}
            filters={filters}
            setFilters={setFilters}
            setSelectedTab={setSelectedTab}
            isLoading={isSalesLoading && isRentalLoading && isMortageLoading}
          />

          <TransactionTable
            selectedTab={selectedTab}
            selectedRow={selectedRow}
            onRowSelect={(index) => setSelectedRow(index)}
            totalPages={totalPages}
            data={transactions}
            filters={filters}
          />
        </div>
        <div className="w-1/3  max-h-full overflow-y-auto ">
          {selectedRow ? (
            <InsightDrawerView
              priceperSqft={getPricePerSqft()}
              location_name={getLocationname()}
            />
          ) : (
            <Exceptions
              svg={<SelectDataException />}
              title="Selected details will showup here."
              description="any drill down insights / selection will be shown here."
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TransactionPage;

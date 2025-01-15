"use client";

import Exceptions from "@/components/exceptions";
import InsightDrawerView from "@/components/insightDrawerView";
import MatrixSkeleton from "@/components/matrixSkeleton";
import TransactionsList from "@/components/transaction-list";
import TransactionTabs from "@/components/transaction-tabs";
import TransactionTable from "@/components/transactionTable";
import { BASE_URL } from "@/config/constant";
import { CalculateMatrixRental } from "@/config/rentalMatrix";
import { CalculateMatrixSales } from "@/config/salesMatrix";
import {
  CalculateMatrix,
  RentalTransactionApi,
  SalesTransactionApi,
} from "@/config/utility";
import Layout from "@/layout/secondary";
import { useAuth } from "@/lib/auth";
import { SelectDataException } from "@/public/svg/exceptions";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function TransactionPage() {
  const searchParams = useSearchParams();
  const auth = useAuth();
  const [selectedTab, setSelectedTab] = React.useState<string>("sales");
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [MatrixDataPage, setMatrixDataPage] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [locationName, setLocationName] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<{
    [key: string]: string | number;
  }>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const type = searchParams.get("type");
    setSelectedTab(type || "sales");
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Start loading
      try {
        const token = await auth.user?.getIdToken(true);
        const date = new Date();
        const presentYear = date.getFullYear();

        const filterParams = {
          ...filters,
          start_year: presentYear - 1,
          end_year: presentYear,
        };

        if (selectedTab === "sales") {
          const response = await SalesTransactionApi(1, filterParams, token);
          const matrixOutput = await CalculateMatrixSales(filterParams, token);
          setMatrixDataPage(matrixOutput);
          setTotalPages(response.totalPages);
          setTransactions(response.transactions);
          // } else if (selectedTab === "rental") {
          //   const response = await RentalTransactionApi(1, filterParams, token);
          //   const matrixOutput = await CalculateMatrixRental(filterParams, token);
          //   setMatrixDataPage(matrixOutput);
          //   setTotalPages(response.totalPages);
          //   setTransactions(response.transactions);
        } else if (selectedTab === "mortgage") {
          const response = await SalesTransactionApi(
            1,
            {
              ...filterParams,
              group_en: "Mortgage",
            },
            token
          );
          const matrixOutput = await CalculateMatrixSales(
            {
              ...filterParams,
              group_en: "Mortgage",
            },
            token
          );

          setMatrixDataPage(matrixOutput);
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
    fetchTransactions();
  }, [selectedTab, filters]);

  useEffect(() => {
    const getLocationname = () => {
      console.log("Selected Row main", selectedRow);
      return transactions.find(
        (transaction) => transaction.transactionId === selectedRow
      )?.areaName;
    };

    setLocationName(getLocationname());
    console.log("Location Name", locationName);
  }, [transactions, selectedRow]);

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
            isLoading={isLoading}
          />

          <TransactionTable
            selectedTab={selectedTab}
            selectedRow={selectedRow}
            onRowSelect={(index) => setSelectedRow(index)}
            totalPages={totalPages}
            data={transactions}
            setData={setTransactions}
            filters={filters}
          />
        </div>
        <div className="w-1/3  max-h-full overflow-y-auto border rounded-xl">
          {selectedRow && locationName ? (
            <InsightDrawerView location_name={locationName || ""} />
          ) : (
            <Exceptions
              svg={<SelectDataException />}
              title="Select a transaction to see insights."
              description="Detailed analysis for the selected transactions will be displayed here."
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TransactionPage;

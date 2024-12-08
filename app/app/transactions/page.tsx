"use client";

import Exceptions from "@/components/exceptions";
import InsightDrawerView from "@/components/insightDrawerView";
import TransactionsList from "@/components/transaction-list";
import TransactionTabs from "@/components/transaction-tabs";
import TransactionTable from "@/components/transactionTable";
import { BASE_URL } from "@/config/constant";
import {
  CalculateMatrix,
  RentalTransactionApi,
  SalesTransactionApi,
} from "@/config/utility";
import Layout from "@/layout/secondary";
import { SelectDataException } from "@/public/svg/exceptions";
import { useParams, useSearchParams } from "next/navigation";
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

  useEffect(() => {
    const type = searchParams.get("type");
    setSelectedTab(type || "sales");
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const date = new Date();
      const presentYear = date.getFullYear();

      const filterParams = {
        ...filters,
        start_year: presentYear - 1,
        end_year: presentYear,
      };

      if (selectedTab === "sales") {
        const response = await SalesTransactionApi(1, filterParams);
        const sourceURL = `${BASE_URL}/api/transaction/trends`;
        const matrixOutput = await CalculateMatrix(
          sourceURL,
          "sales",
          filterParams
        );
        setMatrixDataPage(matrixOutput);
        setTotalPages(response.totalPages);
        setTransactions(response.transactions);
      } else if (selectedTab === "rental") {
        const response = await RentalTransactionApi(1, filterParams);
        const sourceURL = `${BASE_URL}/api/rental/average`;
        const matrixOutput = await CalculateMatrix(
          sourceURL,
          "rental",
          filterParams
        );
        setMatrixDataPage(matrixOutput);
        setTotalPages(response.totalPages);
        setTransactions(response.transactions);
      } else if (selectedTab === "mortgage") {
        const response = await SalesTransactionApi(1, {
          ...filterParams,
          group_en: "Mortgage",
        });
        const sourceURL = `${BASE_URL}/api/transaction/trends`;
        const matrixOutput = await CalculateMatrix(sourceURL, "sales", {
          ...filterParams,
          group_en: "Mortgage",
        });

        console.log(response);
        setMatrixDataPage(matrixOutput);
        setTotalPages(response.totalPages);
        setTransactions(response.transactions);
      }
    };
    setSelectedRow(null);
    fetchTransactions();
  }, [selectedTab, filters]);

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
          setFilters={setFilters}
          setSelectedTab={setSelectedTab}
        />
        <TransactionsList selectedTab={selectedTab} filters={filters} />
      </div>

      <div className="hidden md:flex w-full gap-3 px-3 pt-20  max-h-screen ">
        <div className="w-2/3 flex flex-col gap-3 max-h-full overflow-y-auto ">
          <TransactionTabs
            matrixData={MatrixDataPage}
            defaultTab={selectedTab}
            selectedTab={selectedTab}
            setFilters={setFilters}
            setSelectedTab={setSelectedTab}
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

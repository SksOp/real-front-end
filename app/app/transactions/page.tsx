"use client";

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
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function TransactionPage() {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = React.useState<string>("sales");
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [MatrixDataPage, setMatrixDataPage] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);

  useEffect(() => {
    const type = searchParams.get("type");
    setSelectedTab(type || "sales");
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const date = new Date();
      const presentYear = date.getFullYear();
      if (selectedTab === "sales") {
        const response = await SalesTransactionApi(1);
        const sourceURL = `${BASE_URL}/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;
        const matrixOutput = await CalculateMatrix(sourceURL, "sales");
        setMatrixDataPage(matrixOutput);
        setTotalPages(response.totalPages);
        setTransactions(response.transactions);
      } else {
        const response = await RentalTransactionApi(1);
        const sourceURL = `${BASE_URL}/api/rental/average?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;
        const matrixOutput = await CalculateMatrix(sourceURL, "rental");
        setMatrixDataPage(matrixOutput);
        setTotalPages(response.totalPages);
        setTransactions(response.transactions);
      }
    };

    fetchTransactions();
  }, [selectedTab]);

  return (
    <Layout page="transactions" title="Transactions">
      <div className="flex flex-col gap-3 px-3 md:py-20 py-16 md:hidden">
        <TransactionTabs
          matrixData={MatrixDataPage}
          defaultTab={selectedTab}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <TransactionsList selectedTab={selectedTab} />
      </div>

      <div className="hidden md:flex w-full gap-3 px-3 py-20">
        <div className="w-2/3 flex flex-col gap-3">
          <TransactionTabs
            matrixData={MatrixDataPage}
            defaultTab={selectedTab}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <TransactionTable
            selectedTab={selectedTab}
            selectedRow={selectedRow}
            onRowSelect={(index) => setSelectedRow(index)}
            totalPages={totalPages}
            data={transactions}
          />
        </div>
        <div className="w-1/3">
          <InsightDrawerView />
        </div>
      </div>
    </Layout>
  );
}

export default TransactionPage;

"use client";
import HomeTransactionCard from "@/components/home-transaction-card";
import InsightDrawerView from "@/components/insightDrawerView";
import SecondaryNavbar from "@/components/secondaryNavbar";
import TransactionCard from "@/components/transaction-card";
import TransactionsList from "@/components/transaction-list";
import TransactionTabs from "@/components/transaction-tabs";
import TransactionTable from "@/components/transactionTable";
import { BASE_URL } from "@/config/constant";
import { CalculateMatrix, SalesTransactionApi } from "@/config/utility";
import Layout from "@/layout/secondary";
import React, { useEffect } from "react";

function SalesTransactionPage() {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [MatrixDataPage, setMatrixDataPage] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await SalesTransactionApi(1);
      const date = new Date();
      const presentYear = date.getFullYear();
      const sourceURL = `${BASE_URL}/api/transaction/trends?start_year=${
        presentYear - 1
      }&end_year=${presentYear}`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales");
      setMatrixDataPage(matrixOutput);
      setTotalPages(response.totalPages);
      setTransactions(response.transactions);
    };

    fetchTransactions();
  }, []);

  return (
    <Layout page="transactions" title="Sales Transactions">
      <div className="flex flex-col gap-3 px-3 py-20 md:hidden">
        {/* <TransactionTabs  /> */}
        {/* <TransactionsList /> */}
      </div>

      <div className="hidden md:flex w-full gap-3 px-3 py-20">
        <div className="w-2/3 flex flex-col gap-3">
          {/* <HomeTransactionCard cardItems={MatrixDataPage} /> */}
          <TransactionTable
            selectedTab="sales"
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

export default SalesTransactionPage;

import React, { useState, useEffect, useRef } from "react";
import TransactionTabs from "./transaction-tabs";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import TransactionCard from "./transaction-card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import InsightDrawerView from "./insightDrawerView";

interface TransactionsListProps {
  selectedTab: string;
  filters: {
    [key: string]: string | number;
  };
}

const TransactionsList = ({ selectedTab, filters }: TransactionsListProps) => {
  const [transactions, setTransactions] = useState<any[]>([]); // List of transactions
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Check if more data is available
  const observer = useRef<IntersectionObserver | null>(null); // Ref for the observer

  // Observe the last element
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedTab === "sales"
            ? await SalesTransactionApi(page, filters)
            : selectedTab === "mortgage"
            ? await SalesTransactionApi(page, {
                ...filters,
                group_en: "Mortgage",
              })
            : await RentalTransactionApi(page, filters);

        setTransactions((prev) =>
          page === 1
            ? response.transactions
            : [...prev, ...response.transactions]
        ); // Reset list on tab change
        setHasMore(page < response.totalPages); // Stop fetching if no more pages
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setHasMore(false); // Stop further attempts if an error occurs
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, selectedTab, filters]);

  useEffect(() => {
    setTransactions([]);
    setPage(1);
    setHasMore(true);
  }, [selectedTab, filters]);

  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction, index) => (
        <Drawer>
          <DrawerTrigger>
            <TransactionCard key={index} {...transaction} />
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] p-0 ">
            <InsightDrawerView location_name={transaction.areaName} />
          </DrawerContent>
        </Drawer>
      ))}
      {/* Loader or End of List */}
      <div ref={lastElementRef}>
        {isLoading && <p>Loading...</p>}
        {!hasMore && <p>No more transactions</p>}
      </div>
    </div>
  );
};

export default TransactionsList;

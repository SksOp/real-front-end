import React, { useState, useEffect, useRef, useCallback } from "react";
import TransactionTabs from "./transaction-tabs";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import TransactionCard from "./transaction-card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import InsightDrawerView from "./insightDrawerView";
import LoadingWidget from "./loadingWidget";
import { Spinner } from "./ui/spinner";
import { useAuth } from "@/lib/auth";
import ChartException from "./chartException";

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
  const auth = useAuth();

  // Observe the last element
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await auth.user?.getIdToken(true);
      const extractYear = filters?.end_date
        ? new Date(filters.end_date).getFullYear()
        : NaN;
      const presentYear = !Number.isNaN(extractYear)
        ? extractYear
        : new Date().getFullYear();

      const filterParams = {
        ...filters,
        start_year: presentYear - 1,
        end_year: presentYear,
      };

      const response =
        selectedTab === "sales"
          ? await SalesTransactionApi(page, filterParams, token)
          : selectedTab === "mortgage"
          ? await SalesTransactionApi(
              page,
              {
                ...filterParams,
                group_en: "Mortgage",
              },
              token
            )
          : await RentalTransactionApi(page, filterParams, token);

      setTransactions((prev) =>
        page === 1 ? response.transactions : [...prev, ...response.transactions]
      ); // Reset list on tab change
      setHasMore(page < response.totalPages); // Stop fetching if no more pages
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setHasMore(false); // Stop further attempts if an error occurs
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedTab, filters]);

  useEffect(() => {
    fetchTransactions();
  }, [page, selectedTab, filters, fetchTransactions]);

  useEffect(() => {
    setTransactions([]);
    setPage(1);
    setHasMore(true);
  }, [selectedTab, filters]);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, hasMore]);

  return (
    <div className="flex flex-col gap-3 w-full">
      {transactions.map((transaction, index) => (
        <Drawer key={index}>
          <DrawerTrigger>
            <TransactionCard
              key={index}
              selectedTab={selectedTab}
              {...transaction}
            />
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] p-0 ">
            <InsightDrawerView location_name={transaction.areaName} />
          </DrawerContent>
        </Drawer>
      ))}
      {/* Loader or End of List */}
      <div ref={lastElementRef} className="w-full text-center">
        {isLoading && <LoadingWidget className="min-h-[calc(100vh-10rem)]" />}
        {!hasMore && <ChartException />}
      </div>
    </div>
  );
};

export default TransactionsList;

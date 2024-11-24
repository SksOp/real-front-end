import React, { useState, useEffect, useRef } from "react";
import TransactionTabs from "./transaction-tabs";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import TransactionCard from "./transaction-card";

interface TransactionsListProps {
  selectedTab: string;
}

const TransactionsList = ({ selectedTab }: TransactionsListProps) => {
  const [transactions, setTransactions] = useState<any[]>([]); // List of transactions
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Check if more data is available
  const observer = useRef<IntersectionObserver | null>(null); // Ref for the observer

  // Observe the last element
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1); // Increment page number
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [hasMore, isLoading]);

  // Fetch transactions dynamically
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedTab === "sales"
            ? await SalesTransactionApi(page)
            : await RentalTransactionApi(page);

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
  }, [page, selectedTab]);

  useEffect(() => {
    setTransactions([]);
    setPage(1);
    setHasMore(true);
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} {...transaction} />
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

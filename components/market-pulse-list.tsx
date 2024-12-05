"use client";
import React, { useEffect, useRef, useState } from "react";
import MarketPulseCard from "./market-pulse-card";
import { MarketPulseApi } from "@/config/utility";

function MarketPulseList() {
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
        const response = await MarketPulseApi(page);

        // Append new transactions to the list and check if there are more
        if (response && response.length > 0) {
          setTransactions((prev) => [...prev, ...response]);
        } else {
          setHasMore(false); // No more data to fetch
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setHasMore(false); // Stop further attempts if an error occurs
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.map((transaction, index) => (
          <MarketPulseCard key={index} {...transaction} />
        ))}
        {/* Loader or End of List */}
        <div ref={lastElementRef}>
          {isLoading && <p>Loading...</p>}
          {!hasMore && <p>No more transactions</p>}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-4 gap-x-4">
        {transactions.map((transaction, index) => (
          <MarketPulseCard key={index} {...transaction} />
        ))}
        <div ref={lastElementRef}>
          {isLoading && <p>Loading...</p>}
          {!hasMore && <p>No more transactions</p>}
        </div>
      </div>
    </>
  );
}

export default MarketPulseList;

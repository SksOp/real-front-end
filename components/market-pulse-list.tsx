"use client";
import React, { useEffect, useRef, useState } from "react";
import MarketPulseCard from "./market-pulse-card";
import { MarketPulseApi, MarketPulseRentalApi } from "@/config/utility";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import InsightDrawerView from "./insightDrawerView";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Spinner } from "./ui/spinner";

function MarketPulseList() {
  const [activeTab, setActiveTab] = useState("sales");

  // States for sales data
  const [salesTransactions, setSalesTransactions] = useState<any[]>([]);
  const [salesPage, setSalesPage] = useState(1);
  const [isSalesLoading, setIsSalesLoading] = useState(false);
  const [hasMoreSales, setHasMoreSales] = useState(true);

  // States for rental data
  const [rentalTransactions, setRentalTransactions] = useState<any[]>([]);
  const [rentalPage, setRentalPage] = useState(1);
  const [isRentalLoading, setIsRentalLoading] = useState(false);
  const [hasMoreRentals, setHasMoreRentals] = useState(true);

  // Refs for the last elements
  const mobileLastElementRef = useRef<HTMLDivElement | null>(null);
  const desktopLastElementRef = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  // Lazy loading observer
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const targetEntry = entries.find((entry) => entry.isIntersecting);
        if (targetEntry) {
          if (activeTab === "sales" && hasMoreSales && !isSalesLoading) {
            setSalesPage((prev) => prev + 1);
          } else if (
            activeTab === "rental" &&
            hasMoreRentals &&
            !isRentalLoading
          ) {
            setRentalPage((prev) => prev + 1);
          }
        }
      },
      { threshold: 1.0 }
    );

    const observeTarget =
      window.innerWidth < 768
        ? mobileLastElementRef.current
        : desktopLastElementRef.current;

    if (observeTarget) {
      observer.current.observe(observeTarget);
    }

    return () => observer.current?.disconnect();
  }, [
    activeTab,
    hasMoreSales,
    isSalesLoading,
    hasMoreRentals,
    isRentalLoading,
  ]);

  // Fetch sales transactions
  useEffect(() => {
    const fetchSalesTransactions = async () => {
      setIsSalesLoading(true);
      try {
        const response = await MarketPulseApi(salesPage);
        if (response && response.length > 0) {
          setSalesTransactions((prev) => [...prev, ...response]);
        } else {
          setHasMoreSales(false);
        }
      } catch (error) {
        console.error("Error fetching sales transactions:", error);
        setHasMoreSales(false);
      } finally {
        setIsSalesLoading(false);
      }
    };

    if (activeTab === "sales") fetchSalesTransactions();
  }, [salesPage, activeTab]);

  // Fetch rental transactions
  useEffect(() => {
    const fetchRentalTransactions = async () => {
      setIsRentalLoading(true);
      try {
        const response = await MarketPulseRentalApi(rentalPage);
        if (response && response.length > 0) {
          setRentalTransactions((prev) => [...prev, ...response]);
        } else {
          setHasMoreRentals(false);
        }
      } catch (error) {
        console.error("Error fetching rental transactions:", error);
        setHasMoreRentals(false);
      } finally {
        setIsRentalLoading(false);
      }
    };

    if (activeTab === "rental") fetchRentalTransactions();
  }, [rentalPage, activeTab]);

  return (
    <Tabs defaultValue="sales" onValueChange={(value) => setActiveTab(value)}>
      <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll">
        <TabsTrigger
          value="sales"
          className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
        >
          Sales
        </TabsTrigger>
        <TabsTrigger
          value="rental"
          className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
        >
          Rental
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sales" className="w-full mt-1">
        <div className="flex flex-col gap-3 md:hidden">
          {salesTransactions.map((transaction, index) => (
            <Drawer key={index}>
              <DrawerTrigger>
                <MarketPulseCard type={activeTab} {...transaction} />
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh] p-0 ">
                <InsightDrawerView
                  priceperSqft={transaction.avg_price_per_sqft}
                  location_name={transaction.area_name}
                />
              </DrawerContent>
            </Drawer>
          ))}
          <div ref={mobileLastElementRef}>
            {isSalesLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
                <div className="ml-2">Loading...</div>
              </div>
            )}
            {!hasMoreSales && <p>No more sales transactions</p>}
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          {salesTransactions.map((transaction, index) => (
            <Sheet key={index}>
              <SheetTrigger>
                <MarketPulseCard type={activeTab} {...transaction} />
              </SheetTrigger>
              <SheetContent className="p-0 max-h-full min-w-[30%] overflow-y-auto pb-2">
                <InsightDrawerView
                  priceperSqft={transaction.avg_price_per_sqft}
                  location_name={transaction.area_name}
                />
              </SheetContent>
            </Sheet>
          ))}
          <div ref={desktopLastElementRef}>
            {isSalesLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
                <div className="ml-2">Loading...</div>
              </div>
            )}
            {!hasMoreSales && <p>No more sales transactions</p>}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="rental" className="w-full mt-1">
        <div className="flex flex-col gap-3 md:hidden">
          {rentalTransactions.map((transaction, index) => (
            <Drawer key={index}>
              <DrawerTrigger>
                <MarketPulseCard type={activeTab} {...transaction} />
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh] p-0 ">
                <InsightDrawerView
                  priceperSqft={transaction.avg_price_per_sqft}
                  location_name={transaction.area_name}
                />
              </DrawerContent>
            </Drawer>
          ))}
          <div ref={mobileLastElementRef}>
            {isRentalLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
                <div className="ml-2">Loading...</div>
              </div>
            )}
            {!hasMoreRentals && <p>No more rental transactions</p>}
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          {rentalTransactions.map((transaction, index) => (
            <Sheet key={index}>
              <SheetTrigger>
                <MarketPulseCard type={activeTab} {...transaction} />
              </SheetTrigger>
              <SheetContent className="p-0 max-h-full min-w-[30%] overflow-y-auto pb-2">
                <InsightDrawerView
                  priceperSqft={transaction.avg_price_per_sqft}
                  location_name={transaction.area_name}
                />
              </SheetContent>
            </Sheet>
          ))}
          <div ref={desktopLastElementRef}>
            {isRentalLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
                <div className="ml-2">Loading...</div>
              </div>
            )}
            {!hasMoreRentals && <p>No more rental transactions</p>}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default MarketPulseList;

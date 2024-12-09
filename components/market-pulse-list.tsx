"use client";
import React, { useEffect, useRef, useState } from "react";
import MarketPulseCard from "./market-pulse-card";
import { MarketPulseApi, MarketPulseRentalApi } from "@/config/utility";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import InsightDrawerView from "./insightDrawerView";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

function MarketPulseList() {
  const [activeTab, setActiveTab] = useState("sales"); // Active tab state

  // Sales state
  const [salesTransactions, setSalesTransactions] = useState<any[]>([]);
  const [salesPage, setSalesPage] = useState(1);
  const [isSalesLoading, setIsSalesLoading] = useState(false);
  const [hasMoreSales, setHasMoreSales] = useState(true);

  // Rental state
  const [rentalTransactions, setRentalTransactions] = useState<any[]>([]);
  const [rentalPage, setRentalPage] = useState(1);
  const [isRentalLoading, setIsRentalLoading] = useState(false);
  const [hasMoreRentals, setHasMoreRentals] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [
    activeTab,
    hasMoreSales,
    isSalesLoading,
    hasMoreRentals,
    isRentalLoading,
  ]);

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

  useEffect(() => {
    const fetchRentalTransactions = async () => {
      setIsRentalLoading(true);
      try {
        const response = await MarketPulseRentalApi(rentalPage);
        console.log(response);
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
    <>
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
              <Drawer>
                <DrawerTrigger>
                  <MarketPulseCard
                    key={index}
                    type={activeTab}
                    {...transaction}
                  />
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh] p-0 ">
                  <InsightDrawerView
                    priceperSqft={
                      activeTab === "sales"
                        ? transaction.avg_price_per_sqft
                        : null
                    }
                    location_name={transaction.area_name}
                  />
                </DrawerContent>
              </Drawer>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-4 md:gap-x-4">
            {salesTransactions.map((transaction, index) => (
              <Sheet>
                <SheetTrigger>
                  <MarketPulseCard
                    key={index}
                    type={activeTab}
                    {...transaction}
                  />
                </SheetTrigger>
                <SheetContent className="p-0  max-h-full min-w-[30%] overflow-y-auto pb-2">
                  <InsightDrawerView
                    priceperSqft={
                      activeTab === "sales"
                        ? transaction.avg_price_per_sqft
                        : null
                    }
                    location_name={transaction.area_name}
                  />
                </SheetContent>
              </Sheet>
            ))}
            <div ref={lastElementRef}>
              {isSalesLoading && <p>Loading...</p>}
              {!hasMoreSales && <p>No more sales transactions</p>}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="rental" className="w-full mt-1">
          <div className="flex flex-col gap-3 md:hidden">
            {rentalTransactions.map((transaction, index) => (
              <Drawer>
                <DrawerTrigger>
                  <MarketPulseCard
                    key={index}
                    type={activeTab}
                    {...transaction}
                  />
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh] p-0 ">
                  <InsightDrawerView
                    priceperSqft={
                      activeTab === "sales"
                        ? transaction.avg_price_per_sqft
                        : null
                    }
                    location_name={transaction.area_name}
                  />
                </DrawerContent>
              </Drawer>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-4 md:gap-x-4">
            {rentalTransactions.map((transaction, index) => (
              <Sheet>
                <SheetTrigger>
                  <MarketPulseCard
                    key={index}
                    type={activeTab}
                    {...transaction}
                  />
                </SheetTrigger>
                <SheetContent className="p-0  max-h-full min-w-[30%] overflow-y-auto pb-2">
                  <InsightDrawerView
                    priceperSqft={
                      activeTab === "sales"
                        ? transaction.avg_price_per_sqft
                        : null
                    }
                    location_name={transaction.area_name}
                  />
                </SheetContent>
              </Sheet>
            ))}
            <div ref={lastElementRef}>
              {isSalesLoading && <p>Loading...</p>}
              {!hasMoreSales && <p>No more sales transactions</p>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default MarketPulseList;

"use client";
import CarouselAd from "@/components/carouselAd";
import ChartWrapper from "@/components/chart/chartWrapper";
import DonutChartComponent from "@/components/chart/donutChart/donutChart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import ChartException from "@/components/chartException";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import FrequentQuestions from "@/components/frequent-questions";
import HomeClaimCard from "@/components/home-claim-card";
import HomeInsights from "@/components/home-insights";
import HomeIntro from "@/components/home-intro";
import HomeListing from "@/components/home-listing";
import HomePriceIndex from "@/components/home-price-index";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTopAreas from "@/components/home-top-areas";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTransactionCard from "@/components/home-transaction-card";
import HomeTransactionList from "@/components/home-transaction-list";
import HomeTransactionValue from "@/components/home-transaction-value";
import HomeVolumeIndex from "@/components/home-volume-index";
import InsightCard from "@/components/insightCard";
import SecondaryChartWrapper from "@/components/secondaryChartWrapper";
import SharingCard from "@/components/sharingCard";
import { SalesIndex, SalesPriceRanges } from "@/config/sales";
import { ChartDescription } from "@/config/types";
import Layout from "@/layout/home";
import { useAuth } from "@/lib/auth";
import React, { useEffect, useState } from "react";

function HomePage() {
  const auth = useAuth();
  const [name, setName] = useState<string | null>(null);

  const [greeting, setGreeting] = useState<string>("Good Morning");

  useEffect(() => {
    if (auth?.user) {
      const displayName = auth.user.displayName?.split(" ")[0];
      setName(displayName || "Name");
    }

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [auth]);

  return (
    <Layout page="home">
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden mt-20 px-3 flex flex-col gap-3">
        <div className="flex flex-col gap-4 px-2">
          <h1 className="text-2xl bg-gradient-to-r from-[#6351E9] to-[#121114] text-transparent bg-clip-text font-bold">
            <span className="">Hello {name}</span>{" "}
            <span className="inline-block text-black">👋</span>,
            <br />
            {greeting}!
          </h1>
        </div>
        <HomeTransactionCard />
        <HomeInsights />
        <CarouselAd />
        <HomeSalesIndex />
        <HomeTotalAds />
        <HomeTopAreas />
        <HomePriceIndex />
        <HomeTransactionValue />
        <HomeListing />
        <FrequentQuestions />
        <HomeClaimCard />
        <SharingCard />
        <Footer />
      </div>
      <div className="hidden pt-20 md:flex gap-3 w-full px-4 pb-0">
        <div className="w-1/4 min-w-[220px] hidden border rounded-xl p-2 max-h-[calc(100vh-5rem)] overflow-y-auto md:flex flex-col gap-3 pb-4">
          <HomeIntro />
          <FrequentQuestions />
          <HomeClaimCard />
          <Feedback />
          <SharingCard />
        </div>
        <div className="w-3/4  max-h-[calc(100vh-5rem)] overflow-y-auto flex flex-col gap-3">
          <HomeTransactionCard />
          <div className="grid grid-cols-2 w-full gap-3 gap-x-4">
            <div className="flex flex-col gap-3">
              <HomeInsights />
            </div>
            <div className="flex flex-col gap-3">
              <HomeListing />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full items-start  gap-3 gap-x-4">
            <div className="flex flex-col gap-3">
              <HomeSalesIndex />
              <HomeTopAreas />
              <HomePriceIndex />
            </div>
            <div className="flex flex-col gap-3">
              <HomeVolumeIndex />
              <HomeTotalAds />
              <HomeTransactionList />
            </div>
          </div>
          <HomeTransactionValue />
          <Footer />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

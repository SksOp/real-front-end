"use client";
import Footer from "@/components/footer";
import FrequentQuestions from "@/components/frequent-questions";
import HomeInsights from "@/components/home-insights";
import HomeListing from "@/components/home-listing";
import HomePriceIndex from "@/components/home-price-index";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTopAreas from "@/components/home-top-areas";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTransactionCard from "@/components/home-transaction-card";
import SharingCard from "@/components/sharingCard";
import Layout from "@/layout/home";
import React from "react";

function HomePage() {
  return (
    <Layout page="home">
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA]  mt-20 px-3 flex flex-col gap-3">
        <HomeTransactionCard
          cardItems={[
            { title: "Average Rental Value", value: "120 K", growth: -21 },
            { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
            { title: "Total Value", value: "165 K", growth: 21 },
            { title: "No of Transactions", value: "20", growth: -21 },
          ]}
        />
        <HomeInsights />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HomeSalesIndex />
          <HomeTotalAds />
          <HomeTopAreas />
          <HomePriceIndex />
          <HomeListing />
          <FrequentQuestions />
          <SharingCard />
        </div>

        <Footer />
      </div>
    </Layout>
  );
}

export default HomePage;

"use client";
import HomeInsights from "@/components/home-insights";
import HomeListing from "@/components/home-listing";
import HomePriceIndex from "@/components/home-price-index";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTopAreas from "@/components/home-top-areas";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTransactionCard from "@/components/home-transaction-card";
import Layout from "@/layout";
import Navbar from "@/layout/nav/navBar";
import React from "react";

function HomePage() {
  return (
    <Layout page="home">
      <Navbar />
      <div className="w-full mt-16 px-4 flex flex-col mb-24 gap-4">
        <HomeTransactionCard />
        <HomeInsights />
        <HomeTotalAds />
        <HomeSalesIndex />
        <HomePriceIndex />
        <HomeTopAreas />
        <HomeListing />
      </div>
    </Layout>
  );
}

export default HomePage;

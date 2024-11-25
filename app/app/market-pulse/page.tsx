import MarketPulseCard from "@/components/market-pulse-card";
import MarketPulseList from "@/components/market-pulse-list";
import Layout from "@/layout/secondary";
import React from "react";

function page() {
  return (
    <Layout page="market-pulse" title="Market Pulse">
      <div className="flex flex-col gap-3 px-3 md:py-20 py-16 md:hidden">
        <h3>Area</h3>
        <MarketPulseList />
      </div>
    </Layout>
  );
}

export default page;

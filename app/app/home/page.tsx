"use client";
import ChartWrapper from "@/components/chart/chartWrapper";
import DonutChartComponent from "@/components/chart/donutChart/donutChart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import ChartException from "@/components/chartException";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import FrequentQuestions from "@/components/frequent-questions";
import HomeInsights from "@/components/home-insights";
import HomeIntro from "@/components/home-intro";
import HomeListing from "@/components/home-listing";
import HomePriceIndex from "@/components/home-price-index";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTopAreas from "@/components/home-top-areas";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTransactionCard from "@/components/home-transaction-card";
import HomeTransactionList from "@/components/home-transaction-list";
import HomeVolumeIndex from "@/components/home-volume-index";
import InsightCard from "@/components/insightCard";
import SecondaryChartWrapper from "@/components/secondaryChartWrapper";
import SharingCard from "@/components/sharingCard";
import { SalesIndex, SalesPriceRanges } from "@/config/sales";
import { ChartDescription } from "@/config/types";
import Layout from "@/layout/home";
import React, { useEffect } from "react";

function HomePage() {
  const [salesIndex, setSalesIndex] = React.useState<any[]>([]);
  const [priceRange, setPriceRange] = React.useState<ChartDescription>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await SalesIndex();
      const response2 = await SalesPriceRanges();
      setPriceRange(response2);
      setSalesIndex(response.data);
    };
    fetchData();
  }, []);

  return (
    <Layout page="home">
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden mt-20 px-3 flex flex-col gap-3">
        <HomeTransactionCard />
        <HomeInsights />
        <HomeSalesIndex />
        <HomeTotalAds />
        <HomeTopAreas />
        <HomePriceIndex />
        <HomeListing />
        <FrequentQuestions />
        <SharingCard />
        <Footer />
      </div>
      <div className="hidden mt-20 md:flex gap-3 w-full px-4 mb-4">
        <div className="w-1/4 border rounded-xl p-2 max-h-screen overflow-y-auto flex flex-col gap-3">
          <HomeIntro />
          <FrequentQuestions />
          <Feedback />
          <SharingCard />
        </div>
        <div className="w-3/4  max-h-screen overflow-y-auto flex flex-col gap-3">
          <HomeTransactionCard />
          <div className="flex gap-3 ">
            <HomeInsights />
            <HomeListing />
          </div>
          <div className="grid grid-cols-2 items-start auto-rows-min gap-3 gap-x-4">
            <HomeSalesIndex />
            <HomeVolumeIndex />
            <HomeTopAreas />
            <HomeTotalAds />
            <HomePriceIndex />
            <HomeTransactionList />
          </div>
          <ChartWrapper title="Transactions Value Index">
            <div className="flex justify-center items-center gap-3">
              <SecondaryChartWrapper className="">
                <div className="flex flex-col gap-3">
                  <SalesIndexCardComponent
                    percentile25={salesIndex[0]}
                    percentile75={salesIndex[1]}
                    knob={(salesIndex[1] + salesIndex[0]) / 2}
                  />
                  <InsightCard>
                    Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam
                    interdum morbi eu elit. Neque Average price: 750000.{" "}
                  </InsightCard>
                </div>
              </SecondaryChartWrapper>
              <SecondaryChartWrapper>
                {priceRange ? (
                  <DonutChartComponent
                    chartConfig={priceRange?.chartConfig}
                    data={priceRange.data}
                    dataKey="value"
                    nameKey="name"
                  />
                ) : (
                  <ChartException />
                )}
              </SecondaryChartWrapper>
            </div>
          </ChartWrapper>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

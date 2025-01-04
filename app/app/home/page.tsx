"use client";
import CarouselAd from "@/components/carouselAd";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import FrequentQuestions from "@/components/frequent-questions";
import HomeClaimCard from "@/components/home-claim-card";
import HomeInsights from "@/components/home-insights";
import HomeIntro from "@/components/home-intro";
import HomeIntroCard from "@/components/home-introCard";
import HomeKeypilot from "@/components/home-keypilot";
import HomeListing from "@/components/home-listing";
import HomeMatrics from "@/components/home-matrics";
import HomePriceIndex from "@/components/home-price-index";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeToolbox from "@/components/home-toolbox";
import HomeTopAreas from "@/components/home-top-areas";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTransactionCard from "@/components/home-transaction-card";
import HomeTransactionList from "@/components/home-transaction-list";
import HomeTransactionValue from "@/components/home-transaction-value";
import HomeUsecase from "@/components/home-usecase";
import HomeVolumeIndex from "@/components/home-volume-index";
import IntoCard from "@/components/intoCard";
import SharingCard from "@/components/sharingCard";
import {
  HomeAgencyItems,
  HomeMatricsItems,
  HomeToolsItems,
} from "@/constants/homeItems";
import Layout from "@/layout/home";
import { AreaPerformanceInsightLogo } from "@/public/svg/insights";
import React from "react";

function HomePage() {
  return (
    <Layout page="home">
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden pt-14 px-3 flex flex-col gap-3">
        <HomeIntroCard />
        <HomeTransactionCard />
        <CarouselAd />
        <HomeToolbox />
        <HomeUsecase />
        <HomeKeypilot />
        {/* <FrequentQuestions />
        <HomeClaimCard />
        <SharingCard /> */}
        <Footer />
      </div>
      <div className="hidden pt-20 md:flex gap-3 w-full px-4 pb-0">
        <div className="w-1/4 min-w-[220px] hidden border rounded-xl p-2 max-h-[calc(100vh-6rem)] overflow-y-auto md:flex flex-col gap-3 pb-4">
          <HomeIntro />
          <HomeKeypilot />
          <FrequentQuestions />
          <HomeClaimCard />
          <Feedback />
          <SharingCard />
        </div>
        <div className="w-3/4  max-h-[calc(100vh-6rem)] overflow-y-auto flex flex-col gap-3">
          <HomeTransactionCard />
          <HomeMatrics title="Insights & Metrics" items={HomeMatricsItems} />
          <HomeMatrics title="Tools & Trackers" items={HomeToolsItems} />
          <HomeMatrics title="Agency Management" items={HomeAgencyItems} />
          <Footer />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

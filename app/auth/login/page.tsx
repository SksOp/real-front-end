"use client";
import HomeTransactionCard from "@/components/home-transaction-card";
import HomeInsights from "@/components/home-insights";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTopAreas from "@/components/home-top-areas";
import HomePriceIndex from "@/components/home-price-index";
import HomeListing from "@/components/home-listing";
import FrequentQuestions from "@/components/frequent-questions";
import HomeIntro from "@/components/home-intro";
import HomeTransactionList from "@/components/home-transaction-list";
import HomeVolumeIndex from "@/components/home-volume-index";
import SharingCard from "@/components/sharingCard";
import HomeTransactionValue from "@/components/home-transaction-value";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import SignupTrigger from "@/components/signupTrigger";
import LoginTrigger from "@/components/loginTrigger";
import CarouselAd from "@/components/carouselAd";
import HomeClaimCard from "@/components/home-claim-card";
import HomeIntroCard from "@/components/home-introCard";
import HomeToolbox from "@/components/home-toolbox";
import HomeUsecase from "@/components/home-usecase";
import HomeKeypilot from "@/components/home-keypilot";

const SignIn = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden pt-14 px-3 flex flex-col gap-4">
        <HomeIntroCard />
        <HomeTransactionCard />
        <CarouselAd />
        <HomeToolbox />
        <HomeUsecase />
        <HomeKeypilot />
        <Footer />
      </div>
      <div className="hidden pt-20 md:flex gap-3 w-full px-4 pb-0">
        <div className="w-1/4 min-w-[220px] hidden border rounded-xl p-2 max-h-[calc(100vh-5rem)] overflow-y-auto md:flex flex-col gap-3 pb-4">
          <HomeIntro />
          <HomeClaimCard />
          <FrequentQuestions />
          <SharingCard />
        </div>
        <div className="w-3/4  max-h-[calc(100vh-5rem)] overflow-y-auto flex flex-col gap-3">
          <HomeTransactionCard />
          <div className="grid grid-cols-2 w-full gap-3 gap-x-4">
            <div className="flex flex-col gap-3">
              <HomeInsights />
            </div>
            <div className="flex flex-col gap-3">
              <LoginTrigger className="">
                <HomeListing />
              </LoginTrigger>
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
    </div>
  );
};

export default SignIn;

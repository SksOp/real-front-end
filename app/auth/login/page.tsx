"use client";
import HomeTransactionCard from "@/components/home-transaction-card";
import FrequentQuestions from "@/components/frequent-questions";
import HomeIntro from "@/components/home-intro";
import SharingCard from "@/components/sharingCard";
import Footer from "@/components/footer";
import CarouselAd from "@/components/carouselAd";
import HomeClaimCard from "@/components/home-claim-card";
import HomeIntroCard from "@/components/home-introCard";
import HomeToolbox from "@/components/home-toolbox";
import HomeUsecase from "@/components/home-usecase";
import HomeKeypilot from "@/components/home-keypilot";
import Feedback from "@/components/feedback";
import HomeMatrics from "@/components/home-matrics";
import {
  HomeAgencyItems,
  HomeMatricsItems,
  HomeToolsItems,
} from "@/constants/homeItems";
import HomeLoginCards from "@/components/home-login-cards";

const SignIn = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden pt-14 px-3 flex flex-col gap-4">
        <HomeLoginCards
          title="Win more deals with dubai’s most advanced & reliable broker insights
            platform."
          description="This app helps you plan how to move up the ladder and be the top
            broker!"
        />
        <HomeTransactionCard />
        <CarouselAd />
        <HomeToolbox />
        <HomeLoginCards title="Join Dubai’s Top 1% Broker Club. Put Your Success on Copilot!" />
        <HomeUsecase />
        <HomeLoginCards title="Being broker is awesome, Keypilot will make it even better with real time insights." />
        <HomeKeypilot />
        <HomeLoginCards title="Everything you need under one roof, for a successful real estate journey!" />
        <FrequentQuestions />
        <Footer />
      </div>
      <div className="hidden pt-20 md:flex gap-3 w-full px-4 pb-0">
        <div className="w-1/4 min-w-[220px] hidden border rounded-xl p-2 max-h-[calc(100vh-6rem)] overflow-y-auto md:flex flex-col gap-3 pb-4">
          <HomeIntro />
          <HomeKeypilot />
          <FrequentQuestions />
          {/* <HomeClaimCard /> */}
          {/* <Feedback /> */}
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
    </div>
  );
};

export default SignIn;

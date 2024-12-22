"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import HomeTransactionCard from "@/components/home-transaction-card";
import HomeInsights from "@/components/home-insights";
import HomeSalesIndex from "@/components/home-sales-index";
import HomeTotalAds from "@/components/home-total-ads";
import HomeTopAreas from "@/components/home-top-areas";
import HomePriceIndex from "@/components/home-price-index";
import HomeListing from "@/components/home-listing";
import Feedback from "@/components/feedback";
import FrequentQuestions from "@/components/frequent-questions";
import HomeIntro from "@/components/home-intro";
import HomeTransactionList from "@/components/home-transaction-list";
import HomeVolumeIndex from "@/components/home-volume-index";
import SharingCard from "@/components/sharingCard";
import HomeTransactionValue from "@/components/home-transaction-value";
import HomeClaimCard from "@/components/home-claim-card";
import Footer from "@/components/footer";
import Layout from "@/layout/home";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignInModel from "@/components/signInModel";
import LogInModel from "@/components/logInModel";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SignupTrigger from "@/components/signupTrigger";
import LoginTrigger from "@/components/loginTrigger";
import CarouselAd from "@/components/carouselAd";

const SignIn = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden mt-20 px-3 flex flex-col gap-4">
        <div className="flex flex-col gap-5 pl-1">
          <h3 className="text-2xl bg-gradient-to-t from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
            Join Dubai’s Top 1% Broker Club. Put Your Success on Copilot!
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            This app helps you plan how to move up the ladder and be the top
            broker!
          </p>
          <div className="flex items-center justify-start gap-2">
            <div className="flex justify-start items-center gap-2 ">
              <SignupTrigger>
                <Button>Join Now </Button>
              </SignupTrigger>

              <LoginTrigger>
                <Button variant={"outline"} className="">
                  Sign In
                </Button>
              </LoginTrigger>
            </div>
          </div>
        </div>
        <HomeTransactionCard />
        <HomeInsights />
        <CarouselAd />
        <HomeSalesIndex />
        <HomeTotalAds />
        <HomeTopAreas />
        <HomePriceIndex />
        <LoginTrigger>
          <HomeListing />
        </LoginTrigger>
        <FrequentQuestions />
        <SharingCard />
        <Footer />
      </div>
      <div className="hidden pt-20 md:flex gap-3 w-full px-4 pb-0">
        <div className="w-1/4 min-w-[220px] hidden border rounded-xl p-2 max-h-[calc(100vh-5rem)] overflow-y-auto md:flex flex-col gap-3 pb-4">
          <HomeIntro />
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

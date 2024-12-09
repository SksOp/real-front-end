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

const SignIn = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-background to-[#FAFAFA] md:hidden mt-20 px-3 flex flex-col gap-3">
        <div className="flex flex-col gap-5 pl-1">
          <h3 className="text-secondary font-bold text-2xl ">
            Be the top 1% of{" "}
            <span className="text-primary">Dubai Brokers!</span>
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            This app helps you plan how to move up the ladder and be the top
            broker!
          </p>
          <div className="flex justify-start items-center gap-2 ">
            <Dialog>
              <DialogTrigger>
                <Button>Join Now </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[75vh]  overflow-y-scroll">
                <SignInModel />
              </DialogContent>
            </Dialog>

            {/* <Dialog>
              <DialogTrigger> */}
            <Button
              variant={"outline"}
              className="border-primary text-primary font-semibold"
            >
              Benefits for Agencies
            </Button>
            {/* </DialogTrigger>
              <DialogContent>
                <LogInModel />
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
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
    </div>
  );
};

export default SignIn;

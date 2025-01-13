"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  AddToHomeIcon,
  CalculatorIcon,
  ContactUsIcon,
  DailyReportsIcon,
  DashboardIcon,
  DevelopersIcon,
  KeyDriveIcon,
  LeaderboardIcon,
  LogoutIcon,
  MapViewIcon,
  MyPropertiesIcon,
  MyTeamsIcon,
  PortfolioIcon,
  PrivacyIcon,
  ProjectsIcon,
  SupportIcon,
  ThemeIcon,
  TNCIcon,
  TransactionIcon,
  UpdateIcon,
  VersionIcon,
} from "@/public/svg/sidebarIcons";
import { useRouter } from "next/navigation";
import { KeyMatricIcon, MarketPulseIcon } from "@/public/svg/navIcons";
import { User } from "firebase/auth";
import { logOut, useAuth } from "@/lib/auth";
import { DeveloperLogo } from "@/public/svg/dashboard";

function SidebarContent() {
  const router = useRouter();
  const auth = useAuth();
  const [user, setUser] = React.useState<User | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const user = auth.user;
    if (user) {
      setUser(user);
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-5 h-full w-full px-5 pt-9">
      <div className="flex items-center justify-start gap-2">
        <Avatar>
          <AvatarImage src={user?.photoURL || ""} alt="User" />
          <AvatarFallback className="text-xs">
            {user?.displayName ? user?.displayName[0] : "😊"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-center w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/dashboards")}
        >
          <DashboardIcon />
          Dashboards
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/calculators")}
        >
          <CalculatorIcon />
          Calculators
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/transactions?type=sales")}
        >
          <TransactionIcon />
          Sales Transactions
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/transactions?type=rental")}
        >
          <TransactionIcon />
          Rental Transactions
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/key-metrics")}
        >
          <KeyMatricIcon />
          Key Metrics
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/market-pulse")}
        >
          <MarketPulseIcon />
          Market Pulse
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-center w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/listings")}
        >
          <MyPropertiesIcon />
          My Properties
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/developers")}
        >
          <DevelopersIcon />
          Developers
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/projects")}
        >
          <ProjectsIcon />
          Projects
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/leaderboard")}
        >
          <LeaderboardIcon />
          Leaderboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/my-teams")}
        >
          <MyTeamsIcon />
          My Teams
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/real-drive")}
        >
          <KeyDriveIcon />
          Key Drive
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/daily-reports")}
        >
          <DailyReportsIcon />
          Daily Reports
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/map-view")}
        >
          <MapViewIcon />
          Map View
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/agent-portfolio")}
        >
          <PortfolioIcon />
          Portfolio Website
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/ask-ai")}
        >
          <img
            src="/imgs/ai.svg"
            alt="ai"
            className="w-5 h-5 object-cover animate-spin-slow"
          />
          Ask AI
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-center w-full ">
        {/* <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={handleAddToHomeScreen}
        >
          <AddToHomeIcon />
          Add to Home Screen
        </Button> */}
        {/* <div className="flex justify-between items-center hover:bg-primary/10 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start items-center hover:bg-transparent flex gap-3 text-secondary font-normal text-sm px-2"
          >
            <ThemeIcon />
            Dark mode
          </Button>
          <Switch />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
        >
          <ContactUsIcon />
          Request a Feature
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
        >
          <ContactUsIcon />
          Submit Feedback
        </Button> */}
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
        >
          <SupportIcon />
          Support
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/support/privacy")}
        >
          <PrivacyIcon />
          Privacy
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/support/terms")}
        >
          <TNCIcon />
          Terms & Conditions
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-red-500 font-normal text-sm px-2"
          onClick={logOut}
        >
          <LogoutIcon />
          Logout
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-center w-full  pb-4">
        {/* <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary-300 font-normal text-sm px-2"
        >
          <UpdateIcon />
          <div className="flex flex-col gap-1 items-start">
            <h3>Last updated at:</h3>
            <h3>23/DEC/2024 10:10:11</h3>
          </div>
        </Button> */}

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary-300 font-normal text-sm px-2"
        >
          <VersionIcon />
          Version: 10.1
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;

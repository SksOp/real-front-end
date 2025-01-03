"use client";
import LoginTrigger from "@/components/loginTrigger";
import SignupTrigger from "@/components/signupTrigger";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsList } from "@/components/ui/underline-tabs";
import { HamburgerIcon } from "@/public/svg/icons";
import { HomeLogo, MainLogo } from "@/public/svg/logo";
import { KeyMatricIcon, MarketPulseIcon } from "@/public/svg/navIcons";
import {
  AddToHomeIcon,
  CalculatorIcon,
  DashboardIcon,
  MyPropertiesIcon,
  PrivacyIcon,
  SupportIcon,
  TNCIcon,
  TransactionIcon,
} from "@/public/svg/sidebarIcons";
import { useRouter } from "next/navigation";
import React from "react";

function LoginLayout({ children }: { children: React.ReactNode }) {
  const [selectedTab, setSelectedTab] = React.useState<string>("home");
  const router = useRouter();

  const renderNavItems = ({
    items,
  }: {
    items: { icon: React.JSX.Element; label: string; action?: () => void }[];
  }) => {
    return (
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        {items.map(
          (item: {
            icon: React.JSX.Element;
            label: string;
            action?: () => void;
          }) => (
            <>
              {item?.action ? (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
                  onClick={item.action}
                >
                  {item.icon} {item.label}
                </Button>
              ) : (
                <LoginTrigger className="w-full">
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </LoginTrigger>
              )}
            </>
          )
        )}
      </div>
    );
  };

  const navItems = [
    { icon: <DashboardIcon />, label: "Dashboard" },
    { icon: <CalculatorIcon />, label: "Calculators" },
    { icon: <TransactionIcon />, label: "Sales Transactions" },
    { icon: <TransactionIcon />, label: "Rental Transactions" },
    { icon: <MyPropertiesIcon />, label: "My Properties" },
    { icon: <KeyMatricIcon />, label: "Key Matrics" },
    { icon: <MarketPulseIcon />, label: "Market Pulse" },
  ];

  const footerItems = [
    // { icon: <AddToHomeIcon />, label: "Add to Home Screen" },
    { icon: <SupportIcon />, label: "Support" },
    {
      icon: <PrivacyIcon />,
      label: "Privacy",
      action: () => router.push("/support/privacy"),
    },
    {
      icon: <TNCIcon />,
      label: "Terms & Conditions",
      action: () => router.push("/support/terms"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgrounds to-[#FAFAFA] max-w-screen overflow-y-auto pt-4 ">
      <nav className="w-full bg-background fixed flex justify-between shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] items-center z-50 px-5 py-4 top-0 ">
        <div className="flex justify-between items-center w-full md:hidden">
          <div className="flex items-center justify-start gap-3">
            <MainLogo className="w-6 h-6 animate-spin-slow" />
            <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>{" "}
          </div>
          <Sheet>
            <SheetTrigger>
              <HamburgerIcon />
            </SheetTrigger>
            <SheetContent side="right" className="p-0 overflow-y-scroll">
              <div className="flex flex-col justify-start items-start gap-5 h-full w-full px-5 pt-9 pb-6">
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
                <Separator />
                {renderNavItems({ items: navItems })}
                <Separator />
                {renderNavItems({ items: footerItems })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className=" justify-between items-center w-full hidden md:flex">
          <div className="md:flex justify-start gap-16 hidden">
            <div className="flex items-center justify-start gap-3">
              <MainLogo className="w-8 h-8 animate-spin-slow" />
              <h1 className="text-xl text-secondary font-bold">
                Keypilot.
              </h1>{" "}
            </div>

            <Tabs
              defaultValue={"home"}
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList>
                <LoginTrigger>
                  <TabsTrigger
                    value="home"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("home")}
                  >
                    {selectedTab === "home" && (
                      <HomeLogo className="stroke-[#121212]" />
                    )}
                    Home
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="dashboards"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("dashboards")}
                  >
                    {selectedTab === "dashboards" && <DashboardIcon />}
                    Dashboards
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="calculators"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("calculators")}
                  >
                    {selectedTab === "calculators" && <CalculatorIcon />}
                    Calculators
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="transactions"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("transactions")}
                  >
                    {selectedTab === "transactions" && <TransactionIcon />}
                    Transactions
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="my-listings"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("my-listings")}
                  >
                    {selectedTab === "my-listings" && <MyPropertiesIcon />}
                    My Properties
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="key-metrics"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("key-metrics")}
                  >
                    {selectedTab === "key-metrics" && <KeyMatricIcon />}
                    Key Metrics
                  </TabsTrigger>
                </LoginTrigger>
                <LoginTrigger>
                  <TabsTrigger
                    value="market-pulse"
                    className="text-sm flex items-center gap-1"
                    onClick={() => setSelectedTab("market-pulse")}
                  >
                    {selectedTab === "market-pulse" && <MarketPulseIcon />}
                    Market Pulse
                  </TabsTrigger>
                </LoginTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="md:flex items-center gap-3 hidden">
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
      </nav>
      {children}
    </div>
  );
}

export default LoginLayout;

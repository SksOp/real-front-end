"use client";
import Privacypage from "@/app/support/privacy/page";
import PrivacyContent from "@/components/privacyContent";
import PrivacyTrigger from "@/components/privacyTrigger";
import SidebarContent from "@/components/sidebarContent";
import TermsContent from "@/components/termsContent";
import TermsTrigger from "@/components/termsTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/underline-tabs";
import { logOut, useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { HamburgerIcon } from "@/public/svg/icons";
import { HomeLogo, MainLogo } from "@/public/svg/logo";
import {
  CompassIcon,
  InsightIcon,
  KeyMatricIcon,
  MarketPulseIcon,
  SelectedItemIcon,
  SettingIcon,
} from "@/public/svg/navIcons";
import {
  CalculatorIcon,
  DashboardIcon,
  LogoutIcon,
  MyPropertiesIcon,
  PrivacyIcon,
  SupportIcon,
  TNCIcon,
  TransactionIcon,
  UpdateIcon,
  VersionIcon,
} from "@/public/svg/sidebarIcons";
import { ClassValue } from "clsx";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Navbar({
  page,
  className,
}: {
  page?: string;
  className?: ClassValue;
}) {
  const [selectedTab, setSelectedTab] = React.useState<string>(page || "home");
  const router = useRouter();
  const auth = useAuth();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const user = auth.user;
    if (user) {
      setUser(user);
    }
    console.log(user);
  }, [user]);

  return (
    <nav
      className={cn(
        "w-full bg-background fixed flex justify-between shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] items-center z-50 px-5 py-4 top-0 ",
        className
      )}
    >
      <div className="flex justify-between items-center w-full md:hidden">
        <div
          className="flex items-center justify-start gap-3 cursor-pointer"
          onClick={() => router.push("/app/home")}
        >
          <MainLogo className="w-6 h-6 animate-spin-slow" />
          <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>{" "}
        </div>
        <Sheet>
          <SheetTrigger>
            <HamburgerIcon />
          </SheetTrigger>
          <SheetContent side="right" className="p-0 overflow-y-scroll">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="justify-between items-center gap-3 w-full hidden md:flex">
        <div className="flex justify-start gap-16">
          <div
            className="flex items-center justify-start gap-3 cursor-pointer"
            onClick={() => router.push("/app/home")}
          >
            <MainLogo className="w-8 h-8 animate-spin-slow" />
            <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>{" "}
          </div>
          <Tabs
            defaultValue={page}
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList>
              <TabsTrigger
                value="home"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/home")}
              >
                {selectedTab === "home" && (
                  <HomeLogo className="stroke-[#121212]" />
                )}
                Home
              </TabsTrigger>
              <TabsTrigger
                value="dashboards"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/dashboards")}
              >
                {selectedTab === "dashboards" && <DashboardIcon />}
                Dashboards
              </TabsTrigger>

              <TabsTrigger
                value="calculators"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/calculators")}
              >
                {selectedTab === "calculators" && <CalculatorIcon />}
                Calculators
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/transactions")}
              >
                {selectedTab === "transactions" && <TransactionIcon />}
                Transactions
              </TabsTrigger>
              {/* <TabsTrigger
                value="my-listings"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/listings")}
              >
                {selectedTab === "my-listings" && <MyPropertiesIcon />}
                My Properties
              </TabsTrigger> */}
              <TabsTrigger
                value="market-pulse"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/market-pulse")}
              >
                {selectedTab === "market-pulse" && <MarketPulseIcon />}
                Market Pulse
              </TabsTrigger>
              <TabsTrigger
                value="key-metrics"
                className="text-sm flex items-center gap-1 rounded-sm"
                onClick={() => router.push("/app/key-metrics")}
              >
                {selectedTab === "key-metrics" && (
                  <KeyMatricIcon className="w-5 h-5" />
                )}
                Key Metrics
              </TabsTrigger>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm text-secondary font-medium ">
                      More (7+)
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {" "}
                      <div className="grid  gap-3 p-4  md:grid-cols-2 w-[300px] ">
                        <Button
                          className="text-sm text-secondary font-medium cursor-pointer"
                          variant={"ghost"}
                          onClick={() => router.push("/app/developers")}
                        >
                          Developers
                        </Button>
                        <Button
                          className="text-sm text-secondary font-medium cursor-pointer"
                          variant={"ghost"}
                          onClick={() => router.push("/app/projects")}
                        >
                          Projects
                        </Button>
                        <Button
                          className="text-sm text-secondary font-medium cursor-pointer"
                          variant={"ghost"}
                          onClick={() => router.push("/app/leaderboard")}
                        >
                          Leaderboard
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="text-sm text-secondary font-medium cursor-pointer"
                          onClick={() => router.push("/app/agency-settings")}
                        >
                          Agency Settings
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="text-sm text-secondary font-medium cursor-pointer"
                          onClick={() => router.push("/app/daily-reports")}
                        >
                          Daily Reports
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="text-sm text-secondary font-medium cursor-pointer"
                          onClick={() => router.push("/app/ask-ai")}
                        >
                          Keypilot AI
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center justify-end gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-6 h-6 border-2 border-primary">
                <AvatarImage src={user?.photoURL || ""} alt="User" />
                <AvatarFallback className="text-xs">
                  {user?.displayName && user?.displayName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-2xl p-0 border-0"
            >
              <Card className="bg-white rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4">
                <CardHeader className="p-0 flex flex-col items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage src={user?.photoURL || ""} alt="User" />
                    <AvatarFallback className="text-xs">
                      {user?.displayName && user?.displayName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <CardTitle className="font-semibold text-sm text-secondary">
                      {user?.displayName}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm font-normal">
                      {user?.email}
                    </CardDescription>
                    <h3 className="text-muted-foreground text-sm font-normal">
                      BRN:{" "}
                      <span className="text-red-200 font-bold">
                        Not Verified
                      </span>
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* <Button
                    variant={"ghost"}
                    className="text-secondary-500 text-sm font-normal"
                  >
                    Change Profile picture
                  </Button> */}
                  <Button
                    variant={"ghost"}
                    className="text-secondary-500 text-sm font-normal gap-1"
                  >
                    <SupportIcon />
                    Customer Support
                  </Button>
                  <PrivacyTrigger>
                    <Button
                      variant={"ghost"}
                      className="text-secondary-500 text-sm font-normal gap-1"
                    >
                      <PrivacyIcon />
                      Privacy Policy
                    </Button>
                  </PrivacyTrigger>

                  <TermsTrigger>
                    <Button
                      variant={"ghost"}
                      className="text-secondary-500 text-sm font-normal gap-1"
                    >
                      <TNCIcon />
                      Terms and Condition
                    </Button>
                  </TermsTrigger>

                  <Button
                    variant={"ghost"}
                    onClick={logOut}
                    className="text-red-500 hover:bg-red-100 text-sm font-normal gap-1"
                  >
                    <LogoutIcon />
                    Sign Out
                  </Button>

                  {/* <Button
                      variant={"ghost"}
                      className="text-secondary-500 text-sm font-normal gap-1"
                    >
                      <UpdateIcon />
                      Last Updated at: 23/DEC/2024 10:10:11
                    </Button> */}
                  <Button
                    variant={"ghost"}
                    className="text-secondary-500 text-sm font-normal gap-1"
                  >
                    <VersionIcon />
                    Version: 1.0.1
                  </Button>
                </CardContent>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/app/agency-settings")}
          >
            <SettingIcon />
          </div>
        </div>
      </div>
      {/* <div className="flex justify-start items-center gap-4"> */}
      {/* <CompassIcon /> */}
      {/* <SearchIcon />
        <NotificationBellIcon /> */}
      {/* </div> */}
    </nav>
  );
}

export default Navbar;

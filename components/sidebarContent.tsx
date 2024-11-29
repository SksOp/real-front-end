"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  AddToHomeIcon,
  CalculatorIcon,
  ContactUsIcon,
  DashboardIcon,
  LogoutIcon,
  MyPropertiesIcon,
  SupportIcon,
  ThemeIcon,
  TransactionIcon,
} from "@/public/svg/sidebarIcons";
import { useRouter } from "next/navigation";
import { KeyMatricIcon } from "@/public/svg/navIcons";
import { User } from "firebase/auth";
import { useAuth } from "@/lib/auth";

function SidebarContent() {
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
    <div className="flex flex-col justify-start items-start gap-5 h-full w-full px-5 pt-9">
      <div className="flex items-center justify-start gap-2">
        <Avatar>
          <AvatarImage src={user?.photoURL || ""} alt="User" />
          <AvatarFallback className="text-xs">
            {user?.displayName && user?.displayName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/dashboard")}
        >
          <DashboardIcon />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/calculator")}
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
          onClick={() => router.push("/app/listings")}
        >
          <MyPropertiesIcon />
          My Properties
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/key-matrics")}
        >
          <KeyMatricIcon />
          Key Matrics
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
          onClick={() => router.push("/app/market-pulse")}
        >
          <KeyMatricIcon />
          Market Pulse
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
        >
          <AddToHomeIcon />
          Add to Home Screen
        </Button>
        <div className="flex justify-between items-center hover:bg-primary/10 w-full">
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
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm px-2"
        >
          <SupportIcon />
          Support
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-red-500 font-normal text-sm px-2"
        >
          <LogoutIcon />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;

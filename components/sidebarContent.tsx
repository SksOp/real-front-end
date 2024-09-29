import React from "react";
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

function SidebarContent() {
  return (
    <div className="flex flex-col justify-start items-start gap-5 h-full w-full px-5 pt-9">
      <div className="flex items-center justify-start gap-2">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">User Name</h2>
          <p className="text-sm text-muted-foreground">user@example.com</p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <DashboardIcon />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <CalculatorIcon />
          Calculators
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <TransactionIcon />
          Sales Transactions
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <TransactionIcon />
          Rental Transactions
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <MyPropertiesIcon />
          My Properties
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <AddToHomeIcon />
          Add to Home Screen
        </Button>
        <div className="flex justify-between items-center w-full">
          <Button
            variant="ghost"
            className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
          >
            <ThemeIcon />
            Dark mode
          </Button>
          <Switch />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <ContactUsIcon />
          Request a Feature
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <ContactUsIcon />
          Submit Feedback
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-secondary font-normal text-sm p-0"
        >
          <SupportIcon />
          Support
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start items-center flex gap-3 text-red-500 font-normal text-sm p-0"
        >
          <LogoutIcon />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;

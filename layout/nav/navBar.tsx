import Progressbar from "@/components/progressbar";
import SidebarContent from "@/components/sidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/underline-tabs";
import { cn } from "@/lib/utils";
import { HamburgerIcon } from "@/public/svg/icons";
import { CompassIcon, SettingIcon } from "@/public/svg/navIcons";
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar({
  page,
  className,
}: {
  page?: string;
  className?: ClassValue;
}) {
  const router = useRouter();

  return (
    <nav
      className={cn(
        "w-full bg-background fixed flex justify-between items-center z-50 px-5 py-4 top-0 ",
        className
      )}
    >
      <div className="flex justify-start items-center gap-3 md:hidden">
        <Sheet>
          <SheetTrigger>
            <HamburgerIcon />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 ">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>
      </div>
      <div className="justify-between items-center gap-3 w-full hidden md:flex">
        <div className="flex justify-start gap-16">
          <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>
          <Tabs defaultValue={page}>
            <TabsList>
              <TabsTrigger
                value="home"
                className="text-sm"
                onClick={() => router.push("/app/home")}
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="dashboards"
                className="text-sm"
                onClick={() => router.push("/app/dashboard")}
              >
                Dashboards
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="text-sm"
                onClick={() => router.push("/app/sales-transactions")}
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="calculators"
                className="text-sm"
                onClick={() => router.push("/app/calculator")}
              >
                Calculators
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex justify-end gap-2">
          <SettingIcon />
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

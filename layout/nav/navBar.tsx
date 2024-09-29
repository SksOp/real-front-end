import SidebarContent from "@/components/sidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerIcon } from "@/public/svg/icons";
import { CompassIcon } from "@/public/svg/navIcons";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-background fixed flex justify-between items-center z-50 px-5 py-4 top-0 ">
      <div className="flex justify-start items-center gap-3">
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
      {/* <div className="flex justify-start items-center gap-4"> */}
      {/* <CompassIcon /> */}
      {/* <SearchIcon />
        <NotificationBellIcon /> */}
      {/* </div> */}
    </nav>
  );
}

export default Navbar;

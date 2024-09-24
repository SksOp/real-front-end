import { HamburgerIcon } from "@/public/svg/icons";
import { CompassIcon } from "@/public/svg/navIcons";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-background fixed flex justify-between items-center z-50 px-4 py-6  top-0 ">
      <div className="flex justify-start items-center gap-4">
        {/* <HamburgerIcon /> */}
        <h1 className="text-xl font-bold">Keypilot.</h1>
      </div>
      <div className="flex justify-start items-center gap-4">
        <CompassIcon />
        {/* <SearchIcon />
        <NotificationBellIcon /> */}
      </div>
    </nav>
  );
}

export default Navbar;

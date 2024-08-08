import {
  HamburgerIcon,
  NotificationBellIcon,
  SearchIcon,
} from "@/public/svg/icons";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-background sticky flex justify-between items-center z-50 px-4 py-3  top-0 ">
      <div className="flex justify-start items-center gap-4">
        <HamburgerIcon />
        <h1 className="text-xl font-bold">Keypilot.</h1>
      </div>
      <div className="flex justify-start items-center gap-4">
        <SearchIcon />
        <NotificationBellIcon />
      </div>
    </nav>
  );
}

export default Navbar;

import { HamburgerIcon, NotificationBellIcon, SearchIcon } from '@/public/svg/icons';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/underline-tabs";
import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="w-full bg-background flex justify-between items-center z-20 px-4 py-3 sticky top-0 ">
        <div className="flex justify-start items-center gap-4">
          <HamburgerIcon />
          <h1 className="text-xl font-bold">Keypilot.</h1>
        </div>
        <div className="flex justify-start items-center gap-4">
          <SearchIcon />
          <NotificationBellIcon />
        </div>
      </nav>
      <Tabs defaultValue='explore' className="w-full items-center justify-center">
        <TabsList className="w-full items-center justify-between px-4 py-3">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="my-listings">My listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default Navbar
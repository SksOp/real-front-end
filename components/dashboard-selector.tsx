import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";

function DashboardSelector() {
  return (
    <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-1">
      <TabsTrigger
        value="standard"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Standard
      </TabsTrigger>
      <TabsTrigger
        value="custom"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Custom
      </TabsTrigger>
    </TabsList>
  );
}

export default DashboardSelector;

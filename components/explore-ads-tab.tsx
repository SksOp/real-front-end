import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/underline-tabs";

function ExploreAdsTab() {
  return (
    <Tabs
      defaultValue="your-ads"
      className="w-full items-center justify-center"
    >
      <TabsList className="w-full items-center justify-center gap-4 px-4 py-3">
        <TabsTrigger
          value="your-ads"
          className="flex flex-col items-center justify-center gap-3 "
        >
          <h3 className="text-lg">Your ads</h3>
          <h3 className="text-2xl font-extrabold">30</h3>
        </TabsTrigger>
        <TabsTrigger
          value="agency-ads"
          className="flex flex-col items-center justify-center gap-3 text-2xl"
        >
          <h3 className="text-lg">Agency ads</h3>
          <h3 className="text-2xl font-extrabold">250</h3>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="your-ads"></TabsContent>
    </Tabs>
  );
}

export default ExploreAdsTab;

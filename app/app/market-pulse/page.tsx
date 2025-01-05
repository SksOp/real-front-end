import Exceptions from "@/components/exceptions";
import MarketPulseCard from "@/components/market-pulse-card";
import MarketPulseList from "@/components/market-pulse-list";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import Layout from "@/layout/secondary";
import { FlaskException } from "@/public/svg/exceptions";
import React from "react";

function page() {
  return (
    <Layout page="market-pulse" title="Market Pulse">
      <div className="flex flex-col gap-3 px-3 md:px-8 md:py-16 py-8 w-full">
        <Tabs defaultValue="residential" className="w-full">
          <TabsList className=" flex  items-center justify-center md:justify-start gap-3 w-full">
            <TabsTrigger
              value="residential"
              className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
            >
              Residential
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
            >
              Commercial
            </TabsTrigger>
          </TabsList>
          <TabsContent value="residential" className="w-full">
            <MarketPulseList />
          </TabsContent>
          <TabsContent value="commercial" className="w-full">
            <Exceptions
              svg={<FlaskException />}
              title={"Coming Soon!"}
              description={
                "Comercial dashboard is not yet available, this is getting cooked!"
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default page;

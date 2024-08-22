import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterIcon } from "@/public/svg/icons";
import { Separator } from "./ui/separator";

function TransactionTabs() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full gap-3 items-center justify-start bg-background ">
        <div className="flex justify-start items-center gap-4">
          <TabsTrigger
            value="filter"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            <FilterIcon />
          </TabsTrigger>
          <Separator orientation="vertical" className=" h-5" />
          <TabsTrigger
            value="all"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="rent"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Rent
          </TabsTrigger>
          <TabsTrigger
            value="gift"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Gift
          </TabsTrigger>
        </div>
      </TabsList>
      {/* <TabsContent
        value="by-property"
        className="w-full flex gap-2 overflow-x-scroll"
      ></TabsContent> */}
    </Tabs>
  );
}

export default TransactionTabs;

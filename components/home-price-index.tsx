import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import PriceChangesTable from "./price-changes-table";
import {
  Tabs as UnderlineTabs,
  TabsContent as UnderlineTabsContent,
  TabsList as UnderlineTabsList,
  TabsTrigger as UnderlineTabsTrigger,
} from "./ui/underline-tabs";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function HomePriceIndex() {
  return (
    <Card className="border rounded-xl bg-background w-full p-0">
      <UnderlineTabs defaultValue="sales">
        <UnderlineTabsList className="w-full border-b-2 border-border items-center justify-start rounded-t-xl gap-3 px-4 pt-1">
          <UnderlineTabsTrigger
            value="sales"
            className="flex justify-center items-center gap-2 "
          >
            Sales
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger value="rental">Rental</UnderlineTabsTrigger>
        </UnderlineTabsList>

        <UnderlineTabsContent value="sales">
          <CardHeader className="flex flex-row justify-between items-center text-center p-4 w-full ">
            <h3 className="text-base font-semibold text-secondary">
              Price changes (Sales)
            </h3>
            <h3 className="text-sm font-semibold text-primary">
              Go to transactions
            </h3>
          </CardHeader>
          <CardContent className="px-4 py-0 pb-4 w-full">
            <Tabs defaultValue="property">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="property"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Property Type
                </TabsTrigger>
                <TabsTrigger
                  value="rental"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Area
                </TabsTrigger>
              </TabsList>
              <TabsContent value="property" className="w-full flex gap-2 ">
                <PriceChangesTable />
              </TabsContent>
            </Tabs>
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          <CardHeader className="flex flex-row justify-between items-center text-center p-4 w-full ">
            <h3 className="text-lg font-semibold text-secondary">
              Price changes (Rental)
            </h3>
            <h3 className="text-base font-semibold text-primary">
              Go to transactions
            </h3>
          </CardHeader>
          <CardContent className="px-4 py-0 pb-4 w-full">
            <Tabs defaultValue="property">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="property"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Property Type
                </TabsTrigger>
                <TabsTrigger
                  value="rental"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Area
                </TabsTrigger>
              </TabsList>
              <TabsContent value="property" className="">
                <PriceChangesTable />
              </TabsContent>
            </Tabs>
          </CardContent>
        </UnderlineTabsContent>
      </UnderlineTabs>
    </Card>
  );
}

export default HomePriceIndex;

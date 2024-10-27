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
    <UnderlineTabs defaultValue="sales">
      <UnderlineTabsList className="w-full border border-border items-center justify-center rounded-t-xl gap-3 px-3">
        <UnderlineTabsTrigger
          value="sales"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Sales Price Changes
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger
          value="rental"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Rental Price Changes
        </UnderlineTabsTrigger>
      </UnderlineTabsList>
      <Card className="rounded-xl bg-background rounded-t-none w-full px-3 pb-5 flex flex-col gap-3">
        <UnderlineTabsContent value="sales">
          {/* <CardHeader className="flex flex-row justify-between items-center  p-0 w-full ">
            <h3 className="text-base font-semibold text-secondary">
              Price changes (Sales)
            </h3>
            <h3 className="text-xs font-semibold text-primary ">
              Go to transactions
            </h3>
          </CardHeader> */}
          <CardContent className="p-0 w-full">
            <Tabs defaultValue="property">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="property"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Property Type
                </TabsTrigger>
                <TabsTrigger
                  value="rental"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Area
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="property"
                className="w-full flex flex-col gap-2 "
              >
                <PriceChangesTable
                  data={[
                    {
                      name: "Burj Khalifa",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Palm Jumeirah",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Dubai Mall",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Jumeirah Beach",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                  ]}
                />
                <h3 className="text-primary font-semibold text-right text-sm">
                  View All
                </h3>
              </TabsContent>
            </Tabs>
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          {/* <CardHeader className="flex flex-row justify-between items-center  p-0 w-full ">
            <h3 className="text-base font-semibold text-secondary">
              Price changes (Rental)
            </h3>
            <h3 className="text-xs font-semibold text-primary ">
              Go to transactions
            </h3>
          </CardHeader> */}
          <CardContent className="p-0 w-full">
            <Tabs defaultValue="property">
              <TabsList className="w-full gap-3 items-center justify-start bg-background p-0">
                <TabsTrigger
                  value="property"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Property Type
                </TabsTrigger>
                <TabsTrigger
                  value="rental"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  By Area
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="property"
                className="w-full flex flex-col gap-2 "
              >
                <PriceChangesTable
                  data={[
                    {
                      name: "Burj Khalifa",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Palm Jumeirah",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Dubai Mall",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                    {
                      name: "Jumeirah Beach",
                      avgPrice: "900K",
                      pricePerSqFt: "900K",
                      transactions: "1546",
                    },
                  ]}
                />
                <h3 className="text-primary font-semibold text-right text-sm">
                  View All
                </h3>
              </TabsContent>
            </Tabs>
          </CardContent>
        </UnderlineTabsContent>
      </Card>
    </UnderlineTabs>
  );
}

export default HomePriceIndex;

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PriceChangesTable from "./price-changes-table";

function HomePriceIndex() {
  return (
    <Card className="border-2 rounded-xl bg-background w-full p-0">
      <CardHeader className="flex flex-row justify-between items-center text-center p-4 w-full ">
        <h3 className="text-lg font-semibold text-secondary">
          Price changes (Sales)
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
              className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              By Property Type
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              By Area
            </TabsTrigger>
          </TabsList>
          <TabsContent value="property" className="w-full flex gap-2 ">
            <PriceChangesTable />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default HomePriceIndex;

import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Info } from "lucide-react";

function TransactionFairPrice() {
  return (
    <Card className="border rounded-xl w-full bg-background px-4 py-5 flex flex-col gap-3 ">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-normal text-secondary">Smart Average:</h3>
          <h3 className="text-sm font-normal text-secondary">2000000 AED</h3>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-normal text-secondary">
            Smart Average Per sqft:
          </h3>
          <h3 className="text-sm font-normal text-secondary">2000000 AED</h3>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-secondary-500">
            Fair Price:
          </h3>
          <h3 className="text-base font-semibold text-secondary-500">
            2000000 AED
          </h3>
        </div>
      </CardContent>
      <CardFooter className="flex gap-1 justify-start items-center p-0">
        <Info size={16} className="stroke-accent" />
        <h3 className="text-sm font-normal truncate text-accent">
          learn how we compute these values.
        </h3>
      </CardFooter>
    </Card>
  );
}

export default TransactionFairPrice;

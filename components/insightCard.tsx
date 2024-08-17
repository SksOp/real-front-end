import React from "react";
import { Card, CardDescription } from "./ui/card";
import { DisableBulbIcon } from "@/public/svg/icons";

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-primary/5 border-0 p-4">
      <div className="text-muted-foreground text-base flex justify-between items-center w-full">
        <h3 className="w-[80%]">{children}</h3>
        <DisableBulbIcon className="" />
      </div>
      <h3 className="text-primary text-sm font-semibold">See Insights</h3>
    </Card>
  );
}

export default InsightCard;

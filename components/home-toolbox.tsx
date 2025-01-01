import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ToolboxItems } from "@/constants/toolboxItems";

function HomeToolbox() {
  return (
    <Card className="border rounded-xl bg-background w-full p-4 pt-3 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-secondary font-semibold text-lg">
          Broker’s toolbox
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 w-full grid grid-cols-3 gap-4">
        {ToolboxItems.map((item, index) => (
          <div
            key={index}
            className="px-4 py-5 border border-[#E2E7EC] flex flex-col gap-3 items-center justify-center rounded-2xl hover:bg-[#EFEEFC] hover:border-[#B6B1F0]"
          >
            <div>{item.svg}</div>
            <h3 className="text-sm font-normal text-[#334155] text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default HomeToolbox;

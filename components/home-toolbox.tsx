import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ToolboxItems } from "@/constants/toolboxItems";
import ToolboxItemView from "./toolboxItemView";

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
          <ToolboxItemView key={index} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}

export default HomeToolbox;

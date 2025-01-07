import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ToolboxItems } from "@/constants/toolboxItems";
import ToolboxItemView from "./toolboxItemView";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";

function HomeToolbox() {
  const auth = useAuth();
  return (
    <Card className="border rounded-xl bg-background w-full p-4 pt-3 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-secondary font-semibold text-lg">
          Broker’s toolbox
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 w-full grid grid-cols-3 gap-4  h-full">
        {ToolboxItems.map((item, index) =>
          auth.user ? (
            <ToolboxItemView key={index} {...item} />
          ) : (
            <LoginTrigger key={index} className="w-full p-0 h-full ">
              <ToolboxItemView key={index} title={item.title} svg={item.svg} />
            </LoginTrigger>
          )
        )}
      </CardContent>
    </Card>
  );
}

export default HomeToolbox;

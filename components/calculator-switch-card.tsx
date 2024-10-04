"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";

function CalculatorSwitchCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Card className="bg-background w-full border p-3">
      <CardHeader className="p-0 flex flex-row justify-between items-center">
        <CardTitle className="text-sm font-semibold text-secondary truncate">
          {title}
        </CardTitle>
        <Switch
          id={title}
          onCheckedChange={(checked) => setExpanded(checked)}
        />
      </CardHeader>
      {expanded && (
        <CardContent className="p-0 flex flex-col gap-5 my-2">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export default CalculatorSwitchCard;

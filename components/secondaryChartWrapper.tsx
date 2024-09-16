import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function SecondaryChartWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-2 rounded-xl w-full bg-background p-0">
      <CardHeader className="py-4 px-3">
        <CardTitle className="text-base font-bold text-secondary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full px-2">{children}</CardContent>
    </Card>
  );
}

export default SecondaryChartWrapper;

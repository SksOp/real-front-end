import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

function SecondaryChartWrapper({
  title,
  children,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: ClassValue;
}) {
  return (
    <Card
      className={cn("border rounded-xl w-full bg-background p-0", className)}
    >
      <CardHeader className="py-4 px-3">
        <CardTitle className="text-base font-semibold text-secondary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full px-2">{children}</CardContent>
    </Card>
  );
}

export default SecondaryChartWrapper;

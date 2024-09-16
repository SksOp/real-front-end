import React from "react";
import { Card, CardDescription } from "./ui/card";
import { DisableBulbIcon } from "@/public/svg/icons";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

function InsightCard({
  children,
  linkText = "View more insights",
  className,
}: {
  children: React.ReactNode;
  linkText?: string;
  className?: ClassValue;
}) {
  return (
    <Card className={cn("bg-primary/5 w-full border-0 p-4", className)}>
      <div className="text-muted-foreground text-base flex justify-between items-center w-full">
        <h3 className="w-[90%] text-base font-normal leading-6">{children}</h3>
        <DisableBulbIcon className="" />
      </div>
      <h3 className="text-primary text-base font-semibold mt-2">{linkText}</h3>
    </Card>
  );
}

export default InsightCard;

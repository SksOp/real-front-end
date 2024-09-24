import React from "react";
import { Card, CardDescription } from "./ui/card";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { InsightsGradientIcon } from "@/public/svg/Indicator";

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
    <div className="bg-gradient-to-r from-[rgba(86,129,235,1)] to-[rgba(211,103,116,1)] p-[1px] rounded-xl">
      <Card
        className={cn(
          "w-full p-4 bg-gradient-to-br rounded-xl",
          "from-[rgba(84,131,237,0.11)] to-[rgba(217,100,109,0.11)]",
          "border border-transparent",
          className
        )}
      >
        <div className="text-muted-foreground text-base flex justify-between gap-2 items-center w-full">
          <InsightsGradientIcon className="object-cover " />
          <div className="w-[90%]">
            <CardDescription className="flex-1">{children}</CardDescription>
            <span className="text-primary text-sm font-semibold mt-2">
              {linkText}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default InsightCard;

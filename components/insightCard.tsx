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
    <div className="bg-gradient-to-r w-full from-[rgba(86,129,235,1)] to-[rgba(211,103,116,1)] p-[1px] rounded-xl">
      <Card
        className={cn(
          "w-full p-4 bg-gradient-to-br rounded-xl flex flex-col gap-2",
          "from-[rgba(84,131,237,0.11)] to-[rgba(217,100,109,0.11)]",
          "border border-transparent",
          className
        )}
      >
        <div className="text-muted-foreground text-base flex justify-start gap-3 items-center w-full">
          <div className="h-4 w-4">
            <InsightsGradientIcon className="object-cover " />
          </div>
          <div className="">
            <CardDescription className="">{children}</CardDescription>
          </div>
        </div>
        <span className="text-primary text-sm pl-8 font-semibold ">
          {linkText}
        </span>
      </Card>
    </div>
  );
}

export default InsightCard;

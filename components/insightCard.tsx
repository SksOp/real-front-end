import React from "react";
import { Card, CardDescription } from "./ui/card";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { InsightsGradientIcon } from "@/public/svg/navIcons";

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
    <div className="bg-gradient-to-r w-full from-[#5681EB] to-[#D36774] p-[1px] rounded-xl">
      <Card
        className={cn(
          "w-full p-4 bg-gradient-to-br rounded-xl flex flex-col gap-2",
          "from-[#5483ED1C] to-[#D9646D1C]",
          "border border-transparent",
          className
        )}
      >
        <div className="text-muted-foreground text-base flex gap-3 items-center w-full">
          {/* Icon Container */}
          <div className="flex items-center justify-center flex-shrink-0 h-10 w-10">
            <img
              src="/svg/Vector.svg"
              alt="insights"
              className="object-cover  shrink-0"
            />
          </div>
          {/* Text Content */}
          <div className="flex">
            <CardDescription>{children}</CardDescription>
          </div>
        </div>
        <span className="text-sm font-semibold text-primary cursor-pointer">
          {linkText}
        </span>
      </Card>
    </div>
  );
}

export default InsightCard;

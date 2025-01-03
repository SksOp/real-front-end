import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

function KeyMatricesCard({
  title,
  description,
  tag,
  className,
}: {
  title: string;
  description: string;
  tag?: string;
  className?: ClassValue;
}) {
  return (
    <Card className={cn("w-full rounded-xl p-4", className)}>
      <CardHeader className="p-0 flex flex-col gap-2 ">
        <div className="relative">
          <CardTitle className="text-secondary font-semibold text-base">
            {title}
          </CardTitle>
          {tag && (
            <div className="absolute px-2  h-5 text-xs top-0 right-0  bg-[#DDF8E4] text-[#42BE64] rounded-full ">
              {tag}
            </div>
          )}
        </div>
        <CardDescription className="text-muted-foreground font-normal text-sm">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default KeyMatricesCard;

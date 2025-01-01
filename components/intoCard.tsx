import { ClassValue } from "clsx";
import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IntroCardProps } from "@/types/introcard";
import { Badge } from "./ui/badge";

function IntoCard({
  title,
  description,
  avatarBg,
  avatar,
  linkto,
  soon = false,
}: IntroCardProps) {
  const router = useRouter();
  return (
    <Card
      className="flex flex-row items-center gap-4 px-4 py-5 bg-[#F7F6F8] rounded-2xl shadow-none"
      onClick={() => router.push(linkto)}
    >
      <div
        className={cn(
          "flex-shrink-0 rounded-full h-[3.064rem] w-[3.064rem] flex items-center justify-center ",
          avatarBg
        )}
      >
        {avatar}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-base font-semibold text-black">{title}</h3>
          {soon && (
            <Badge
              variant={"outline"}
              className="border border-[#58AAF2] text-secondary font-medium text-sm px-3 py-1"
            >
              Soon
            </Badge>
          )}
        </div>
        <p className="text-sm font-normal text-[#7A7A7A]">{description}</p>
      </div>
    </Card>
  );
}

export default IntoCard;

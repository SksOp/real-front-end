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
  selected = false,
}: IntroCardProps) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "relative flex flex-row items-center gap-4 px-4 py-5 bg-[#F7F6F8] rounded-2xl shadow-none cursor-pointer group",
        selected && "border border-primary-700"
      )}
      onClick={() => linkto && router.push(linkto)}
    >
      <div
        className={cn(
          "flex-shrink-0 rounded-full h-[3.064rem] w-[3.064rem] flex items-center justify-center",
          avatarBg
        )}
      >
        {avatar}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-base font-semibold text-black line-clamp-1 group-hover:line-clamp-none">
            {title}
          </h3>
          {soon && (
            <Badge
              variant="outline"
              className="border border-[#58AAF2] text-secondary font-medium text-sm px-3 py-1"
            >
              Soon
            </Badge>
          )}
        </div>

        <p className="text-sm font-normal text-[#7A7A7A] line-clamp-2 ">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default IntoCard;

import React from "react";
import IntoCard from "./intoCard";
import { HomeMatricsItems } from "@/constants/homeItems";
import { IntroCardProps } from "@/types/introcard";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface HomeMatricsProps {
  title: string;
  items: IntroCardProps[];
  className?: ClassValue;
}

function HomeMatrics({ title, items, className }: HomeMatricsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-secondary font-semibold text-sm">{title}</h3>
      <div
        className={cn(
          "md:grid grid-cols-3 lg:grid-cols-4 flex flex-col w-full gap-4",
          className
        )}
      >
        {items.map((item, index) => (
          <IntoCard
            key={String(index)}
            title={item.title}
            description={item.description}
            avatar={item.avatar}
            avatarBg={item.avatarBg}
            linkto={item.linkto}
            soon={item.soon}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeMatrics;

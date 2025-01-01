import React from "react";
import IntoCard from "./intoCard";
import { HomeMatricsItems } from "@/constants/homeItems";
import { IntroCardProps } from "@/types/introcard";

interface HomeMatricsProps {
  title: string;
  items: IntroCardProps[];
}

function HomeMatrics({ title, items }: HomeMatricsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-secondary font-semibold text-sm">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <IntoCard
            key={index}
            title={item.title}
            description={item.description}
            avatar={item.avatar}
            avatarBg={item.avatarBg}
            linkto={item.linkto}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeMatrics;

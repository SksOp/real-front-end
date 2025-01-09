import React from "react";
import IntoCard from "./intoCard";
import { HomeMatricsItems } from "@/constants/homeItems";
import { IntroCardProps } from "@/types/introcard";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";

interface HomeMatricsProps {
  title: string;
  items: IntroCardProps[];
  className?: ClassValue;
  selectedCard?: string | null;
}

function HomeMatrics({
  title,
  items,
  className,
  selectedCard,
}: HomeMatricsProps) {
  const auth = useAuth();
  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-secondary font-semibold text-sm">{title}</h3>
      <div
        className={cn(
          "md:grid grid-cols-3 lg:grid-cols-4 flex flex-col w-full gap-4",
          className
        )}
      >
        {items.map((item, index) =>
          auth.user ? (
            <IntoCard
              key={String(index)}
              title={item.title}
              description={item.description}
              avatar={item.avatar}
              avatarBg={item.avatarBg}
              linkto={item.linkto}
              soon={item.soon}
              selected={selectedCard === item.key ? true : false}
            />
          ) : (
            <LoginTrigger className="text-left">
              <IntoCard
                key={String(index)}
                title={item.title}
                description={item.description}
                avatar={item.avatar}
                avatarBg={item.avatarBg}
                soon={item.soon}
              />
            </LoginTrigger>
          )
        )}
      </div>
    </div>
  );
}

export default HomeMatrics;

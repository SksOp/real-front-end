import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { KeypilotItems } from "@/constants/keypilot";
import IntoCard from "./intoCard";

function HomeKeypilot() {
  return (
    <Card className="border rounded-2xl bg-background w-full py-4 px-3 flex flex-col gap-4">
      <CardHeader className="p-0 w-full flex flex-col gap-4">
        <CardTitle className="text-secondary font-semibold text-lg">
          Keypilot for Success
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 w-full flex flex-col gap-4">
        {KeypilotItems.map((item, index) => (
          <IntoCard
            key={index}
            title={item.title}
            description={item.description}
            avatar={item.avatar}
            avatarBg={item.avatarBg}
            linkto={item.linkto}
            className="cursor-default"
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default HomeKeypilot;

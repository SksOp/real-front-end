import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ACIcon,
  BalconyIcon,
  GymIcon,
  PlayAreaIcon,
  SwimmingPoolIcon,
} from "@/public/svg/aminitiesIcon";
import { BathIcon } from "@/public/svg/icons";

function PropertyAminities() {
  return (
    <Card className="border-0 bg-background">
      <CardHeader className="p-0">
        <CardTitle className="text-base text-secondary font-medium">
          Aminities
        </CardTitle>
      </CardHeader>
      <CardContent className="px-1 py-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-start gap-2 items-center">
            <ACIcon />
            <p className="text-secondary/50 text-sm font-normal">
              Air conditioner
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <GymIcon />
            <p className="text-secondary/50 text-sm font-normal">Gym</p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <PlayAreaIcon />
            <p className="text-secondary/50 text-sm font-normal">Play area</p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <SwimmingPoolIcon />
            <p className="text-secondary/50 text-sm font-normal">
              Swimming pool
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <BalconyIcon />
            <p className="text-secondary/50 text-sm font-normal">Balcony</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyAminities;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ACIcon,
  BalconyIcon,
  PlayAreaIcon,
  SwimmingPoolIcon,
} from "@/public/svg/aminitiesIcon";
import { BathIcon } from "@/public/svg/icons";

function PropertyAminities() {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Aminities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-start gap-2 items-center">
            <ACIcon />
            <p className="text-muted-foreground text-lg font-semibold">
              Air conditioner
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <BathIcon />
            <p className="text-muted-foreground text-lg font-semibold">Gym</p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <PlayAreaIcon />
            <p className="text-muted-foreground text-lg font-semibold">
              Play area
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <SwimmingPoolIcon />
            <p className="text-muted-foreground text-lg font-semibold">
              Swimming pool
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <BalconyIcon />
            <p className="text-muted-foreground text-lg font-semibold">
              Balcony
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyAminities;

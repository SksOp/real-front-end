import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
  RedirectIcon,
} from "@/public/svg/icons";
import { AreaIcon } from "@/public/svg/drawerIcons";

function PropertyHeader() {
  return (
    <Card className="border-0">
      <CardHeader>
        <img src="/property.png" className=" object-cover w-full" />
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0    ">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold">$300,000</h1>
            <h3 className="text-xl  font-bold">Urban Nexus Plaza</h3>
            <div className="flex justify-start gap-2 items-center">
              <LocationIcon />
              <p className="text-muted-foreground">Wonderlust, Wonderland</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RedirectIcon />
            <h3 className="text-primary text-sm font-semibold">See Insights</h3>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground">3 Bedrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon />
            <p className="text-muted-foreground">2 Bathroom</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground">2456 sqft</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyHeader;

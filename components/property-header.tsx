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
import Image from "next/image";
import { UpIcon } from "@/public/svg/Indicator";

function PropertyHeader() {
  return (
    <Card className="border-0 p-0 w-full bg-background">
      <CardHeader className="relative px-0">
        <div className="relative w-full">
          <Image
            src="/property.png"
            className="object-cover w-full h-[250px] rounded-t-xl"
            height={200}
            width={400}
            alt=""
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent rounded-t-xl">
            <h3 className="text-white text-xl font-bold">Urban Nexus Plaza</h3>
            <div className="flex items-center gap-2">
              <LocationIcon fill="white" />
              <p className="text-white">Wonderlust, Wonderland</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0 p-0 justify-center items-start ">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground">3 Bedrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon />
            <p className="text-muted-foreground">2 Bathrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground">2456 sqft</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <h1 className="text-3xl font-bold">$300,000</h1>
          <div className="flex justify-start items-center">
            <UpIcon />
            <span className="text-green-600">21 %</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyHeader;

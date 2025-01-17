import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
  RedirectIcon,
} from "@/public/svg/icons";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { InsightsGradientIcon } from "@/public/svg/navIcons";
import { UpIcon } from "@/public/svg/Indicator";

interface PropertyHeaderProps {
  imageURL: string;
  title: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  price: string;
}

function PropertyHeader({
  imageURL,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
}: PropertyHeaderProps) {
  return (
    <Card className="border-0 shadow-none p-0 mt-4 w-full bg-background flex flex-col gap-3">
      <CardHeader className="relative p-0  ">
        <div className="relative w-full ">
          <img
            src={imageURL}
            className="object-cover max-h-[400px] w-full rounded-t-xl"
            alt=""
          />
          <div className="absolute inset-0 p-4 flex flex-col gap-1 justify-end bg-gradient-to-t from-black/60 to-transparent ">
            <h3 className="text-white text-lg font-semibold truncate">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <LocationIcon className="w-4 h-4" fill="white" />
              <p className="text-white text-xs truncate">{location}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0 p-0 justify-center  items-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon className="w-4 h-4" />
            <p className="text-muted-foreground text-xs font-medium">
              {bedrooms} Bedrooms
            </p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon className="w-4 h-4" />
            <p className="text-muted-foreground text-xs font-medium">
              {bathrooms} Bathrooms
            </p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon className="w-3 h-3" />
            <p className="text-muted-foreground text-xs font-medium">
              {area} sqft
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-2">
            <h1 className="text-xl text-secondary font-bold">{price}</h1>
            <div className="flex justify-start items-center gap-1">
              <UpIcon />
              <span className="text-green-600 font-medium text-xs ">21 %</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[rgba(86,129,235,1)] to-[rgba(211,103,116,1)] p-[1px] rounded-xl">
            <Button
              variant={"outline"}
              className={cn(
                "w-full py-1 px-3 bg-gradient-to-br rounded-xl flex items-center justify-center gap-1",
                "from-[rgba(84,131,237,0.11)] to-[rgba(217,100,109,0.11)]",
                "border border-transparent text-secondary font-semibold text-xs"
              )}
            >
              <InsightsGradientIcon /> Insights
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyHeader;

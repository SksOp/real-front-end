import React from "react";
import { Card } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LightBulbIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { PropertiescardProps } from "@/types/propertyCard";
import Image from "next/image";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import InsightDrawerView from "./insightDrawerView";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
  }).format(price);
}

function PropertiesCard({
  imageUrl,
  name,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
}: PropertiescardProps) {
  return (
    <Card className="flex justify-start relative gap-4 border-2 rounded-xl bg-background w-full p-4">
      <div className="flex-grow ">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover rounded-xl h-full"
        />
      </div>
      <div className="flex w-2/3 flex-col gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h3 className="text-lg font-extrabold">{name}</h3>
            <div className="bg-[#8177E5] px-3 h-6 absolute right-0 text-white rounded-l-full">
              Sale
            </div>
          </div>
          <div className="flex justify-start text-sm items-center gap-4">
            <LocationIcon className="w-4 h-4" />
            <p className="text-muted-foreground font-light">{location}</p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={"outline"}
              className="bg-card text-sm font-light whitespace-nowrap"
            >
              Villa
            </Badge>
            <Badge
              variant={"outline"}
              className="bg-card text-sm font-light whitespace-nowrap"
            >
              Residential
            </Badge>
            <Badge
              variant={"outline"}
              className="bg-card text-sm font-light whitespace-nowrap"
            >
              Off plan
            </Badge>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-6 text-muted-foreground text-bold mt-2">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p>{bedrooms} </p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p>{bathrooms} </p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.9rem] h-[0.9rem]" />
              <p>{0} sqft</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <h3 className="text-base font-extrabold">
            {formatPrice(String(price))}
          </h3>
          {/* <Drawer> */}
          <div>
            {/* <DrawerTrigger asChild> */}
            <Button
              variant={"ghost"}
              className="flex justify-end items-center gap-2 p-0 cursor-pointer"
            >
              <LightBulbIcon className="w-5 h-5" />
              <span className="text-primary text-sm font-semibold">
                See Insights
              </span>
            </Button>
            {/* </DrawerTrigger> */}
          </div>
          {/* <DrawerContent>
              <InsightDrawerView />
            </DrawerContent>
          </Drawer> */}
        </div>
      </div>
    </Card>
  );
}

export default PropertiesCard;

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
import { ListingDataType } from "@/types/listing";

function formatPrice(price: string): string {
  // Remove commas from the price string
  const priceWithoutCommas = price.replace(/,/g, "");

  // Convert the string to a number
  const numericPrice = Number(priceWithoutCommas);

  // Format the number based on its size
  if (numericPrice >= 1_000_000_000) {
    return (numericPrice / 1_000_000_000).toFixed(1) + "B AED";
  } else if (numericPrice >= 1_000_000) {
    return (numericPrice / 1_000_000).toFixed(1) + "M AED";
  } else if (numericPrice >= 1_000) {
    return (numericPrice / 1_000).toFixed(1) + "K AED";
  } else {
    return numericPrice.toFixed(0) + " AED";
  }
}

function PropertiesCard({
  imageURL,
  title: name,
  location,
  // bedrooms,
  // bathrooms,
  // area,
  price,
}: ListingDataType) {
  return (
    <Card className="w-full p-4 border-0 flex justify-start gap-0 ">
      <div className="flex-grow ">
        <Image
          src={imageURL}
          alt={name}
          className="object-cover rounded-lg "
          width={110}
          height={100}
        />
      </div>
      <div className="flex w-2/3 flex-col justify-between">
        <div>
          <h3 className="text-lg font-extrabold">{name}</h3>
          <div className="flex justify-start text-sm items-center gap-2">
            <LocationIcon className="w-4 h-4" />
            <p className="text-muted font-light">{location}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-muted-foreground text-bold mt-2">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p>{0} Bedrooms</p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p>{0} Bathrooms</p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.9rem] h-[0.9rem]" />
              <p>{0} sqft</p>
            </div>
          </div>
        </div>
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

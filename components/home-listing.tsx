import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import PropertiesCard from "./propertiesCard";

function HomeListing() {
  const router = useRouter();
  const images = [
    "/prop1.png",
    "/prop2.png",
    "/prop3.png",
    "/prop4.png",
    "/prop1.png",
    "/prop2.png",
  ];
  return (
    <>
      <Card
        className="border rounded-xl w-full p-3 bg-[#FCFBEE] flex flex-col gap-1 "
        onClick={() => router.push("/app/listings")}
      >
        <CardHeader className="w-full flex flex-col gap-1 md:gap-3 p-0">
          <CardTitle className="text-lg font-semibold text-secondary">
            My Properties
          </CardTitle>
          <div className="flex items-center">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index}`}
                className={cn(
                  "w-9 h-9 rounded-full object-cover border border-white  ",
                  index !== 0 ? "-ml-4" : ""
                )}
              />
            ))}
            <div className="w-9 h-9 rounded-full bg-white border border-white shadow-lg -ml-4 flex items-center justify-center text-xs font-medium text-muted-foreground">
              +56
            </div>
          </div>
          <h3 className="text-base text-muted-foreground font-normal ">
            Get detailed insights about the properties that you have listed
            online. AI driven insights!
          </h3>
        </CardHeader>
      </Card>

      {/* <Card className="border rounded-xl w-full p-3 bg-background hidden md:flex flex-col gap-2 ">
        <CardHeader className="p-0 w-full">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-semibold text-secondary">
              My Lists
            </CardTitle>
            <span className="text-primary font-semibold text-right text-xs">
              View detailed list
            </span>
          </div>
          <CardDescription className="text-xs text-accent font-normal">
            Get a holistic view listings and property ads in the region.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 w-full p-0">
          <PropertiesCard
            imageUrl={"/prop1.png"}
            name={"Renaissance Row"}
            location={"Wonderlust, Wonderland"}
            bedrooms={3}
            bathrooms={2}
            area={2456}
            price={3800000}
          />
          <PropertiesCard
            imageUrl={"/prop1.png"}
            name={"Renaissance Row"}
            location={"Wonderlust, Wonderland"}
            bedrooms={3}
            bathrooms={2}
            area={2456}
            price={3800000}
          />
          <PropertiesCard
            imageUrl={"/prop1.png"}
            name={"Renaissance Row"}
            location={"Wonderlust, Wonderland"}
            bedrooms={3}
            bathrooms={2}
            area={2456}
            price={3800000}
          />
          <PropertiesCard
            imageUrl={"/prop1.png"}
            name={"Renaissance Row"}
            location={"Wonderlust, Wonderland"}
            bedrooms={3}
            bathrooms={2}
            area={2456}
            price={3800000}
          />
        </CardContent>
      </Card> */}
    </>
  );
}

export default HomeListing;

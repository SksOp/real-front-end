import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ACIcon,
  BalconyIcon,
  GymIcon,
  PlayAreaIcon,
  SwimmingPoolIcon,
} from "@/public/svg/aminitiesIcon";
import { AmenitiesMap } from "@/constants/amenity";

function PropertyAminities({ aminities }: { aminities: object }) {
  console.log("amenitiesProp", aminities);

  // Correcting the typo from 'aminities' to 'amenities'
  const keys = aminities ? Object.keys(aminities) : [];

  console.log("keys", keys);

  return (
    <Card className="border-0 bg-background">
      <CardHeader className="p-0">
        <CardTitle className="text-lg text-secondary font-medium">
          Aminities
        </CardTitle>
      </CardHeader>
      <CardContent className="px-1 py-2">
        <div className="grid grid-cols-2 justify-items-start gap-4">
          {keys.map((key: string) => {
            const AmenitySvg = AmenitiesMap[key]?.svg;
            return (
              <>
                {AmenitySvg && (
                  <div
                    key={key}
                    className="flex justify-start gap-2 items-center"
                  >
                    {AmenitySvg && <AmenitySvg />}
                    <p className="text-muted-foreground text-sm font-normal">
                      {AmenitiesMap[key]?.title}
                    </p>
                  </div>
                )}
              </>
            );
          })}
          {/* <div className="flex justify-start gap-2 items-center">
            <ACIcon />
            <p className="text-muted-foreground text-sm font-normal">
              Air conditioner
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <GymIcon />
            <p className="text-muted-foreground text-sm font-normal">Gym</p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <PlayAreaIcon />
            <p className="text-muted-foreground text-sm font-normal">
              Play area
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <SwimmingPoolIcon />
            <p className="text-muted-foreground text-sm font-normal">
              Swimming pool
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <BalconyIcon />
            <p className="text-muted-foreground text-sm font-normal">Balcony</p>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyAminities;

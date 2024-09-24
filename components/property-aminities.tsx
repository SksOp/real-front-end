import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AmenitiesMap } from "@/constants/amenity";

function PropertyAmenities(amenitiesProp: any) {
  console.log("amenitiesProp", amenitiesProp);

  // Correcting the typo from 'aminities' to 'amenities'
  const keys = amenitiesProp?.aminities
    ? Object.keys(amenitiesProp.aminities)
    : [];

  console.log("keys", keys);

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Amenities</CardTitle>
      </CardHeader>
      <CardContent className="px-1 py-2">
        <div className="grid grid-cols-2 gap-4">
          {keys.length > 0 ? (
            keys.map((key: string) => {
              const AmenitySvg = AmenitiesMap[key]?.svg;
              return (
                <div
                  key={key}
                  className="flex justify-start gap-2 items-center"
                >
                  {AmenitySvg && <AmenitySvg />}
                  <p className="text-muted-foreground text-lg font-semibold">
                    {AmenitiesMap[key]?.title || amenitiesProp.aminities[key]}
                  </p>
                </div>
              );
            })
          ) : (
            <p>No amenities available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyAmenities;

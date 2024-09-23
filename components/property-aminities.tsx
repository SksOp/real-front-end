import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AmenitiesMap } from "@/constants/amenity";

function PropertyAmenities(amenitiesProp: any) {
  console.log("amenitiesProp", amenitiesProp);
  const keys = Object.keys(amenitiesProp.amenities);
  console.log("keys", keys);

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {keys.map((key: string) => (
            <div key={key} className="flex justify-start gap-2 items-center">
              {AmenitiesMap[key]?.svg && <AmenitiesMap[key].svg />}
              <p className="text-muted-foreground text-lg font-semibold">
                {AmenitiesMap[key]?.title}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyAmenities;

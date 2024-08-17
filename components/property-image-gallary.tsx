import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function PropertyImageGallary() {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 overflow-x-auto justify-start items-center">
        {Array(8)
          .fill("/property.png")
          .map((src, index) => (
            <img
              src={src}
              className="object-cover rounded-xl w-16 h-16"
              alt={`Property ${index + 1}`}
            />
          ))}
      </CardContent>
    </Card>
  );
}

export default PropertyImageGallary;

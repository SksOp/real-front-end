import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

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
            <Image
              src={src}
              className="object-cover rounded-xl w-16 h-16"
              alt={`Property ${index + 1}`}
              width={100}
              height={100}
            />
          ))}
      </CardContent>
    </Card>
  );
}

export default PropertyImageGallary;

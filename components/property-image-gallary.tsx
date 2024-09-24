"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

function PropertyImageGallary({ imageURLs }: { imageURLs: string[] }) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 overflow-x-auto justify-start items-center">
        {imageURLs.map((src, index) => (
          <Image
            key={index}
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

export default PropertyImageGallery;

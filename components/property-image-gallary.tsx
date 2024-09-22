"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

function PropertyImageGallery() {
  const propertyImage = [
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
    "/property.png",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Open the modal with the clicked image
  const openModal = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div>
      <Card className="border-0 bg-background p-0">
        <CardHeader className="p-0">
          <CardTitle className="text-base text-secondary font-medium">
            Gallery
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 overflow-x-scroll justify-start items-center p-0 py-2">
          {propertyImage.map((src, index) => (
            <img
              key={index}
              src={src}
              className="object-cover rounded-xl w-14 h-14 cursor-pointer"
              alt={`Property ${index + 1}`}
              onClick={() => openModal(src)}
            />
          ))}

          <div
            className="relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => openModal(propertyImage[4])}
          >
            <Image
              src={propertyImage[4]}
              className="object-cover w-full h-full"
              alt={`Property 10`}
              width={100}
              height={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex justify-center items-center">
              <p className="text-white text-lg font-bold">+10</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal for image viewer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 h-screen w-full flex justify-center items-center z-50">
          <div className="relative h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              className="object-contain rounded-lg"
              alt="Selected Property"
              width={600}
              height={600}
            />
            <button
              className="absolute top-2 right-2 text-white bg-black/70 p-2 rounded-full"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyImageGallery;

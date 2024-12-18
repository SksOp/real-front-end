"use client";
import React, { useState } from "react";
import { carouslItems } from "@/constants/carousal";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";
import HomeCarousalItem from "./home-Carousal-item";
import { useAuth } from "@/lib/auth";

function CarouselAd() {
  const auth = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const handleSlideChange = (event: any) => {
    const index = event.detail.index;
    setActiveSlide(index);
  };
  return (
    <Carousel className="w-full">
      <CarouselContent
        onChange={(index) => handleSlideChange(index)} // Pass handler to Carousel
        className="h-full "
      >
        {carouslItems.map((item) => (
          <CarouselItem className="h-full" key={item.id}>
            <HomeCarousalItem
              title={item.title}
              description={item.description}
              image={item.image}
              btn={auth?.user ? false : true}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dynamic Dots */}
      <CarouselDots />
    </Carousel>
  );
}

export default CarouselAd;

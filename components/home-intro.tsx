"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "./ui/button";
import HomeCarousalItem from "./home-Carousal-item";
import { useAuth } from "@/lib/auth";
import { carouslItems } from "@/constants/carousal";

function HomeIntro() {
  const auth = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [greeting, setGreeting] = useState<string>("Good Morning");

  useEffect(() => {
    if (auth?.user) {
      const displayName = auth.user.displayName?.split(" ")[0];
      setName(displayName || "Name");
    }
    const currentHour = new Date().getHours();
    console.log(currentHour);
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [auth]);

  // Function to handle slide change
  const handleSlideChange = (event: any) => {
    const index = event.detail.index; // Example: adjust based on the library's API
    setActiveSlide(index);
  };

  return (
    <div className="w-full p-4 ">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl bg-gradient-to-t from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
            <span className="">Hello {name}</span>{" "}
            <span className="inline-block text-black">👋</span>,
            <br />
            {greeting}!
          </h1>
          <p className="text-muted-foreground text-base font-normal">
            Every real estate insights you need in one place. We have put
            together a few handy resources here to help you.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent
            onChange={(index) => handleSlideChange(index)} // Pass handler to Carousel
            className=""
          >
            {carouslItems.map((item, idx) => (
              <CarouselItem key={item.id}>
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
      </div>
    </div>
  );
}

export default HomeIntro;

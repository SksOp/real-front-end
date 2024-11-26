"use client";
import React, { useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import HomeCarousalItem from "./home-Carousal-item";
import { useAuth } from "@/lib/auth";
import { carouslItems } from "@/constants/carousal";

function HomeIntro() {
  const auth = useAuth();
  const [name, setName] = React.useState<string | null>(null);

  useEffect(() => {
    if (auth?.user) {
      const displayName = auth.user.displayName?.split(" ")[0];
      setName(displayName || "Name");
    }
  }, [auth]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2.062rem] bg-gradient-to-t from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
            <span className="">Hello {name}</span>{" "}
            <span className="inline-block text-black">👋</span>,
            <br />
            Good Morning!
          </h1>
          <p className="text-muted-foreground text-base font-normal">
            Every real estate insights you need in one place. We have put
            together a few handy resources here to help you.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {carouslItems.map((item, idx) => (
              <CarouselItem key={item.id}>
                <HomeCarousalItem
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dynamic Dots */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {carouslItems.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === 0 ? "bg-[#C2C2C2] w-4" : "bg-[#E0E0E0]"
                  }`}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default HomeIntro;

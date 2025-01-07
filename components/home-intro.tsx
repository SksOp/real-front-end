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
import CarouselAd from "./carouselAd";
import { Card } from "./ui/card";

function HomeIntro() {
  const auth = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [greeting, setGreeting] = useState<string>("Good Morning");

  useEffect(() => {
    if (auth?.user) {
      const displayName = auth.user.displayName?.split(" ")[0];
      setName(displayName || "");
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

  return (
    <Card className="border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-3">
      <div className="flex flex-col gap-8">
        {name ? (
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
        ) : (
          <div className="flex flex-col gap-5 pl-1">
            <h3 className="text-2xl bg-gradient-to-t from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
              Win more deals with dubai’s most advanced & reliable broker
              insights platform.
            </h3>
            <p className="text-muted-foreground text-base font-normal">
              This app helps you plan how to move up the ladder and be the top
              broker!
            </p>
          </div>
        )}

        <CarouselAd />
      </div>
    </Card>
  );
}

export default HomeIntro;

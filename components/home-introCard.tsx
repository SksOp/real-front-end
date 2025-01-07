"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import SignupTrigger from "./signupTrigger";
import LoginTrigger from "./loginTrigger";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth";
import HomeLoginCards from "./home-login-cards";

function HomeIntroCard() {
  const auth = useAuth();
  const [name, setName] = useState<string | null>(null);

  const [greeting, setGreeting] = useState<string>("Good Morning");

  useEffect(() => {
    if (auth?.user) {
      const displayName = auth.user.displayName?.split(" ")[0];
      setName(displayName || "");
    }

    const currentHour = new Date().getHours();
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
      {auth.user ? (
        <>
          <h1 className="text-2xl bg-gradient-to-r from-[#6351E9] to-[#121114] text-transparent bg-clip-text font-bold">
            <span className="">Hello {name}</span>{" "}
            <span className="inline-block text-black">👋</span>,
            <br />
            {greeting}!
          </h1>
        </>
      ) : (
        <HomeLoginCards
          title="Win more deals with dubai’s most advanced & reliable broker insights
            platform."
          description="This app helps you plan how to move up the ladder and be the top
            broker!"
        />
      )}
    </Card>
  );
}

export default HomeIntroCard;

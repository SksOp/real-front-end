import React from "react";
import { Card } from "./ui/card";
import SignupTrigger from "./signupTrigger";
import LoginTrigger from "./loginTrigger";
import { Button } from "./ui/button";

function HomeIntroCard() {
  return (
    <Card className="border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-3">
      <h3 className="text-2xl bg-gradient-to-tl from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
        Win more deals with dubai’s most advanced & reliable broker insights
        platform.
      </h3>
      <p className="text-muted-foreground text-base font-normal">
        This app helps you plan how to move up the ladder and be the top broker!
      </p>
      <div className="flex items-center justify-start gap-2">
        <div className="flex justify-start items-center gap-2 ">
          <SignupTrigger>
            <Button>Join Now </Button>
          </SignupTrigger>

          <LoginTrigger>
            <Button variant={"outline"} className="">
              Sign In
            </Button>
          </LoginTrigger>
        </div>
      </div>
    </Card>
  );
}

export default HomeIntroCard;

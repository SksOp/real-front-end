import React from "react";
import SignupTrigger from "./signupTrigger";
import { Button } from "./ui/button";
import LoginTrigger from "./loginTrigger";

function HomeLoginCards({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-3">
      <h3 className="text-2xl bg-gradient-to-tl from-[#121212] to-[#6E5BFF] text-transparent bg-clip-text font-bold">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-base font-normal">
          {description}
        </p>
      )}
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
    </div>
  );
}

export default HomeLoginCards;

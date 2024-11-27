import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { AutosizeTextarea } from "./ui/auto-scale-textarea";

function Feedback() {
  return (
    <Card className="border rounded-xl w-full bg-background">
      <CardHeader className="">
        <CardTitle className="text-base font-semibold text-secondary">
          Is this dashboard helpful?
        </CardTitle>
        <CardDescription className="text-sm text-accent">
          Got all the information that you wanted? We are all ears for what you
          have to say! Click on your expression and type your feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-around  mb-2">
          <img src="/imgs/feedback/star1.png" alt="happy" className="" />
          <img src="/imgs/feedback/star2.png" alt="happy" className="" />
          <img src="/imgs/feedback/star3.png" alt="happy" className="" />
          <img src="/imgs/feedback/star4.png" alt="happy" className="" />
          <img src="/imgs/feedback/star5.png" alt="happy" className="" />
        </div>
        <div className="flex flex-col  gap-2">
          <AutosizeTextarea
            placeholder="Enter your Feedback"
            className=" bg-card h-fit rounded-xl border"
            maxHeight={200}
          />
          <Button
            variant={"ghost"}
            className=" min-w-fit px-2   text-secondary hover:bg-primary/10 h-12 rounded-xl border"
          >
            Send feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Feedback;

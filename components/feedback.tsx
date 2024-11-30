import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { AutosizeTextarea } from "./ui/auto-scale-textarea";
import {
  Feedback1,
  Feedback2,
  Feedback3,
  Feedback4,
  Feedback5,
} from "@/public/svg/feedback";

function Feedback() {
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);

  const handleFeedbackClick = (index: number) => {
    setSelectedFeedback(index);
  };

  return (
    <Card className="border rounded-xl w-full bg-background">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-secondary">
          Is this dashboard helpful?
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground font-normal">
          Got all the information that you wanted? We are all ears for what you
          have to say! Click on your expression and type your feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-around mb-2">
          <Feedback1
            isClicked={selectedFeedback === 1}
            onClick={() => handleFeedbackClick(1)}
          />
          <Feedback2
            isClicked={selectedFeedback === 2}
            onClick={() => handleFeedbackClick(2)}
          />
          <Feedback3
            isClicked={selectedFeedback === 3}
            onClick={() => handleFeedbackClick(3)}
          />
          <Feedback4
            isClicked={selectedFeedback === 4}
            onClick={() => handleFeedbackClick(4)}
          />
          <Feedback5
            isClicked={selectedFeedback === 5}
            onClick={() => handleFeedbackClick(5)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <AutosizeTextarea
            placeholder="Enter your Feedback"
            className="bg-card h-fit rounded-xl border"
            maxHeight={200}
          />
          <Button
            variant="ghost"
            className="min-w-fit px-2 text-secondary hover:bg-primary/10 h-12 rounded-xl border"
          >
            Send feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Feedback;

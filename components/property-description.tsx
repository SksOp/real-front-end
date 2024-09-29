import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { title } from "process";
import InsightCard from "./insightCard";

function PropertyDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur neque ab porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad quo sint, libero commodi officia aliquam! Maxime.";

  const wordLimit = 20;
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > wordLimit;

  const beginText = itCanOverflow
    ? splittedText.slice(0, wordLimit).join(" ")
    : text;
  const endText = splittedText.slice(wordLimit).join(" ");

  const data = [
    {
      title: "Builder",
      description: "Samsung Builders",
    },
    {
      title: "Developer",
      description: "Samsung Builders",
    },
    {
      title: "Built year",
      description: "Samsung Builders",
    },
    {
      title: "Nearest land mark",
      description: "Samsung Builders",
    },
    {
      title: "Nearest metro",
      description: "33494",
    },
  ];

  return (
    <Card className="border-0 bg-background">
      <CardHeader className="p-0">
        <CardTitle className="text-lg text-secondary font-medium">
          Property Description
        </CardTitle>
        <CardDescription className="text-muted-foreground font-normal text-sm">
          {beginText}
          {itCanOverflow && (
            <>
              {!isExpanded && <span>... </span>}
              <span className={`${!isExpanded ? "hidden" : ""}`}>
                {endText}
              </span>
              <span
                className="text-primary text-sm font-semibold ml-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 py-4 grid grid-cols-2 gap-3 justify-items-start">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <h3 className="text-sm text-secondary/80 font-semibold">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm font-normal">
              {item.description}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-0">
        <InsightCard linkText="View more insights">
          <h3 className="text-sm text-muted-foreground font-normal">
            Lorem ipsum <span className="text-secondary font-medium">4%</span>{" "}
            sit amet consectetur. Gravida augue aliquam interdum morbi eu elit.
            Neque Average price:{" "}
            <span className="text-secondary font-medium">750000.</span>
          </h3>
        </InsightCard>
      </CardFooter>
    </Card>
  );
}

export default PropertyDescription;

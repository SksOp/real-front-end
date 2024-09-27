import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    id: "item-1",
    question: "Can I create my own dashboard dashboard dashboard dashboard ?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    id: "item-2",
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    id: "item-3",
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function FrequentQuestions() {
  return (
    <Card className="bg-background flex flex-col gap-1 border rounded-xl  w-full px-3 py-4">
      <CardHeader className="p-0">
        <CardTitle className="text-secondary font-semibold text-base">
          Frequent Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="font-medium text-secondary text-sm text-start">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-normal text-muted-foreground text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

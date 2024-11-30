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
    question: "How often is the data refreshed?",
    answer:
      "Data is updated in real-time from DLD (Dubai Land Department) to ensure the most accurate and up-to-date information.",
  },
  {
    id: "item-2",
    question: "What is the source of the data?",
    answer:
      "All data is sourced from verified government platforms like DLD and Dubai Pulse. Some insights are enhanced with verified Property Finder data for added accuracy.",
  },
  {
    id: "item-3",
    question: "What are the core features of Keypilot?",
    answer:
      "Keypilot offers advanced analytics, customizable dashboards, calculators, key metrics, marketpulse, transactions, and rich insights. Drilldowns and metrics for listed or self-added properties are included.",
  },
  {
    id: "item-4",
    question: "How can Keypilot help my agency?",
    answer:
      "Keypilot provides tools for custom branding, team management, hierarchy setup, custom dashboards, and embedding rich insights into your agency's website through a widget—driving ROI and client engagement.",
  },
  {
    id: "item-5",
    question: "Is the Insights application free for brokers?",
    answer:
      "Yes, the insights app is completely free for brokers. Built with love for Dubai brokers, Keypilot empowers advanced real estate literacy and success.",
  },
  {
    id: "item-6",
    question: "Is my personal data secure?",
    answer:
      "Keypilot follows UAE laws and global GDPR standards to ensure your personal data is secure. Privacy is our top priority.",
  },
  {
    id: "item-7",
    question: "I’m not a broker. Can I still sign up?",
    answer:
      "Yes, while certain features are tailored for brokers, limited features are accessible to everyone.",
  },
];

export default function FrequentQuestions() {
  return (
    <Card className="bg-background flex flex-col gap-1 border rounded-xl  w-full px-3 py-4">
      <CardHeader className="p-0">
        <CardTitle className="text-secondary font-semibold text-lg">
          Frequent Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="font-medium text-secondary text-base text-start">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-normal text-muted-foreground text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

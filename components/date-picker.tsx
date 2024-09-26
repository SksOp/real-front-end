import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";

function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "py-6 w-full bg-card rounded-lg justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(new Date(date), "dd MMM yyyy") : "Select"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          onSelect={(day) => setDate(day)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;

import React from "react";
import { Spinner } from "./ui/spinner";
import { MainLogo } from "@/public/svg/logo";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

function LoadingWidget({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen items-center justify-center gap-2",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <MainLogo className="animate-spin-slow" />
        <h3 className="font-bold text-secondary text-2xl">Keypilot.</h3>
      </div>
      <h3 className="font-semibold text-secondary text-lg">
        Your path to be the top 1% of brokers.
      </h3>
    </div>
  );
}

export default LoadingWidget;

"use client";
import { cn } from "@/lib/utils";
import { BackIcon } from "@/public/svg/navIcons";
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Progressbar from "./progressbar";
import Navbar from "@/layout/nav/navBar";

function SecondaryNavbar({
  title,
  page,
  className,
  children,
}: {
  title: string;
  page?: string;
  className?: ClassValue;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);

  return (
    <main
      className={
        "min-h-screen relative bg-gradient-to-b from-backgrounds to-[#FAFAFA] w-full max-w-screen"
      }
      ref={navRef}
    >
      <nav
        className={cn(
          "w-full bg-background flex fixed  items-center z-50 md:hidden px-4 py-2 border-b",
          className
        )}
      >
        <div onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-secondary font-semibold text-base truncate">
          {title}
        </h3>
      </nav>
      <Navbar page={page} className={cn("hidden md:block", className)} />
      <Progressbar target={navRef} className="top-11" />
      {children}
    </main>
  );
}

export default SecondaryNavbar;

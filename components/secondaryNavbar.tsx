"use client";
import { BackIcon } from "@/public/svg/navIcons";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Progressbar from "./progressbar";

function SecondaryNavbar({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);
  return (
    <main
      className="min-h-screen relative bg-gradient-to-b from-backgrounds to-[#FAFAFA] w-full max-w-screen"
      ref={navRef}
    >
      <nav className="w-full bg-background flex  items-center  px-4 py-2 border-b">
        <div onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-secondary font-semibold text-base">
          {title}
        </h3>
      </nav>
      <Progressbar target={navRef} className="top-0" />
      {children}
    </main>
  );
}

export default SecondaryNavbar;

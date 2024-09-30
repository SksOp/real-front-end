"use client";
import { BackIcon } from "@/public/svg/navIcons";
import { useRouter } from "next/navigation";
import React from "react";

function SecondaryNavbar({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-backgrounds to-[#FAFAFA] w-full max-w-screen overflow-y-auto ">
      <nav className="w-full bg-background fixed flex  items-center z-50 px-4 py-2 top-0 border-b">
        <div onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-secondary font-semibold text-base">
          {title}
        </h3>
      </nav>
      {children}
    </div>
  );
}

export default SecondaryNavbar;

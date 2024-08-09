"use client";
import Layout from "@/layout";
import React, { use, useEffect } from "react";
import InsightPage from "./insights/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/insights");
  });

  return <div>dashboard</div>;
}

"use client";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  return redirect("/app/home");
}

"use client";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to the login page if the user is not authenticated
    if (!user) router.replace("/auth/login");
  }, [router, user]);

  // Render the children inside a Suspense component to show a loading indicator while checking authentication status
  return <React.Suspense fallback={<Progress />}>{children}</React.Suspense>;
}

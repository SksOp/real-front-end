"use client";

import { AuthConsumer } from "@/auth/context/auth-consumer";
import { AuthProvider } from "@/auth/context/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/repository/tanstack/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthConsumer>
          {children}
          <Toaster />
        </AuthConsumer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

"use client";

import { AuthConsumer } from "@/auth/context/auth-consumer";
import { AuthProvider } from "@/auth/context/auth-provider";
import CookieConsent from "@/components/ui/cookieConsent";
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
          <CookieConsent variant="small" />
        </AuthConsumer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

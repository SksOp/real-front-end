import AuthGuard from "@/auth/guard/auth-guard";
import { Suspense } from "react";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}

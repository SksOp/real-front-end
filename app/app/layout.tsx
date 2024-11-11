import AuthGuard from "@/auth/guard/auth-guard";
import Layout from "@/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}

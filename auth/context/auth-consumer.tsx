import { AuthContext } from "./auth-context";
import { Spinner } from "@/components/ui/spinner";

export function AuthConsumer({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <Spinner /> : children)}
    </AuthContext.Consumer>
  );
}

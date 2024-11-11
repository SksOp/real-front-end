"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await signInWithGoogle();
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/app/home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-background p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <div className="md:w-1/2">
          <img src="/svg/auth.svg" alt="" className="object-cover" />
        </div>
        <div className="flex flex-col gap-8 ">
          <h3 className="text-secondary font-bold text-2xl">
            Login To Your <br /> Account
          </h3>{" "}
          <Button variant={"secondary"} onClick={handleSignUp}>
            Sign In With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

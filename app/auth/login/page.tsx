"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GoogleIcon, SplashIcon } from "@/public/svg/auth";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await signInWithGoogle();
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/app/home");
    } catch (e: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: e.message,
        variant: "destructive",
      });
      console.error(e);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in with Google:", user);
      router.push("/app/home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen  bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <SplashIcon />
      </div>
      <div className="hidden md:block md:w-1/2 pl-20">
        <img src="/svg/auth.svg" alt="" className="object-cover" />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center  w-full">
        <h3 className="text-secondary font-bold text-2xl -translate-x-1/2">
          Create Account.
        </h3>

        {/* Email Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm ">
          <Label htmlFor="email" className="text-secondary font-normal text-sm">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg bg-card"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label
            htmlFor="password"
            className="text-secondary font-normal text-sm"
          >
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg "
            required
          />
        </div>

        <Button
          onClick={handleSignIn}
          variant={"secondary"}
          className="text-background flex text-sm justify-center max-w-sm items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-xl border"
        >
          Continue
        </Button>
        <div className="flex gap-2 w-full items-center max-w-sm justify-center px-4">
          <Separator className="w-[8rem] " />
          <span>Or</span>
          <Separator className="w-[8rem] " />
        </div>
        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="text-secondary flex text-sm justify-center items-center gap-1 font-normal w-full h-14 rounded-xl border max-w-sm"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
        <h3 className="text-accent font-normal text-sm">
          Don’t have an account?{" "}
          <span className="text-primary font-semibold">Create One</span>
        </h3>
      </div>
    </div>
  );
};

export default SignIn;

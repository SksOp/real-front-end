"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  sendVerificationEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/auth";
import { GoogleIcon } from "@/public/svg/auth";

function SignInModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brn, setBrn] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Email/Password Sign-Up Handler
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Sorry, your passwords don't match.",
        variant: "destructive",
      });

      return;
    }
    if (!email || !password) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const user = await signUpWithEmail(email, password);
      console.log("User signed up:", user);
      await sendVerificationEmail();
      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setPhoneNumber("");
      setBrn("");

      // Navigate to the verify page
      router.push("/auth/sign-up/verify");
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
    <div className=" items-center justify-center p-4">
      <div className="flex flex-col gap-5 items-center justify-center  w-full">
        <h3 className="text-secondary font-bold text-2xl -translate-x-1/2 ">
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

        {/* Phone Number Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label htmlFor="phone" className="text-secondary font-normal text-sm">
            Phone Number
          </Label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded-lg bg-card"
          />
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label htmlFor="name" className="text-secondary font-normal text-sm">
            Name
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg bg-card"
          />
        </div>

        {/* BRN Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label htmlFor="brn" className="text-secondary font-normal text-sm">
            BRN
          </Label>
          <Input
            type="text"
            value={brn}
            onChange={(e) => setBrn(e.target.value)}
            className="border rounded-lg bg-card"
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

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label
            htmlFor="confirm-password"
            className="text-secondary font-normal text-sm"
          >
            Confirm Password <span className="text-red-500">*</span>
          </Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg bg-card"
            required
          />
        </div>

        <Button
          onClick={handleSignUp}
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
          Already have an account?{" "}
          <span
            className="text-primary font-semibold"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </h3>
      </div>
    </div>
  );
}

export default SignInModel;

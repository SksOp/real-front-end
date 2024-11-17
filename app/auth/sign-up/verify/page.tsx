"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { sendVerificationEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerifyEmail = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleResendVerificationEmail = async () => {
    setLoading(true);
    try {
      await sendVerificationEmail();
      toast({
        title: "Email Sent!",
        description:
          "A new verification email has been sent to your email address.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
      <p className="text-center max-w-md mb-8">
        We have sent a verification link to your email. Please check your inbox
        and click on the link to verify your email address.
        <br />
        Didn’t receive the email? Click the button below to resend it.
      </p>
      <Button
        onClick={handleResendVerificationEmail}
        disabled={loading}
        className="w-full max-w-xs"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </Button>
    </div>
  );
};

export default VerifyEmail;

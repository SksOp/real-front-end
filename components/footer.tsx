import React from "react";

function Footer() {
  return (
    <div className="w-full pt-2">
      <h1 className="text-xl font-bold border-t pt-2">Keypilot.</h1>
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <h3 className="text-secondary font-normal text-xs">Terms of Use</h3>
        <h3 className="text-secondary font-normal text-xs">Privacy Policy</h3>
        <h3 className="text-secondary font-normal text-xs">Feedback</h3>
        <h3 className="text-secondary font-normal text-xs">Contact</h3>
        <p className="text-accent font-normal text-xs">
          &#169; 2024 copy rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

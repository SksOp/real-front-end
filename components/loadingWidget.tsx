import React from "react";
import { Spinner } from "./ui/spinner";

function LoadingWidget() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
      <div className="ml-2">Loading...</div>
    </div>
  );
}

export default LoadingWidget;

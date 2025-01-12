"use client";

import { useState, useEffect } from "react";

type NetworkStatus = "online" | "offline";

/**
 * useNetwork Hook
 *
 * This hook provides the current network status, either 'online' or 'offline'.
 *
 * @returns The current network status as a string ('online' or 'offline').
 */

const useNetwork = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>("online");

  useEffect(() => {
    // Set initial status on the client side
    const initialStatus = window.navigator.onLine ? "online" : "offline";
    setStatus(initialStatus);

    const handleOnlineStatusChange = () => {
      setStatus(window.navigator.onLine ? "online" : "offline");
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return status;
};

export default useNetwork;

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
  const [status, setStatus] = useState<NetworkStatus>(
    window.navigator.onLine ? "online" : "offline"
  );

  useEffect(() => {
    /**
     * Handles changes in the online status of the browser.
     */

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

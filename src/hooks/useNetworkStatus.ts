import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

import { showAlert } from "@/utils/ui";
import { AlertMessages } from "@/constants";

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (isConnected !== null && state.isConnected !== isConnected) {
        // Show alert only when the connection status changes
        showAlert(
          AlertMessages.CON_STATUS_TITLE,
          state.isConnected
            ? AlertMessages.CON_RECOVER_MESSAGE
            : AlertMessages.CON_LOSE_MESSAGE
        );
      }
      setIsConnected(state.isConnected);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [isConnected]);
};

export default useNetworkStatus;

import React, { useRef, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

import { showAlert } from "@/utils/ui";
import { AlertMessages } from "@/constants";

const useNetworkStatus = () => {
  const isConnected = useRef<boolean | null>(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (
        isConnected.current !== null &&
        state.isConnected !== isConnected.current
      ) {
        // Show alert only when the connection status changes
        showAlert(
          AlertMessages.CON_STATUS_TITLE,
          state.isConnected
            ? AlertMessages.CON_RECOVER_MESSAGE
            : AlertMessages.CON_LOSE_MESSAGE
        );
      }

      isConnected.current = state.isConnected;
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
};

export default useNetworkStatus;

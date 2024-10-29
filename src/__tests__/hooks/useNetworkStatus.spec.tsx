import { renderHook, waitFor } from "@testing-library/react-native";
import NetInfo from "@react-native-community/netinfo";

import { showAlert } from "@/utils/ui";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { AlertMessages } from "@/constants";

jest.mock("@/utils/ui", () => require("@/utils/__mocks__/ui").default);
jest.mock(
  "@react-native-community/netinfo",
  () => require("@/utils/__mocks__/netInfo").default
);

describe("useNetworkStatus Hook", () => {
  const mockUnsubscribe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock addEventListener to accept a callback and return mockUnsubscribe
    (NetInfo.addEventListener as jest.Mock).mockImplementation((callback) => {
      // Initially set as disconnected for test setup
      callback({ isConnected: false });

      return mockUnsubscribe;
    });
  });

  test("should show an alert when networkstatus changes", async () => {
    renderHook(() => useNetworkStatus());

    // Triggering a network change to connected
    (NetInfo.addEventListener as jest.Mock).mock.calls[0][0]({
      isConnected: true,
    });

    // Triggering a network change to disconnected
    (NetInfo.addEventListener as jest.Mock).mock.calls[0][0]({
      isConnected: false,
    });

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith(
        AlertMessages.CON_STATUS_TITLE,
        AlertMessages.CON_LOSE_MESSAGE
      );
    });

    // Triggering a network change to connected
    (NetInfo.addEventListener as jest.Mock).mock.calls[0][0]({
      isConnected: true,
    });

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith(
        AlertMessages.CON_STATUS_TITLE,
        AlertMessages.CON_RECOVER_MESSAGE
      );
    });
  });

  test("should not show alert if connection status is unchanged", async () => {
    renderHook(() => useNetworkStatus());

    // Triggering the same network state consecutively
    (NetInfo.addEventListener as jest.Mock).mock.calls[0][0]({
      isConnected: false,
    });
    (NetInfo.addEventListener as jest.Mock).mock.calls[0][0]({
      isConnected: false,
    });

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledTimes(0); // Should not show alert for unchanged state
    });
  });

  test("should unsubscribe from NetInfo on unmount", () => {
    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});

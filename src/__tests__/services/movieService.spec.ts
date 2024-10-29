import { showErrorAlert } from "@/utils/ui";
import { ErrorMessages } from "@/constants";
import { getData } from "@/services/apiClient";
import { fetchMovies, fetchMovie } from "@/services/movieService";

jest.mock("@/services/apiClient");
jest.mock("@/store", () => require("@/utils/__mocks__/store").default);
jest.mock("@/utils/ui", () => require("@/utils/__mocks__/ui").default);

describe("Movie Service Functions", () => {
  beforeAll(() => {
    // mock console.error to prevent error messages during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchMovies", () => {
    it("should fetch movies successfully", async () => {
      const mockResponse = {
        data: { Search: [{ id: "1", title: "Test Movie" }] },
      };
      (getData as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchMovies("test");

      expect(result).toEqual(mockResponse.data.Search);
      expect(getData).toHaveBeenCalledWith("/", {
        r: "json",
        s: "test",
        type: undefined,
        y: undefined,
        page: undefined,
      });
    });

    it("should handle empty search value", async () => {
      await fetchMovies("");

      expect(showErrorAlert).toHaveBeenCalledWith(ErrorMessages.GENERAL_ERROR);
      expect(getData).not.toHaveBeenCalled();
    });

    it("should handle no response data", async () => {
      (getData as jest.Mock).mockResolvedValue(null);

      const result = await fetchMovies("test");

      expect(result).toBeUndefined();
    });

    it("should handle errors", async () => {
      (getData as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchMovies("test");

      expect(result).toBeUndefined();
      expect(showErrorAlert).toHaveBeenCalledWith(ErrorMessages.GENERAL_ERROR);
    });
  });

  describe("fetchMovie", () => {
    it("should fetch a movie successfully", async () => {
      const mockResponse = { data: { id: "1", title: "Test Movie" } };
      (getData as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchMovie("1");

      expect(result).toEqual(mockResponse.data);
      expect(getData).toHaveBeenCalledWith("/", { r: "json", i: "1" });
    });

    it("should handle empty id", async () => {
      await fetchMovie("");

      expect(showErrorAlert).toHaveBeenCalledWith(ErrorMessages.GENERAL_ERROR);
      expect(getData).not.toHaveBeenCalled();
    });

    it("should handle no response data", async () => {
      (getData as jest.Mock).mockResolvedValue(null);

      const result = await fetchMovie("1");

      expect(result).toBeUndefined();
    });

    it("should handle errors", async () => {
      (getData as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchMovie("1");

      expect(result).toBeUndefined();
      expect(showErrorAlert).toHaveBeenCalledWith(ErrorMessages.GENERAL_ERROR);
    });
  });
});

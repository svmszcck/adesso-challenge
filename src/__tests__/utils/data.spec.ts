import {
  calculateNextPageParam,
  updateImageSize,
  generateYearRange,
  normalizeListData,
  getListItem,
  normalizeFilterText,
  normalizeGenres,
} from "@/utils/data";

describe("Data Utility Functions", () => {
  describe("calculateNextPageParam", () => {
    it("should return next page number if last page exists and is not empty", () => {
      const lastPage = [1, 2, 3];
      const pages = [[1], [2], [3]];
      expect(calculateNextPageParam(lastPage, pages)).toBe(4);
    });

    it("should return undefined if last page is empty", () => {
      const lastPage: unknown[] = [];
      const pages = [[1], [2], [3]];
      expect(calculateNextPageParam(lastPage, pages)).toBeUndefined();
    });

    it("should return undefined if last page is undefined", () => {
      const lastPage = undefined;
      const pages = [[1], [2], [3]];
      expect(calculateNextPageParam(lastPage, pages)).toBeUndefined();
    });
  });

  describe("updateImageSize", () => {
    it("should return updated image URL when original URL is valid", () => {
      const originalUrl = "https://example.com/imageSX300.jpg";
      const newValue = 500;
      expect(updateImageSize(originalUrl, newValue)).toBe(
        "https://example.com/imageSX500.jpg"
      );
    });

    it("should return undefined and log a warning if original URL is invalid", () => {
      const originalUrl = "https://example.com/image.jpg";
      const newValue = 500;
      console.warn = jest.fn();
      expect(updateImageSize(originalUrl, newValue)).toBeUndefined();
      expect(console.warn).toHaveBeenCalledWith(
        "The original string does not contain the required part."
      );
    });
  });

  describe("generateYearRange", () => {
    it("should generate a range of years from startYear to endYear", () => {
      const startYear = 2000;
      const endYear = 2005;
      expect(generateYearRange(startYear, endYear)).toEqual([
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000",
      ]);
    });

    it("should throw an error if startYear is greater than endYear", () => {
      expect(() => generateYearRange(2005, 2000)).toThrow(
        "Start year must be less than or equal to end year."
      );
    });

    it("should generate a range of years from startYear to the current year if endYear is not provided", () => {
      const startYear = 2000;
      const currentYear = new Date().getFullYear();
      const expectedYears = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => (currentYear - i).toString()
      );
      expect(generateYearRange(startYear)).toEqual(expectedYears);
    });
  });

  describe("normalizeListData", () => {
    it("should return an array of ListItem objects", () => {
      const data = ["Item1", "Item2"];
      expect(normalizeListData(data)).toEqual([
        { title: "Item1", value: "Item1" },
        { title: "Item2", value: "Item2" },
      ]);
    });
  });

  describe("getListItem", () => {
    it("should return the item with the matching value", () => {
      const data = [
        { title: "Action", value: "action" },
        { title: "Comedy", value: "comedy" },
      ];
      expect(getListItem(data, "action")).toEqual({
        title: "Action",
        value: "action",
      });
    });

    it("should return undefined if no matching item is found", () => {
      const data = [{ title: "Action", value: "action" }];
      expect(getListItem(data, "comedy")).toBeUndefined();
    });
  });

  describe("normalizeFilterText", () => {
    it('should return "-" if both type and year are undefined', () => {
      expect(normalizeFilterText()).toBe("-");
    });

    it("should return the correct filter text when type and year are provided", () => {
      expect(normalizeFilterText("episode", "2020")).toBe(
        "Tür: Bölüm , Yıl: 2020"
      );
    });

    it("should return the correct filter text when only type is provided", () => {
      expect(normalizeFilterText("series")).toBe("Tür: Dizi");
    });

    it("should return the correct filter text when only year is provided", () => {
      expect(normalizeFilterText(undefined, "2020")).toBe("Yıl: 2020");
    });
  });

  describe("normalizeGenres", () => {
    it("should return undefined if genres is undefined", () => {
      expect(normalizeGenres()).toBeUndefined();
    });

    it("should return undefined if genres is an empty string", () => {
      expect(normalizeGenres("")).toEqual(undefined);
    });

    it("should split a comma-separated string into an array of strings", () => {
      expect(normalizeGenres("Action,Drama,Comedy")).toEqual([
        "Action",
        "Drama",
        "Comedy",
      ]);
    });

    it("should handle single-genre strings correctly", () => {
      expect(normalizeGenres("Action")).toEqual(["Action"]);
    });

    it("should handle strings with extra spaces around commas", () => {
      expect(normalizeGenres("Action, Drama, Comedy")).toEqual([
        "Action",
        " Drama",
        " Comedy",
      ]);
    });
  });
});

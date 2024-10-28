import { isValidText, isString, isEmpty, checkURL } from "@/utils/validation";

describe("Validation Utility Functions", () => {
  describe("isValidText", () => {
    it("should return true for valid strings", () => {
      expect(isValidText("Hello World")).toBe(true);
    });

    it("should return false for empty string", () => {
      expect(isValidText("")).toBe(false);
    });

    it("should return false for 'N/A'", () => {
      expect(isValidText("N/A")).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isValidText(undefined)).toBe(false);
    });

    it("should return false for null", () => {
      expect(isValidText(null)).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(isValidText(123)).toBe(false);
      expect(isValidText([])).toBe(false);
      expect(isValidText({})).toBe(false);
    });
  });

  describe("isString", () => {
    it("should return true for string values", () => {
      expect(isString("Hello")).toBe(true);
    });

    it("should return false for non-string values", () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should return true for an empty array", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should return false for a non-empty array", () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty(["a", "b", "c"])).toBe(false);
    });
  });

  describe("checkURL", () => {
    it("should return true for valid HTTP URL", () => {
      expect(checkURL("http://example.com")).toBe(true);
    });

    it("should return true for valid HTTPS URL", () => {
      expect(checkURL("https://example.com")).toBe(true);
    });

    it("should return false for invalid URL", () => {
      expect(checkURL("invalid-url")).toBe(false);
    });

    it("should return false for an empty string", () => {
      expect(checkURL("")).toBe(false);
    });
  });
});

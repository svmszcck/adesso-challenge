const useFilterMock = {
  __esModule: true,
  default: jest.fn(() => ({
    type: "",
    setType: jest.fn(),
    year: "",
    setYear: jest.fn(),
  })),
};

export default useFilterMock;

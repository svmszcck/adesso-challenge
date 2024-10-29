const mockedAsyncStorage = {
  loadData: jest.fn(),
  clearData: jest.fn(),
  itemExists: jest.fn(),
  addItem: jest.fn(),
  removeItem: jest.fn(),
};

export default mockedAsyncStorage;

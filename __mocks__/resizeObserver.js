/** Jest: ResizeObserver is not implemented in jsdom; stub with jest.fn so methods are non-empty for static analysis. */
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

import { jest } from "@jest/globals";

const setUpTest = () => {
  let spy = {};

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();

    spy.console = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    spy.console.mockRestore();
  });

  return spy;
};

export default setUpTest;

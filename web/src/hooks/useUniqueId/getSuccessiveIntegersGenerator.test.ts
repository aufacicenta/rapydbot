import { getSuccessiveIntegersGenerator } from "./getSuccessiveIntegersGenerator";

test("getNextInteger", () => {
  const getNextInteger = getSuccessiveIntegersGenerator();
  expect(getNextInteger()).toEqual(1);
  expect(getNextInteger()).toEqual(2);
  expect(getNextInteger()).toEqual(3);
});

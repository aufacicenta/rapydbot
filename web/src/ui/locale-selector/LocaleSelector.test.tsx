import { screen, render } from "tests";

import { LocaleSelector } from "./LocaleSelector";

describe("LocaleSelector", () => {
  it("renders children correctly", () => {
    render(<LocaleSelector>LocaleSelector</LocaleSelector>);

    const element = screen.getByText("LocaleSelector");

    expect(element).toBeInTheDocument();
  });
});

import { screen, render } from "tests";

import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders children correctly", () => {
    render(<TextInput>TextInput</TextInput>);

    const element = screen.getByText("TextInput");

    expect(element).toBeInTheDocument();
  });
});

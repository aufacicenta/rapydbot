import { screen, render } from "tests";
import { NotesIcon } from "ui/shared/icons/NotesIcon";

import { MenuList } from "./MenuList";

describe("MenuList", () => {
  it("renders children correctly", () => {
    render(
      <MenuList>
        <MenuList.Item>Test 1</MenuList.Item>
        <MenuList.Item icon={<NotesIcon />}>Test 2</MenuList.Item>
        <MenuList.Item>Test 3</MenuList.Item>
      </MenuList>,
    );

    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 3")).toBeInTheDocument();
  });
});

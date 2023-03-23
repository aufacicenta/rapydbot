import React, { ReactNode } from "react";
import { renderHook } from "tests";

import { useDropdownContext } from "./useDropdownContext";
import { DropdownContext } from "./DropdownContext";

describe("useSelectContext test", () => {
  const contextValue = {
    focusedIndex: 0,
  };

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>
  );

  it("returns DropdownContext value", () => {
    const { result } = renderHook(() => useDropdownContext(), {
      wrapper,
    });

    expect(result.current).toEqual(contextValue);
  });

  it("throws error when useDropdownContext is not used within TabsContext", () => {
    const { result } = renderHook(() => useDropdownContext());

    expect(result.error).toEqual(new Error("useDropdownContext must be used within an DropdownContext"));
  });
});

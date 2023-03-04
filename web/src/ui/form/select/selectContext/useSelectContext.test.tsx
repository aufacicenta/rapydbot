import React, { ReactNode } from "react";
import { renderHook } from "tests";

import { useSelectContext } from "./useSelectContext";
import { SelectContext } from "./SelectContext";

describe("useSelectContext test", () => {
  const contextValue = {
    value: "1",
    focusedIndex: 0,
    onChange: jest.fn,
  };

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
  );

  it("returns SelectContext value", () => {
    const { result } = renderHook(() => useSelectContext(), {
      wrapper,
    });

    expect(result.current).toEqual(contextValue);
  });

  it("throws error when useSelectContext is not used within SelectContext", () => {
    const { result } = renderHook(() => useSelectContext());

    expect(result.error).toEqual(new Error("useSelectContext must be used within an SelectContext"));
  });
});

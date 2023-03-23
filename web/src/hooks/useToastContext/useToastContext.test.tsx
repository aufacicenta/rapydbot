import React, { ReactNode } from "react";
import { renderHook } from "tests";

import { ToastContext } from "context/toast/ToastContext";

import { useToastContext } from "./useToastContext";

describe("useToast test", () => {
  const contextValue = {
    addToast: jest.fn(),
  };

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
  );

  it("returns toastContext value", () => {
    const { result } = renderHook(() => useToastContext(), {
      wrapper,
    });

    expect(result.current).toEqual(contextValue);
  });

  it("throws error when useToast is not used within ToastContext", () => {
    const { result } = renderHook(() => useToastContext());

    expect(result.error).toEqual(new Error("useToast must be used within an ToastContext"));
  });
});

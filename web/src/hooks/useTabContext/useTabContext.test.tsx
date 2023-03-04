import { renderHook } from "tests";

import { useTabContext } from "./useTabContext";

describe("useTabContext", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useTabContext());

    expect(result.current).toEqual("1");
  });
});

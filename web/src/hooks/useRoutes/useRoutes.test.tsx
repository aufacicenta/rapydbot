import { renderHook } from "tests";

import { useRoutes } from "./useRoutes";

describe("useRoutes", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useRoutes());

    expect(result.current).toEqual("1");
  });
});

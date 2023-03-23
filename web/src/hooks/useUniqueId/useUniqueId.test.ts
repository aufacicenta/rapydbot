import { renderHook } from "tests";

import { useUniqueId } from "./useUniqueId";
import { getSuccessiveIntegersGenerator } from "./getSuccessiveIntegersGenerator";

jest.mock("./getSuccessiveIntegersGenerator", () => {
  const mock = jest.fn();

  return {
    getSuccessiveIntegersGenerator() {
      return mock;
    },
  };
});

describe("useUniqueId", () => {
  beforeEach(() => {
    (getSuccessiveIntegersGenerator() as jest.Mock).mockReset().mockReturnValueOnce("1").mockReturnValueOnce("2");
  });

  it("returns idFromProps if provided", async () => {
    const { result } = renderHook(({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }), {
      initialProps: { id: "id-from-props" },
    });

    expect(result.current).toEqual("id-from-props");
  });

  it("returns auto-generated id if idFromProps is not provided", async () => {
    const { result } = renderHook(({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }), {
      initialProps: { id: undefined },
    });

    expect(result.current).toEqual("id-1");
  });

  it("returns auto-generated id without prefix if none is provided", async () => {
    const { result } = renderHook(({ id: idFromProps }) => useUniqueId({ idFromProps }), {
      initialProps: { id: undefined },
    });

    expect(result.current).toEqual("1");
  });

  it("keeps returning the same auto-generated id for the same component instance", async () => {
    const { result, rerender } = renderHook(({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }), {
      initialProps: { id: undefined },
    });

    expect(result.current).toEqual("id-1");

    rerender({ id: undefined });

    expect(result.current).toEqual("id-1");
  });

  it("switches between idFromProps and auto-generated id when idFromProps changes", async () => {
    const { result, rerender } = renderHook<{ id?: string }, string | undefined>(
      ({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }),
      {
        initialProps: { id: "id-from-props" },
      },
    );

    expect(result.current).toEqual("id-from-props");

    rerender({ id: "another-id-from-props" });

    expect(result.current).toEqual("another-id-from-props");

    rerender({ id: undefined });

    expect(result.current).toEqual("id-1");

    rerender({ id: "yet-another-id-from-props" });

    expect(result.current).toEqual("yet-another-id-from-props");

    rerender({ id: undefined });

    expect(result.current).toEqual("id-1");
  });

  it("returns different auto-generated ids for different component instances", async () => {
    const { result: resultA, rerender: rerenderA } = renderHook(
      ({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }),
      {
        initialProps: { id: undefined },
      },
    );
    const { result: resultB, rerender: rerenderB } = renderHook(
      ({ id: idFromProps }) => useUniqueId({ prefix: "id-", idFromProps }),
      {
        initialProps: { id: undefined },
      },
    );

    expect(resultA.current).toEqual("id-1");
    expect(resultB.current).toEqual("id-2");

    rerenderA({ id: undefined });
    rerenderB({ id: undefined });

    expect(resultA.current).toEqual("id-1");
    expect(resultB.current).toEqual("id-2");
  });
});

import React, { useContext } from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "tests";

import { ToastContextController } from "./ToastContextController";
import { ToastContext } from "./ToastContext";
import { ToastContextType } from "./ToastContext.types";

jest.useFakeTimers();

describe("ToastContextController component", () => {
  const ToastUpdater = ({ withTimeout = true }: { withTimeout?: boolean }) => {
    const { addToast } = useContext(ToastContext) as ToastContextType;

    return (
      <button type="button" onClick={() => addToast({ variant: "info", title: "Hello", withTimeout })}>
        Add toast!
      </button>
    );
  };

  it("does show toast without timers", () => {
    render(
      <ToastContextController>
        <ToastUpdater withTimeout={false} />
      </ToastContextController>,
    );

    userEvent.click(screen.getByRole("button", { name: "Add toast!" }));
    userEvent.click(screen.getByRole("button", { name: "Add toast!" }));
    userEvent.click(screen.getByRole("button", { name: "Add toast!" }));

    const elements = screen.getAllByText("Hello");

    expect(elements).toHaveLength(3);
  });

  it("remove toast on click", async () => {
    jest.useFakeTimers();

    render(
      <ToastContextController>
        <ToastUpdater withTimeout={false} />
      </ToastContextController>,
    );

    userEvent.click(screen.getByRole("button", { name: "Add toast!" }));

    act(() => {
      jest.runAllTimers();
    });

    const element = screen.getByText("Hello");

    expect(element).toBeInTheDocument();

    userEvent.click(screen.getAllByRole("button")[1]);

    act(() => {
      jest.runAllTimers();
    });

    expect(element).not.toBeInTheDocument();
  });

  it("remove toast on timeout", async () => {
    render(
      <ToastContextController>
        <ToastUpdater />
      </ToastContextController>,
    );

    userEvent.click(screen.getByRole("button", { name: "Add toast!" }));

    act(() => {
      jest.advanceTimersByTime(301);
    });

    const element = screen.getByText("Hello");

    expect(element).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5001);
    });

    expect(element).not.toBeInTheDocument();
  });
});

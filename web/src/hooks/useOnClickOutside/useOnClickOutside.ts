import { RefObject, useEffect } from "react";

const MOUSEDOWN = "mousedown";
const TOUCHSTART = "touchstart";

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = { [Type in HandledEventsType]: HTMLElementEventMap[Type] }[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const defaultEvents: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const hasIgnoreClass = (element: Element, ignoreClass: string): boolean => {
  let el: Element | null = element;

  while (el) {
    if (el?.classList && el?.classList.contains(ignoreClass)) return true;
    el = el.parentElement;
  }

  return false;
};

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Handler,
  ignoreClass?: string,
  events = defaultEvents,
) => {
  useEffect(() => {
    const listener = (event: PossibleEvent) => {
      if (ignoreClass && hasIgnoreClass(event.target as Element, ignoreClass)) return;

      if (!ref.current || ref.current.contains(event.target as Element)) {
        return;
      }

      handler(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, { passive: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [events, handler, ref, ignoreClass]);
};

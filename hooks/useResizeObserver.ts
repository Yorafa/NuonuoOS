import { useEffect, useRef } from "react";

const useResizeObserver = (
  elementOrRef:
    | HTMLElement
    | null
    | undefined
    | React.RefObject<HTMLElement | null>,
  callback?: ResizeObserverCallback
): void => {
  const resizeObserverRef = useRef<ResizeObserver | undefined>(undefined);

  useEffect(() => {
    const element =
      elementOrRef instanceof HTMLElement
        ? elementOrRef
        : elementOrRef?.current;

    if (element instanceof HTMLElement && callback) {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = new ResizeObserver(callback);
      resizeObserverRef.current.observe(element);
    }

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = undefined;
    };
  }, [callback, elementOrRef]);
};

export default useResizeObserver;

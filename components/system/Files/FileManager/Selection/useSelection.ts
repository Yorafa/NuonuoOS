import { type Position } from "react-rnd";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSelectionStyling,
  getSelectionRect,
  isSelectionIntersecting,
} from "components/system/Files/FileManager/Selection/functions";
import { type FocusEntryFunctions } from "components/system/Files/FileManager/useFocusableEntries";
import { type Size } from "components/system/Window/RndWindow/useResizable";
import { useMenu } from "contexts/menu";
import { type MenuState } from "contexts/menu/useMenuContextState";
import { ONE_TIME_PASSIVE_EVENT, PREVENT_SCROLL } from "utils/constants";

type SelectionEvents = {
  onMouseDown: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseMove?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: () => void;
};

export type Selection = {
  isSelecting: boolean;
  selectionEvents: SelectionEvents;
  selectionRef: React.RefObject<HTMLSpanElement | null>;
};

const sameFocusedEntries = (
  currentEntries: string[],
  nextEntries: string[]
): boolean =>
  currentEntries.length === nextEntries.length &&
  nextEntries.every((entry) => currentEntries.includes(entry));

const getSelectedFiles = (
  container: HTMLElement,
  selectionRect: ReturnType<typeof getSelectionRect>
): string[] =>
  [...container.querySelectorAll<HTMLElement>(":scope > [data-file]")].flatMap(
    (element) => {
      const { file } = element.dataset;

      if (
        !file ||
        !isSelectionIntersecting(
          element.getBoundingClientRect(),
          container.getBoundingClientRect(),
          selectionRect,
          container.scrollTop,
          container.scrollLeft
        )
      ) {
        return [];
      }

      return [file];
    }
  );

const useSelection = (
  containerRef: React.RefObject<HTMLElement | null>,
  focusedEntries: string[],
  {
    blurEntry,
    replaceFocusedEntries,
  }: Pick<FocusEntryFunctions, "blurEntry" | "replaceFocusedEntries">,
  isDesktop?: boolean
): Selection => {
  const [isSelecting, setIsSelecting] = useState(false);
  const animationRequestId = useRef(0);
  const selectingRef = useRef(false);
  const startPositionRef = useRef<Position | undefined>(undefined);
  const sizeRef = useRef<Size>(Object.create(null) as Size);
  const overlayRef = useRef<HTMLSpanElement | null>(null);
  const focusedEntriesRef = useRef(focusedEntries);
  const externalListenersRef = useRef<{ cleanup: () => void } | undefined>(
    undefined
  );
  const { menu, setMenu } = useMenu();

  useEffect(() => {
    focusedEntriesRef.current = focusedEntries;
  }, [focusedEntries]);

  const applyOverlayStyle = useCallback((): void => {
    if (!overlayRef.current || !startPositionRef.current) return;

    Object.assign(
      overlayRef.current.style,
      createSelectionStyling(
        true,
        sizeRef.current.height,
        sizeRef.current.width,
        startPositionRef.current.x,
        startPositionRef.current.y
      )
    );
  }, []);

  const updateSelectedFiles = useCallback((): void => {
    if (!containerRef.current || !startPositionRef.current) return;

    const selectedFiles = getSelectedFiles(
      containerRef.current,
      getSelectionRect(startPositionRef.current, sizeRef.current)
    );

    if (sameFocusedEntries(focusedEntriesRef.current, selectedFiles)) return;

    focusedEntriesRef.current = selectedFiles;
    replaceFocusedEntries(selectedFiles);
  }, [containerRef, replaceFocusedEntries]);

  const resetSelection = useCallback((): void => {
    selectingRef.current = false;
    startPositionRef.current = undefined;
    sizeRef.current = Object.create(null) as Size;
    setIsSelecting(false);
  }, []);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number): void => {
      if (!containerRef.current || !startPositionRef.current) return;

      const containerElement = containerRef.current;
      const { left, top } = containerElement.getBoundingClientRect();
      const { scrollLeft = 0, scrollTop = 0 } = containerElement;
      const { x, y } = startPositionRef.current;

      if (!selectingRef.current) {
        selectingRef.current = true;
        setIsSelecting(true);
      }

      sizeRef.current = {
        height: clientY - top - y + scrollTop,
        width: clientX - left - x + scrollLeft,
      };

      applyOverlayStyle();
      updateSelectedFiles();
    },
    [applyOverlayStyle, containerRef, updateSelectedFiles]
  );

  const onMouseMove = useCallback(
    (event: { clientX: number; clientY: number }): void => {
      if (animationRequestId.current) return;

      updateFromPointer(event.clientX, event.clientY);

      animationRequestId.current = window.requestAnimationFrame(() => {
        animationRequestId.current = 0;
      });
    },
    [updateFromPointer]
  );

  const onMouseDown = useCallback(
    ({ clientX, clientY, target }: React.MouseEvent<HTMLElement>): void => {
      const selectedTarget = target as HTMLElement | null;

      if (
        !Object.is(selectedTarget, containerRef.current) ||
        !containerRef.current
      ) {
        return;
      }

      containerRef.current.focus(PREVENT_SCROLL);

      const containerElement = containerRef.current;
      const { left, top } = containerElement.getBoundingClientRect();
      const { scrollLeft = 0, scrollTop = 0 } = containerElement;
      const hadMenu = Object.keys(menu ?? {}).length > 0;

      startPositionRef.current = {
        x: clientX - left + scrollLeft,
        y: clientY - top + scrollTop,
      };
      sizeRef.current = Object.create(null) as Size;
      focusedEntriesRef.current = [];

      if (focusedEntries.length > 0) blurEntry();

      if (hadMenu) {
        setMenu(Object.create(null) as MenuState);
      } else {
        selectingRef.current = true;
        setIsSelecting(true);
      }
    },
    [blurEntry, containerRef, focusedEntries.length, menu, setMenu]
  );

  const onMouseLeave = useCallback((): void => {
    if (!selectingRef.current || !containerRef.current) return;

    const originalScrollHeight = containerRef.current.scrollHeight;
    const originalScrollWidth = containerRef.current.scrollWidth;
    const externalMouseMove = (event: MouseEvent): void => {
      onMouseMove(event);

      if (isDesktop || !containerRef.current) return;

      const diffX = Math.abs(Number(sizeRef.current.width)) / 100 + 1;
      const diffY = Math.abs(Number(sizeRef.current.height)) / 100 + 1;

      containerRef.current.scrollBy(
        containerRef.current.scrollLeft + containerRef.current.clientWidth >
          originalScrollWidth
          ? 0
          : Math.round(event.movementX * diffX),
        containerRef.current.scrollTop + containerRef.current.clientHeight >
          originalScrollHeight
          ? 0
          : Math.round(event.movementY * diffY)
      );
    };
    const externalMouseUp = (): void => {
      resetSelection();
      window.removeEventListener("mousemove", externalMouseMove);
      window.removeEventListener("mouseup", externalMouseUp);
    };

    externalListenersRef.current = {
      cleanup: () => {
        window.removeEventListener("mousemove", externalMouseMove);
        window.removeEventListener("mouseup", externalMouseUp);
      },
    };
    window.addEventListener("mousemove", externalMouseMove);
    window.addEventListener("mouseup", externalMouseUp, ONE_TIME_PASSIVE_EVENT);
  }, [containerRef, isDesktop, onMouseMove, resetSelection]);

  useEffect(() => {
    if (isSelecting) applyOverlayStyle();
  }, [applyOverlayStyle, isSelecting]);

  useEffect(
    () => () => {
      externalListenersRef.current?.cleanup();
    },
    []
  );

  return {
    isSelecting,
    selectionEvents: {
      onMouseDown,
      onMouseMove,
      ...(isSelecting && { onMouseLeave, onMouseUp: resetSelection }),
    },
    selectionRef: overlayRef,
  };
};

export default useSelection;

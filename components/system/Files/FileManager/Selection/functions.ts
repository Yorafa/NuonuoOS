import { type Position } from "react-rnd";
import { type Size } from "components/system/Window/RndWindow/useResizable";

type SelectionStyling = {
  height?: string;
  transform?: string;
  width?: string;
};

type NormalizedSelectionRect = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

export const createSelectionStyling = (
  isSelecting: boolean,
  height: number | string,
  width: number | string,
  x: number | string,
  y: number | string
): SelectionStyling => {
  if (!isSelecting) return Object.create(null) as SelectionStyling;

  const numericHeight = Number(height);
  const numericWidth = Number(width);

  return {
    height: `${Math.abs(numericHeight)}px`,
    transform: `translate(${Number(x) + Math.min(numericWidth, 0)}px, ${
      Number(y) + Math.min(numericHeight, 0)
    }px)`,
    width: `${Math.abs(numericWidth)}px`,
  };
};

export const getSelectionRect = (
  startPosition: Position,
  size: Partial<Size>
): NormalizedSelectionRect => {
  const right = startPosition.x + Number(size.width || 0);
  const bottom = startPosition.y + Number(size.height || 0);

  return {
    bottom: Math.max(startPosition.y, bottom),
    left: Math.min(startPosition.x, right),
    right: Math.max(startPosition.x, right),
    top: Math.min(startPosition.y, bottom),
  };
};

export const isSelectionIntersecting = (
  element: DOMRect,
  containerElement: DOMRect,
  selection: NormalizedSelectionRect,
  containerScrollTop: number,
  containerScrollLeft = 0
): boolean => {
  const elementLeft =
    element.left - containerElement.left + containerScrollLeft;
  const elementTop = element.top - containerElement.top + containerScrollTop;

  return !(
    elementLeft >= selection.right ||
    elementTop >= selection.bottom ||
    elementLeft + element.width <= selection.left ||
    elementTop + element.height <= selection.top
  );
};

import { useEffect, useRef, useState } from "react";
import { useProcesses } from "contexts/process";
import {
  MAX_ICON_SIZE,
  MILLISECONDS_IN_SECOND,
  PEEK_MAX_WIDTH,
} from "utils/constants";
import {
  getExtension,
  getHtmlToImage,
  imageSrc as getImageSrc,
  isCanvasDrawn,
} from "utils/functions";

const FPS = 2;
const ANIMATED_TAGS = new Set(["VIDEO", "CANVAS"]);

const renderFrame = async (
  previewElement: HTMLElement,
  animate: React.RefObject<boolean>,
  callback: (url: string) => void,
  keepAlive: boolean
): Promise<void> => {
  if (!animate.current) return;

  const scheduleNext = (): void => {
    if (!keepAlive || !animate.current) return;
    window.setTimeout(
      () =>
        window.requestAnimationFrame(() =>
          renderFrame(previewElement, animate, callback, keepAlive)
        ),
      MILLISECONDS_IN_SECOND / FPS
    );
  };
  const htmlToImage = await getHtmlToImage();
  let dataCanvas: HTMLCanvasElement | undefined;

  try {
    const spacing =
      previewElement.tagName === "VIDEO" ? { margin: "0", padding: "0" } : {};

    dataCanvas = await htmlToImage?.toCanvas(previewElement, {
      ...(previewElement.clientWidth > PEEK_MAX_WIDTH && {
        canvasHeight: Math.round(
          (PEEK_MAX_WIDTH / previewElement.clientWidth) *
            previewElement.clientHeight
        ),
        canvasWidth: PEEK_MAX_WIDTH,
      }),
      filter: (element) => !(element instanceof HTMLSourceElement),
      skipAutoScale: true,
      style: {
        inset: "0",
        ...spacing,
      },
    });
  } catch {
    // Ignore failure to capture
  }

  if (!dataCanvas || dataCanvas.width === 0 || dataCanvas.height === 0) {
    scheduleNext();
    return;
  }

  if (isCanvasDrawn(dataCanvas) && animate.current) {
    callback(dataCanvas.toDataURL());
  }

  scheduleNext();
};

const useWindowPeek = (id: string): string => {
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { hidePeek, peekElement, peekImage, componentWindow, icon } =
    process || {};
  const previewTimer = useRef(0);
  const [imageSrc, setImageSrc] = useState("");
  const animate = useRef(true);
  const lastPreviewRef = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    if (hidePeek || peekImage) {
      setImageSrc(
        peekImage || getImageSrc(icon, MAX_ICON_SIZE, 1, getExtension(icon))
      );
    } else {
      const previewElement = peekElement || componentWindow;
      const keepAlive = ANIMATED_TAGS.has(previewElement?.tagName ?? "");
      const isSamePreview =
        !!previewElement && lastPreviewRef.current === previewElement;

      // First mount: schedule an initial capture. Same preview (reactive
      // churn in `process` state) reuses the existing timer/animation to
      // avoid re-rasterizing for every process update.
      if (previewElement && !isSamePreview) {
        lastPreviewRef.current = previewElement;
        if (!previewTimer.current) {
          previewTimer.current = window.setTimeout(
            () =>
              window.requestAnimationFrame(() =>
                renderFrame(previewElement, animate, setImageSrc, keepAlive)
              ),
            document.querySelector(".peekWindow")
              ? 0
              : MILLISECONDS_IN_SECOND / 2
          );
          animate.current = true;
        }
      }
    }

    return () => {
      if (previewTimer.current) {
        clearTimeout(previewTimer.current);
        previewTimer.current = 0;
      }
      animate.current = false;
      lastPreviewRef.current = undefined;
    };
  }, [componentWindow, hidePeek, icon, peekElement, peekImage]);

  return imageSrc;
};

export default useWindowPeek;

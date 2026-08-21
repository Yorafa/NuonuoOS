import { useTheme } from "styled-components";
import { useCallback, useEffect, useRef } from "react";
import { bgPositionSize } from "components/system/Desktop/Wallpapers/constants";
import { useFileSystem } from "contexts/fileSystem";
import { useSession } from "contexts/session";
import { DEFAULT_WALLPAPER, NATIVE_IMAGE_FORMATS } from "utils/constants";
import { type WallpaperFit } from "contexts/session/types";
import {
  bufferToUrl,
  cleanUpBufferUrl,
  getExtension,
  isBeforeBg,
} from "utils/functions";

const applyStaticWallpaper = (
  url: string,
  fit: WallpaperFit,
  colors: { background: string; text: string }
): void => {
  const positionSize = bgPositionSize[fit];
  const repeat = fit === "tile" ? "repeat" : "no-repeat";
  const isTopWindow = window === window.top;
  const backgroundValue = `url("${url}") ${positionSize} ${
    repeat
  } fixed border-box border-box ${
    isTopWindow ? colors.background : colors.text
  }`;

  document.documentElement.style.setProperty(
    "--background-transition-timing",
    "0s"
  );
  document.documentElement.style.setProperty(
    "--after-background",
    backgroundValue
  );
  document.documentElement.style.setProperty("--after-background-opacity", "1");
  document.documentElement.style.setProperty(
    "--before-background-opacity",
    "0"
  );
};

const useWallpaper = (
  desktopRef: React.RefObject<HTMLElement | null>
): void => {
  const { exists, readFile } = useFileSystem();
  const { sessionLoaded, wallpaperImage, wallpaperFit } = useSession();
  const { colors } = useTheme();
  const wallpaperLoadAbortRef = useRef<AbortController>(undefined);

  const resetWallpaper = useCallback((): void => {
    document.documentElement.style.removeProperty("--after-background");
    document.documentElement.style.removeProperty("--before-background");
  }, []);

  const loadFileWallpaper = useCallback(async () => {
    if (!desktopRef.current || !wallpaperImage) {
      resetWallpaper();
      return;
    }

    // Default wallpaper is a static file, skip virtual FS round-trip
    if (wallpaperImage === DEFAULT_WALLPAPER) {
      applyStaticWallpaper(wallpaperImage, wallpaperFit, colors);
      return;
    }

    let [, currentWallpaperUrl] =
      /url\((.*)\)/.exec(
        document.documentElement.style.getPropertyValue(
          isBeforeBg() ? "--before-background" : "--after-background"
        )
      ) || [];

    currentWallpaperUrl = currentWallpaperUrl?.replace(/\\/g, "");

    if (currentWallpaperUrl?.startsWith("blob:")) {
      cleanUpBufferUrl(currentWallpaperUrl);
    }

    let wallpaperUrl = "";
    const newWallpaperFit = wallpaperFit;

    if (await exists(wallpaperImage)) {
      resetWallpaper();

      const imgExt = getExtension(wallpaperImage);
      const isNative = NATIVE_IMAGE_FORMATS.has(imgExt);
      const [initialData, decoder] = await Promise.all([
        readFile(wallpaperImage),
        isNative
          ? Promise.resolve()
          : import("utils/imageDecoder").then((m) => m.decodeImageToBuffer),
      ]);
      let fileData = initialData;

      if (!isNative && decoder) {
        const decodedData = await decoder(imgExt, fileData);

        if (decodedData) fileData = decodedData;
      }

      wallpaperUrl = bufferToUrl(fileData);
    }

    if (wallpaperUrl) {
      const applyWallpaper = (url: string): void => {
        const positionSize = bgPositionSize[newWallpaperFit];
        const repeat = newWallpaperFit === "tile" ? "repeat" : "no-repeat";
        const isTopWindow = window === window.top;
        const isAfterNextBackground = isBeforeBg();

        document.documentElement.style.setProperty(
          "--background-transition-timing",
          "0s"
        );
        document.documentElement.style.setProperty(
          `--${isAfterNextBackground ? "after" : "before"}-background`,
          `url(${CSS.escape(
            url
          )}) ${positionSize} ${repeat} fixed border-box border-box ${
            isTopWindow ? colors.background : colors.text
          }`
        );
        document.documentElement.style.setProperty(
          "--after-background-opacity",
          isAfterNextBackground ? "1" : "0"
        );
        document.documentElement.style.setProperty(
          "--before-background-opacity",
          isAfterNextBackground ? "0" : "1"
        );

        if (!isTopWindow) {
          document.documentElement.style.setProperty(
            "--background-blend-mode",
            "difference"
          );
        }
      };

      applyWallpaper(wallpaperUrl);
    } else {
      resetWallpaper();
    }
  }, [
    colors,
    desktopRef,
    exists,
    readFile,
    resetWallpaper,
    wallpaperFit,
    wallpaperImage,
  ]);

  useEffect(() => {
    if (sessionLoaded) {
      wallpaperLoadAbortRef.current?.abort();

      if (wallpaperImage) {
        loadFileWallpaper();
      } else {
        resetWallpaper();
      }
    }
  }, [loadFileWallpaper, resetWallpaper, sessionLoaded, wallpaperImage]);
};

export default useWallpaper;

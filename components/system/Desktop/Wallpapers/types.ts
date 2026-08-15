import { type Size } from "components/system/Window/RndWindow/useResizable";
import { type WallpaperFit } from "contexts/session/types";

declare global {
  interface Window {
    DEBUG_DISABLE_WALLPAPER?: boolean;
    STABLE_DIFFUSION_DELAY_IN_MIN_OVERRIDE?: number;
    WallpaperDestroy?: () => void;
  }
}

export type WallpaperConfig = Record<string, unknown>;

export type WallpaperFunc = (
  el: HTMLElement | null,
  config?: WallpaperConfig,
  fallback?: () => void
) => Promise<void> | void;

export type OffscreenRenderProps = {
  canvas: OffscreenCanvas;
  clockSize?: Size;
  config?: WallpaperConfig;
  devicePixelRatio: number;
};

export type WallpaperMenuItem = {
  hasAlt?: boolean;
  id: string;
  name?: string;
  requiresWebGPU?: boolean;
};

export type WallpaperMessage = { message: string; type: string };

type WallpaperData = {
  fallbackBackground: string;
  newWallpaperFit: WallpaperFit;
  updateTimeout: number;
  wallpaperUrl: string;
};

export type WallpaperHandler = (props: {
  isAlt: boolean;
  signal: AbortSignal;
}) => Promise<WallpaperData> | WallpaperData;

export type ApodResponse = {
  date: string;
  hdurl?: string;
  url?: string;
};

export type ArtInstituteOfChicagoResponse = {
  data: { image_id: string }[];
};

export type MetMuseumSearchResponse = {
  objectIDs: number[] | null;
  total: number;
};

export type MetMuseumObjectResponse = {
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
};

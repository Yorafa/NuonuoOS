import {
  type WallpaperMenuItem,
} from "components/system/Desktop/Wallpapers/types";
import { type WallpaperFit } from "contexts/session/types";

export const bgPositionSize: Record<WallpaperFit, string> = {
  center: "center center",
  fill: "center center / cover",
  fit: "center center / contain",
  stretch: "center center / 100% 100%",
  tile: "50% 50%",
};

export const REDUCED_MOTION_PERCENT = 0.1;

export const WALLPAPER_MENU: WallpaperMenuItem[] = [
  {
    id: "ART_INSTITUTE_OF_CHICAGO",
    name: "Art Institute of Chicago",
  },
  {
    hasAlt: false,
    id: "COASTAL_LANDSCAPE",
    name: "Coastal Landscape",
  },
  {
    id: "LOREM_PICSUM",
    name: "Lorem Picsum",
  },
  {
    id: "MET_MUSEUM",
    name: "Metropolitan Museum of Art",
  },
  {
    id: "APOD",
    name: "NASA APOD",
  },
  {
    hasAlt: false,
    id: "/Users/Public/Pictures/lnn.jpg",
    name: "Lnn Wallpaper",
  },
  {
    id: "SLIDESHOW",
    name: "Picture Slideshow",
  }
];

export const BASE_CANVAS_SELECTOR = ":scope > canvas";

export const BASE_VIDEO_SELECTOR = ":scope > video";

export const STABLE_DIFFUSION_DELAY_IN_MIN = 10;

export const PRELOAD_ID = "preloadWallpaper";

export const MAX_RETRIES = 5;

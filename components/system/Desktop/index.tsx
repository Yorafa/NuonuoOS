import { memo, Profiler, useRef } from "react";
import { renderProfilerCallback } from "components/system/RenderCostProfiler";
import StyledDesktop from "components/system/Desktop/StyledDesktop";
import useWallpaper from "components/system/Desktop/Wallpapers/useWallpaper";
import FileManager from "components/system/Files/FileManager";
import { DESKTOP_PATH } from "utils/constants";

const Desktop: FC = ({ children }) => {
  const desktopRef = useRef<HTMLElement | null>(null);

  useWallpaper(desktopRef);

  return (
    <StyledDesktop ref={desktopRef}>
      <Profiler id="Desktop" onRender={renderProfilerCallback}>
        <FileManager
          url={DESKTOP_PATH}
          allowMovingDraggableEntries
          hideLoading
          hideScrolling
          isDesktop
          loadIconsImmediately
        />
        {children}
      </Profiler>
    </StyledDesktop>
  );
};

export default memo(Desktop);

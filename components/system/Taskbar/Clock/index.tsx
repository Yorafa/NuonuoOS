import { useTheme } from "styled-components";
import { memo, useCallback, useEffect, useState } from "react";
import { importCalendar } from "components/system/Taskbar/functions";
import StyledClock from "components/system/Taskbar/Clock/StyledClock";
import {
  formatLocaleDateTime,
  type LocaleTimeDate,
} from "components/system/Taskbar/Clock/functions";
import useClockContextMenu from "components/system/Taskbar/Clock/useClockContextMenu";
import { useSession } from "contexts/session";
import useWorker from "hooks/useWorker";
import { CLOCK_CANVAS_BASE_WIDTH, FOCUSABLE_ELEMENT } from "utils/constants";
import { measureText } from "components/system/Files/FileEntry/functions";
import { useMenuPreload } from "hooks/useMenuPreload";

type ClockWorkerResponse = LocaleTimeDate | "source";

const LARGEST_CLOCK_TEXT = "44:44:44 AM";

type ClockProps = {
  setClockWidth: React.Dispatch<React.SetStateAction<number>>;
  toggleCalendar: () => void;
  width: number;
};

const Clock: FC<ClockProps> = ({ setClockWidth, toggleCalendar, width }) => {
  const [now, setNow] = useState<LocaleTimeDate>(() =>
    formatLocaleDateTime(new Date())
  );
  const { date, time } = now;
  const { clockSource } = useSession();
  const clockWorkerInit = useCallback(
    () =>
      new Worker(
        new URL(
          "components/system/Taskbar/Clock/clock.worker",
          import.meta.url
        ),
        { name: "Clock" }
      ),
    // Recreate the worker when the configured clock source changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clockSource]
  );
  const updateTime = useCallback(
    ({ data, target: clockWorker }: MessageEvent<ClockWorkerResponse>) => {
      if (data === "source") {
        (clockWorker as Worker).postMessage(clockSource);
      } else {
        setNow(data);
      }
    },
    [clockSource]
  );
  useWorker<ClockWorkerResponse>(clockWorkerInit, updateTime);
  const {
    formats: { systemFont },
    sizes: {
      clock: { fontSize },
    },
  } = useTheme();
  const getMeasuredWidth = useCallback(
    () =>
      Math.min(
        Math.max(
          CLOCK_CANVAS_BASE_WIDTH,
          Math.ceil(measureText(LARGEST_CLOCK_TEXT, fontSize, systemFont))
        ),
        CLOCK_CANVAS_BASE_WIDTH * 1.5
      ),
    [fontSize, systemFont]
  );
  const clockContextMenu = useClockContextMenu(toggleCalendar);
  const menuPreloadHandler = useMenuPreload(importCalendar);

  useEffect(() => {
    setClockWidth(getMeasuredWidth());
  }, [getMeasuredWidth, setClockWidth]);

  // eslint-disable-next-line unicorn/no-null
  if (!time) return null;

  return (
    <StyledClock
      $width={width}
      aria-label="Clock"
      onClick={() => toggleCalendar()}
      role="timer"
      title={date}
      suppressHydrationWarning
      {...clockContextMenu}
      {...FOCUSABLE_ELEMENT}
      {...menuPreloadHandler}
    >
      {time}
    </StyledClock>
  );
};

export default memo(Clock);

import { useTheme } from "styled-components";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { type Variant } from "motion/react";
import FileManager from "components/system/Files/FileManager";
import Sidebar from "components/system/StartMenu/Sidebar";
import StyledStartMenu from "components/system/StartMenu/StyledStartMenu";
import {
  START_BUTTON_TITLE,
  maybeCloseTaskbarMenu,
} from "components/system/Taskbar/functions";
import useTaskbarItemTransition from "components/system/Taskbar/useTaskbarItemTransition";
import {
  FOCUSABLE_ELEMENT,
  PREVENT_SCROLL,
  START_MENU_PATH,
  THIN_SCROLLBAR_WIDTH,
  THIN_SCROLLBAR_WIDTH_NON_WEBKIT,
} from "utils/constants";

type StartMenuProps = {
  toggleStartMenu: (showMenu?: boolean) => void;
};

type StyleVariant = Variant & {
  height?: string;
};

const StartMenu: FC<StartMenuProps> = ({ toggleStartMenu }) => {
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    sizes: { startMenu },
  } = useTheme();
  const [showScrolling, setShowScrolling] = useState(false);
  const canCustomizeScrollbarWidth = useMemo(
    () => CSS.supports("selector(::-webkit-scrollbar)"),
    []
  );
  const startMenuWidth = useMemo(
    () =>
      startMenu.size -
      (canCustomizeScrollbarWidth
        ? THIN_SCROLLBAR_WIDTH
        : THIN_SCROLLBAR_WIDTH_NON_WEBKIT),
    [canCustomizeScrollbarWidth, startMenu.size]
  );
  const revealScrolling: React.MouseEventHandler = useCallback(
    ({ clientX = 0 }) => setShowScrolling(clientX > startMenuWidth),
    [startMenuWidth]
  );
  const focusOnRenderCallback = useCallback((element: HTMLElement | null) => {
    element?.focus(PREVENT_SCROLL);
    menuRef.current = element;
  }, []);
  const startMenuTransition = useTaskbarItemTransition(startMenu.maxHeight);
  const { height } =
    (startMenuTransition.variants?.active as StyleVariant) ?? {};

  return (
    <StyledStartMenu
      ref={focusOnRenderCallback}
      $showScrolling={showScrolling}
      id="startMenu"
      onBlurCapture={(event) =>
        maybeCloseTaskbarMenu(
          event,
          menuRef.current,
          toggleStartMenu,
          undefined,
          START_BUTTON_TITLE
        )
      }
      onMouseLeave={() => setShowScrolling(false)}
      onMouseMove={revealScrolling}
      {...startMenuTransition}
      {...FOCUSABLE_ELEMENT}
    >
      <Sidebar height={height} />
      <FileManager
        url={START_MENU_PATH}
        hideLoading
        hideShortcutIcons
        isStartMenu
        loadIconsImmediately
        readOnly
        skipFsWatcher
        skipSorting
      />
    </StyledStartMenu>
  );
};

export default memo(StartMenu);

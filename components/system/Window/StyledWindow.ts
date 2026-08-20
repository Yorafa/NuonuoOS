import { m as motion } from "motion/react";
import styled from "styled-components";
import StyledLoading from "components/system/Apps/StyledLoading";

type StyledWindowProps = {
  $backgroundBlur?: string;
  $backgroundColor?: string;
  $isForeground: boolean;
};

const StyledWindow = styled(motion.section)<StyledWindowProps>`
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor || theme.colors.window.background};
  border-bottom: 2px solid rgb(0 0 0);
  border-left: 2px solid rgb(255 255 255);
  border-right: 2px solid rgb(0 0 0);

  /* Dreamcore Retro Windows 98 raised bevel on the window frame. */
  border-top: 2px solid rgb(255 255 255);
  box-shadow: ${({ $isForeground, theme }) =>
    $isForeground
      ? theme.colors.window.shadow
      : theme.colors.window.shadowInactive};
  box-shadow:
    inset -1px -1px 0 rgb(128 128 128),
    inset 1px 1px 0 rgb(223 223 223);
  contain: strict;
  height: 100%;
  outline: ${({ $isForeground, theme }) =>
    `${theme.sizes.window.outline} solid ${
      $isForeground
        ? theme.colors.window.outline
        : theme.colors.window.outlineInactive
    }`};
  overflow: hidden;
  position: absolute;
  width: 100%;

  header + * {
    height: ${({ theme }) => `calc(100% - ${theme.sizes.titleBar.height}px)`};
  }

  ${StyledLoading} {
    backdrop-filter: ${({ $backgroundBlur }) =>
      $backgroundBlur ? `blur(${$backgroundBlur})` : undefined};
  }
`;

export default StyledWindow;

import { m as motion } from "motion/react";
import styled from "styled-components";
import Button from "styles/common/Button";

type StyledTaskbarEntryProps = {
  $foreground: boolean;
  $progress?: number;
};

const StyledTaskbarEntry = styled(motion.li)<StyledTaskbarEntryProps>`
  display: flex;
  min-width: 0;
  overflow: hidden;
  place-content: center;
  position: relative;
  width: ${({ theme }) => theme.sizes.taskbar.entry.maxWidth};

  &::before {
    background-color: ${({ $foreground, theme }) =>
      $foreground ? theme.colors.taskbar.foreground : ""};
    background-image: ${({ $progress, theme }) =>
      $progress && $progress > 0 && $progress < 100
        ? `linear-gradient(to right, ${theme.colors.progressBackground} 0% ${$progress}%, transparent ${$progress}% 100%)`
        : ""};
    /* Classic Win98 bevel: pressed (inset) when foreground, raised on hover. */
    border-top: ${({ $foreground }) =>
      $foreground ? "1px solid rgb(0, 0, 0)" : "1px solid rgb(255, 255, 255)"};
    border-left: ${({ $foreground }) =>
      $foreground ? "1px solid rgb(0, 0, 0)" : "1px solid rgb(255, 255, 255)"};
    border-right: ${({ $foreground }) =>
      $foreground ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0)"};
    border-bottom: ${({ $foreground, $progress, theme }) =>
      $foreground
        ? "1px solid rgb(255, 255, 255)"
        : `1px solid ${
            $progress && $progress > 0 && $progress < 100
              ? theme.colors.progress
              : theme.colors.highlight
          }`};
    box-shadow: ${({ $foreground }) =>
      $foreground
        ? "inset 1px 1px 0 rgb(128, 128, 128), inset -1px -1px 0 rgb(223, 223, 223)"
        : "inset -1px -1px 0 rgb(128, 128, 128), inset 1px 1px 0 rgb(223, 223, 223)"};
    bottom: 0;
    content: "";
    height: ${({ $foreground }) => ($foreground ? "100%" : 0)};
    margin: ${({ $foreground }) => ($foreground ? "" : "0 4px")};
    position: absolute;
    transition-duration: 0.1s;
    transition-property: ${({ $foreground }) =>
      $foreground ? "all" : "width"};
    width: ${({ $foreground }) => ($foreground ? "100%" : `calc(100% - 8px)`)};
    z-index: -1;
  }

  &:hover {
    &::before {
      background-color: ${({ $foreground, theme }) =>
        $foreground
          ? theme.colors.taskbar.foregroundHover
          : theme.colors.taskbar.hover};
      height: 100%;
      margin: 0;
      width: 100%;
    }
  }

  &:active {
    &::before {
      background-color: ${({ $foreground, theme }) =>
        $foreground
          ? theme.colors.taskbar.activeForeground
          : theme.colors.taskbar.active};
    }
  }

  figure {
    align-items: center;
    display: flex;
    margin-bottom: ${({ theme }) => theme.sizes.taskbar.entry.borderSize};
    margin-left: 4px;
    padding: 4px;

    figcaption {
      color: ${({ theme }) => theme.colors.taskbar.button.color};
      font-size: ${({ theme }) => theme.sizes.taskbar.entry.fontSize};
      margin: 0 4px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    picture {
      height: ${({ theme }) => theme.sizes.taskbar.entry.iconSize};
      position: relative;
      top: 1px;
      width: ${({ theme }) => theme.sizes.taskbar.entry.iconSize};
    }
  }

  > ${Button} {
    align-items: center;
    display: flex;

    figure {
      width: 100%;
    }
  }
`;

export default StyledTaskbarEntry;

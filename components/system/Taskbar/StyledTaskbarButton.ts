import styled from "styled-components";
import Button from "styles/common/Button";

type StyledTaskbarButtonProps = {
  $active: boolean;
  $highlight?: boolean;
  $left?: number;
};

const StyledTaskbarButton = styled(Button)<StyledTaskbarButtonProps>`
  background-color: ${({ $active, $highlight, theme }) =>
    $active &&
    ($highlight ? theme.colors.taskbar.foreground : "hsla(0, 0%, 25%, 50%)")};
  display: flex;
  fill: ${({ theme }) => theme.colors.taskbar.button.color};
  height: 100%;
  left: ${({ $left }) => ($left ? `${$left}px` : 0)};
  place-content: center;
  place-items: center;
  position: absolute;

  && {
    width: ${({ theme }) => theme.sizes.taskbar.button.width}px;
  }

  svg {
    height: ${({ theme }) => theme.sizes.taskbar.button.iconSize};
  }

  // Retro Windows 98 Start button: raised 3D bevel sitting in the taskbar.
  ${({ $highlight }) =>
    $highlight
      ? `
        background: linear-gradient(
          180deg,
          rgb(255, 255, 255) 0%,
          rgb(214, 226, 240) 30%,
          rgb(172, 195, 220) 65%,
          rgb(126, 152, 182) 100%
        );
        border-bottom-color: rgb(58, 74, 96);
        border-left-color: rgb(255, 255, 255);
        border-right-color: rgb(58, 74, 96);
        border-style: outset;
        border-top-color: rgb(255, 255, 255);
        border-width: 1px;
        box-shadow: inset 1px 1px 0 rgb(255 255 255 / 80%),
          inset -1px -1px 0 rgb(40 52 68 / 45%);
        left: 0;
        margin: 2px 4px 2px 2px;
        width: 34px;
      `
      : ""}

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.taskbar.foreground : theme.colors.taskbar.hover};

    svg {
      fill: ${({ $highlight, theme }) =>
        $highlight ? theme.colors.highlight : undefined};
    }
  }

  &:active {
    background-color: hsl(0 0% 20% / 70%);

    svg {
      fill: ${({ $highlight }) =>
        $highlight ? "hsla(207, 100%, 60%, 80%)" : undefined};
    }
  }
`;

export default StyledTaskbarButton;

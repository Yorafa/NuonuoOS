import styled from "styled-components";
import Button from "styles/common/Button";

type StyledTaskbarButtonProps = {
  $active: boolean;
  $highlight?: boolean;
  $left?: number;
};

const StyledTaskbarButton = styled(Button)<StyledTaskbarButtonProps>`
  background-color: ${({ $active, $highlight, theme }) =>
    $active && $highlight ? theme.colors.taskbar.foreground : ""};
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

  // Classic Win98 Start button: raised grey 3D bevel.
  ${({ $highlight }) =>
    $highlight
      ? `
        background: rgb(192, 192, 192);
        border-top: 1px solid rgb(255, 255, 255);
        border-left: 1px solid rgb(255, 255, 255);
        border-right: 1px solid rgb(0, 0, 0);
        border-bottom: 1px solid rgb(0, 0, 0);
        box-shadow:
          inset -1px -1px 0 rgb(128, 128, 128),
          inset 1px 1px 0 rgb(223, 223, 223);
        left: 0;
        margin: 2px 4px 2px 2px;
        width: 54px;
        font-weight: 700;
      `
      : ""}

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.taskbar.foreground : theme.colors.taskbar.hover};
  }

  &:active {
    ${({ $highlight }) =>
      $highlight
        ? `
          background: rgb(192, 192, 192);
          border-top: 1px solid rgb(0, 0, 0);
          border-left: 1px solid rgb(0, 0, 0);
          border-right: 1px solid rgb(255, 255, 255);
          border-bottom: 1px solid rgb(255, 255, 255);
          box-shadow:
            inset 1px 1px 0 rgb(128, 128, 128),
            inset -1px -1px 0 rgb(223, 223, 223);
        `
        : "background-color: hsl(0 0% 20% / 70%);"}
  }
`;

export default StyledTaskbarButton;

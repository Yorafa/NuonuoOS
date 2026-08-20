import styled from "styled-components";

type StyledTitlebarProps = {
  $foreground: boolean;
};

// Classic Windows 98 active title bar gradient.
const activeTitlebarGradient = `
  linear-gradient(
    90deg,
    rgb(0, 0, 128) 0%,
    rgb(16, 64, 192) 100%
  )
`;

// Classic Windows 98 inactive title bar gradient.
const inactiveTitlebarGradient = `
  linear-gradient(
    90deg,
    rgb(128, 128, 128) 0%,
    rgb(160, 160, 160) 100%
  )
`;

const styledBorder = ({ $foreground }: StyledTitlebarProps): string =>
  $foreground ? "2px solid rgb(255, 255, 255)" : "2px solid rgb(192, 192, 192)";

const StyledTitlebar = styled.header<StyledTitlebarProps>`
  background-image: ${({ $foreground }) =>
    $foreground ? activeTitlebarGradient : inactiveTitlebarGradient};
  border-bottom: ${styledBorder};
  display: flex;
  height: ${({ theme }) => theme.sizes.titleBar.height}px;
  position: relative;
  top: 0;
  z-index: 2;

  > button {
    align-items: center;
    color: ${({ $foreground, theme }) =>
      $foreground
        ? theme.colors.titleBar.text
        : theme.colors.titleBar.textInactive};
    display: flex;
    flex-grow: 1;
    font-size: ${({ theme }) => theme.sizes.titleBar.fontSize};
    font-weight: 700;
    min-width: 0;

    figure {
      align-items: center;
      display: flex;
      margin-left: 4px;
      min-width: inherit;
      pointer-events: none;
      position: relative;
      top: -1px;

      picture {
        height: ${({ theme }) => theme.sizes.titleBar.iconSize};
        margin-right: ${({ theme }) => theme.sizes.titleBar.iconMarginRight};
        width: ${({ theme }) => theme.sizes.titleBar.iconSize};
      }

      img,
      picture {
        pointer-events: all;
      }

      figcaption {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  nav {
    display: flex;
    padding-right: 2px;

    button {
      /* Classic Win98 raised bevel button. */
      background: rgb(192 192 192);
      border-bottom: 1px solid rgb(0 0 0);
      border-left: 1px solid rgb(255 255 255);
      border-right: 1px solid rgb(0 0 0);
      border-top: 1px solid rgb(255 255 255);
      box-shadow:
        inset -1px -1px 0 rgb(128 128 128),
        inset 1px 1px 0 rgb(223 223 223);
      box-sizing: content-box;
      display: flex;
      margin: 2px 2px 2px 0;
      place-content: center;
      place-items: center;
      width: ${({ theme }) => theme.sizes.titleBar.buttonWidth};

      svg {
        fill: ${({ theme }) => theme.colors.taskbar.button.color};
        margin: 0 1px 2px 0;
        width: ${({ theme }) => theme.sizes.titleBar.buttonIconWidth};
      }

      &.minimize {
        svg {
          margin-bottom: 1px;
          margin-right: 0;
        }
      }

      &:hover {
        background-color: rgb(208 208 208);
      }

      &:active {
        border-bottom: 1px solid rgb(255 255 255);
        border-left: 1px solid rgb(0 0 0);
        border-right: 1px solid rgb(255 255 255);

        /* Classic Win98 pressed/inset bevel. */
        border-top: 1px solid rgb(0 0 0);
        box-shadow:
          inset 1px 1px 0 rgb(128 128 128),
          inset -1px -1px 0 rgb(223 223 223);

        &.close {
          background: rgb(232 17 35);
        }
      }

      &:disabled {
        opacity: 50%;

        &:hover {
          background: rgb(192 192 192);
        }
      }
    }
  }
`;

export default StyledTitlebar;

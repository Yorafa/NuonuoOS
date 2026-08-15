import styled, { type DefaultTheme } from "styled-components";

type StyledTitlebarProps = {
  $foreground: boolean;
};

const activeTitlebarGradient = `
  linear-gradient(
    180deg,
    rgb(41, 88, 173) 0%,
    rgb(10, 36, 106) 14%,
    rgb(30, 88, 168) 55%,
    rgb(70, 130, 205) 88%,
    rgb(120, 165, 220) 100%
  )
`;

const inactiveTitlebarGradient = `
  linear-gradient(
    180deg,
    rgb(150, 160, 174) 0%,
    rgb(122, 134, 148) 50%,
    rgb(140, 150, 164) 100%
  )
`;

const styledBorder = ({
  $foreground,
  theme,
}: StyledTitlebarProps & { theme: DefaultTheme }): string =>
  $foreground
    ? `1px solid ${theme.colors.titleBar.background}`
    : `1px solid ${theme.colors.titleBar.backgroundInactive}`;

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
      margin-left: 8px;
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

    button {
      background: linear-gradient(
        180deg,
        rgb(238, 245, 252) 0%,
        rgb(196, 213, 232) 45%,
        rgb(160, 183, 210) 100%
      );
      border-bottom-color: rgb(72, 92, 120);
      border-left-color: rgb(255, 255, 255);
      border-right-color: rgb(72, 92, 120);
      border-style: outset;
      border-top-color: rgb(255, 255, 255);
      border-width: 1px;
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
        background-color: ${({ theme }) =>
          theme.colors.titleBar.backgroundHover};
        filter: brightness(1.06);
      }

      &:active {
        border-style: inset;
        background: linear-gradient(
          180deg,
          rgb(150, 172, 200) 0%,
          rgb(180, 200, 224) 100%
        );

        &.close {
          background: linear-gradient(
            180deg,
            rgb(200, 60, 70) 0%,
            rgb(232, 140, 70) 100%
          );
        }
      }

      &:disabled {
        opacity: 0.5;

        &:hover {
          filter: none;
        }
      }
    }
  }
`;

export default StyledTitlebar;
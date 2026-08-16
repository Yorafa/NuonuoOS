import styled from "styled-components";

const StyledNavigation = styled.nav`
  /* Classic Win98 toolbar: grey with inset bottom bevel. */
  background-color: rgb(192, 192, 192);
  border-bottom: 1px solid rgb(128, 128, 128);
  box-shadow: inset 0 1px 0 rgb(255, 255, 255);
  display: flex;
  height: ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};

  svg {
    color: rgb(0, 0, 0);
    fill: currentColor;
    height: 16px;
    transition: color 0.2s ease;
    width: 16px;
  }

  > button {
    height: 16px;
    max-height: 36px;
    max-width: 34px;
    min-height: 36px;
    min-width: 34px;

    &[title^="Up"] {
      max-width: 33px;
      min-width: 33px;
      position: relative;
      right: -8px;
      top: -1px;
    }

    &[title="Recent locations"] {
      left: 55px;
      position: absolute;

      svg {
        stroke: currentColor;
        stroke-width: 3px;
        width: 7px;
      }
    }

    /* Classic Win98 raised bevel on hover. */
    &:hover {
      background-color: rgb(192, 192, 192);
      border-top: 1px solid rgb(255, 255, 255);
      border-left: 1px solid rgb(255, 255, 255);
      border-right: 1px solid rgb(0, 0, 0);
      border-bottom: 1px solid rgb(0, 0, 0);

      svg {
        color: rgb(0, 0, 0);
      }
    }

    &:active {
      /* Classic Win98 pressed/inset bevel. */
      background-color: rgb(192, 192, 192);
      border-top: 1px solid rgb(0, 0, 0);
      border-left: 1px solid rgb(0, 0, 0);
      border-right: 1px solid rgb(255, 255, 255);
      border-bottom: 1px solid rgb(255, 255, 255);
      box-shadow: inset 1px 1px 0 rgb(128, 128, 128);

      svg {
        color: rgb(0, 0, 128);
        transition: none;
      }
    }

    &:disabled {
      svg {
        color: rgb(128, 128, 128);
      }
    }
  }
`;

export default StyledNavigation;

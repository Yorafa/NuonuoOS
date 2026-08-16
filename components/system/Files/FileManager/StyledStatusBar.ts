import styled from "styled-components";

const StyledStatusBar = styled.footer`
  align-items: center;
  /* Classic Win98 status bar: grey with inset top bevel. */
  background-color: rgb(192, 192, 192);
  border-top: 1px solid rgb(255, 255, 255);
  box-shadow: inset 1px 1px 0 rgb(223, 223, 223), inset 0 1px 0 rgb(128, 128, 128);
  bottom: 0;
  color: rgb(0, 0, 0);
  display: flex;
  font-size: 12px;
  height: ${({ theme }) => theme.sizes.fileExplorer.statusBarHeight};
  padding: 0 4px 0 5px;
  position: absolute;
  white-space: nowrap;
  width: 100%;

  div {
    display: flex;
    margin-top: -1px;
    padding: 0 3px 0 9px;

    &::after {
      border-right: 1px solid rgb(128, 128, 128);
      content: "";
      height: 11px;
      margin-left: 12px;
      position: relative;
      top: 3px;
    }

    &.selected {
      padding-left: 7px;

      &::after {
        margin-left: 13px;
      }
    }
  }

  nav {
    display: flex;
    position: absolute;
    right: 4px;

    button {
      border: 1px solid transparent;
      display: flex;
      height: ${({ theme }) => theme.sizes.fileExplorer.statusBarHeight};
      place-content: center;
      place-items: center;
      width: 22px;

      picture {
        position: relative;
        top: -1px;
      }

      &:hover {
        /* Classic Win98 raised bevel on hover. */
        background-color: rgb(192, 192, 192);
        border-top: 1px solid rgb(255, 255, 255);
        border-left: 1px solid rgb(255, 255, 255);
        border-right: 1px solid rgb(0, 0, 0);
        border-bottom: 1px solid rgb(0, 0, 0);
      }

      &.active {
        /* Classic Win98 pressed/inset bevel when active. */
        background-color: rgb(192, 192, 192);
        border-top: 1px solid rgb(0, 0, 0);
        border-left: 1px solid rgb(0, 0, 0);
        border-right: 1px solid rgb(255, 255, 255);
        border-bottom: 1px solid rgb(255, 255, 255);
        box-shadow: inset 1px 1px 0 rgb(128, 128, 128);

        picture {
          padding-left: 1px;
          top: 0;
        }
      }
    }
  }
`;

export default StyledStatusBar;

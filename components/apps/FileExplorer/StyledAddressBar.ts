import styled from "styled-components";

const StyledAddressBar = styled.div`
  background-position: 2px 5px;
  background-repeat: no-repeat;
  background-size: 16px;
  /* Classic Win98 sunken/inset input field. */
  border-top: 1px solid rgb(128, 128, 128);
  border-left: 1px solid rgb(128, 128, 128);
  border-right: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  display: flex;
  height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
  margin: 6px 12px 5px 5px;
  overflow: hidden;
  padding: 0 22px 2px 25px;
  position: relative;
  width: 100%;

  input {
    background-color: rgb(255, 255, 255);
    border: 0;
    color: rgb(0, 0, 0);
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 12px;
    font-weight: 400;
    height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight - 2}px;
    padding-bottom: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 2px);

    &:focus,
    &.inputing {
      height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
    }
  }

  img {
    left: 2px;
    position: absolute;
    top: 1px;
  }

  .action {
    /* Classic Win98 raised bevel button. */
    background-color: rgb(192, 192, 192);
    border-top: 1px solid rgb(255, 255, 255);
    border-left: 1px solid rgb(255, 255, 255);
    border-right: 1px solid rgb(0, 0, 0);
    border-bottom: 1px solid rgb(0, 0, 0);
    box-shadow: inset -1px -1px 0 rgb(128, 128, 128), inset 1px 1px 0 rgb(223, 223, 223);
    display: flex;
    height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight - 2}px;
    margin: 0;
    place-content: center;
    place-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;

    &:hover {
      background-color: rgb(208, 208, 208);
    }

    &:active {
      background-color: rgb(192, 192, 192);
      border-top: 1px solid rgb(0, 0, 0);
      border-left: 1px solid rgb(0, 0, 0);
      border-right: 1px solid rgb(255, 255, 255);
      border-bottom: 1px solid rgb(255, 255, 255);
      box-shadow: inset 1px 1px 0 rgb(128, 128, 128);
    }

    svg {
      color: rgb(0, 0, 0);
      stroke: rgb(0, 0, 0);

      &.refresh {
        position: relative;
        stroke-width: 3;
        top: -1px;
      }

      &.go-to {
        height: 12px;
        stroke-width: 2;
        width: 12px;
      }
    }
  }
`;

export default StyledAddressBar;

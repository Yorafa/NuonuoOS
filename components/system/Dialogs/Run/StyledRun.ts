import styled from "styled-components";
import StyledButton from "components/system/Dialogs/StyledButton";

const StyledRun = styled.div`
  /* Classic Win98 dialog: grey background with raised bevel. */
  background-color: rgb(192, 192, 192);
  font-size: 12px;

  figure {
    display: flex;
    flex-direction: row;
    padding: 20px 11px 14px;

    figcaption {
      line-height: 15px;
      margin-bottom: 4px;
    }

    img {
      height: 32px;
      margin-right: 19px;
      width: 32px;
    }
  }

  div {
    display: flex;
    flex-direction: row;

    label {
      margin-top: 3px;
      padding: 0 11px;
    }

    div {
      position: relative;
      width: 100%;

      input,
      select {
        /* Classic Win98 sunken/inset input field. */
        border-top: 1px solid rgb(128, 128, 128);
        border-left: 1px solid rgb(128, 128, 128);
        border-right: 1px solid rgb(255, 255, 255);
        border-bottom: 1px solid rgb(255, 255, 255);
        background-color: rgb(255, 255, 255);
        border-radius: 0;
        font-family: ${({ theme }) => theme.formats.systemFont};
        font-size: 12px;
        height: 23px;
        line-height: 16px;
        margin: 0 13px 21px 8px;
        padding-bottom: 2px;
        padding-left: 5px;
        width: 100%;
      }

      select {
        background-color: rgb(255, 255, 255);
        clip-path: inset(0 0 0 calc(100% - 19px));
        position: absolute;
        width: calc(100% - 21px);

        &:disabled {
          opacity: 100%;
        }
      }

      input {
        border-right: 0;
        margin-right: 32px;
      }
    }
  }

  nav {
    background-color: rgb(192, 192, 192);
    display: flex;
    flex-direction: row;
    height: 100%;

    ${StyledButton} {
      height: 24px;
      margin-top: 19px;
      position: absolute;
      right: 12px;
      width: 86px;

      &:first-child {
        right: 107px;
      }
    }
  }
`;

export default StyledRun;

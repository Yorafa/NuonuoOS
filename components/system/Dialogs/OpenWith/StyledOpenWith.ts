import styled from "styled-components";

const StyledOpenWith = styled.div`
  /* Classic Win98 dialog: grey background. */
  background-color: rgb(192, 192, 192);
  display: flex;
  flex-direction: column;
  height: 100%;

  div {
    height: calc(100% - 56px - 80px);
    overflow-y: scroll;
  }

  h2,
  h4 {
    font-weight: 400;
  }

  h2 {
    font-size: 18px;
    height: 56px;
    padding: 16px 24px;
  }

  h4 {
    padding: 0 0 6px 23px;
  }

  nav {
    background-color: rgb(192, 192, 192);
    height: 80px;
    width: 100%;

    button {
      /* Classic Win98 raised bevel button. */
      background-color: rgb(192, 192, 192);
      border-top: 1px solid rgb(255, 255, 255);
      border-left: 1px solid rgb(255, 255, 255);
      border-right: 1px solid rgb(0, 0, 0);
      border-bottom: 1px solid rgb(0, 0, 0);
      box-shadow: inset -1px -1px 0 rgb(128, 128, 128), inset 1px 1px 0 rgb(223, 223, 223);
      color: rgb(0, 0, 0);
      font-size: 15px;
      font-weight: 600;
      height: 32px;
      margin: 24px;
      position: absolute;
      right: 0;
      width: 200px;

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
    }
  }
`;

export default StyledOpenWith;

import styled from "styled-components";

const BASE_LINE_HEIGHT = 21;

const StyledButton = styled.button`
  /* Classic Win98 raised bevel button. */
  background-color: rgb(192, 192, 192);
  border-top: 1px solid rgb(255, 255, 255);
  border-left: 1px solid rgb(255, 255, 255);
  border-right: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
  box-shadow: inset -1px -1px 0 rgb(128, 128, 128), inset 1px 1px 0 rgb(223, 223, 223);
  color: rgb(0, 0, 0);
  display: grid;
  font-family: ${({ theme }) => theme.formats.systemFont};
  font-size: 12px;
  height: 23px;
  line-height: ${BASE_LINE_HEIGHT}px;
  width: 73px;

  &:focus,
  &.focus {
    /* Classic Win98 focus: dotted outline inside. */
    outline: 1px dotted rgb(0, 0, 0);
    outline-offset: -4px;
  }

  &:hover {
    background-color: rgb(208, 208, 208);
  }

  &:active {
    /* Classic Win98 pressed/inset bevel. */
    background-color: rgb(192, 192, 192);
    border-top: 1px solid rgb(0, 0, 0);
    border-left: 1px solid rgb(0, 0, 0);
    border-right: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
    box-shadow: inset 1px 1px 0 rgb(128, 128, 128);
  }

  &:disabled {
    color: rgb(128, 128, 128);
    text-shadow: 1px 1px 0 rgb(255, 255, 255);
  }
`;

export default StyledButton;

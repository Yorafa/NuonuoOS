import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const TASKBAR_Z_INDEX = 100000;

const StyledTaskbar = styled.nav`
  background: ${({ theme }) => theme.colors.taskbar.background};
  bottom: 0;
  /* Classic Win98 raised top bevel: light line above, dark below. */
  border-top: 1px solid rgb(255, 255, 255);
  box-shadow: inset 0 1px 0 rgb(223, 223, 223), 0 -1px 0 rgb(0, 0, 0);
  contain: size layout;
  height: ${TASKBAR_HEIGHT}px;
  left: 0;
  position: absolute;
  right: 0;
  width: 100vw;
  z-index: ${TASKBAR_Z_INDEX};

  &::after {
    content: "";
    display: block;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: -${TASKBAR_Z_INDEX};
  }
`;

export default StyledTaskbar;

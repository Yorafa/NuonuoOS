import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const TASKBAR_Z_INDEX = 100000;

const StyledTaskbar = styled.nav`
  background: ${({ theme }) => theme.colors.taskbar.background};
  bottom: 0;
  border-top: 1px solid hsl(216 30% 92% / 90%);
  box-shadow: 0 -1px 0 hsl(216 25% 28% / 35%);
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

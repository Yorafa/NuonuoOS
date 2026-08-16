import styled from "styled-components";
import { CLOCK_TEXT_HEIGHT_OFFSET } from "components/system/Taskbar/Clock/functions";
import { TASKBAR_HEIGHT } from "utils/constants";

type StyledClockProps = {
  $hasAI: boolean;
  $width: number;
};

const StyledClock = styled.div<StyledClockProps>`
  color: ${({ theme }) => theme.colors.taskbar.button.color};
  display: flex;
  font-size: ${({ theme }) => theme.sizes.clock.fontSize};
  height: 100%;
  line-height: ${TASKBAR_HEIGHT - CLOCK_TEXT_HEIGHT_OFFSET}px;
  max-width: ${({ theme, $width }) =>
    `calc(${$width}px + ${theme.sizes.clock.padding * 2}px)`};
  min-width: ${({ theme, $width }) =>
    `calc(${$width}px + ${theme.sizes.clock.padding * 2}px)`};
  /* Classic Win98 system tray clock: inset bevel. */
  border-top: 1px solid rgb(128, 128, 128);
  border-left: 1px solid rgb(128, 128, 128);
  border-right: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  padding: ${({ theme }) => `0 ${theme.sizes.clock.padding}px`};
  place-content: center;
  position: absolute;
  right: ${({ theme, $hasAI }) =>
    $hasAI ? theme.sizes.taskbar.ai.buttonWidth : 0};
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.taskbar.foreground};
  }
`;

export default StyledClock;

import { type RuleSet, css } from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const TaskbarPanel = (
  height: number,
  width: number,
  left = 0
): RuleSet<object> => css`
  /* Classic Win98 raised bevel panel. */
  background-color: rgb(192 192 192);
  border-bottom: 1px solid rgb(0 0 0);
  border-left: 1px solid rgb(255 255 255);
  border-right: 1px solid rgb(0 0 0);
  border-top: 1px solid rgb(255 255 255);
  bottom: ${TASKBAR_HEIGHT}px;
  box-shadow:
    inset -1px -1px 0 rgb(128 128 128),
    inset 1px 1px 0 rgb(223 223 223),
    2px 2px 6px rgb(0 0 0 / 40%);
  contain: strict;
  display: flex;
  height: 100%;
  left: ${left}px;
  max-height: ${height}px;
  max-width: ${width}px;
  position: absolute;
  width: calc(100% - ${left}px);
  z-index: 10000;

  /* Solid Win98 grey — no translucency. */
`;

export default TaskbarPanel;

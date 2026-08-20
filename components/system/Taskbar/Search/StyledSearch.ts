import styled from "styled-components";
import TaskbarPanel from "components/system/Taskbar/TaskbarPanel";
import { TASKBAR_HEIGHT } from "utils/constants";

const StyledSearch = styled.nav`
  ${({ theme }) => TaskbarPanel(360, 420, theme.sizes.taskbar.button.width)}

  bottom: ${TASKBAR_HEIGHT}px;
  color: #000;
  display: flex;
  flex-direction: column;
  padding: 8px;

  input {
    background: #fff;
    border: 2px inset #c0c0c0;
    color: #000;
    flex: 0 0 30px;
    font-size: 14px;
    min-width: 0;
    padding: 4px 8px;
    width: 100%;
  }

  .results {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 2px;
    margin-top: 8px;
    min-height: 0;
    overflow: auto;
  }

  .result,
  .empty {
    background: transparent;
    border: 1px solid transparent;
    color: #000;
    display: flex;
    flex-direction: column;
    padding: 6px 8px;
    text-align: left;
    width: 100%;
  }

  .result {
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: #000080;
      border-color: #fff;
      color: #fff;
      outline: none;
    }
  }

  .result-title {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .result-path {
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty {
    color: #444;
    font-size: 12px;
  }
`;

export default StyledSearch;

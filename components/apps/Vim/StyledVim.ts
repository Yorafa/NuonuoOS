import styled from "styled-components";
import ScrollBars from "styles/common/ScrollBars";
import { DEFAULT_SCROLLBAR_WIDTH } from "utils/constants";

const StyledVim = styled.div`
  background: #222324;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .vim-editor {
    ${ScrollBars(DEFAULT_SCROLLBAR_WIDTH, 0, 0, "dark")};
    flex: 1;
    min-height: 0;
    width: 100%;

    .cm-editor {
      contain: layout paint;
      height: 100%;
      outline: none;
    }

    .cm-scroller {
      font-family: "Source Code Pro", Consolas, "Liberation Mono", monospace;
      font-size: 14px;
      line-height: 1.4;
    }

    .cm-gutters {
      background: #222324;
      border-right: 1px solid #444;
      color: #777;
    }

    .cm-vim-panel {
      background: #000;
      color: #fff;
      font-family: "Source Code Pro", Consolas, "Liberation Mono", monospace;
      font-size: 12px;
    }

    /* CodeMirror's class names use camelCase by design. */
    /* stylelint-disable selector-class-pattern */
    .cm-activeLine,
    .cm-activeLineGutter {
      background: rgb(255 255 255 / 8%);
    }

    .cm-selectionBackground,
    ::selection {
      background: rgb(80 110 160 / 70%);
    }
    /* stylelint-enable selector-class-pattern */
  }

  .vim-status {
    background: #000;
    display: flex;
    font-family: "Source Code Pro", Consolas, "Liberation Mono", monospace;
    font-size: 12px;
    justify-content: space-between;
    min-height: 20px;
    padding: 2px 6px;
    user-select: none;
  }
`;

export default StyledVim;

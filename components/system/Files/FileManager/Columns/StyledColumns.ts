import styled from "styled-components";

const StyledColumns = styled.span`
  /* Classic Win98 column header: grey raised bevel. */
  background-color: rgb(192, 192, 192);
  border-bottom: 1px solid rgb(0, 0, 0);
  box-shadow: inset 0 1px 0 rgb(255, 255, 255);
  display: block;
  margin-bottom: 6px;
  margin-right: ${({ theme }) => theme.sizes.fileManager.detailsStartPadding}px;
  position: sticky;
  top: 0;
  width: fit-content;
  z-index: 1;

  ol {
    display: flex;
    height: ${({ theme }) => theme.sizes.fileManager.columnHeight}px;

    li {
      color: rgb(0, 0, 0);
      display: flex;
      font-size: 12px;
      padding-left: 6px;
      place-items: center;
      position: relative;

      > svg {
        fill: rgb(0, 0, 0);
        left: calc(50% - 4px);
        position: absolute;
        top: 0;
        transition: none !important;
        width: 7px;

        &[style^="transform"] {
          top: -1px;
        }
      }

      .name {
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        top: -1px;
        white-space: nowrap;
      }

      .resize {
        border-left: 1px solid rgb(128, 128, 128);
        cursor: col-resize;
        height: ${({ theme }) => theme.sizes.fileManager.columnHeight}px;
        padding-left: ${({ theme }) =>
          theme.sizes.fileManager.columnResizeWidth}px;
        position: absolute;
        right: -${({ theme }) => theme.sizes.fileManager.columnResizeWidth}px;
        z-index: 1;
      }

      &:hover {
        background-color: rgb(208, 208, 208);

        .resize {
          border-left: none;
        }
      }

      &:active {
        /* Classic Win98 pressed/inset bevel. */
        background-color: rgb(192, 192, 192);
        border-top: 1px solid rgb(0, 0, 0);
        border-left: 1px solid rgb(0, 0, 0);
        box-shadow: inset 1px 1px 0 rgb(128, 128, 128);
      }

      &:first-child {
        padding-left: 17px;
      }
    }
  }
`;

export default StyledColumns;

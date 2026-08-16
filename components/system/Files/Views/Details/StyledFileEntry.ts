import styled from "styled-components";
import { type StyledFileEntryProps } from "components/system/Files/Views";

const StyledFileEntry = styled.li<StyledFileEntryProps>`
  margin-left: ${({ theme }) => theme.sizes.fileManager.detailsStartPadding}px;
  width: fit-content;

  button {
    display: flex;
    padding-left: 4px;
    text-align: left;

    figure {
      bottom: 1px;
      display: flex;
      flex-direction: row;
      height: ${({ theme }) => theme.sizes.fileManager.detailsRowHeight};
      padding-right: ${({ theme }) =>
        theme.sizes.fileManager.detailsEndPadding}px;
      place-items: center;
      position: relative;

      figcaption {
        color: rgb(0, 0, 0);
        font-size: ${({ theme }) => theme.sizes.fileEntry.fontSize};
        overflow: hidden;
        overflow-wrap: anywhere;
        padding-left: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;

        @supports not (overflow-wrap: anywhere) {
          /* stylelint-disable declaration-property-value-keyword-no-deprecated */
          word-break: break-word;
        }
      }
    }
  }

  &:hover {
    background-color: rgb(0, 0, 128);

    figcaption {
      color: rgb(255, 255, 255);
    }
  }

  &.focus-within {
    background-color: rgb(0, 0, 128);

    figcaption {
      color: rgb(255, 255, 255);
    }

    &:hover {
      background-color: rgb(0, 0, 128);
    }
  }
`;

export default StyledFileEntry;

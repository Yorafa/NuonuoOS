import { m as motion } from "motion/react";
import styled from "styled-components";

type StyledMenuProps = {
  $isSubMenu: boolean;
  $x: number;
  $y: number;
};

const StyledMenu = styled(motion.nav).attrs<StyledMenuProps>(({ $x, $y }) => ({
  style: {
    transform: `translate(${$x}px, ${$y}px)`,
  },
}))<StyledMenuProps>`
  /* Classic Win98 menu: grey with raised outer bevel. */
  background-color: rgb(192, 192, 192);
  border-top: 1px solid rgb(255, 255, 255);
  border-left: 1px solid rgb(255, 255, 255);
  border-right: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
  box-shadow:
    inset -1px -1px 0 rgb(128, 128, 128),
    inset 1px 1px 0 rgb(223, 223, 223),
    2px 2px 4px rgba(0, 0, 0, 40%);
  color: rgb(0, 0, 0);
  contain: layout;
  font-size: 12px;
  max-height: fit-content;
  max-width: fit-content;
  padding: 2px;
  pointer-events: none;
  position: fixed;
  width: max-content;
  z-index: ${({ $isSubMenu }) => $isSubMenu && 1};

  ol {
    pointer-events: all;

    li.disabled {
      color: rgb(128, 128, 128);
      pointer-events: none;
      text-shadow: 1px 1px 0 rgb(255, 255, 255);
    }

    hr {
      border-top: 1px solid rgb(128, 128, 128);
      border-bottom: 1px solid rgb(255, 255, 255);
      height: 0;
      margin: 3px 2px;
    }

    li > div {
      display: flex;
      padding: 3px 0;

      &:hover,
      &.active {
        /* Classic Win98 selection blue. */
        background-color: rgb(0, 0, 128);
        color: rgb(255, 255, 255);

        figcaption,
        span {
          color: rgb(255, 255, 255);
        }
      }

      figcaption {
        display: flex;
        height: 16px;
        line-height: 16px;
        margin-left: 24px;
        margin-right: 24px;
        place-items: center;
        position: relative;
        top: -1px;
        white-space: nowrap;
        width: max-content;

        &.primary {
          font-weight: 700;
        }
      }

      picture {
        margin: 0 -16px 0 4px;
      }

      span {
        margin: -1px -16px 0 4px;
      }

      svg {
        fill: rgb(0, 0, 0);
        height: 13px;
        margin-top: 1px;
        position: absolute;
        width: 13px;

        &.left {
          left: 4px;
        }

        &.right {
          right: 4px;
        }
      }

      .icon > svg {
        height: 15px;
        left: 6px;
        width: 15px;
      }
    }
  }
`;

export default StyledMenu;

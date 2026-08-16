import { m as motion } from "motion/react";
import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const StyledCalendar = styled(motion.section)`
  /* Classic Win98 raised bevel panel. */
  background-color: rgb(192, 192, 192);
  border-top: 1px solid rgb(255, 255, 255);
  border-left: 1px solid rgb(255, 255, 255);
  border-right: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
  box-shadow:
    inset -1px -1px 0 rgb(128, 128, 128),
    inset 1px 1px 0 rgb(223, 223, 223),
    2px 2px 6px rgba(0, 0, 0, 40%);
  bottom: ${TASKBAR_HEIGHT}px;
  position: absolute;
  right: 0;
  z-index: 10000;

  table {
    padding: 4px 10px 19px;
    white-space: nowrap;

    td {
      color: rgb(0, 0, 0);
      display: inline-table;
      height: 40px;
      line-height: 32px;
      margin: 0 1px;
      text-align: center;
      width: 46px;

      &.prev,
      &.next {
        color: rgb(128, 128, 128);
      }
    }

    thead {
      font-size: 12px;

      td[colspan] {
        display: table-cell;
        padding: 0;

        div {
          display: flex;
          font-size: 15px;
          padding: 0 16px 0 12px;
          place-content: space-between;

          header {
            color: rgb(0, 0, 0);

            &:hover {
              color: rgb(0, 0, 128);
            }

            &:active {
              color: rgb(0, 0, 128);
            }
          }
        }
      }

      td:not([colspan]) {
        height: auto;
        margin-top: -1px;
      }

      nav {
        display: flex;
        flex-direction: row;
        gap: 32px;
        padding-top: 2px;

        button {
          fill: rgb(0, 0, 0);

          &:hover {
            fill: rgb(0, 0, 128);
          }

          &:active {
            fill: rgb(0, 0, 128);
          }

          svg {
            width: 16px;
          }
        }
      }
    }

    tbody.curr td.today {
      background-color: rgb(0, 0, 128);
      color: rgb(255, 255, 255);
      position: relative;

      &::after,
      &::before {
        content: "";
        position: absolute;
      }

      &::after {
        inset: 0;
      }

      &::before {
        border: 2px solid rgb(255, 255, 255);
        inset: 2px;
      }

      &:hover {
        &::after {
          border: 2px solid rgb(255, 255, 255);
        }
      }

      &:active {
        &::after {
          border: 2px solid rgb(192, 192, 192);
        }
      }
    }
  }
`;

export default StyledCalendar;

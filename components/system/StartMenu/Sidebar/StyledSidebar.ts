import styled from "styled-components";

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  padding-top: 4px;
  position: absolute;
  top: 0;
  transition-duration: 150ms;
  width: ${({ theme }) => theme.sizes.startMenu.sideBar.width}px;
  z-index: 1;

  /* Classic Win98 sidebar: inset bevel separating it from the menu. */
  border-right: 1px solid rgb(0, 0, 0);
  box-shadow: inset -1px 0 0 rgb(128, 128, 128), inset 1px 0 0 rgb(255, 255, 255);
  background-color: rgb(192, 192, 192);

  &:hover:not(&.collapsed) {
    background-color: rgb(176, 176, 176);
    box-shadow: inset -1px 0 0 rgb(128, 128, 128), inset 1px 0 0 rgb(255, 255, 255);
    transition:
      all 300ms ease,
      width 300ms ease;
    transition-timing-function: cubic-bezier(0.15, 1, 0.5, 1);
    width: ${({ theme }) => theme.sizes.startMenu.sideBar.expandedWidth};
  }

  &.collapsed {
    transition:
      all 300ms ease,
      width 300ms ease;
  }
`;

export default StyledSidebar;

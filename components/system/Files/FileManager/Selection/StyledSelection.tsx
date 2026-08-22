import { memo } from "react";
import styled, { createGlobalStyle } from "styled-components";

const NoGlobalPointerEvents = createGlobalStyle`
  body {
    pointer-events: none;
  }
`;

export const StyledSelectionComponent = styled.span`
  background-color: ${({ theme }) => theme.colors.selectionHighlightBackground};
  border: ${({ theme }) => `1px solid ${theme.colors.selectionHighlight}`};
  position: absolute;
  z-index: 2;
`;

type StyledSelectionProps = React.HTMLAttributes<HTMLSpanElement> & {
  ref?: React.Ref<HTMLSpanElement>;
};

const StyledSelection = ({
  ref,
  ...props
}: StyledSelectionProps): React.JSX.Element => (
  <>
    <NoGlobalPointerEvents />
    <StyledSelectionComponent {...props} ref={ref} />
  </>
);

export default memo(StyledSelection);

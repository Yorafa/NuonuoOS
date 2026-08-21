import { createContext, memo, useContext } from "react";

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: React.JSX.Element
): {
  Provider: React.MemoExoticComponent<FC>;
  useContext: () => T;
} => {
  const Context = createContext(Object.create(null) as T);

  const ProviderInner = ({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element => (
    <Context value={useContextState()}>
      {children}
      {ContextComponent}
    </Context>
  );

  return {
    Provider: memo(ProviderInner),
    useContext: () => useContext(Context),
  };
};

export default contextFactory;

type FC<T = Record<string, unknown>> = (
  props: React.PropsWithChildren<T>
) => React.JSX.Element | null;

type FCWithRef<R = HTMLElement, T = Record<string, unknown>> = (
  props: React.PropsWithChildren<T> & { ref?: React.RefObject<R | null> }
) => React.JSX.Element | null;

declare module "utif" {
  export const bufferToURI: (data: Buffer) => string;
}

declare module "Burn-My-Windows/resources/shaders/*.frag" {
  const content: string;
  export default content;
}

declare module "Burn-My-Windows/resources/shaders/*.glsl" {
  const content: string;
  export default content;
}

declare module "Burn-My-Windows/schemas/*.xml" {
  const content: string;
  export default content;
}

declare module "stockfish/bin/*.js" {
  const content: string;
  export default content;
}

declare module "stockfish/bin/*.wasm" {
  const content: string;
  export default content;
}

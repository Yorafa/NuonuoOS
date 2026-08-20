export type ShaderEffect = {
  duration: number;
  fragmentSource: string;
  name: string;
  nick: string;
};

export const nickToName = (nick: string): string => nick;

export const CLOSE_EFFECT_NAMES = ["None"];

export const setCurrentCloseEffect = (_name: string): void => {
  // Close effects were removed from the OS; kept as a no-op for API compatibility.
};

export const startCloseEffect = (
  _componentWindow: HTMLElement,
  onCaptured: () => void
): Promise<void> => {
  onCaptured();

  return Promise.resolve();
};

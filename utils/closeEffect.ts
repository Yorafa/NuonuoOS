import { DEFAULT_CLOSE_EFFECT } from "utils/constants";

export type ShaderEffect = {
  duration: number;
  fragmentSource: string;
  name: string;
  nick: string;
};

export const nickToName = (nick: string): string => nick;

export const CLOSE_EFFECT_NAMES = ["None"];

export const setCurrentCloseEffect = (_name: string): void => {};

export const startCloseEffect = async (
  _componentWindow: HTMLElement,
  onCaptured: () => void
): Promise<void> => {
  onCaptured();
};
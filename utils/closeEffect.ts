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

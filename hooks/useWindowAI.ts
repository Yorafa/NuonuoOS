/**
 * The window.ai (Talos) feature has been removed from daedalOS. The layout
 * still threads a `hasAI` flag to reserve space for an AI button that no
 * longer exists, so this always reports `false` to keep it deactivated.
 */
export const useWindowAI = (): boolean => false;
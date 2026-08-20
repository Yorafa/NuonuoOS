// Dreamcore Retro Windows 98 / ME palette.
// Classic teal desktop, 3D bevel greys, and soft dreamcore tints.

const colors = {
  // Classic Windows 98 desktop teal — slightly softened for dreamcore.
  background: "#0a8c8c",
  fileEntry: {
    background: "hsla(0, 0%, 0%, 25%)",
    backgroundFocused: "hsla(0, 0%, 0%, 50%)",
    backgroundFocusedHover: "hsla(0, 0%, 0%, 45%)",
    border: "hsla(0, 0%, 100%, 35%)",
    borderFocused: "hsla(0, 0%, 100%, 60%)",
    borderFocusedHover: "hsla(0, 0%, 100%, 75%)",
    text: "#FFF",
    textShadow: `
      0 0 1px rgba(0, 0, 0, 90%),
      0 0 2px rgba(0, 0, 0, 70%),

      0 1px 1px rgba(0, 0, 0, 90%),
      0 1px 2px rgba(0, 0, 0, 70%),

      0 2px 1px rgba(0, 0, 0, 90%),
      0 2px 2px rgba(0, 0, 0, 70%)`,
  },
  // Classic Win98 selection blue.
  highlight: "rgb(0, 0, 128)",
  progress: "hsla(113, 78%, 56%, 90%)",
  progressBackground: "hsla(104, 22%, 45%, 70%)",
  progressBarRgb: "rgb(6, 176, 37)",
  selectionHighlight: "rgb(0, 0, 128)",
  selectionHighlightBackground: "rgb(0, 0, 128)",
  taskbar: {
    active: "rgb(0, 0, 128)",
    activeForeground: "rgb(16, 64, 192)",
    // Classic Win98 taskbar: brushed silver/grey 3D bevel.
    background:
      "linear-gradient(to bottom, #c0c0c0 0%, #c0c0c0 8%, #a0a0a0 50%, #808080 100%)",
    button: {
      color: "#000000",
    },
    foreground: "rgb(192, 192, 192)",
    foregroundHover: "rgb(224, 224, 224)",
    foregroundProgress: "hsla(113, 45%, 60%, 35%)",
    hover: "rgb(208, 208, 208)",
    panel: "rgb(192, 192, 192)",
    peekBorder: "rgb(64, 64, 64)",
  },
  text: "#000000",
  titleBar: {
    // Classic Win98 active title bar gradient blue.
    background:
      "linear-gradient(90deg, rgb(0, 0, 128) 0%, rgb(16, 64, 192) 100%)",
    backgroundHover: "rgb(26, 62, 150)",
    backgroundInactive:
      "linear-gradient(90deg, rgb(128, 128, 128) 0%, rgb(160, 160, 160) 100%)",
    buttonInactive: "rgb(128, 128, 128)",
    closeHover: "rgb(232, 17, 35)",
    text: "#FFFFFF",
    textInactive: "rgb(192, 192, 192)",
  },
  window: {
    // Classic Win98 window grey.
    background: "#c0c0c0",
    outline: "rgb(255, 255, 255)",
    outlineInactive: "rgb(128, 128, 128)",
    shadow: "2px 2px 0 rgba(0, 0, 0, 40%)",
    shadowInactive: "1px 1px 0 rgba(0, 0, 0, 30%)",
  },
};

export default colors;

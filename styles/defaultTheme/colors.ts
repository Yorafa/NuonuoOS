const colors = {
  background: "#000",
  fileEntry: {
    background: "hsla(207, 30%, 72%, 25%)",
    backgroundFocused: "hsla(207, 60%, 72%, 35%)",
    backgroundFocusedHover: "hsla(207, 90%, 72%, 30%)",
    border: "hsla(207, 30%, 72%, 30%)",
    borderFocused: "hsla(207, 60%, 72%, 35%)",
    borderFocusedHover: "hsla(207, 90%, 72%, 40%)",
    text: "#FFF",
    textShadow: `
      0 0 1px rgba(0, 0, 0, 75%),
      0 0 2px rgba(0, 0, 0, 50%),

      0 1px 1px rgba(0, 0, 0, 75%),
      0 1px 2px rgba(0, 0, 0, 50%),

      0 2px 1px rgba(0, 0, 0, 75%),
      0 2px 2px rgba(0, 0, 0, 50%)`,
  },
  highlight: "hsla(207, 100%, 72%, 90%)",
  progress: "hsla(113, 78%, 56%, 90%)",
  progressBackground: "hsla(104, 22%, 45%, 70%)",
  progressBarRgb: "rgb(6, 176, 37)",
  selectionHighlight: "hsla(207, 100%, 45%, 90%)",
  selectionHighlightBackground: "hsla(207, 100%, 45%, 30%)",
  taskbar: {
    active: "hsla(213, 100%, 28%, 92%)",
    activeForeground: "hsla(213, 100%, 38%, 92%)",
    ai: {
      balanced: ["rgb(112, 203, 255)", "rgb(40, 112, 234)", "rgb(0, 95, 184)"],
      creative: [
        "rgb(215, 167, 187)",
        "rgb(145, 72, 135)",
        "rgb(139, 37, 126)",
      ],
      precise: ["rgb(167, 224, 235)", "rgb(0, 104, 128)", "rgb(0, 83, 102)"],
    },
    // Retro Windows 98 silver, tinted soft for the dreamcore palette.
    background: "linear-gradient(to bottom, #ffffff 0%, #e2e9f2 15%, #b9c6d6 45%, #7e8fa5 100%)",
    button: {
      color: "#1a2733",
    },
    foreground: "hsla(216, 20%, 82%, 90%)",
    foregroundHover: "hsla(216, 24%, 90%, 92%)",
    foregroundProgress: "hsla(113, 45%, 60%, 35%)",
    hover: "hsla(216, 25%, 92%, 92%)",
    peekBorder: "hsla(216, 30%, 40%, 65%)",
  },
  text: "rgba(255, 255, 255, 90%)",
  titleBar: {
    background: "rgb(10, 36, 106)",
    backgroundHover: "rgb(26, 62, 150)",
    backgroundInactive: "rgb(122, 134, 148)",
    buttonInactive: "rgb(190, 198, 208)",
    closeHover: "rgb(232, 17, 35)",
    text: "rgb(255, 255, 255)",
    textInactive: "rgb(235, 239, 244)",
  },
  window: {
    background: "#808080",
    outline: "hsla(0, 0%, 25%, 75%)",
    outlineInactive: "hsla(0, 0%, 30%, 100%)",
    shadow: "0 0 14px 0 rgba(0, 0, 0, 50%)",
    shadowInactive: "0 0 10px 0 rgba(0, 0, 0, 45%)",
  },
};

export default colors;

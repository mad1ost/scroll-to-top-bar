"use strict";

const scrollBar = createScrollBar();
document.body.append(scrollBar);

document.addEventListener("mouseover", (event) => {
  if (event.target !== document.documentElement) return;
  if (event.clientX >= document.documentElement.clientWidth) {
    scrollBar.classList.add("over");
  }
});

scrollBar.addEventListener("mouseleave", (event) => {
  scrollBar.classList.remove("over");
});

let prevY = 0;

scrollBar.addEventListener("click", (event) => {
  let top;
  if (window.scrollY === 0) {
    if (prevY === 0) return;
    top = prevY;
  } else {
    prevY = window.scrollY;
    top = 0;
  }
  window.scrollTo({
    top: top
  });
});

chrome.storage.local.get({
  width: 115,
  color: "#dce2e8"
}, (options) => {
  scrollBar.style.setProperty("--width", options.width + "px");
  scrollBar.style.setProperty("--color", options.color);
});

function createScrollBar() {
  const scrollBar = document.createElement("div");
  const shadowRoot = scrollBar.attachShadow({
    mode: "closed"
  });
  const style = document.createElement("style");
  style.textContent = `
    :host {
      background: transparent none repeat scroll 0% 0% !important;
      border-radius: 0 !important;
      border-style: none !important;
      box-shadow: none !important;
      cursor: pointer !important;
      height: 100% !important;
      margin: 0 !important;
      opacity: 0.5 !important;
      overflow: visible !important;
      padding: 0 !important;
      position: fixed !important;
      right: 0 !important;
      top: 0 !important;
      width: var(--width, 115px) !important;
      z-index: -1 !important;
    }
    :host(.over) {
      background-color: var(--color, #dce2e8) !important;
      z-index: 9999 !important;
    }`;
  shadowRoot.append(style);
  return scrollBar;
}

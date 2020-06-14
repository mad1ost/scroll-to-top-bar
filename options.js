'use strict';

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener('submit', saveOptions);

function restoreOptions() {
  chrome.storage.local.get({
    width: 115,
    color: '#dce2e8'
  }, (options) => {
    document.querySelector("#width").value = options.width;
    document.querySelector("#color").value = options.color;
  });
}

function saveOptions(event) {
  chrome.storage.local.set({
    width: document.querySelector("#width").value,
    color: document.querySelector("#color").value
  });
  event.preventDefault();
}

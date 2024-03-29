'use strict';

const form = document.forms[0];

function restoreOptions() {
	chrome.storage.local.get({
		width: 115,
		color: '#dce2e8'
	}, (options) => {
		form['width'].value = options.width;
		form['color'].value = options.color;
	});
}

function saveOptions(event) {
	chrome.storage.local.set({
		width: form['width'].value,
		color: form['color'].value
	});
	event.preventDefault();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
form.addEventListener('submit', saveOptions);


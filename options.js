'use strict';

const form = document.forms[0];
document.addEventListener('DOMContentLoaded', restoreOptions);
form.addEventListener('submit', saveOptions);

function restoreOptions() {
	chrome.storage.local.get({
		width: 115,
		color: '#dce2e8'
	}).then((options) => {
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

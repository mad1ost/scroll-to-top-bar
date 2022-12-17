'use strict';

chrome.storage.local.get({
	width: 115,
	color: '#dce2e8'
}, (options) => {
	const style = document.createElement('style');
	style.textContent = `
		#scroll-to-top-bar {
			background: transparent none repeat scroll 0% 0%;
			border-radius: 0;
			border-style: none;
			box-shadow: none;
			cursor: auto;
			height: 100%;
			margin: 0;
			opacity: 0.5;
			overflow: visible;
			padding: 0;
			position: fixed;
			right: 0;
			top: 0;
			width: var(--scroll-to-top-bar-width, ${options.width}px);
			z-index: -1;
		}
		#scroll-to-top-bar.over {
			background-color: var(--scroll-to-top-bar-color, ${options.color});
			cursor: pointer;
			z-index: 9999;
		}
	`;
	document.head.append(style);
	const scrollBar = document.createElement('div');
	scrollBar.id = 'scroll-to-top-bar';
	document.body.append(scrollBar);

	document.addEventListener('mouseover', (event) => {
		if (event.target !== document.documentElement) return;
		if (event.clientX >= document.documentElement.clientWidth) {
			scrollBar.classList.add('over');
			scrollBar.addEventListener('click', onClick);
		}
	});

	scrollBar.addEventListener('mouseleave', (event) => {
		scrollBar.classList.remove('over');
		scrollBar.removeEventListener('click', onClick);
	});

	chrome.storage.onChanged.addListener((changes, area) => {
		if (area !== 'local') return;
		for (let key in changes) {
			options[key] = changes[key].newValue;
		}
		scrollBar.style.setProperty('--scroll-to-top-bar-width', options.width + 'px');
		scrollBar.style.setProperty('--scroll-to-top-bar-color', options.color);
	});

	let savedY = 0;

	function onClick() {
		let newY;
		if (window.scrollY === 0) {
			if (savedY === 0) return;
			newY = savedY;
		} else {
			savedY = window.scrollY;
			newY = 0;
		}
		window.scrollTo({
			top: newY
		});
	}
});

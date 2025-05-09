// import { setLanguage } from './languages.js';
// import { moveNoise } from '../visual/effects.js';
// import { ids, BIG_TEXT, DEFAULT_TEXT } from '../index.js';

// // Backgorund gradients
// const applyGraphics = () => {
// 	let graphicsSetting = localStorage.getItem('graphics');

// 	// If the graphics setting is not set, set it to "medium" by default
// 	if (!graphicsSetting) {
// 		localStorage.setItem('graphics', 'medium');
// 		graphicsSetting = 'medium';
// 	}

// 	const gradientsContainer = document.querySelector('.gradients-container');
// 	const videoBackground = document.querySelector('#video-background');

// 	if (graphicsSetting === 'ultra') {
// 		gradientsContainer.style.display = 'block';
// 		videoBackground.style.display = 'none';
// 	} else if (graphicsSetting === 'medium') {
// 		gradientsContainer.style.display = 'none';
// 		videoBackground.style.display = 'block';
// 	} else if (graphicsSetting === 'none') {
// 		gradientsContainer.style.display = 'none';
// 		videoBackground.style.display = 'none';
// 	}
// }

// // Background noise
// const applyNoise = (interval) => {
// 	let noiseSetting = localStorage.getItem('noise');

// 	// If the noise setting is not set, set it to "on" by default
// 	if (!noiseSetting) {
// 		localStorage.setItem('noise', 'on');
// 		noiseSetting = 'on';
// 	}

// 	const noiseElement = document.querySelector('.background-noise');

// 	if (noiseSetting === 'on') {
// 		noiseElement.style.display = 'block';
// 		ids.moveNoiseInterval = setInterval(moveNoise, interval);
// 	} else  if (noiseSetting === 'off') {
// 		noiseElement.style.display = 'none';
// 	}
// }

// // Set text size
// const applyTextSize = () => {
// 	if (localStorage.getItem('bigText') === 'on') {
// 		document.documentElement.style.fontSize = BIG_TEXT;
// 	} else {
// 		document.documentElement.style.fontSize = DEFAULT_TEXT;
// 	}
// }

// // Apply the settings from the local storage
// export const applySettings = async () => {
// 	applyGraphics();
// 	applyNoise(100);
// 	applyTextSize();
// 	await setLanguage(localStorage.getItem('language') ? localStorage.getItem('language') : 'en');
// }

// @ts-ignore
import { setLanguage } from './languages.js';
// @ts-ignore
import { moveNoise } from '../visual/effects.js';
// @ts-ignore
import { ids, BIG_TEXT, DEFAULT_TEXT } from '../index.js';
// Background gradients



const applyGraphics = (): void => {
	let graphicsSetting: string | null = localStorage.getItem('graphics');

	if (!graphicsSetting) {
		localStorage.setItem('graphics', 'medium');
		graphicsSetting = 'medium';
	}

	const gradientsContainer = document.querySelector('.gradients-container') as HTMLElement | null;
	const videoBackground = document.querySelector('#video-background') as HTMLElement | null;

	if (graphicsSetting === 'ultra') {
		if (gradientsContainer) gradientsContainer.style.display = 'block';
		if (videoBackground) videoBackground.style.display = 'none';
	} else if (graphicsSetting === 'medium') {
		if (gradientsContainer) gradientsContainer.style.display = 'none';
		if (videoBackground) videoBackground.style.display = 'block';
	} else if (graphicsSetting === 'none') {
		if (gradientsContainer) gradientsContainer.style.display = 'none';
		if (videoBackground) videoBackground.style.display = 'none';
	}
};

// Background noise
const applyNoise = (interval: number): void => {
	let noiseSetting: string | null = localStorage.getItem('noise');

	if (!noiseSetting) {
		localStorage.setItem('noise', 'on');
		noiseSetting = 'on';
	}

	const noiseElement = document.querySelector('.background-noise') as HTMLElement | null;

	if (noiseSetting === 'on') {
		if (noiseElement) noiseElement.style.display = 'block';
		ids.moveNoiseInterval = setInterval(moveNoise, interval);
	} else if (noiseSetting === 'off') {
		if (noiseElement) noiseElement.style.display = 'none';
	}
};

// Set text size
const applyTextSize = (): void => {
	if (localStorage.getItem('bigText') === 'on') {
		document.documentElement.style.fontSize = BIG_TEXT;
	} else {
		document.documentElement.style.fontSize = DEFAULT_TEXT;
	}
};

// Apply the settings from the local storage
export const applySettings = async (): Promise<void> => {
	applyGraphics();
	applyNoise(100);
	applyTextSize();
	const lang: string = localStorage.getItem('language') || 'en';
	await setLanguage(lang);
};

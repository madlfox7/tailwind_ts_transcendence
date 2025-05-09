// import { setLanguage } from '../utils/languages.js';
// import { moveNoise } from '../visual/effects.js';
// import { ids } from '../index.js';
// import { BIG_TEXT, DEFAULT_TEXT } from '../index.js';

// // Function that will be called when the view is loaded
// export function settings() {
// 	// Graphics settings
// 	const ultraRadio = document.getElementById("graphics-ultra-radio");
// 	const mediumRadio = document.getElementById("graphics-medium-radio");
// 	const noneRadio = document.getElementById("graphics-none-radio");
// 	const noiseCheckbox = document.getElementById("graphics-noise-checkbox");
	
// 	const gradientsContainer = document.querySelector('.gradients-container');
// 	const videoBackground = document.querySelector('#video-background');

// 	ultraRadio.addEventListener("change", () => {
// 		if (ultraRadio.checked) {
// 			localStorage.setItem('graphics', 'ultra');
// 			gradientsContainer.style.display = 'block';
// 			videoBackground.style.display = 'none';
// 		}
// 	});

// 	mediumRadio.addEventListener("change", () => {
// 		if (mediumRadio.checked) {
// 			localStorage.setItem('graphics', 'medium');
// 			gradientsContainer.style.display = 'none';
// 			videoBackground.style.display = 'block';
// 		}
// 	});

// 	noneRadio.addEventListener("change", () => {
// 		if (noneRadio.checked) {
// 			localStorage.setItem('graphics', 'none');
// 			gradientsContainer.style.display = 'none';
// 			videoBackground.style.display = 'none';
// 		}
// 	});

// 	noiseCheckbox.addEventListener("change", () => {
// 		if (noiseCheckbox.checked) {
// 			localStorage.setItem('noise', 'on');
// 			document.querySelector('.background-noise').style.display = 'block';
// 			ids.moveNoiseInterval = setInterval(moveNoise, 100);

// 		} else {
// 			localStorage.setItem('noise', 'off');
// 			document.querySelector('.background-noise').style.display = 'none';
// 			clearInterval(ids.moveNoiseInterval);
// 		}
// 	});

// 	// Apply the graphics setting from the local storage
// 	let graphicsSetting = localStorage.getItem('graphics');

// 	if (graphicsSetting === 'ultra') {
// 		ultraRadio.checked = true;
// 	} else if (graphicsSetting === 'medium') {
// 		mediumRadio.checked = true;
// 	} else {
// 		noneRadio.checked = true;
// 	}

// 	let noiseSetting = localStorage.getItem('noise');

// 	if (noiseSetting === 'on') {
// 		noiseCheckbox.checked = true;
// 	}		
	
// 	// Switch language setting
// 	document.getElementById('languageSwitcher').addEventListener('change', (event) => {
// 		setLanguage(event.target.value);
// 		// Save the language setting in the local storage
// 		localStorage.setItem('language', event.target.value);
// 	});

// 	// Apply the language setting from the local storage
// 	const languageSetting = localStorage.getItem('language');
// 	document.getElementById('languageSwitcher').value = languageSetting ? languageSetting : 'en';

// 	// Big text setting
// 	const bigTextCheckbox = document.getElementById('big-text-checkbox');
// 	bigTextCheckbox.addEventListener('change', (event) => {
// 		if (event.target.checked) {
// 			document.documentElement.style.fontSize = BIG_TEXT;
// 			localStorage.setItem('bigText', 'on');
// 		} else {
// 			document.documentElement.style.fontSize = DEFAULT_TEXT;
// 			localStorage.setItem('bigText', 'off');
// 		}
// 	});

// 	// Apply the big text setting from the local storage
// 	const bigTextSetting = localStorage.getItem('bigText');
// 	if (bigTextSetting === 'on') {
// 		bigTextCheckbox.checked = true;
// 	} else {
// 		bigTextCheckbox.checked = false;
// 	}
// }

import { setLanguage } from '../utils/languages.js';
import { moveNoise } from '../visual/effects.js';
//@ts-ignore
import { ids, BIG_TEXT, DEFAULT_TEXT } from '../index.js';

export function settings(): void {
  // Graphics settings elements
  const ultraRadio = document.getElementById("graphics-ultra-radio") as HTMLInputElement;
  const mediumRadio = document.getElementById("graphics-medium-radio") as HTMLInputElement;
  const noneRadio = document.getElementById("graphics-none-radio") as HTMLInputElement;
  const noiseCheckbox = document.getElementById("graphics-noise-checkbox") as HTMLInputElement;

  const gradientsContainer = document.querySelector('.gradients-container') as HTMLElement;
  const videoBackground = document.getElementById('video-background') as HTMLElement;
  const bgNoise = document.querySelector('.background-noise') as HTMLElement;

  // ---- Graphic quality radios ----
  ultraRadio.addEventListener("change", () => {
    if (ultraRadio.checked) {
      localStorage.setItem('graphics', 'ultra');
      gradientsContainer.style.display = 'block';
      videoBackground.style.display = 'none';
    }
  });

  mediumRadio.addEventListener("change", () => {
    if (mediumRadio.checked) {
      localStorage.setItem('graphics', 'medium');
      gradientsContainer.style.display = 'none';
      videoBackground.style.display = 'block';
    }
  });

  noneRadio.addEventListener("change", () => {
    if (noneRadio.checked) {
      localStorage.setItem('graphics', 'none');
      gradientsContainer.style.display = 'none';
      videoBackground.style.display = 'none';
    }
  });

  // ---- Noise toggle ----
  noiseCheckbox.addEventListener("change", () => {
    if (noiseCheckbox.checked) {
      localStorage.setItem('noise', 'on');
      bgNoise.style.display = 'block';
      ids.moveNoiseInterval = window.setInterval(moveNoise, 100);
    } else {
      localStorage.setItem('noise', 'off');
      bgNoise.style.display = 'none';
      clearInterval(ids.moveNoiseInterval);
    }
  });

  // Apply stored graphics settings
  const graphicsSetting = localStorage.getItem('graphics');
  switch (graphicsSetting) {
    case 'ultra':
      ultraRadio.checked = true;
      break;
    case 'medium':
      mediumRadio.checked = true;
      break;
    default:
      noneRadio.checked = true;
  }

  // Apply stored noise setting
  if (localStorage.getItem('noise') === 'on') {
    noiseCheckbox.checked = true;
  }

  // ---- Language switcher ----
  const languageSwitcher = document.getElementById('languageSwitcher') as HTMLSelectElement;
  languageSwitcher.addEventListener('change', (event) => {
    const value = (event.target as HTMLSelectElement).value;
    setLanguage(value);
    localStorage.setItem('language', value);
  });
  languageSwitcher.value = localStorage.getItem('language') ?? 'en';

  // ---- Big text toggle ----
  const bigTextCheckbox = document.getElementById('big-text-checkbox') as HTMLInputElement;
  bigTextCheckbox.addEventListener('change', () => {
    if (bigTextCheckbox.checked) {
      document.documentElement.style.fontSize = BIG_TEXT;
      localStorage.setItem('bigText', 'on');
    } else {
      document.documentElement.style.fontSize = DEFAULT_TEXT;
      localStorage.setItem('bigText', 'off');
    }
  });
  if (localStorage.getItem('bigText') === 'on') {
    bigTextCheckbox.checked = true;
    document.documentElement.style.fontSize = BIG_TEXT;
  }
}

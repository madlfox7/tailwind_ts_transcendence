// // ------------------------------- FRONTEND EYE CANDIES -------------------------------
// // Changing letter animation

// export const animateLetters = () => {
//     const text = document.querySelector("[animated-letters]");
//     if (!text) return;
// 	const letters = "abcdefghijklmnopqrstuvwxyz";
// 	const initialText = text.innerText;

//     let interval = null;
//     let iteration = 0;

// 	interval = setInterval(() => {
// 		text.innerText = text.innerText
// 			.split("")
// 			.map((letter, index) => {
// 				if (index < iteration) {
// 					return initialText[index];
// 				}
// 				return letters[Math.floor(Math.random() * 26)];
// 			})
// 			.join("");

// 		if (iteration >= initialText.length) { 
// 			clearInterval(interval);
// 		}

// 		iteration += 1 / 3;
// 	}, 30);
// };

// // Background interactive bubble
// export const initInteractiveBubble = () => {
// 	const interBubble = document.querySelector('.interactive');
// 	if (!interBubble) return;

//     let curX = window.innerWidth / 2;
//     let curY = window.innerHeight / 2;
//     let tgX = 0;
//     let tgY = 0;

//     function move() {
// 		const easingFactor = 30;

//         curX += (tgX - curX) / easingFactor;
//         curY += (tgY - curY) / easingFactor;
//         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
//         requestAnimationFrame(() => {
//             move();
//         });
//     }

//     window.addEventListener('mousemove', (event) => {
//         tgX = event.clientX;
//         tgY = event.clientY;
//     });

//     move();
// };

// // Background noise animation
// export const moveNoise = () => {
// 	const noiseElement = document.querySelector('.background-noise');
	
// 	const randomX = Math.floor(Math.random() * window.innerWidth);
// 	const randomY = Math.floor(Math.random() * window.innerHeight);

// 	noiseElement.style.backgroundPosition = `${randomX}px ${randomY}px`;
// }

// // init load transition
// export const initLoadTransition = () => {
// 	const upperRect = document.getElementById("upper-transition-rectangle");
// 	const lowerRect = document.getElementById("lower-transition-rectangle");
  
// 	upperRect.addEventListener("animationend", function () {
// 	  upperRect.style.display = "none";
// 	});
  
// 	lowerRect.addEventListener("animationend", function () {
// 	  lowerRect.style.display = "none";
// 	});
//   }

//   // Load transition
// export const loadTransition = () => {
// 	const upperRect = document.getElementById("upper-transition-rectangle");
// 	const lowerRect = document.getElementById("lower-transition-rectangle");
  
// 	upperRect.style.display = "block";
// 	upperRect.style.top = "0";

// 	lowerRect.style.display = "block";
// 	lowerRect.style.top = "50%";
// }

// export const initCursorClickEffect = () => {
// 	let body = document.querySelector('body');
// 	let canvas = document.querySelector('canvas');
// 	if (!canvas) return;
// 	canvas.addEventListener('click', (event) => {
// 		for (let i = 0; i < 50; i++){
// 			let spark = document.createElement('div');
// 			spark.className = 'spark';

// 			spark.style.top = (event.clientY) + 'px';
// 			spark.style.left = (event.clientX) + 'px';

// 			let randomX = (Math.random() - 0.5) * window.innerWidth / 3;
// 			let randomY = (Math.random() - 0.5) * window.innerHeight / 3;

// 			spark.style.setProperty('--randomX', randomX + 'px');
// 			spark.style.setProperty('--randomY', randomY + 'px');

// 			// change animation duration as a varible
// 			let duration = Math.random() * 1.5 + 0.5;
// 			spark.style.animation = `animate ${duration}s ease-out forwards`;

// 			body.appendChild(spark);

// 			setTimeout(() => {
// 				spark.remove();
// 			}, 2000);
// 		}
// 	});
// }

// ------------------------------- FRONTEND EYE CANDIES -------------------------------

// ------------------------------- FRONTEND EYE CANDIES -------------------------------

// Changing letter animation
export const animateLetters = (): void => {
	const text = document.querySelector("[animated-letters]") as HTMLElement | null;
	if (!text) return;

	const letters = "abcdefghijklmnopqrstuvwxyz";
	const initialText = text.innerText;

	let interval: ReturnType<typeof setInterval> | null = null;
	let iteration = 0;

	interval = setInterval(() => {
		text.innerText = text.innerText
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return initialText[index];
				}
				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iteration >= initialText.length) {
			if (interval !== null) {
				clearInterval(interval);
			}
		}

		iteration += 1 / 3;
	}, 30);
};

// Background interactive bubble
export const initInteractiveBubble = (): void => {
	const interBubble = document.querySelector('.interactive') as HTMLElement | null;
	if (!interBubble) return;

	let curX: number = window.innerWidth / 2;
	let curY: number = window.innerHeight / 2;
	let tgX: number = 0;
	let tgY: number = 0;

	function move(): void {
		const easingFactor = 30;

		curX += (tgX - curX) / easingFactor;
		curY += (tgY - curY) / easingFactor;

		if (interBubble) {
			interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
		}

		requestAnimationFrame(move);
	}

	window.addEventListener('mousemove', (event: MouseEvent) => {
		tgX = event.clientX;
		tgY = event.clientY;
	});

	move();
};

// Background noise animation
export const moveNoise = (): void => {
	const noiseElement = document.querySelector('.background-noise') as HTMLElement | null;
	if (!noiseElement) return;

	const randomX: number = Math.floor(Math.random() * window.innerWidth);
	const randomY: number = Math.floor(Math.random() * window.innerHeight);

	noiseElement.style.backgroundPosition = `${randomX}px ${randomY}px`;
};

// Init load transition
export const initLoadTransition = (): void => {
	const upperRect = document.getElementById("upper-transition-rectangle") as HTMLElement | null;
	const lowerRect = document.getElementById("lower-transition-rectangle") as HTMLElement | null;

	if (!upperRect || !lowerRect) return;

	upperRect.addEventListener("animationend", () => {
		upperRect.style.display = "none";
	});

	lowerRect.addEventListener("animationend", () => {
		lowerRect.style.display = "none";
	});
};

// Load transition
export const loadTransition = (): void => {
	const upperRect = document.getElementById("upper-transition-rectangle") as HTMLElement | null;
	const lowerRect = document.getElementById("lower-transition-rectangle") as HTMLElement | null;

	if (!upperRect || !lowerRect) return;

	upperRect.style.display = "block";
	upperRect.style.top = "0";

	lowerRect.style.display = "block";
	lowerRect.style.top = "50%";
};

// Cursor click effect
export const initCursorClickEffect = (): void => {
	const body = document.querySelector('body') as HTMLElement | null;
	const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;

	if (!body || !canvas) return;

	canvas.addEventListener('click', (event: MouseEvent) => {
		for (let i = 0; i < 50; i++) {
			const spark = document.createElement('div');
			spark.className = 'spark';

			spark.style.top = `${event.clientY}px`;
			spark.style.left = `${event.clientX}px`;

			const randomX: number = (Math.random() - 0.5) * window.innerWidth / 3;
			const randomY: number = (Math.random() - 0.5) * window.innerHeight / 3;

			spark.style.setProperty('--randomX', `${randomX}px`);
			spark.style.setProperty('--randomY', `${randomY}px`);

			const duration: number = Math.random() * 1.5 + 0.5;
			spark.style.animation = `animate ${duration}s ease-out forwards`;

			body.appendChild(spark);

			setTimeout(() => {
				spark.remove();
			}, 2000);
		}
	});
};

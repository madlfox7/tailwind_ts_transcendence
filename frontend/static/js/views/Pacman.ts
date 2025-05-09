// import AbstractView from "./AbstractView.js";
// import { PacmanGame, eventListeners } from "../scripts/pacman.js";
// import { initCursorClickEffect } from "../visual/effects.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - pacman");
// 		this.pacmanGame;
//     }

//     async getHtml() {
//         return (await fetch("static/html/pacman.html")).text();
//     }

// 	loadJS() {
// 		this.pacmanGame = new PacmanGame();
// 		initCursorClickEffect();
// 	}

// 	stopJS(){
// 		this.pacmanGame.stopGameLoop();
// 	}


// 	cleanUpEventListeners() {
// 		for (const [event, listener] of Object.entries(eventListeners)) {
// 			document.removeEventListener(event, listener);
// 		}
// 	}
// }

// @ts-ignore
import AbstractView from "./AbstractView.js";
// @ts-ignore
import { PacmanGame, eventListeners } from "../scripts/pacman.js";
// @ts-ignore
import { initCursorClickEffect } from "../visual/effects.js";

export default class PacmanView extends AbstractView {
	private pacmanGame!: PacmanGame;

	constructor() {
		super();
		this.setTitle("satori - pacman");
	}

	async getHtml(): Promise<string> {
		return (await fetch("static/html/pacman.html")).text();
	}

	loadJS(): void {
		this.pacmanGame = new PacmanGame();
		initCursorClickEffect();
	}

	stopJS(): void {
		this.pacmanGame.stopGameLoop();
	}

	cleanUpEventListeners(): void {
		for (const [event, listener] of Object.entries(eventListeners)) {
			document.removeEventListener(event, listener as EventListener);
		}
	}
}

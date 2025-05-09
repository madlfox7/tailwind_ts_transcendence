// import AbstractView from "./AbstractView.js";
// import { PacmanMenu, eventListeners } from "../scripts/pacmanMenu.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("pacman menu");
//     }

//     async getHtml() {
//         return (await fetch("static/html/pacmanMenu.html")).text();
//     }

// 	loadJS() {
// 		var pacmanMenu = new PacmanMenu();
// 	}
	
// 	stopJS(){
// 		// No loop in this view
// 	}


// 	cleanUpEventListeners() {
// 		for (const [event, listener] of Object.entries(eventListeners)) {
// 			document.removeEventListener(event, listener);
// 		}
// 	}
// }

// @ts-ignore: JavaScript file with no types
import AbstractView from "./AbstractView.js";

// @ts-ignore: JavaScript file with no types
import { PacmanMenu, eventListeners } from "../scripts/pacmanMenu.js";


// Minimal safe type for eventListeners (optional)
type EventListenersMap = Record<string, EventListener>;
//??????????????????



export default class PacmanMenuView extends (AbstractView as { new (): AbstractView }) {
	constructor() {
		super();
		this.setTitle("pacman menu");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/pacmanMenu.html").then((res) => res.text());
	}

	loadJS(): void {
		// Using var to preserve runtime compatibility
		// @ts-ignore: PacmanMenu is a JS constructor
		var pacmanMenu = new PacmanMenu();
	}

	stopJS(): void {
		// No loop in this view
	}

	cleanUpEventListeners(): void {

		for (const [event, listener] of Object.entries(eventListeners as EventListenersMap)) {
			document.removeEventListener(event, listener);
		}
	}
}

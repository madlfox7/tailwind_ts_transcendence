// import AbstractView from "./AbstractView.js";
// import { PongMenu, eventListeners } from "../scripts/pongMenu.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("pong menu");
//     }

//     async getHtml() {
//         return (await fetch("static/html/pongMenu.html")).text();
//     }

// 	loadJS() {
// 		var pongMenu = new PongMenu();
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

// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: PongMenu and eventListeners come from a JS module
import { PongMenu, eventListeners } from "../scripts/pongMenu.js";

// // Minimal AbstractView structure (optional)
// type AbstractViewType = {
// 	setTitle(title: string): void;
// 	getHtml(): Promise<string>;
// 	loadJS?(): void;
// 	stopJS?(): void;
// 	cleanUpEventListeners?(): void;
// };

// Optional type for JS event map
type EventMap = Record<string, EventListener>;

export default class PongMenuView extends AbstractView  {
	constructor() {
		super();
		this.setTitle("pong menu");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/pongMenu.html").then((res) => res.text());
	}

	loadJS(): void {
		var pongMenu = new PongMenu();
	}

	stopJS(): void {
		// No loop in this view
	}

	cleanUpEventListeners(): void {
		for (const [event, listener] of Object.entries(eventListeners as EventMap)) {
			document.removeEventListener(event, listener);
		}
	}
}

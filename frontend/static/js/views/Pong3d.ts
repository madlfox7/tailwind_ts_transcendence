// import AbstractView from "./AbstractView.js";
// //import { basePong }  from "../scripts/pong/basicPong.js";
// import { pongThree, eventListeners } from "../scripts/pong/pong3d/main.js";

// export default class Pong extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - pong");
//         this.pongThree;
//     }

//     async getHtml() {
//         return (await fetch("/static/html/pong3d.html")).text();
//     }

//     loadJS() {
//         this.pongThree = new pongThree();
//     }

//     stopJS() {
//         this.pongThree.stopGameLoop();
//     }

//     cleanUpEventListeners() {
//         for (const [event, listener] of Object.entries(eventListeners)) {
//             document.removeEventListener(event, listener);
//         }
//     }

// }

// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: pongThree class and eventListeners are from a JS module
import { pongThree, eventListeners } from "../scripts/pong/pong3d/main.js";

// // Optional: minimal typing for AbstractView
// type AbstractViewType = {
// 	setTitle(title: string): void;
// 	getHtml(): Promise<string>;
// 	loadJS?(): void;
// 	stopJS?(): void;
// 	cleanUpEventListeners?(): void;
// };

// Optional: structure for the pongThree instance
type PongThreeInstance = {
	stopGameLoop(): void;
};

export default class Pong3DView extends AbstractView{
	private pongThree!: PongThreeInstance;

	constructor() {
		super();
		this.setTitle("satori - pong");
	}

	getHtml(): Promise<string> {
		return fetch("/static/html/pong3d.html").then((res) => res.text());
	}

	loadJS(): void {
		this.pongThree = new pongThree();
	}

	stopJS(): void {
		this.pongThree.stopGameLoop();
	}

	cleanUpEventListeners(): void {
		for (const [event, listener] of Object.entries(eventListeners as Record<string, EventListener>)) {
			document.removeEventListener(event, listener);
		}
	}
}

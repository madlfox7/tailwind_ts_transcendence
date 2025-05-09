// import AbstractView from "./AbstractView.js";
// import { pacmanStatistics } from "../scripts/pacmanStatistics.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - pacman statistics");
//     }

//     async getHtml() {
//         return (await fetch("static/html/pacmanStatistics.html")).text();
//     }

//     loadJS() {
//         pacmanStatistics();
//     }
// }
// @ts-ignore: JavaScript file with no types
import AbstractView from "./AbstractView.js";

// @ts-ignore: JavaScript file with no types
import { pacmanStatistics } from "../scripts/pacmanStatistics.js";

// Minimal safe type for AbstractView (optional)
// type AbstractViewType = {
// 	setTitle(title: string): void;
// 	getHtml(): Promise<string>;
// 	loadJS?(): void;
// 	stopJS?(): void;
// 	cleanUpEventListeners?(): void;
// };


export default class PacmanStatisticsView extends AbstractView {
//export default class PacmanStatisticsView extends (AbstractView as { new (): AbstractView }) {
	constructor() {
		super();
		this.setTitle("satori - pacman statistics");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/pacmanStatistics.html").then((res) => res.text());
	}

	loadJS(): void {
		// @ts-ignore: pacmanStatistics is a JS function
		pacmanStatistics();
	}
}

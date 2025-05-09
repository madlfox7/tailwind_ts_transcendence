// import AbstractView from "./AbstractView.js";
// import { pongStatistics } from "../scripts/pongStatistics.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - pong statistics");
//     }

//     async getHtml() {
//         return (await fetch("static/html/pongStatistics.html")).text();
//     }

//     async loadJS() {
//         pongStatistics();
//     }
// }
// @ts-ignore: JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: JS module
import { pongStatistics } from "../scripts/pongStatistics.js";



export default class PongStatisticsView extends AbstractView  {
	constructor() {
		super();
		this.setTitle("satori - pong statistics");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/pongStatistics.html").then((res) => res.text());
	}

	loadJS(): void {
		pongStatistics();
	}
}

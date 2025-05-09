// import AbstractView from "./AbstractView.js";
// import { settings } from "../scripts/settings.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - settings");
//     }

//     async getHtml() {
//         return (await fetch("static/html/settings.html")).text();
//     }

// 	loadJS() {
// 		settings();
// 	}

//     stopJS(){
// 		// No loop in this view
// 	}

// }

// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: settings is a JS function
import { settings } from "../scripts/settings.js";

// Minimal structure for base class (optional)
// type AbstractViewType = {
// 	setTitle(title: string): void;
// 	getHtml(): Promise<string>;
// 	loadJS?(): void;
// 	stopJS?(): void;
// 	cleanUpEventListeners?(): void;
// };

export default class SettingsView extends AbstractView {
	constructor() {
		super();
		this.setTitle("satori - settings");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/settings.html").then((res) => res.text());
	}
////????
	loadJS(): void {
		settings();
	}

	stopJS(): void {
		// No loop in this view
	}
}

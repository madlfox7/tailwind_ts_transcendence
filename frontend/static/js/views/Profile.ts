// import AbstractView from "./AbstractView.js";
// import { profile } from "../scripts/profile.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - profile");
//     }

//     async getHtml() {
// 		return (await fetch("static/html/profile.html")).text();
//     }

// 	async loadJS() {
// 		await profile();
// 	}

//   stopJS(){
// 		// No loop in this view
// 	}

// }

// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: profile() is a JS function
import { profile } from "../scripts/profile.js";

// // Optional: abstract base view interface
// type AbstractViewType = {
// 	setTitle(title: string): void;
// 	getHtml(): Promise<string>;
// 	loadJS?(): void;
// 	stopJS?(): void;
// 	cleanUpEventListeners?(): void;
// };

export default class ProfileView extends AbstractView {
	constructor() {
		super();
		this.setTitle("satori - profile");
	}

	// async getHtml(): Promise<string> {
	// 	return fetch("static/html/profile.html").then((res) => res.text());
	// }
	async getHtml(): Promise<string> {
		const res = await fetch("static/html/profile.html");
		return res.text();
	}
//????????
	async loadJS(): Promise<void> {
		await profile();
	}

	stopJS(): void {
		// No loop in this view
	}
}

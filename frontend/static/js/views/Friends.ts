// import AbstractView from "./AbstractView.js";
// import { friends } from "../scripts/friends.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - friends");
//     }

//     async getHtml() {
//         return (await fetch("static/html/friends.html")).text();
//     }

//     loadJS() {
//         friends();
//     }
// }
// @ts-ignore
import AbstractView from "./AbstractView.js";
// @ts-ignore
import { friends } from "../scripts/friends.js";

export default class FriendsView extends AbstractView {
	constructor() {
		super();
		this.setTitle("satori - friends");
	}

	async getHtml(): Promise<string> {
		return (await fetch("static/html/friends.html")).text();
	}

	loadJS(): void {
		friends();
	}
}

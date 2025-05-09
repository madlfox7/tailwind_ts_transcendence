// import AbstractView from "./AbstractView.js";
// import { signUp } from "../scripts/signUp.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - sign up");
//     }

//     async getHtml() {
//         return (await fetch("static/html/signUp.html")).text();
//     }

//     loadJS() {
//         signUp();
//     }

//     stopJS(){
// 		// No loop in this view
// 	}

// }
// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: signUp is a JS function
import { signUp } from "../scripts/signUp.js";



export default class SignUpView extends AbstractView {
	constructor() {
		super();
		this.setTitle("satori - sign up");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/signUp.html").then((res) => res.text());
	}
///????????
	loadJS(): void {
		// @ts-ignore: JS function
		signUp();
	}

	stopJS(): void {
		// No loop in this view
	}
}

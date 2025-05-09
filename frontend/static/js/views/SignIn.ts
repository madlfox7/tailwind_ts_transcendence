// import AbstractView from "./AbstractView.js";
// import { signIn } from "../scripts/signIn.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - sign in");
//     }

//     async getHtml() {
// 		return (await fetch("static/html/signIn.html")).text();
//     }
	
// 	loadJS() {
// 		signIn();
// 	}

//   stopJS(){
// 		// No loop in this view
// 	}

// }

// @ts-ignore: AbstractView is a JS module
import AbstractView from "./AbstractView.js";

// @ts-ignore: signIn is a JS function
import { signIn } from "../scripts/signIn.js";



export default class SignInView extends AbstractView  {
	constructor() {
		super();
		this.setTitle("satori - sign in");
	}

	getHtml(): Promise<string> {
		return fetch("static/html/signIn.html").then((res) => res.text());
	}

	loadJS(): void {
		signIn();
	}

	stopJS(): void {
		// No loop in this view
	}
}

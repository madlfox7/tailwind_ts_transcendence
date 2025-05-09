// import AbstractView from "./AbstractView.js";
// import { editProfile } from "../scripts/editProfile.js";
// // import { eventListeners } from "../scripts/editProfile.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("satori - edit profile");
//     }

//     async getHtml() {
//         return (await fetch("static/html/editProfile.html")).text();
//     }

//     loadJS() {
//         editProfile();
//     }

//     stopJS(){
// 		// No loop in this view
// 	}


//     // cleanUpEventListeners() {
//     //  for (const [event, listener] of Object.entries(eventListeners)) {
//     //      document.removeEventListener(event, listener);
//     //  }
//     // }
// // }
// // @ts-ignore
// import AbstractView from "./AbstractView.js";
// // @ts-ignore
// import { editProfile } from "../scripts/editProfile.js";
// // import { eventListeners } from "../scripts/editProfile.js";

// export default class EditProfileView extends AbstractView {
// 	constructor() {
// 		super();
// 		this.setTitle("satori - edit profile");
// 	}

// 	async getHtml(): Promise<string> {
// 		return (await fetch("static/html/editProfile.html")).text();
// 	}

// 	loadJS(): void {
// 		editProfile();
// 	}

// 	stopJS(): void {
// 		// No loop in this view
// 	}

// 	// cleanUpEventListeners(): void {
// 	// 	for (const [event, listener] of Object.entries(eventListeners)) {
// 	// 		document.removeEventListener(event, listener as EventListener);
// 	// 	}
// 	// }
// }

// ///???????????????????????


/* Edit-profile view (TypeScript)
 * Mirrors the original JS logic exactly – only type annotations added.
 */

// Runtime imports still use the compiled .js extension so the router keeps working.
import AbstractView from "./AbstractView.js";
import { editProfile /*, eventListeners*/ } from "../scripts/editProfile.js";

export default class EditProfileView extends AbstractView {
  constructor() {
    super();
    this.setTitle("satori - edit profile");
  }

  /** Fetches the static HTML fragment and returns its text. */
  async getHtml(): Promise<string> {
    const res = await fetch("static/html/editProfile.html");
    return res.text();
  }

  /** Kick-off the page-specific JS (form bindings, avatar preview, etc.). */
  loadJS(): void {
    editProfile();
  }

  /** No animation loop here, so nothing to stop. */
  stopJS(): void {}

  // Uncomment if you later expose an `eventListeners` map from editProfile.ts
  /*
  cleanUpEventListeners(): void {
    for (const [event, listener] of Object.entries(eventListeners)) {
      document.removeEventListener(event, listener as EventListener);
    }
  }
  */
}

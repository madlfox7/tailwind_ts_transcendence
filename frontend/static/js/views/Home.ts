// // import AbstractView from "./AbstractView.js";
// // // import { home } from "../scripts/home.js";

// // export default class extends AbstractView {
// //     constructor() {
// //         super();
// //         this.setTitle("satori - home");
// //     }

// //     async getHtml() {
// // 		return (await fetch("static/html/home.html")).text();
// //     }
// // }

// // @ts-ignore
// import AbstractView from "./AbstractView.js";
// // import { home } from "../scripts/home.js";

// export default class HomeView extends AbstractView {
// 	constructor() {
// 		super();
// 		this.setTitle("satori - home");
// 	}

// 	async getHtml(): Promise<string> {
// 		return (await fetch("static/html/home.html")).text();
// 	}
// 	// async getHtml(): Promise<string> {
// 	// 	try {
// 	// 		const response = await fetch("static/html/notfound.html");
// 	// 		if (!response.ok) throw new Error("Page not found");
// 	// 		return await response.text();
// 	// 	} catch (err) {
// 	// 		console.error("Failed to fetch NotFound page:", err);
// 	// 		return "<h1>404 Not Found</h1>";
// 	// 	}
// 	// }
// }
// // // //????????????????????
// import AbstractView from "./AbstractView.js";

// export default class HomeView extends AbstractView {
//   constructor() {
//     super();
//     this.setTitle("satori - home");
//   }

//   async getHtml(): Promise<string> {
//     return (await fetch("/static/html/home.html")).text();
//   }
// }
// 
// 

 import AbstractView from "./AbstractView.js";
// import { refreshTailwind } from "../refreshTailwind.js"; // Import the utility function

export default class HomeView extends AbstractView {
  constructor() {
    super();
    this.setTitle("satori - home");
  }

  async getHtml(): Promise<string> {
    // 1️⃣ Fetch the content of home.html
    const pageContent = await (await fetch("/static/html/home.html")).text();

    // 2️⃣ Inject it into #app
    const appDiv = document.querySelector("#app");
    if (appDiv) {
      appDiv.innerHTML = pageContent;
    }

    // 3️⃣ Force Tailwind to re-render the styles
    // refreshTailwind();

    // 4️⃣ Return the HTML content as a string (router expects a string)
    return pageContent;
  }
}

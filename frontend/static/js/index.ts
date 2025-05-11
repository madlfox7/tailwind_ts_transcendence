
// import Home from "./views/Home.js";
// import Pong from "./views/Pong.js";
// import Pong3d from "./views/Pong3d.js";
// import PongMenu from "./views/PongMenu.js";
// import Settings from "./views/Settings.js";
// import Pacman from "./views/Pacman.js";
// import PacmanMenu from "./views/PacmanMenu.js";
// import NotFound from "./views/NotFound.js";
// import Games from "./views/Games.js";
// import Profile from "./views/Profile.js";
// import SignIn from "./views/SignIn.js";
// import SignUp from "./views/SignUp.js";
// import EditProfile from "./views/EditProfile.js";
// import Friends from "./views/Friends.js";
// import PongStatistics from "./views/PongStatistics.js";
// import PacmanStatistics from "./views/PacmanStatistics.js";

// // ------------------------------- IMPORT VISUAL EFFECTS -------------------------------
// import { animateLetters, initLoadTransition, initInteractiveBubble } from './visual/effects.js'

// // ------------------------------- IMPORT UTILS ---------------------------------
// import { updateTexts } from "./utils/languages.js";
// import { applySettings } from "./utils/applySettings.js";
// import { attachEventListenersToLinks } from "./utils/utils.js";

// // ------------------------------- CONFIGURE GLOBAL VARIABLES -------------------------------
// export const BASE_URL: string = "";
// export const BIG_TEXT: string = '20px';
// export const DEFAULT_TEXT: string = '16px';
// export const ids: Record<string, number> = {};

// interface View {
//     getHtml: () => Promise<string>;
//     loadJS: () => void;
//     stopJS: () => void;
//     cleanUpEventListeners: () => void;
// }

// // Store the current view
// let view: View | null = null;

// // ------------------------------- THE APP STARTS HERE -------------------------------
// document.addEventListener("DOMContentLoaded", async () => {
// 	initLoadTransition();
// 	initInteractiveBubble();
// 	await applySettings();
// 	router();
// });

// // ------------------------------- ROUTING -------------------------------
// const routes: { path: string, view: new () => View }[] = [
// 	{ path: "/", view: Home },
// 	// { path: "/pong", view: Pong },
// 	// { path: "/pong3d", view: Pong3d },
// 	// { path: "/pongMenu", view: PongMenu },
// 	// { path: "/pacman", view: Pacman },
// 	// { path: "/pacmanMenu", view: PacmanMenu },
// 	// { path: "/settings", view: Settings },
// 	// { path: "/games", view: Games },
// 	// { path: "/profile", view: Profile },
// 	// { path: "/signin", view: SignIn },
// 	// { path: "/signup", view: SignUp },
// 	// { path: "/edit-profile", view: EditProfile },
// 	// { path: "/friends", view: Friends },
// 	// { path: "/pong-statistics", view: PongStatistics },
// 	// { path: "/pacman-statistics", view: PacmanStatistics },
// ];
// const router = async (): Promise<void> => {
//     let match = routes.find(route => route.path === location.pathname);

//     if (!match) {
//         match = { path: "", view: NotFound };
//     }

//     if (view) {
//         view.cleanUpEventListeners();
//         view.stopJS();

//         // Tailwind equivalent of hiding modals (if needed)
//         const modals = document.querySelectorAll('.modal.show');
//         modals.forEach(modal => {
//             modal.classList.remove('show');
//         });
//     }

//     view = new match.view();
//     const appDiv = document.querySelector("#app");
//     if (appDiv) {
//         appDiv.innerHTML = await view.getHtml();
//         view.loadJS();
//         attachEventListenersToLinks();
//         updateTexts();
//         animateLetters();
//     }
// };


// // ------------------------------- NAVIGATION -------------------------------
// export const navigateTo = (url: string): void => {
// 	history.pushState(null, "", url);
// 	router();
// };

// window.addEventListener("popstate", router);
// ------------------------------- IMPORT VIEWS -------------------------------
import Home from "./views/Home.js";
import NotFound from "./views/NotFound.js";
import Pong from "./views/Pong.js";

// ------------------------------- IMPORT VISUAL EFFECTS -------------------------------
import { animateLetters, initLoadTransition, initInteractiveBubble } from './visual/effects.js';

// ------------------------------- IMPORT UTILS ---------------------------------
import { updateTexts } from "./utils/languages.js";
import { applySettings } from "./utils/applySettings.js";
import { attachEventListenersToLinks } from "./utils/utils.js";

// ------------------------------- CONFIGURE GLOBAL VARIABLES -------------------------------
export const BASE_URL: string = "";
export const BIG_TEXT: string = '20px';
export const DEFAULT_TEXT: string = '16px';
export const ids: Record<string, number> = {};

interface View {
    getHtml: () => Promise<string>;
    loadJS: () => void;
    stopJS: () => void;
    cleanUpEventListeners: () => void;
}

// ------------------------------- ROUTES -------------------------------
const routes: { path: string, view: new () => View }[] = [
	{ path: "/", view: Home },
	{ path: "/404", view: NotFound },
    { path: "/pong", view: Pong }
];

// ------------------------------- GLOBAL VIEW REFERENCE -------------------------------
let view: View | null = null;

//
// ============================== TAILWIND REFRESH ==============================
//
function refreshTailwind() {
    const elements = document.querySelectorAll("#app *");
    elements.forEach((el) => {
        const currentClasses = el.className;
        el.className = currentClasses;
    });
}

//
// ============================== MODAL CLEANUP ==============================
//
function hideModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

//
// ============================== ROUTER LOGIC ==============================
//
const router = async (): Promise<void> => {
    let match = routes.find(route => route.path === location.pathname);

    // ✅ 404 Fallback
    if (!match) {
        console.warn(`Route not found: ${location.pathname}`);
        match = { path: "/404", view: NotFound };
    }

    // ✅ Cleanup existing view if it exists
    if (view) {
        view.cleanUpEventListeners();
        view.stopJS();
        hideModals();
    }

    // ✅ Instantiate the new view
    view = new match.view();

    // ✅ Find the #app container and inject HTML
    const appDiv = document.querySelector("#app");
    if (appDiv) {
        appDiv.innerHTML = await view.getHtml();

        // ✅ Load scripts and event listeners
        view.loadJS();
        attachEventListenersToLinks();
        updateTexts();
        animateLetters();

        // ✅ Refresh Tailwind
        refreshTailwind();
    }
};

//
// ============================== NAVIGATION FUNCTION ==============================
//
export const navigateTo = (url: string): void => {
	history.pushState(null, "", url);
	router();
};

//
// ============================== PAGE LOAD LISTENER ==============================
//
document.addEventListener("DOMContentLoaded", async () => {
	initLoadTransition();
	initInteractiveBubble();
	await applySettings();
	router();
});

//
// ============================== POPSTATE LISTENER ==============================
//
window.addEventListener("popstate", router);

// All close buttons were removed. The modal can be closed by clicking outside of it.
// Here is the button div just in case though:

// with an icon
{/* <div class="col-12 d-flex justify-content-center mt-4 mb-3">
	<button type="button" class="btn btn-lg text-white text-center d-flex align-items-center justify-content-center p-3" data-bs-dismiss="modal" aria-p="Close"><img src="static/assets/UI/icons/cross.svg" alt="close" id="close-button" width="16"></button>
</div> */}

// with text
{/* <div class="col-12 d-flex justify-content-center mt-1">
	<button type="button" class="btn btn-lg text-white" data-bs-dismiss="modal" aria-p="Close">Close</button>
</div> */}

//@ts-ignore
import { updateTexts } from "../utils/languages.js";
//@ts-ignore
import { updateTextForElem, getText } from "../utils/languages.js";
//@ts-ignore
import { updateTexts, updateTextForElem, getText } from "../utils/languages.js";

export let eventListeners: { [event: string]: EventListenerOrEventListenerObject } = {};


/////////////////////
const  showColorSchemeConfigHTML = `
			<div class="modal-header">
				<h2 class="modal-title text-white w-100 text-center" data-translate="theme">themes</h2>
			</div>
			<div class="modal-body">
				<div class="col-12 justify-content-center">
					<div class="row justify-content-center text-center mt-2 mb-3">
						<div class="row justify-content-center text-center">
							<div class="col-3 d-flex flex-column align-items-center">
								<p class="h4 text-white" data-translate="obsidian">obsidian</p>
								<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/obsidian.png" id="pObsidian" alt="A map that has the color of obsidian." tabindex="0"/>
							</div>
							<div class="col-3 d-flex flex-column align-items-center">
								<p class="h4 text-white" data-translate="autumn">autumn</p>
								<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/autumn.png" id="pAutumn" alt="A map that has the color of autumn." tabindex="0"/>
							</div>
							<div class="col-3 d-flex flex-column align-items-center">
								<p class="h4 text-white" data-translate="garden">garden</p>
								<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/garden.png" id="pGarden" alt="A map that has the color of a garden." tabindex="0"/>
							</div>
							<div class="col-3 d-flex flex-column align-items-center">
								<p class="h4 text-white" data-translate="retro">retro</p>
								<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/retro.png" id="pRetro" alt="A map that has the color of the retro pac-man." tabindex="0"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

const showMapConfigHTML = `
			<div class="modal-header">
				<h2 class="modal-title text-white w-100 text-center" data-translate="map">maps</h2>
			</div>
			<div class="modal-body p-4 pt-4 pb-4">
				<div class="col-auto mr-1 ml-1">
					<div class="row justify-content-center text-center mb-4">
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="maze">maze</p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/maze.png" id="pMaze" alt="A map that has the form of a maze." tabindex="0"/>
						</div>
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="spiral">spiral</p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/spiral.png" id="pSpiral" alt="A map that has the form of a spiral." tabindex="0"/>
						</div>
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="butterfly">butterfly</p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/butterfly.png" id="pButterfly" alt="A map that has the form of a butterfly." tabindex="0"/>
						</div>
					</div>
					<div class="row justify-content-center text-center">
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="battlefield"></p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/battlefield.png" id="pBattlefield" alt="A map that looks like a battlefield." tabindex="0"/>
						</div>
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="trench"></p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/trench.png" id="pTrench" alt="A map that has a trench." tabindex="0"/>
						</div>
						<div class="col-4 d-flex flex-column align-items-center">
							<p class="h4 text-white" data-translate="flower"></p>
							<img class="img-fluid clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" role="button" src="/static/assets/pacman/images/flower.png" id="pFlower" alt="A map that looks like a flower." tabindex="0"/>
						</div>
					</div>
				</div>
			</div>
		`;
const showGamemodeConfigHTML = `
			<div class="modal-header">
				<h2 class="modal-title text-white w-100 text-center" data-translate="gamemode">gamemodes</h2>
			</div>
			<div class="modal-body">
				<div class="col-auto mr-2 ml-3">
					<div class="row justify-content-center text-center mt-2 mb-1">
						<div class="col-4 d-flex justify-content-center">
							<button role="button" class="btn btn-lg text-white btn-filled" id="btnObjective" data-translate="objective"></button>
						</div>
						<div class="col-4 d-flex justify-content-center">
							<button role="button" class="btn btn-lg text-white btn-filled" id="btnEndless" data-translate="endless"></button>
						</div>
						<div class="col-10 mt-4 mb-3">
							<p class="text-white" id="gamemodeDescription"></p>
						</div>
						<div id="rangeContainer">
						</div>
					</div>
				</div>
			</div>
		`;

const showPacmanSkinConfigHTML = `
			<div class="modal-header">
				<h2 class="modal-title text-white w-100 text-center" data-translate="pacman-skin">pacman skins</h2>
			</div>
			<div class="modal-body">
				<div class="modal-body">
				 <div class="row justify-content-center mt-2 mb-1">
					<div class="col-10 d-flex justify-content-center">
						<div class="d-flex justify-content-between w-100">
							<img class="clickable" role="button" tabindex="0" width="64px" id="pPacmanSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/pac-man_high_res.png" alt="An image of pac-man." text="Pacman">
							<img class="clickable" role="button" tabindex="0" width="64px" id="pPacWomanSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/pac-woman_high_res.png" alt="An image of pac-girl.">
							<img class="clickable" role="button" tabindex="0" width="64px" id="pPacMIBSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/pac-MIB_high_res.png" alt="An image of Pac-Man-In-Black.">
							<img class="clickable" role="button" tabindex="0" width="64px" id="pPacventurerSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/pac-venturer_high_res.png" alt="An image of pac-venturer.">
						</div>
					</div>
				</div>
				<div class="row justify-content-center"> 
					<div class="col-10 mt-3">
						<p class="h3 text-white text-center mb-3 mt-1" id="pacmanTitle">pac-man</p>
						<hr class="text-white">
						<div class="col-12 mb-1">
							<p class="h5 text-left text-white fw-bold" id="pacmanTitle1" style="display: inline; vertical-align: middle;">Title</p>
							<img src="/static/assets/UI/icons/time.svg" style="width: 22px; margin-left:5px;  margin-right: -8px; vertical-align: middle;" alt="Clock Icon"/>
							<p id="cooldown" class="h5 text-white" style="display: inline; vertical-align: middle;">00:00</p>
						</div>
						<p class="text-white text-left lh-sm" id="pacmanDesc1" style="min-height: 4em; line-height: 1;">Description 1</p>
						<p class="h5 text-white text-left fw-bold mb-1 mt-1" id="pacmanTitle2">Title 2</p>
						<p class="text-white text-left lh-sm" style="min-height: 4em; line-height: 1;" id="pacmanDesc2">Description 2</p>
					</div>
				</div>
			</div>
		`;
		export const buildShowKeysConfigHtml = (usernames: { pacman: string; ghost: string }, keybinds: { [key: string]: string }): string => {
			return `
			<div class="row justify-content-center">
				<div class="modal-header">
					<h2 class="modal-title text-white w-100 text-center" data-translate="keybinds-settings">keybinds settings</h2>
				</div>
				<div class="modal-body">
					<div class="col-12 d-flex justify-content-center">
						<div class="col-6">
							<div class="row justify-content-center text-center mt-2">
								<p class="h3 text-white">${usernames.pacman}</p>
							</div>
							<!-- And use keybinds.pUp, keybinds.pLeft etc. -->
							<div class="row justify-content-center text-center mt-2">
								<div class="col-6 d-flex justify-content-end">
									<p class="text-white" data-translate="move-up">move up</p>
								</div>
								<div class="col-6 d-flex justify-content-start">
									<p role="button" tabindex="0" class="text-white clickable" id="pUp">${keybinds.pUp || "none"}</p>
								</div>
							</div>
							<!-- Same for others -->
						</div>
						<div class="col-6">
							<div class="row justify-content-center text-center mt-2">
								<p class="h3 text-white">${usernames.ghost}</p>
							</div>
							<!-- And ghost keybinds -->
						</div>
					</div>
				</div>
			</div>
			`;
		};
		
const ghostSkinConfigHtml = `
	<div class="modal-header">
		<h2 class="modal-title text-white w-100 text-center" data-translate="ghost-skin">ghost skins</h2>
	</div>
	<div class="modal-body">
		<!-- all your inner HTML here -->
		<div class="row justify-content-center mt-2 mb-1">
			<div class="col-10 d-flex justify-content-center">
				<div class="d-flex justify-content-between w-100">
					<img class="clickable" role="button" tabindex="0" width="64px" id="pBlueGhostSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/blue-ghost_high_res.png" alt="An image of a blue ghost.">
					<img class="clickable" role="button" tabindex="0" width="64px" id="pOrangeGhostSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/orange-ghost_high_res.png" alt="An image of an orange ghost.">
					<img class="clickable" role="button" tabindex="0" width="64px" id="pPinkGhostSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/pink-ghost_high_res.png" alt="An image of a pink ghost.">
					<img class="clickable" role="button" tabindex="0" width="64px" id="pGreenGhostSkin" style="border: 1px solid white; padding: 5px; border-radius: 5px;" src="/static/assets/pacman/images/green-ghost_high_res.png" alt="An image of a green ghost.">
				</div>
			</div>
		</div>
		<div class="row justify-content-center"> 
			<div class="col-10 mt-3">
				<p class="h3 text-white text-center mb-3 mt-1" id="ghostTitle">blue ghost</p>
				<hr class="text-white">
				<div class="col-12 mb-1">
					<p class="h5 text-left text-white fw-bold" id="ghostTitle1" style="display: inline; vertical-align: middle;">Title</p>
					<img src="/static/assets/UI/icons/time.svg" style="width: 22px; margin-left:5px;  margin-right: -8px; vertical-align: middle;" alt="Clock Icon"/>
					<p id="cooldown" class="h5 text-white" style="display: inline; vertical-align: middle;">00:00</p>
				</div>
				<p class="text-white text-left lh-sm" id="ghostDesc1" style="min-height: 4em; line-height: auto;">Description 1</p>
				<p class="h5 text-white text-left fw-bold mb-1" id="ghostTitle2">Title 2</p>
				<p class="text-white text-left lh-sm" style="min-height: 4em; line-height: auto;" id="ghostDesc2">Description 2</p>
			</div>
		</div>
	</div>
`;

declare namespace bootstrap {
	class Modal {
		constructor(element: HTMLElement, options?: any);
		show(): void;
		hide(): void;
		toggle(): void;
	}

	class Toast {
		constructor(element: HTMLElement, options?: any);
		show(): void;
		hide(): void;
		static getOrCreateInstance(element: HTMLElement): Toast;
	}
}

export class PacmanMenu {
	// Fields
	keysButton!: HTMLElement;
	pSkinButton!: HTMLElement;
	gSkinButton!: HTMLElement;
	gamemodeButton!: HTMLElement;
	mapButton!: HTMLElement;
	colorButton!: HTMLElement;
	settingsModal!: bootstrap.Modal;
	settingsModalContent!: HTMLElement;
	swapButton!: HTMLElement;
	pacmanUsernameLabel!: HTMLElement;
	pacmanInput!: HTMLInputElement;
	ghostUsernameLabel!: HTMLElement;
	ghostInput!: HTMLInputElement;
	imgCurrentPacSkin!: HTMLImageElement;
	imgCurrentGhostSkin!: HTMLImageElement;
	toastNotification!: HTMLElement;
	toastBootstrap!: bootstrap.Toast;
	toastBody!: HTMLElement;
	toastValue!: HTMLElement;
	boundKeyDownSettings!: (event: KeyboardEvent) => void;

	waitForKey: boolean = false;
	waitingKey: string = "";

	usernames!: { pacman: string; ghost: string };
	pacmanSkin!: string;
	ghostSkin!: string;
	gamemode!: string;
	objective!: string;
	mapName!: string;
	theme!: {
		name: string;
		backgroundColor: string;
		ghostWallColor1: string;
		ghostWallColor2: string;
		wallColor: string;
		dotColor: string;
		glowColor: string;
	};
	keybinds!: { [key: string]: string };
	oldKeys!: { [key: string]: string };

	constructor() {
		// DOM Elements
		this.keysButton = document.getElementById('btnKeys') as HTMLElement;
		this.pSkinButton = document.getElementById('btnPSkin') as HTMLElement;
		this.gSkinButton = document.getElementById('btnGSkin') as HTMLElement;
		this.gamemodeButton = document.getElementById('btnGamemode') as HTMLElement;
		this.mapButton = document.getElementById('btnMap') as HTMLElement;
		this.colorButton = document.getElementById('btnColor') as HTMLElement;
		this.settingsModal = new bootstrap.Modal(document.getElementById('settingsModal') as HTMLElement);
		this.settingsModalContent = document.getElementById('settingsModalContent') as HTMLElement;
		this.swapButton = document.getElementById('btnSwap') as HTMLElement;
		this.pacmanUsernameLabel = document.getElementById('pacmanName') as HTMLElement;
		this.pacmanInput = document.getElementById('pacmanInput') as HTMLInputElement;
		this.ghostUsernameLabel = document.getElementById('ghostName') as HTMLElement;
		this.ghostInput = document.getElementById('ghostInput') as HTMLInputElement;
		this.imgCurrentPacSkin = document.getElementById('imgCurrentPacSkin') as HTMLImageElement;
		this.imgCurrentGhostSkin = document.getElementById('imgCurrentGhostSkin') as HTMLImageElement;
		this.toastNotification = document.getElementById('liveToast') as HTMLElement;
		this.toastBootstrap = bootstrap.Toast.getOrCreateInstance(this.toastNotification);
		this.toastBody = document.getElementById('toastBody') as HTMLElement;
		this.toastValue = document.getElementById('toastValue') as HTMLElement;
		this.boundKeyDownSettings = this.keyDownSettings.bind(this);

		// State
		const usernamesString = localStorage.getItem('pacmanUsernames');
		this.usernames = usernamesString ? JSON.parse(usernamesString) : { pacman: "Player1", ghost: "Player2" };

		this.pacmanUsernameLabel.textContent = this.usernames.pacman;
		this.ghostUsernameLabel.textContent = this.usernames.ghost;

		const pacmanSkinString = localStorage.getItem('pacmanSkin');
		this.pacmanSkin = pacmanSkinString ? JSON.parse(pacmanSkinString) : "pac-man";

		const ghostSkinString = localStorage.getItem('ghostSkin');
		this.ghostSkin = ghostSkinString ? JSON.parse(ghostSkinString) : "blue-ghost";

		const gamemodeString = localStorage.getItem('pacmanGamemode');
		this.gamemode = gamemodeString ? JSON.parse(gamemodeString) : "objective";

		const objectiveString = localStorage.getItem('objective');
		this.objective = objectiveString ? JSON.parse(objectiveString) : "10000";

		const mapNameString = localStorage.getItem('mapName');
		this.mapName = mapNameString ? JSON.parse(mapNameString) : "maze";

		const themeString = localStorage.getItem('pacmanTheme');
		this.theme = themeString
			? JSON.parse(themeString)
			: {
				name: 'obsidian',
				backgroundColor: 'rgb(10, 0, 20)',
				ghostWallColor1: 'rgb(110, 55, 225)',
				ghostWallColor2: 'rgb(75, 20, 200)',
				wallColor: 'rgb(60, 0, 120)',
				dotColor: 'rgb(105,55,165)',
				glowColor: 'rgb(145,85,210)'
			};

		const keybindsString = localStorage.getItem('pacmanKeybinds');
		this.keybinds = keybindsString
			? JSON.parse(keybindsString)
			: {
				pUp: 'KeyW', pLeft: 'KeyA', pDown: 'KeyS', pRight: 'KeyD', pSpell: 'KeyE',
				gUp: 'ArrowUp', gLeft: 'ArrowLeft', gDown: 'ArrowDown', gRight: 'ArrowRight', gSpell: 'Numpad0'
			};

		// DOM Event Listeners
		this.swapButton.addEventListener('click', () => this.swapPlayers());
		this.pacmanInput.addEventListener('keypress', (event: KeyboardEvent) => this.pacmanPlayerInputHandle(event));
		this.pacmanInput.addEventListener('blur', (event: FocusEvent) => this.pacmanPlayerInputHandle(event));
		this.ghostInput.addEventListener('keypress', (event: KeyboardEvent) => this.ghostPlayerInputHandle(event));
		this.ghostInput.addEventListener('blur', (event: FocusEvent) => this.ghostPlayerInputHandle(event));

		localStorage.setItem('pacmanSkin', JSON.stringify(this.pacmanSkin));
		localStorage.setItem('ghostSkin', JSON.stringify(this.ghostSkin));
		localStorage.setItem('pacmanGamemode', JSON.stringify(this.gamemode));
		localStorage.setItem('mapName', JSON.stringify(this.mapName));
		localStorage.setItem('pacmanKeybinds', JSON.stringify(this.keybinds));
		localStorage.setItem('pacmanTheme', JSON.stringify(this.theme));
		localStorage.setItem('themeName', this.theme.name);

		this.setPacmanSkinImage();
		this.setGhostSkinImage();

		this.keysButton.addEventListener("click", () => this.showKeysConfig());
		this.pSkinButton.addEventListener("click", () => this.showPacmanSkinConfig());
		this.gSkinButton.addEventListener("click", () => this.showGhostSkinConfig());
		this.gamemodeButton.addEventListener("click", () => this.showGamemodeConfig());
		this.mapButton.addEventListener("click", () => this.showMapConfig());
		this.colorButton.addEventListener("click", () => this.showColorSchemeConfig());

		document.addEventListener("keydown", (event) => this.boundKeyDownSettings(event as KeyboardEvent));
		eventListeners["keydown"] = (event: Event) => this.boundKeyDownSettings(event as KeyboardEvent);

	}


	pacmanPlayerInputHandle(event: KeyboardEvent | FocusEvent): void {
		if (((event.type === 'keypress' && (event as KeyboardEvent).key === 'Enter') || event.type === 'blur') && this.pacmanInput!.value !== "") {
			this.usernames.pacman = this.pacmanInput!.value;
			this.pacmanInput!.value = ""; // Clear the input box
			this.pacmanUsernameLabel!.textContent = this.usernames.pacman;
	
			updateTextForElem(this.toastBody!, "pacman-username-changed");
			this.toastValue!.textContent = this.usernames.pacman;
			this.toastBootstrap.show();
	
			localStorage.setItem('pacmanUsernames', JSON.stringify(this.usernames));
		}
	}
	
	ghostPlayerInputHandle(event: KeyboardEvent | FocusEvent): void {
		if (((event.type === 'keypress' && (event as KeyboardEvent).key === 'Enter') || event.type === 'blur') && this.ghostInput!.value !== "") {
			this.usernames.ghost = this.ghostInput!.value;
			this.ghostInput!.value = ""; // Clear the input box
			this.ghostUsernameLabel!.textContent = this.usernames.ghost;
	
			updateTextForElem(this.toastBody!, "ghost-username-changed");
			this.toastValue!.textContent = this.usernames.ghost;
			this.toastBootstrap.show();
	
			localStorage.setItem('pacmanUsernames', JSON.stringify(this.usernames));
		}
	}
	
	showKeysConfig(): void {
		//this.settingsModalContent!.innerHTML = showKeysConfigHtml;
		this.settingsModalContent!.innerHTML = buildShowKeysConfigHtml(this.usernames, this.keybinds);
		const btnPUp = document.getElementById('pUp') as HTMLElement;
		const btnPLeft = document.getElementById('pLeft') as HTMLElement;
		const btnPDown = document.getElementById('pDown') as HTMLElement;
		const btnPRight = document.getElementById('pRight') as HTMLElement;
		const btnPSpell = document.getElementById('pSpell') as HTMLElement;
		const btnGUp = document.getElementById('gUp') as HTMLElement;
		const btnGLeft = document.getElementById('gLeft') as HTMLElement;
		const btnGDown = document.getElementById('gDown') as HTMLElement;
		const btnGRight = document.getElementById('gRight') as HTMLElement;
		const btnGSpell = document.getElementById('gSpell') as HTMLElement;
	
		const addEventListeners = (button: HTMLElement, action: string): void => {
			button.addEventListener("click", (event: MouseEvent) => this.changeKeybind(event, action, button));
			button.addEventListener("keydown", (event: KeyboardEvent) => {
				if (event.key === "Enter") {
					// wait for the next key press using settimeout
					setTimeout(() => {
						this.changeKeybind(event, action, button);
					}, 100);
				}
			});
		};
	
		addEventListeners(btnPUp, "pUp");
		addEventListeners(btnPLeft, "pLeft");
		addEventListeners(btnPDown, "pDown");
		addEventListeners(btnPRight, "pRight");
		addEventListeners(btnPSpell, "pSpell");
		addEventListeners(btnGUp, "gUp");
		addEventListeners(btnGLeft, "gLeft");
		addEventListeners(btnGDown, "gDown");
		addEventListeners(btnGRight, "gRight");
		addEventListeners(btnGSpell, "gSpell");
	
		this.settingsModal.show();
		updateTexts();
	}
	
	showPacmanSkinConfig(): void {
		this.settingsModalContent!.innerHTML = showPacmanSkinConfigHTML;
	
		const btnPacmanSkin = document.getElementById('pPacmanSkin') as HTMLElement;
		const btnPacWomanSkin = document.getElementById('pPacWomanSkin') as HTMLElement;
		const btnPacMIBSkin = document.getElementById('pPacMIBSkin') as HTMLElement;
		const btnPacventurerSkin = document.getElementById('pPacventurerSkin') as HTMLElement;
		const cooldown = document.getElementById('cooldown') as HTMLElement;
		const pacmanTitle = document.getElementById('pacmanTitle') as HTMLElement;
		const pacmanTitle1 = document.getElementById('pacmanTitle1') as HTMLElement;
		const pacmanDesc1 = document.getElementById('pacmanDesc1') as HTMLElement;
		const pacmanTitle2 = document.getElementById('pacmanTitle2') as HTMLElement;
		const pacmanDesc2 = document.getElementById('pacmanDesc2') as HTMLElement;
	
		this.addEventListeners(btnPacmanSkin, (event) => this.selectPacmanSkin(event, "pac-man"));
		this.addEventListeners(btnPacWomanSkin, (event) => this.selectPacmanSkin(event, "pac-woman"));
		this.addEventListeners(btnPacMIBSkin, (event) => this.selectPacmanSkin(event, "pac-MIB"));
		this.addEventListeners(btnPacventurerSkin, (event) => this.selectPacmanSkin(event, "pac-venturer"));
	
		switch (this.pacmanSkin) {
			case "pac-man":
				updateTextForElem(pacmanTitle, "pac-man-name");
				updateTextForElem(pacmanTitle1, "pac-man-passive");
				updateTextForElem(pacmanDesc1, "pac-man-passive-desc");
				updateTextForElem(pacmanTitle2, "pac-man-frenzy");
				updateTextForElem(pacmanDesc2, "pac-man-frenzy-desc");
				cooldown.textContent = "17";
				break;
			case "pac-woman":
				updateTextForElem(pacmanTitle, "pac-woman-name");
				updateTextForElem(pacmanTitle1, "pac-woman-active");
				updateTextForElem(pacmanDesc1, "pac-woman-active-desc");
				updateTextForElem(pacmanTitle2, "pac-woman-passive");
				updateTextForElem(pacmanDesc2, "pac-woman-passive-desc");
				cooldown.textContent = "25";
				break;
			case "pac-MIB":
				updateTextForElem(pacmanTitle, "pac-MIB-name");
				updateTextForElem(pacmanTitle1, "pac-MIB-active");
				updateTextForElem(pacmanDesc1, "pac-MIB-active-desc");
				updateTextForElem(pacmanTitle2, "pac-MIB-passive");
				updateTextForElem(pacmanDesc2, "pac-MIB-passive-desc");
				cooldown.textContent = "20";
				break;
			case "pac-venturer":
				updateTextForElem(pacmanTitle, "pac-venturer-name");
				updateTextForElem(pacmanTitle1, "pac-venturer-active");
				updateTextForElem(pacmanDesc1, "pac-venturer-active-desc");
				updateTextForElem(pacmanTitle2, "pac-venturer-passive");
				updateTextForElem(pacmanDesc2, "pac-venturer-passive-desc");
				cooldown.textContent = "12";
				break;
		}
	
		const pacmanSkins: { [key: string]: HTMLElement } = {
			"pac-man": btnPacmanSkin,
			"pac-woman": btnPacWomanSkin,
			"pac-MIB": btnPacMIBSkin,
			"pac-venturer": btnPacventurerSkin
		};
		this.applySelectedSetting("pacmanSkin", pacmanSkins);
	
		this.settingsModal.show();
		updateTexts();
	}
	//////




	showGhostSkinConfig(): void {
		this.settingsModalContent!.innerHTML = ghostSkinConfigHtml;
	
		const btnBlueSkin = document.getElementById('pBlueGhostSkin') as HTMLElement;
		const btnOrangeSkin = document.getElementById('pOrangeGhostSkin') as HTMLElement;
		const btnPinkSkin = document.getElementById('pPinkGhostSkin') as HTMLElement;
		const btnGreenSkin = document.getElementById('pGreenGhostSkin') as HTMLElement;
		const cooldown = document.getElementById('cooldown') as HTMLElement;
		const ghostTitle = document.getElementById('ghostTitle') as HTMLElement;
		const ghostTitle1 = document.getElementById('ghostTitle1') as HTMLElement;
		const ghostDesc1 = document.getElementById('ghostDesc1') as HTMLElement;
		const ghostTitle2 = document.getElementById('ghostTitle2') as HTMLElement;
		const ghostDesc2 = document.getElementById('ghostDesc2') as HTMLElement;
	
		this.addEventListeners(btnBlueSkin, (event) => this.selectGhostSkin(event, "blue-ghost"));
		this.addEventListeners(btnOrangeSkin, (event) => this.selectGhostSkin(event, "orange-ghost"));
		this.addEventListeners(btnPinkSkin, (event) => this.selectGhostSkin(event, "pink-ghost"));
		this.addEventListeners(btnGreenSkin, (event) => this.selectGhostSkin(event, "green-ghost"));
	
		switch (this.ghostSkin) {
			case "blue-ghost":
				updateTextForElem(ghostTitle, "blue-ghost-name");
				updateTextForElem(ghostTitle1, "blue-ghost-active");
				updateTextForElem(ghostDesc1, "blue-ghost-active-desc");
				updateTextForElem(ghostTitle2, "blue-ghost-passive");
				updateTextForElem(ghostDesc2, "blue-ghost-passive-desc");
				cooldown.textContent = "5";
				break;
			case "orange-ghost":
				updateTextForElem(ghostTitle, "orange-ghost-name");
				updateTextForElem(ghostTitle1, "orange-ghost-active");
				updateTextForElem(ghostDesc1, "orange-ghost-active-desc");
				updateTextForElem(ghostTitle2, "orange-ghost-passive");
				updateTextForElem(ghostDesc2, "orange-ghost-passive-desc");
				cooldown.textContent = "20";
				break;
			case "pink-ghost":
				updateTextForElem(ghostTitle, "pink-ghost-name");
				updateTextForElem(ghostTitle1, "pink-ghost-active");
				updateTextForElem(ghostDesc1, "pink-ghost-active-desc");
				updateTextForElem(ghostTitle2, "pink-ghost-effect");
				updateTextForElem(ghostDesc2, "pink-ghost-effect-desc");
				cooldown.textContent = "25";
				break;
			case "green-ghost":
				updateTextForElem(ghostTitle, "green-ghost-name");
				updateTextForElem(ghostTitle1, "green-ghost-active");
				updateTextForElem(ghostDesc1, "green-ghost-active-desc");
				updateTextForElem(ghostTitle2, "green-ghost-passive");
				updateTextForElem(ghostDesc2, "green-ghost-passive-desc");
				cooldown.textContent = "25";
				break;
		}
	
		const ghostSkins: { [key: string]: HTMLElement } = {
			"blue-ghost": btnBlueSkin,
			"orange-ghost": btnOrangeSkin,
			"pink-ghost": btnPinkSkin,
			"green-ghost": btnGreenSkin
		};
		this.applySelectedSetting("ghostSkin", ghostSkins);
	
		this.settingsModal.show();
		updateTexts();
	}
	
	showGamemodeConfig(): void {
		this.settingsModalContent!.innerHTML = showGamemodeConfigHTML;
	
		const btnObjective = document.getElementById('btnObjective') as HTMLElement;
		const btnEndless = document.getElementById('btnEndless') as HTMLElement;
		const pDescription = document.getElementById('gamemodeDescription') as HTMLElement;
		const rangeContainer = document.getElementById('rangeContainer') as HTMLElement;
	
		btnObjective.addEventListener("click", (event) => this.selectGamemode(event, "objective"));
		btnEndless.addEventListener("click", (event) => this.selectGamemode(event, "endless"));
	
		switch (this.gamemode) {
			case "objective":
				updateTextForElem(pDescription, "objective-description");
				rangeContainer.innerHTML = `
					<div class="col-12 d-flex justify-content-center align-items-center mb-2">
						<p for="rangeInput" class="text-white h5 mb-0" id="rangeLabel" style="margin-right: 10px;">Label</p>
						<input type="range" class="form-range clickable" style="width: 70%;" min="1000" max="30000" step="1000" id="rangeInput">
					</div>
				`;
	
				const rangeInput = document.getElementById('rangeInput') as HTMLInputElement;
				const rangeLabel = document.getElementById('rangeLabel') as HTMLElement;
	
				rangeLabel.textContent = this.objective;
				rangeInput.value = this.objective;
				localStorage.setItem('objective', JSON.stringify(this.objective));
	
				rangeInput.addEventListener('input', (event) => {
					const input = event.target as HTMLInputElement;
					rangeLabel.textContent = input.value;
					this.objective = input.value;
					localStorage.setItem('objective', JSON.stringify(this.objective));
				});
				break;
	
			case "endless":
				updateTextForElem(pDescription, "endless-description");
				break;
	
			default:
				break;
		}
	
		this.settingsModal.show();
	
		const gamemodes: { [key: string]: HTMLElement } = {
			"objective": btnObjective,
			"endless": btnEndless
		};
		this.applySelectedSetting("pacmanGamemode", gamemodes);
		updateTexts();
	}

	
	showMapConfig(): void {
		this.settingsModalContent!.innerHTML = showMapConfigHTML;
	
		const btnMaze = document.getElementById('pMaze') as HTMLElement;
		const btnSpiral = document.getElementById('pSpiral') as HTMLElement;
		const btnButterfly = document.getElementById('pButterfly') as HTMLElement;
		const btnBattlefield = document.getElementById('pBattlefield') as HTMLElement;
		const btnTrench = document.getElementById('pTrench') as HTMLElement;
		const btnFlower = document.getElementById('pFlower') as HTMLElement;
	
		this.addEventListeners(btnMaze, (event) => this.selectMap(event, "maze"));
		this.addEventListeners(btnSpiral, (event) => this.selectMap(event, "spiral"));
		this.addEventListeners(btnButterfly, (event) => this.selectMap(event, "butterfly"));
		this.addEventListeners(btnBattlefield, (event) => this.selectMap(event, "battlefield"));
		this.addEventListeners(btnTrench, (event) => this.selectMap(event, "trench"));
		this.addEventListeners(btnFlower, (event) => this.selectMap(event, "flower"));
	
		const maps: { [key: string]: HTMLElement } = {
			maze: btnMaze,
			spiral: btnSpiral,
			butterfly: btnButterfly,
			battlefield: btnBattlefield,
			trench: btnTrench,
			flower: btnFlower
		};
	
		this.applySelectedSetting("mapName", maps);
	
		this.settingsModal.show();
		updateTexts();
	}
	
	showColorSchemeConfig(): void {
		this.settingsModalContent!.innerHTML = showColorSchemeConfigHTML;
	
		const btnObsidian = document.getElementById('pObsidian') as HTMLElement;
		const btnAutumn = document.getElementById('pAutumn') as HTMLElement;
		const btnGarden = document.getElementById('pGarden') as HTMLElement;
		const btnRetro = document.getElementById('pRetro') as HTMLElement;
	
		this.addEventListeners(btnObsidian, (event) => this.selectTheme(event, "obsidian"));
		this.addEventListeners(btnAutumn, (event) => this.selectTheme(event, "autumn"));
		this.addEventListeners(btnGarden, (event) => this.selectTheme(event, "garden"));
		this.addEventListeners(btnRetro, (event) => this.selectTheme(event, "retro"));
	
		const themes: { [key: string]: HTMLElement } = {
			obsidian: btnObsidian,
			autumn: btnAutumn,
			garden: btnGarden,
			retro: btnRetro
		};
	
		this.applySelectedSetting("themeName", themes);
	
		this.settingsModal.show();
		updateTexts();
	}
	
	swapPlayers(): void {
		const tmpUsername = this.usernames.pacman;
		this.usernames.pacman = this.usernames.ghost;
		this.usernames.ghost = tmpUsername;
	
		localStorage.setItem('pacmanUsernames', JSON.stringify(this.usernames));
	
		this.pacmanUsernameLabel!.textContent = this.usernames.pacman;
		this.ghostUsernameLabel!.textContent = this.usernames.ghost;
	
		this.oldKeys = this.keybinds;
		this.keybinds = {
			pUp: this.oldKeys.gUp,
			pLeft: this.oldKeys.gLeft,
			pDown: this.oldKeys.gDown,
			pRight: this.oldKeys.gRight,
			pSpell: this.oldKeys.gSpell,
			gUp: this.oldKeys.pUp,
			gLeft: this.oldKeys.pLeft,
			gDown: this.oldKeys.pDown,
			gRight: this.oldKeys.pRight,
			gSpell: this.oldKeys.pSpell
		};
	
		localStorage.setItem('pacmanKeybinds', JSON.stringify(this.keybinds));
	
		updateTextForElem(this.toastBody!, "swapped-usernames");
		this.toastValue!.textContent = "";
		this.toastBootstrap.show();
	}
	
	selectPacmanSkin(event: Event, skin: string): void {
		updateTextForElem(this.toastBody!, "chosen-pacman");
		//this.toastValue!.textContent = getText(skin + "-name");
		this.toastValue!.textContent = getText(skin + "-name") ?? "";

		this.toastBootstrap.show();
	
		this.pacmanSkin = skin;
		localStorage.setItem('pacmanSkin', JSON.stringify(this.pacmanSkin));
	
		const pacmanSkins: { [key: string]: HTMLElement } = {
			"pac-man": document.getElementById('pPacmanSkin') as HTMLElement,
			"pac-woman": document.getElementById('pPacWomanSkin') as HTMLElement,
			"pac-MIB": document.getElementById('pPacMIBSkin') as HTMLElement,
			"pac-venturer": document.getElementById('pPacventurerSkin') as HTMLElement
		};
	
		this.applySelectedSetting("pacmanSkin", pacmanSkins);
		this.setPacmanSkinImage();
		this.showPacmanSkinConfig();
	}
	

	selectGhostSkin(event: Event, skin: string): void {
		updateTextForElem(this.toastBody!, "chosen-ghost");
		//this.toastValue!.textContent = getText(skin + "-name");
		this.toastValue!.textContent = getText(skin + "-name") ?? "";

		this.toastBootstrap.show();
		this.ghostSkin = skin;
		localStorage.setItem('ghostSkin', JSON.stringify(this.ghostSkin));
	
		const ghostSkins: { [key: string]: HTMLElement } = {
			"blue-ghost": document.getElementById('pBlueGhostSkin') as HTMLElement,
			"orange-ghost": document.getElementById('pOrangeGhostSkin') as HTMLElement,
			"pink-ghost": document.getElementById('pPinkGhostSkin') as HTMLElement,
			"green-ghost": document.getElementById('pGreenGhostSkin') as HTMLElement
		};
		this.applySelectedSetting("ghostSkin", ghostSkins);
		this.setGhostSkinImage();
		this.showGhostSkinConfig();
	}
	
	setPacmanSkinImage(): void {
		this.imgCurrentPacSkin!.src = "/static/assets/pacman/images/" + this.pacmanSkin + "_high_res.png";
	}
	
	setGhostSkinImage(): void {
		this.imgCurrentGhostSkin!.src = "/static/assets/pacman/images/" + this.ghostSkin + "_high_res.png";
	}
	
	selectGamemode(event: Event, gamemode: string): void {
		updateTextForElem(this.toastBody!, "chosen-gamemode");
		//this.toastValue!.textContent = getText(gamemode);
		this.toastValue!.textContent = getText(gamemode) ?? "";

		this.toastBootstrap.show();
		this.gamemode = gamemode;
		localStorage.setItem('pacmanGamemode', JSON.stringify(this.gamemode));
	
		this.showGamemodeConfig();
	}
	
	selectMap(event: Event, map: string): void {
		updateTextForElem(this.toastBody!, "chosen-map");
		//this.toastValue!.textContent = getText(map);
		this.toastValue!.textContent = getText(map) ?? "";
		this.toastBootstrap.show();
		this.mapName = map;
		localStorage.setItem('mapName', JSON.stringify(this.mapName));
	
		const maps: { [key: string]: HTMLElement } = {
			maze: document.getElementById('pMaze') as HTMLElement,
			spiral: document.getElementById('pSpiral') as HTMLElement,
			butterfly: document.getElementById('pButterfly') as HTMLElement,
			battlefield: document.getElementById('pBattlefield') as HTMLElement,
			trench: document.getElementById('pTrench') as HTMLElement,
			flower: document.getElementById('pFlower') as HTMLElement
		};
		this.applySelectedSetting("mapName", maps);
	}
	
	selectTheme(event: Event, theme: string): void {
		updateTextForElem(this.toastBody!, "chosen-theme");
		//this.toastValue!.textContent = getText(theme);
		this.toastValue!.textContent = getText(theme) ?? "";
		this.toastBootstrap.show();
	
		switch (theme) {
			case "obsidian":
				this.theme = {
					name: 'obsidian',
					backgroundColor: 'rgb(10, 0, 20)',
					ghostWallColor1: 'rgb(110, 55, 225)',
					ghostWallColor2: 'rgb(75, 20, 200)',
					wallColor: 'rgb(60, 0, 120)',
					dotColor: 'rgb(105,55,165)',
					glowColor: 'rgb(145,85,210)'
				};
				break;
			case "autumn":
				this.theme = {
					name: 'autumn',
					backgroundColor: 'rgb(15, 0, 0)',
					ghostWallColor1: 'rgb(138, 22, 1)',
					ghostWallColor2: 'rgb(181, 32, 2)',
					wallColor: 'rgb(143, 34, 1)',
					dotColor: 'rgb(145, 67, 3)',
					glowColor: 'rgb(194, 90, 6)'
				};
				break;
			case "garden":
				this.theme = {
					name: 'garden',
					backgroundColor: 'rgb(0, 8, 2)',
					ghostWallColor1: 'rgb(38, 82, 0)',
					ghostWallColor2: 'rgb(58, 125, 0)',
					wallColor: 'rgb(0, 54, 12)',
					dotColor: 'rgb(2, 56, 173)',
					glowColor: 'rgb(0, 66, 209)'
				};
				break;
			case "retro":
				this.theme = {
					name: 'retro',
					backgroundColor: 'rgb(1, 1, 26)',
					ghostWallColor1: 'rgb(14, 58, 179)',
					ghostWallColor2: 'rgb(18, 71, 219)',
					wallColor: 'rgb(0, 0, 176)',
					dotColor: 'rgb(145, 135, 19)',
					glowColor: 'rgb(186, 173, 20)'
				};
				break;
			default:
				break;
		}
	
		localStorage.setItem('pacmanTheme', JSON.stringify(this.theme));
		localStorage.setItem('themeName', theme);
	
		const themes: { [key: string]: HTMLElement } = {
			obsidian: document.getElementById('pObsidian') as HTMLElement,
			autumn: document.getElementById('pAutumn') as HTMLElement,
			garden: document.getElementById('pGarden') as HTMLElement,
			retro: document.getElementById('pRetro') as HTMLElement
		};
		this.applySelectedSetting("themeName", themes);
	}
	
	changeKeybind(event: Event, key: string, btn: HTMLElement): void {
		btn.textContent = "...";
		this.waitForKey = true;
		this.waitingKey = key;
	}
	
	keyDownSettings = (event: KeyboardEvent): void => {
		if (["Space", "ArrowUp", "ArrowDown"].indexOf(event.code) > -1) {
			event.preventDefault();
		}
	
		if (this.waitForKey) {
			for (const key in this.keybinds) {
				if (this.keybinds[key] === event.code) {
					this.keybinds[key] = "";
				}
			}
	
			let keyText: string | undefined;
	
			switch (this.waitingKey) {
				case "pUp":
					keyText = getText("p-move-up");
					this.keybinds.pUp = event.code;
					break;
				case "pLeft":
					keyText = getText("p-move-left");
					this.keybinds.pLeft = event.code;
					break;
				case "pDown":
					keyText = getText("p-move-down");
					this.keybinds.pDown = event.code;
					break;
				case "pRight":
					keyText = getText("p-move-right");
					this.keybinds.pRight = event.code;
					break;
				case "pSpell":
					keyText = getText("p-spell");
					this.keybinds.pSpell = event.code;
					break;
				case "gUp":
					keyText = getText("g-move-up");
					this.keybinds.gUp = event.code;
					break;
				case "gLeft":
					keyText = getText("g-move-left");
					this.keybinds.gLeft = event.code;
					break;
				case "gDown":
					keyText = getText("g-move-down");
					this.keybinds.gDown = event.code;
					break;
				case "gRight":
					keyText = getText("g-move-right");
					this.keybinds.gRight = event.code;
					break;
				case "gSpell":
					keyText = getText("g-move-up"); // Typo? (g-spell maybe?) Keeping as you had.
					this.keybinds.gSpell = event.code;
					break;
				default:
					return;
			}
	
			this.waitForKey = false;
			updateTextForElem(this.toastBody!, "changed-key");
			this.toastValue!.textContent = `${keyText} -> ${event.code}`;
			this.toastBootstrap.show();
			localStorage.setItem('pacmanKeybinds', JSON.stringify(this.keybinds));
			this.showKeysConfig();
		}
	}
	
	applySelectedSetting(settingType: string, elementMapping: { [key: string]: HTMLElement }): void {
		const selectedSetting = localStorage.getItem(settingType)?.replace(/"/g, '');
	
		Object.keys(elementMapping).forEach(setting => {
			if (setting === selectedSetting) {
				elementMapping[setting].classList.add("selected");
			} else {
				elementMapping[setting].classList.remove("selected");
			}
		});
	}
	
	addEventListeners(button: HTMLElement, action: (event: Event) => void): void {
		button.addEventListener("click", (event) => action(event));
		button.addEventListener("keydown", (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				action(event);
			}
		});
	}
}
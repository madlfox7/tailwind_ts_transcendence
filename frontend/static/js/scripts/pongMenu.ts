//@ts-ignore
import { BASE_URL } from "../index.js";
import { updateTexts } from "../utils/languages.js";
import { getText } from "../utils/languages.js";
import { updateTextForElem } from "../utils/languages.js";

export let eventListeners: Record<string, EventListener> = {};


// templates.js (or wherever you store these)
export const gamestyleModalHTML = `
	<div class="modal-header">
		<h2 class="modal-title text-white w-100 text-center" data-translate="gamestyle"></h2>
	</div>
	<div class="modal-body">
		<div class="row justify-content-center">
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btnLegacy" data-translate="legacy"></button>
			</div>
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btnEnhanced" data-translate="enhanced"></button>
			</div>
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btn3D" data-translate="3D"></button>
			</div>
			<div class="col-12 d-flex justify-content-center mb-2 mt-4">
				<div class="col-10 justify-content-center d-flex flex-column" id="AIDifficulties">
					<p class="text-white text-center" id="gamestyleDescription"></p>
					<p class="text-white text-center" id="availableGamemodes"></p>
				</div>
			</div>
		</div>
	</div>
`;


// templates.js (or any shared file)
export const gamemodeModalHTML = `
	<div class="modal-header">
		<h2 class="modal-title text-white w-100 text-center" data-translate="gamemode"></h2>
	</div>
	<div class="modal-body">
		<div class="row justify-content-center">
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btnPvp" data-translate="pvp"></button>
			</div>
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btnAI" data-translate="vs ai"></button>
			</div>
			<div class="col-4 d-flex justify-content-center">
				<button role="button" class="btn btn-lg text-white btn-filled" id="btnTournament" data-translate="tournament"></button>
			</div>
			<div class="col-12 d-flex justify-content-center mt-3">
				<div class="col-8 justify-content-center d-flex flex-column">
					<p class="text-white text-center lh-sm mt-3" style="min-height: 3em; line-height: 1;" id="gamemodeDescription"></p>
					<p class="h5 fw-bold text-white text-center" id="disclaimer"></p>
					<div id="aiLevelsContainer"></div>
				</div>
			</div>
		</div>
	</div>
`;


// file: htmlTemplates.js (or same file if preferred)
export const playersContainerHTML = `
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-2">
			<p class="h3 text-white text-center" id="leftPaddleName">player 1</p>
			<input type="text" id="leftPaddleInput" maxlength="10" class="form-control form-control-sm text-input text-center mt-3" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-6 d-flex flex-column align-items-center mt-1 mb-2">
			<input type="color" id="leftPaddleColor" class="form-control form-control-sm mt-3 color-picker" value="#b3ecff">
		</div>
	</div>
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-2">
			<p class="h3 text-white text-center" id="rightPaddleName">player 2</p>
			<input type="text" id="rightPaddleInput" maxlength="10" class="form-control form-control-sm text-input text-center mt-3" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-6 d-flex flex-column align-items-center mt-1 mb-2">
			<input type="color" id="rightPaddleColor" class="form-control form-control-sm mt-3 color-picker" value="#e09eff">
		</div>
	</div>
`;


// templates.js (or wherever you store UI HTML blocks)
export const playerBoxHTML = `
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4 player-box">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-2">
			<p class="h3 text-white text-center" id="playerPaddleName">player 1</p>
			<input type="text" id="playerPaddleInput" maxlength="10" class="form-control form-control-sm text-input text-center mt-2" placeholder="Enter username" data-translate="enter-username">	
		</div>
		<div class="col-6 d-flex flex-column align-items-center mt-1 mb-2">
			<input type="color" id="playerPaddleColor" class="form-control form-control-sm mt-3 color-picker" value="#b3ecff">
		</div>
	</div>
`;


// templates.js or similar
export const fourPlayersContainerHTML = `
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-1">
			<p class="h4 text-white text-center mb-3" id="player1Name">player 1</p>
			<input type="text" id="player1Input" maxlength="10" class="form-control form-control-sm text-input text-center" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-8 d-flex flex-column align-items-center mt-1 mb-1">
			<input type="color" id="player1Color" class="form-control form-control-sm mt-3 color-picker" value="#ff0000">
		</div>
	</div>
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-1">
			<p class="h4 text-white text-center mb-3" id="player2Name">player 2</p>
			<input type="text" id="player2Input" maxlength="10" class="form-control form-control-sm text-input text-center" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-8 d-flex flex-column align-items-center mt-1 mb-1">
			<input type="color" id="player2Color" class="form-control form-control-sm mt-3 color-picker" value="#00ff00">
		</div>
	</div>
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-1">
			<p class="h4 text-white text-center mb-3" id="player3Name">player 3</p>
			<input type="text" id="player3Input" maxlength="10" class="form-control form-control-sm text-input text-center" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-8 d-flex flex-column align-items-center mt-1 mb-1">
			<input type="color" id="player3Color" class="form-control form-control-sm mt-3 color-picker" value="#0000ff">
		</div>
	</div>
	<div class="col d-flex flex-column align-items-center glass mt-2 p-4">
		<div class="col-10 d-flex flex-column align-items-center mt-1 mb-1">
			<p class="h4 text-white text-center mb-3" id="player4Name">...</p>
			<input type="text" id="player4Input" maxlength="10" class="form-control form-control-sm text-input text-center" placeholder="Enter username" data-translate="enter-username">
		</div>
		<div class="col-8 d-flex flex-column align-items-center mt-1 mb-1">
			<input type="color" id="player4Color" class="form-control form-control-sm mt-3 color-picker" value="#ff00ff">
		</div>
	</div>
`;


export const aiLevelsHTML = `
	<div class="row justify-content-center">
		<div class="col-6 d-flex justify-content-end">
			<button role="button" class="btn btn-lg text-white btn-filled" id="btnEasy" data-translate="easy"></button>
		</div>
		<div class="col-6 d-flex justify-content-start">
			<button role="button" class="btn btn-lg text-white btn-filled" id="btnHard" data-translate="hard"></button>
		</div>
	</div>
`;

// templates.js
export function getPointsRangeHTML(objective = 5) {
	return `
		<div class="col-6 flex-column align-items-center d-flex mb-2">
			<div class="col-12 d-flex align-items-center justify-content-center">
				<p class="h5 text-white text-center" style="margin-right: 10px;" data-translate="points-to-win"></p>
				<p for="pongRangeInput" class="text-white h5 text-center" id="rangeLabel"></p>
			</div>
			<input type="range" style="width: 70%; margin: 0 auto;" class="form-range mt-2" min="1" max="10" value="${objective}" step="1" id="pongRangeInput">
		</div>
	`;
}


// templates.js or similar file
// export function getSettingsModalHTML(keybinds) {
// 	const safeValue = (val) => val !== "" ? val : "none";
export function getSettingsModalHTML(keybinds: KeybindSet): string {
	const safeValue = (val: string): string => val !== "" ? val : "none";

	return `
		<div class="modal-header">
			<h2 class="modal-title text-white w-100 text-center" data-translate="keybinds-settings"></h2>
		</div>
		<div class="modal-body">
			<div class="col-12 d-flex justify-content-center">
				<div class="col-6">
					<div class="row justify-content-center text-center mt-2">
						<p class="h2 text-white" data-translate="left paddle"></p>
					</div>
					<div class="row justify-content-center text-center mt-1">
						<div class="col-6 d-flex justify-content-end align-content-center">
							<p class="text-white" style="margin-top: 5px;" data-translate="move-up"></p>
						</div>
						<div class="col-6 d-flex justify-content-start align-content-center">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="lUp">${safeValue(keybinds.lUp)}</p>
						</div>
					</div>
					<div class="row justify-content-center text-center">
						<div class="col-6 d-flex justify-content-end">
							<p class="text-white" style="margin-top: 5px;" data-translate="move-down"></p>
						</div>
						<div class="col-6 d-flex justify-content-start">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="lDown">${safeValue(keybinds.lDown)}</p>
						</div>
					</div>
					<div class="row justify-content-center text-center">
						<div class="col-6 d-flex justify-content-end">
							<p class="text-white" style="margin-top: 5px;" data-translate="minimize"></p>
						</div>
						<div class="col-6 d-flex justify-content-start">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="lMini">${safeValue(keybinds.lMini)}</p>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="row justify-content-center text-center mt-2">
						<p class="h2 text-white" data-translate="right paddle"></p>
					</div>
					<div class="row justify-content-center text-center mt-1">
						<div class="col-6 d-flex justify-content-end">
							<p class="text-white" style="margin-top: 5px;" data-translate="move-up"></p>
						</div>
						<div class="col-6 d-flex justify-content-start">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="rUp">${safeValue(keybinds.rUp)}</p>
						</div>
					</div>
					<div class="row justify-content-center text-center">
						<div class="col-6 d-flex justify-content-end">
							<p class="text-white" style="margin-top: 5px;" data-translate="move-down"></p>
						</div>
						<div class="col-6 d-flex justify-content-start">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="rDown">${safeValue(keybinds.rDown)}</p>
						</div>
					</div>
					<div class="row justify-content-center text-center">
						<div class="col-6 d-flex justify-content-end">
							<p class="text-white" style="margin-top: 5px;" data-translate="minimize"></p>
						</div>
						<div class="col-6 d-flex justify-content-start">
							<p role="button" tabindex="0" class="text-white clickable" style="max-height: 275px; border: 1px solid white; padding: 5px; border-radius: 5px;" id="rMini">${safeValue(keybinds.rMini)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}



type PaddleColorSet = {
	p1: string;
	p2: string;
	p3: string;
	p4: string;
};

type UsernameSet = {
	p1: string;
	p2: string;
	p3: string;
	p4: string;
};

type KeybindSet = {
	lUp: string;
	lDown: string;
	lMini: string;
	rUp: string;
	rDown: string;
	rMini: string;
};

export class PongMenu {
	keysButton: HTMLElement;
	gamemodeButton: HTMLElement;
	gamestyleButton: HTMLElement;
	btnStartGame: HTMLAnchorElement;
	pointsRangeContainer: HTMLElement;
	settingsModal: any;
	settingsModalContent: HTMLElement;
	playersContainer: HTMLElement;
	currentGamemodeLabel: HTMLElement;
	currentGamestyleLabel: HTMLElement;
	toastNotification: HTMLElement;
	toastBootstrap: any;
	toastBody: HTMLElement;
	toastValue: HTMLElement;
	boundKeyDownSettings: (e: KeyboardEvent) => void;
	//updatePlayersContainer: () => void;
	waitForKey: boolean;
	waitingKey: string;
	displayName: string;
	colors: PaddleColorSet;
	usernames: UsernameSet;
	keybinds: KeybindSet;
	aiDifficulty: string;
	gamemode: string;
	lastGamemode: string;
	gamestyle: string;
	objective: number;

	constructor() {
		this.keysButton = document.getElementById('btnKeys')!;
		this.gamemodeButton = document.getElementById('btnGamemode')!;
		this.gamestyleButton = document.getElementById('btnGamestyle')!;
		this.btnStartGame = document.getElementById('btnStartGame') as HTMLAnchorElement;
		this.pointsRangeContainer = document.getElementById('pointsRangeContainer')!;
		this.settingsModal = new (window as any).bootstrap.Modal(document.getElementById('settingsModal')!);
		this.settingsModalContent = document.getElementById('settingsModalContent')!;
		this.playersContainer = document.getElementById('playersContainer')!;
		this.currentGamemodeLabel = document.getElementById('currentGamemodeLabel')!;
		this.currentGamestyleLabel = document.getElementById('currentGamestyleLabel')!;
		this.toastNotification = document.getElementById('liveToast')!;
		this.toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(this.toastNotification);
		this.toastBody = document.getElementById('toastBody')!;
		this.toastValue = document.getElementById('toastValue')!;
		this.boundKeyDownSettings = this.keyDownSettings.bind(this);
		//this.updatePlayersContainer = this.updatePlayersContainer.bind(this);
		this.waitForKey = false;
		this.waitingKey = "";
		this.displayName = "";

		const colorsString = localStorage.getItem('pongColors');
		this.colors = colorsString ? JSON.parse(colorsString) : {
			p1: "#b3ecff", p2: "#e09eff", p3: "#266fff", p4: "#ff00ff"
		};
		localStorage.setItem('pongColors', JSON.stringify(this.colors));

		const usernamesString = localStorage.getItem('pongUsernames');
		this.usernames = usernamesString ? JSON.parse(usernamesString) : {
			p1: "player1", p2: "player2", p3: "player3", p4: "player4"
		};
		localStorage.setItem('pongUsernames', JSON.stringify(this.usernames));

		const keybindsString = localStorage.getItem('pongKeybinds');
		this.keybinds = keybindsString ? JSON.parse(keybindsString) : {
			lUp: 'KeyW', lDown: 'KeyS', lMini: 'KeyE',
			rUp: 'ArrowUp', rDown: 'ArrowDown', rMini: 'ArrowRight'
		};
		localStorage.setItem('pongKeybinds', JSON.stringify(this.keybinds));

		const aiDifficultyString = localStorage.getItem('pongAIDifficulty');
		this.aiDifficulty = aiDifficultyString ? JSON.parse(aiDifficultyString) : "easy";
		localStorage.setItem('pongAIDifficulty', JSON.stringify(this.aiDifficulty));

		const gamemodeString = localStorage.getItem('pongGamemode');
		this.gamemode = gamemodeString ? JSON.parse(gamemodeString) : "pvp";
		this.lastGamemode = "pvp";
		localStorage.setItem('pongGamemode', JSON.stringify(this.gamemode));

		const gamestyleString = localStorage.getItem('pongGamestyle');
		this.gamestyle = gamestyleString ? JSON.parse(gamestyleString) : "enhanced";
		localStorage.setItem('pongGamestyle', JSON.stringify(this.gamestyle));

		this.btnStartGame.href = this.gamestyle === "3D" ? "/pong3d" : "/pong";
		updateTextForElem(this.currentGamemodeLabel, this.gamemode);
		updateTextForElem(this.currentGamestyleLabel, this.gamestyle);

		const objectiveString = localStorage.getItem('pongObjective');
		this.objective = objectiveString ? JSON.parse(objectiveString) : 3;

		this.initialize();
	}

async initialize(): Promise<void> {
	this.keysButton.addEventListener("click", () => this.showKeysConfig());
	this.gamemodeButton.addEventListener("click", () => this.showGamemodeConfig());
	this.gamestyleButton.addEventListener("click", () => this.showGamestyleConfig());
	document.addEventListener("keydown", this.boundKeyDownSettings);
	//this.boundKeyDownSettings = this.keyDownSettings.bind(this) as EventListener;
	this.boundKeyDownSettings = (event: Event) => this.keyDownSettings(event as KeyboardEvent);

	//eventListeners["keydown"] = this.boundKeyDownSettings;
	await this.getLoggedUsername();
	this.updatePlayersContainer();
	this.setScoreRange();
}

async getLoggedUsername(): Promise<void> {
	const response = await fetch(`${BASE_URL}/api/profile`);
	if (response.status === 200) {
		const responseData = await response.json();
		const user = responseData.user;
		this.displayName = user.username;
	}
}

updatePlayersContainer = (): void => {
	switch (this.gamemode) {
		case "pvp":
			this.playersContainer.innerHTML = playersContainerHTML;

			const leftPaddleUsernameLabel = document.getElementById('leftPaddleName') as HTMLElement;
			const leftPaddleInput = document.getElementById('leftPaddleInput') as HTMLInputElement;
			const leftPaddleColor = document.getElementById('leftPaddleColor') as HTMLInputElement;
			const rightPaddleUsernameLabel = document.getElementById('rightPaddleName') as HTMLElement;
			const rightPaddleInput = document.getElementById('rightPaddleInput') as HTMLInputElement;
			const rightPaddleColor = document.getElementById('rightPaddleColor') as HTMLInputElement;

			leftPaddleUsernameLabel.textContent = this.usernames.p1;
			rightPaddleUsernameLabel.textContent = this.usernames.p2;
			leftPaddleColor.value = this.colors.p1;
			rightPaddleColor.value = this.colors.p2;

			leftPaddleInput.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, leftPaddleInput, leftPaddleUsernameLabel, "left paddle", "p1"));
			leftPaddleInput.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, leftPaddleInput, leftPaddleUsernameLabel, "left paddle", "p1"));

			rightPaddleInput.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, rightPaddleInput, rightPaddleUsernameLabel, "right paddle", "p2"));
			rightPaddleInput.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, rightPaddleInput, rightPaddleUsernameLabel, "right paddle", "p2"));

			leftPaddleColor.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p1, "p1"));
			rightPaddleColor.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p2, "p2"));
			break;

		case "AI":
			this.playersContainer.innerHTML = playerBoxHTML;

			const playerPaddleName = document.getElementById('playerPaddleName') as HTMLElement;
			const playerPaddleInput = document.getElementById('playerPaddleInput') as HTMLInputElement;
			const playerPaddleColor = document.getElementById('playerPaddleColor') as HTMLInputElement;

			playerPaddleName.textContent = this.usernames.p1;
			playerPaddleColor.value = this.colors.p1;

			playerPaddleInput.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, playerPaddleInput, playerPaddleName, "player", "p1"));
			playerPaddleInput.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, playerPaddleInput, playerPaddleName, "player", "p1"));

			playerPaddleColor.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p1, "p1"));
			break;

		case "tournament":
			this.playersContainer.innerHTML = fourPlayersContainerHTML;

			const player1Name = document.getElementById('player1Name') as HTMLElement;
			const player1Input = document.getElementById('player1Input') as HTMLInputElement;
			const player1Color = document.getElementById('player1Color') as HTMLInputElement;

			const player2Name = document.getElementById('player2Name') as HTMLElement;
			const player2Input = document.getElementById('player2Input') as HTMLInputElement;
			const player2Color = document.getElementById('player2Color') as HTMLInputElement;

			const player3Name = document.getElementById('player3Name') as HTMLElement;
			const player3Input = document.getElementById('player3Input') as HTMLInputElement;
			const player3Color = document.getElementById('player3Color') as HTMLInputElement;

			const player4Name = document.getElementById('player4Name') as HTMLElement;
			const player4Input = document.getElementById('player4Input') as HTMLInputElement;
			const player4Color = document.getElementById('player4Color') as HTMLInputElement;

			player1Name.textContent = this.usernames.p1;
			player2Name.textContent = this.usernames.p2;
			player3Name.textContent = this.usernames.p3;
			player4Name.textContent = this.usernames.p4;

			player1Color.value = this.colors.p1;
			player2Color.value = this.colors.p2;
			player3Color.value = this.colors.p3;
			player4Color.value = this.colors.p4;

			if (this.displayName !== "") {
				this.usernames.p1 = this.displayName;
				player1Name.textContent = this.usernames.p1;
				localStorage.setItem('pongUsernames', JSON.stringify(this.usernames));
				player1Input.style.opacity = "0";
			} else {
				player1Input.addEventListener('keypress', (event) =>
					this.paddleInputHandle(event, player1Input, player1Name, "player 1", "p1"));
				player1Input.addEventListener('blur', (event) =>
					this.paddleInputHandle(event, player1Input, player1Name, "player 1", "p1"));
			}

			player2Input.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, player2Input, player2Name, "player 2", "p2"));
			player2Input.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, player2Input, player2Name, "player 2", "p2"));

			player3Input.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, player3Input, player3Name, "player 3", "p3"));
			player3Input.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, player3Input, player3Name, "player 3", "p3"));

			player4Input.addEventListener('keypress', (event) =>
				this.paddleInputHandle(event, player4Input, player4Name, "player 4", "p4"));
			player4Input.addEventListener('blur', (event) =>
				this.paddleInputHandle(event, player4Input, player4Name, "player 4", "p4"));

			player1Color.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p1, "p1"));
			player2Color.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p2, "p2"));
			player3Color.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p3, "p3"));
			player4Color.addEventListener('input', (event) =>
				this.colorInputHandle(event, this.usernames.p4, "p4"));
			break;

		default:
			break;
	}

	updateTexts();
}

	paddleInputHandle(
		event: KeyboardEvent | FocusEvent,
		playerInput: HTMLInputElement,
		playerLabel: HTMLElement,
		playerName: string,
		playerUsername: keyof UsernameSet
	): void {
		const isValid =
			(event.type === 'keypress' && (event as KeyboardEvent).key === 'Enter') ||
			event.type === 'blur';
	
		if (isValid && playerInput.value !== "") {
			this.usernames[playerUsername] = playerInput.value;
			playerInput.value = ""; // Clear the input box
			playerLabel.textContent = this.usernames[playerUsername];
			this.toastBody.textContent = `${playerName} ${getText("paddle-username-changed")}`;
			this.toastValue.textContent = this.usernames[playerUsername];
			this.toastBootstrap.show();
			localStorage.setItem('pongUsernames', JSON.stringify(this.usernames));
	
			const usernamesString = localStorage.getItem('pongUsernames');
			this.usernames = usernamesString ? JSON.parse(usernamesString) : {
				p1: "player1", p2: "player2", p3: "player3", p4: "player4"
			};
		}
	}
	
	colorInputHandle(
		event: Event,
		name: string,
		player: keyof PaddleColorSet
	): void {
		const target = event.target as HTMLInputElement;
		this.colors[player] = target.value;
		this.toastBody.textContent = `${name} ${getText("color-changed")}`;
		this.toastValue.textContent = "";
		this.toastBootstrap.show();
		localStorage.setItem('pongColors', JSON.stringify(this.colors));
	
		const colorsString = localStorage.getItem('pongColors');
		this.colors = colorsString ? JSON.parse(colorsString) : {
			p1: "#ff0000", p2: "#00ff00", p3: "#0000ff", p4: "#ff00ff"
		};
	}
	
	setScoreRange(): void {
		this.pointsRangeContainer.innerHTML = getPointsRangeHTML(this.objective);
		const rangeInput = document.getElementById('pongRangeInput') as HTMLInputElement;
		const rangeLabel = document.getElementById('rangeLabel') as HTMLElement;
	
		rangeLabel.textContent = this.objective.toString();
		localStorage.setItem('pongObjective', JSON.stringify(this.objective));
	
		rangeInput.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			this.objective = parseInt(target.value);
			rangeLabel.textContent = this.objective.toString();
			localStorage.setItem('pongObjective', JSON.stringify(this.objective));
		});
	
		updateTexts();
	}
	
	showKeysConfig(): void {
		this.settingsModalContent.innerHTML = getSettingsModalHTML(this.keybinds);
	
		const btnLUp = document.getElementById('lUp') as HTMLElement;
		const btnLDown = document.getElementById('lDown') as HTMLElement;
		const btnLMini = document.getElementById('lMini') as HTMLElement;
		const btnRUp = document.getElementById('rUp') as HTMLElement;
		const btnRDown = document.getElementById('rDown') as HTMLElement;
		const btnRMini = document.getElementById('rMini') as HTMLElement;
	
		const addEventListeners = (button: HTMLElement, action: keyof KeybindSet) => {
			button.addEventListener("click", (event) => this.changeKeybind(event, action, button));
	
			button.addEventListener("keydown", (event: KeyboardEvent) => {
				if (event.key === "Enter") {
					setTimeout(() => {
						this.changeKeybind(event, action, button);
					}, 100);
				}
			});
		};
	
		addEventListeners(btnLUp, "lUp");
		addEventListeners(btnLDown, "lDown");
		addEventListeners(btnLMini, "lMini");
		addEventListeners(btnRUp, "rUp");
		addEventListeners(btnRDown, "rDown");
		addEventListeners(btnRMini, "rMini");
	
		this.settingsModal.show();
		updateTexts();
	}
	

	showGamemodeConfig(): void {
		this.settingsModalContent.innerHTML = gamemodeModalHTML;
	
		const btnPvp = document.getElementById('btnPvp') as HTMLButtonElement;
		const btnAI = document.getElementById('btnAI') as HTMLButtonElement;
		const btnTournament = document.getElementById('btnTournament') as HTMLButtonElement;
		const pDescription = document.getElementById('gamemodeDescription') as HTMLElement;
		const aiLevelsContainer = document.getElementById('aiLevelsContainer') as HTMLElement;
	
		btnPvp.addEventListener("click", (event) => this.selectGamemode(event, "pvp"));
		btnAI.addEventListener("click", (event) => this.selectGamemode(event, "AI"));
		btnTournament.addEventListener("click", (event) => this.selectGamemode(event, "tournament"));
	
		switch (this.gamemode) {
			case "pvp":
				updateTextForElem(pDescription, "pvp-desc");
				break;
	
			case "AI":
				updateTextForElem(pDescription, "AI-desc");
	
				aiLevelsContainer.innerHTML = aiLevelsHTML;
	
				const btnEasy = document.getElementById('btnEasy') as HTMLButtonElement;
				const btnHard = document.getElementById('btnHard') as HTMLButtonElement;
	
				btnEasy.addEventListener("click", (event) => this.selectAIDifficulty(event, "easy"));
				btnHard.addEventListener("click", (event) => this.selectAIDifficulty(event, "hard"));
	
				const difficulties: Record<string, HTMLElement> = {
					easy: btnEasy,
					hard: btnHard,
				};
	
				this.applySelectedSetting("pongAIDifficulty", difficulties);
				updateTexts();
				break;
	
			case "tournament":
				updateTextForElem(pDescription, "tournament-desc");
				break;
	
			default:
				break;
		}
	
		if (this.gamestyle === "3D") {
			btnAI.disabled = true;
			btnTournament.disabled = true;
	
			const disclaimer = document.getElementById('disclaimer') as HTMLElement;
			updateTextForElem(disclaimer, "3D-disclaimer");
		}
	
		localStorage.setItem("pongGamemode", JSON.stringify(this.gamemode));
		this.settingsModal.show();
	
		const gamemodes: Record<string, HTMLElement> = {
			pvp: btnPvp,
			AI: btnAI,
			tournament: btnTournament,
		};
	
		this.applySelectedSetting("pongGamemode", gamemodes);
		updateTexts();
	}
	
	showGamestyleConfig(): void {
		this.settingsModalContent.innerHTML = gamestyleModalHTML;
	
		const btnLegacy = document.getElementById('btnLegacy') as HTMLButtonElement;
		const btnEnhanced = document.getElementById('btnEnhanced') as HTMLButtonElement;
		const btn3D = document.getElementById('btn3D') as HTMLButtonElement;
	
		const gamestyleDescription = document.getElementById('gamestyleDescription') as HTMLElement;
		const availableGamemodes = document.getElementById('availableGamemodes') as HTMLElement;
	
		btnLegacy.addEventListener("click", (event) => this.selectGamestyle(event, "legacy"));
		btnEnhanced.addEventListener("click", (event) => this.selectGamestyle(event, "enhanced"));
		btn3D.addEventListener("click", (event) => this.selectGamestyle(event, "3D"));
	
		switch (this.gamestyle) {
			case "legacy":
				updateTextForElem(gamestyleDescription, "legacy-desc");
				updateTextForElem(availableGamemodes, "available-gamemodes-all");
				break;
	
			case "enhanced":
				updateTextForElem(gamestyleDescription, "enhanced-desc");
				updateTextForElem(availableGamemodes, "available-gamemodes-all");
				break;
	
			case "3D":
				updateTextForElem(gamestyleDescription, "3D-desc");
				updateTextForElem(availableGamemodes, "available-gamemodes-pvp");
				break;
	
			default:
				break;
		}
	
		localStorage.setItem("pongGamestyle", JSON.stringify(this.gamestyle));
		this.settingsModal.show();
	
		const gamestyles: Record<string, HTMLElement> = {
			legacy: btnLegacy,
			enhanced: btnEnhanced,
			"3D": btn3D,
		};
	
		this.applySelectedSetting("pongGamestyle", gamestyles);
		updateTexts();
	}
	

selectGamemode(event: Event, gamemode: string): void {
	updateTextForElem(this.toastBody, "chosen-gamemode");
//	this.toastValue.textContent = getText(gamemode);
this.toastValue.textContent = getText(gamemode) ?? null;

	this.toastBootstrap.show();

	this.gamemode = gamemode;
	localStorage.setItem('pongGamemode', JSON.stringify(this.gamemode));
	updateTextForElem(this.currentGamemodeLabel, this.gamemode);

	this.showGamemodeConfig();
	this.updatePlayersContainer();
}

selectGamestyle(event: Event, gamestyle: string): void {
	updateTextForElem(this.toastBody, "chosen-game-style");
	//this.toastValue.textContent = getText(gamestyle);
	this.toastValue.textContent = getText(gamestyle) ?? null;

	this.toastBootstrap.show();

	if (gamestyle === "3D") {
		this.lastGamemode = this.gamemode;
		this.gamemode = "pvp";
		updateTextForElem(this.currentGamemodeLabel, this.gamemode);
	} else if (this.gamestyle === "3D" && gamestyle !== this.gamestyle) {
		this.gamemode = this.lastGamemode;
		updateTextForElem(this.currentGamemodeLabel, this.gamemode);
	}

	this.gamestyle = gamestyle;
	this.btnStartGame.href = this.gamestyle === "3D" ? "/pong3d" : "/pong";

	localStorage.setItem('pongGamestyle', JSON.stringify(this.gamestyle));
	localStorage.setItem('pongGamemode', JSON.stringify(this.gamemode));

	updateTextForElem(this.currentGamestyleLabel, this.gamestyle);
	this.showGamestyleConfig();
	this.updatePlayersContainer();
}

selectAIDifficulty(event: Event, difficulty: string): void {
	updateTextForElem(this.toastBody, "chosen-AI");
	//this.toastValue.textContent = getText(difficulty);
	this.toastValue.textContent = getText(difficulty) ?? "";

	this.toastBootstrap.show();

	this.aiDifficulty = difficulty;
	localStorage.setItem('pongAIDifficulty', JSON.stringify(this.aiDifficulty));

	this.showGamemodeConfig();
}

changeKeybind(event: Event, key: keyof KeybindSet, btn: HTMLElement): void {
	btn.textContent = "...";
	this.waitForKey = true;
	this.waitingKey = key;
}

keyDownSettings = (event: KeyboardEvent): void => {
	const preventKeys = ["Space", "ArrowUp", "ArrowDown"];
	if (preventKeys.includes(event.code)) {
		event.preventDefault();
	}

	if (this.waitForKey) {
		// Clear any existing assignment
		for (const k in this.keybinds) {
			if (this.keybinds[k as keyof KeybindSet] === event.code) {
				this.keybinds[k as keyof KeybindSet] = "";
			}
		}

		let keyLabel: string;

		switch (this.waitingKey) {
			case "lUp":
			//	keyLabel = getText("lpad-move-up");
			keyLabel = getText("lpad-move-up") ?? "";

				this.keybinds.lUp = event.code;
				break;
			case "lDown":
			//	keyLabel = getText("lpad-move-down");
			keyLabel = getText("lpad-move-down") ?? "";

				this.keybinds.lDown = event.code;
				break;
			case "lMini":
				keyLabel = getText("lpad-minimize") ?? "";
				this.keybinds.lMini = event.code;
				break;
			case "rUp":
				keyLabel = getText("rpad-move-up") ?? "";
				this.keybinds.rUp = event.code;
				break;
			case "rDown":
				keyLabel = getText("rpad-move-down") ?? "";
				this.keybinds.rDown = event.code;
				break;
			case "rMini":
				keyLabel = getText("rpad-minimize") ?? "";
				this.keybinds.rMini = event.code;
				break;

			default:
				return;
		}

		updateTextForElem(this.toastBody, "changed-key");
		this.toastValue.textContent = `${keyLabel} -> ${event.code}`;
		this.waitForKey = false;
		this.toastBootstrap.show();
		localStorage.setItem('pongKeybinds', JSON.stringify(this.keybinds));
		this.showKeysConfig();
	}
}

applySelectedSetting(
	settingType: string,
	elementMapping: Record<string, HTMLElement>
): void {
	const selectedSetting = localStorage.getItem(settingType)?.replace(/"/g, '');

	Object.keys(elementMapping).forEach((setting) => {
		if (setting === selectedSetting) {
			elementMapping[setting].classList.add("selected");
		} else {
			elementMapping[setting].classList.remove("selected");
		}
	});
}
}


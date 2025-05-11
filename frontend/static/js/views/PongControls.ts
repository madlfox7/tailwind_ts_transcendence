import Pong from "./Pong.js";
import PongSettings from "./pongSettings.js";

export default class PongControls {
  private pong: Pong;
  private settings: PongSettings;
  private startButton: HTMLButtonElement;
//   private pauseButton: HTMLButtonElement;
  private menuButton: HTMLButtonElement;
  private settingsButton: HTMLButtonElement;
  private isPaused: boolean = false;
  private pauseOverlay: HTMLDivElement;
  private isSettingsOpen: boolean = false;

  constructor(pongInstance: Pong) {
    this.pong = pongInstance;
    this.settings = new PongSettings(pongInstance, this);

    // Create buttons
    this.startButton = document.createElement("button");
    // this.pauseButton = document.createElement("button");
    this.menuButton = document.createElement("button");
    this.settingsButton = document.createElement("button");

    // Add classes
    this.startButton.className = "bg-green-500 text-white px-4 py-2 rounded mr-2";
    // this.pauseButton.className = "bg-yellow-500 text-white px-4 py-2 rounded mr-2";
    this.menuButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
    this.settingsButton.className = "bg-gray-500 text-white px-4 py-2 rounded";

    // Set text
    this.startButton.textContent = "Start Game";
    // this.pauseButton.textContent = "Pause Game";
    this.menuButton.textContent = "Menu";
    this.settingsButton.textContent = "Settings";

    // Attach to the DOM
    const controlsContainer = document.createElement("div");
    controlsContainer.className = "mt-5 flex justify-center space-x-4";
    controlsContainer.appendChild(this.startButton);
    // controlsContainer.appendChild(this.pauseButton);
    controlsContainer.appendChild(this.menuButton);
    controlsContainer.appendChild(this.settingsButton);

    document.querySelector(".text-center")!.appendChild(controlsContainer);

    // Event Listeners
    this.startButton.addEventListener("click", () => this.handleStart());
    // this.pauseButton.addEventListener("click", () => this.handlePause());
    this.menuButton.addEventListener("click", () => this.handleMenu());
    this.settingsButton.addEventListener("click", () => this.handleSettings());

    // Overlay
    this.pauseOverlay = document.createElement("div");
    this.pauseOverlay.className = `
      fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center 
      text-white text-4xl hidden z-50 transition-all duration-300
    `;
    this.pauseOverlay.innerHTML = "<div>Game Paused</div>";
    document.body.appendChild(this.pauseOverlay);

    // Key event listener
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && !this.isSettingsOpen) {
        this.handlePause();
      }
    });
  }

  handleStart() {
    this.pong.startGame();
    this.isPaused = false;
    this.startButton.disabled = true;
    // this.pauseButton.disabled = false;
    this.hidePauseOverlay();
  }

  handlePause() {
    if (this.isSettingsOpen) return; // Prevent pausing when settings are open

    this.isPaused = !this.isPaused;
    this.pong.togglePause(this.isPaused);
    // this.pauseButton.textContent = this.isPaused ? "Resume Game" : "Pause Game";

    if (this.isPaused) {
      this.showPauseOverlay();
    } else {
      this.hidePauseOverlay();
    }
  }

  handleSettings() {
    if (!this.isPaused) {
      this.handlePause(); // Ensure it's paused
    }
    this.isSettingsOpen = true;
    this.settings.openSettings();
  }

  handleMenu() {
    this.pong.cleanUp();
    window.location.href = "pongMenu.html";
  }

  showPauseOverlay() {
    this.pauseOverlay.classList.remove("hidden");
  }

  hidePauseOverlay() {
    this.pauseOverlay.classList.add("hidden");
  }

  resumeAfterSettings() {
    this.isSettingsOpen = false;
    if (this.isPaused) {
      this.handlePause(); // Resume the game
    }
  }
}

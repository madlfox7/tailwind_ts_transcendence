import Pong from "./Pong.js";
import PongControls from "./PongControls.js";

export default class PongSettings {
  private pong: Pong;
  private controls: PongControls;
  private settingsPanel: HTMLDivElement | null = null;
  private highContrastColors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFFFFF", // White
    "#000000"  // Black
  ];

  constructor(pongInstance: Pong, controlsInstance: PongControls) {
    this.pong = pongInstance;
    this.controls = controlsInstance;
  }

  openSettings() {
    if (this.settingsPanel) {
      this.settingsPanel.remove();
    }

    this.settingsPanel = document.createElement("div");
    this.settingsPanel.className = `
      fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 space-y-4
    `;

    // Create Color Picker
    const colorPickerLabel = document.createElement("label");
    colorPickerLabel.textContent = "Choose Ball Color:";
    colorPickerLabel.className = "text-white mb-2";

    const colorContainer = document.createElement("div");
    colorContainer.className = "flex space-x-2";

    // Generate color buttons
    this.highContrastColors.forEach((color) => {
      const colorButton = document.createElement("button");
      colorButton.style.backgroundColor = color;
      colorButton.className = "w-10 h-10 rounded border border-gray-300 cursor-pointer";
      colorButton.addEventListener("click", () => this.changeBallColor(color));
      colorContainer.appendChild(colorButton);
    });

    // Close Button
    const closeButton = this.createButton("Close Settings", "bg-gray-700", () => {
      this.settingsPanel?.remove();
      this.controls.resumeAfterSettings();
    });

    // Attach to panel
    this.settingsPanel.appendChild(colorPickerLabel);
    this.settingsPanel.appendChild(colorContainer);
    this.settingsPanel.appendChild(closeButton);

    // Attach to body
    document.body.appendChild(this.settingsPanel);
  }

  private createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `${className} text-white px-4 py-2 rounded`;
    button.addEventListener("click", onClick);
    return button;
  }

  /**
   * Change Ball Color
   */
  private changeBallColor(color: string) {
    this.pong.ball.color = color;
  }
}

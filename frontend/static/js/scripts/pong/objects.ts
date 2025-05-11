// import PongControls from "./pongControls.js";
// import AbstractView from "./AbstractView.js";


// export default class Pong extends AbstractView {
//   private cvs!: HTMLCanvasElement;
//   private ctx!: CanvasRenderingContext2D;
//   private leftPaddle!: Paddle;
//   private rightPaddle!: Paddle;
//   private ball!: Ball;
//   private intervalId: number | undefined;
//   private leftScore: number = 0;
//   private rightScore: number = 0;
//   private keys: { [key: string]: boolean } = {}; 
//   private isPaused: boolean = false;
//   private isGameRunning: boolean = false;

//   constructor() {
// 	super();
// 	this.setTitle("Pong Game");
//   }

//   async getHtml(): Promise<string> {
// 	return `
// 	  <div class="text-center text-white">
// 		<h1 class="text-4xl mb-5">Pong Game</h1>
// 		<div class="flex justify-around text-2xl mb-5">
// 			<div>Player 1: <span id="leftScore">0</span></div>
// 			<div>Player 2: <span id="rightScore">0</span></div>
// 		</div>
// 		<canvas id="canvas" width="800" height="400" class="border border-white"></canvas>
// 	  </div>
// 	`;
//   }

//   loadJS() {
// 	window.addEventListener('DOMContentLoaded', () => {
// 	  this.initializeGame();
// 	});

// 	if (document.readyState === "complete") {
// 	  this.initializeGame();
// 	}
//   }

//   initializeGame() {
// 	this.cvs = document.getElementById("canvas") as HTMLCanvasElement;
// 	if (!this.cvs) {
// 	  throw new Error("Canvas not found!");
// 	}
// 	this.ctx = this.cvs.getContext("2d")!;
// 	this.leftPaddle = new Paddle(10, this.cvs.height / 2 - 30, 10, 60);
// 	this.rightPaddle = new Paddle(this.cvs.width - 20, this.cvs.height / 2 - 30, 10, 60);
// 	// Increasing width and height of the paddles
// // this.leftPaddle = new Paddle(10, this.cvs.height / 2 - 40, 15, 80);
// // this.rightPaddle = new Paddle(this.cvs.width - 25, this.cvs.height / 2 - 40, 15, 80);

// 	this.ball = new Ball(this.cvs.width / 2, this.cvs.height / 2, 10);

// 	this.initializeControls();
// 	new PongControls(this);
//   }

//   initializeControls() {
// 	document.addEventListener("keydown", (e) => {
// 	  if (["ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(e.code)) {
// 		e.preventDefault();
// 		this.keys[e.code] = true;
// 	  }
// 	});

// 	document.addEventListener("keyup", (e) => {
// 	  if (["ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(e.code)) {
// 		e.preventDefault();
// 		this.keys[e.code] = false;
// 	  }
// 	});
//   }

//   startGame() {
// 	if (this.isGameRunning) return;

// 	this.isGameRunning = true;
// 	this.isPaused = false;

// 	const gameLoop = () => {
// 	  if (!this.isPaused) {
// 		this.update();
// 		this.draw();
// 	  }
// 	  if (this.isGameRunning) {
// 		requestAnimationFrame(gameLoop);
// 	  }
// 	};
// 	gameLoop();
//   }

//   togglePause(isPaused?: boolean) {
// 	this.isPaused = isPaused !== undefined ? isPaused : !this.isPaused;
//   }

//   stopGame() {
// 	this.isPaused = true;
// 	this.isGameRunning = false;
// 	this.resetGame();
// 	this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
// 	this.draw();
//   }

//   update() {
// 	if (this.keys["KeyW"]) this.leftPaddle.move(-5, this.cvs.height);
// 	if (this.keys["KeyS"]) this.leftPaddle.move(5, this.cvs.height);
// 	if (this.keys["ArrowUp"]) this.rightPaddle.move(-5, this.cvs.height);
// 	if (this.keys["ArrowDown"]) this.rightPaddle.move(5, this.cvs.height);

// 	this.ball.update(this.cvs, this.leftPaddle, this.rightPaddle);

// 	if (this.ball.x < 0) {
// 	  this.rightScore++;
// 	  this.resetGame();
// 	} else if (this.ball.x > this.cvs.width) {
// 	  this.leftScore++;
// 	  this.resetGame();
// 	}
//   }

//   cleanUp() {
//   if (this.intervalId !== undefined) {
// 	clearInterval(this.intervalId);
//   }
//   this.keys = {};
//   this.isPaused = true;
//   this.isGameRunning = false;
// }

//   resetGame() {
// 	this.ball.reset(this.cvs.width / 2, this.cvs.height / 2);
// 	// this.leftPaddle.y = this.cvs.height / 2 - 30;
// 	// this.rightPaddle.y = this.cvs.height / 2 - 30;
// 	document.getElementById("leftScore")!.textContent = this.leftScore.toString();
// 	document.getElementById("rightScore")!.textContent = this.rightScore.toString();
//   }

//   draw() {
// 	this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
// 	this.leftPaddle.draw(this.ctx);
// 	this.rightPaddle.draw(this.ctx);
// 	this.ball.draw(this.ctx);
//   }
// }

// class Paddle {
//   constructor(public x: number, public y: number, public width: number, public height: number) {}

//   move(dy: number, maxHeight: number) {
// 	this.y = Math.max(Math.min(this.y + dy, maxHeight - this.height), 0);
//   }

//   draw(ctx: CanvasRenderingContext2D) {
// 	ctx.fillStyle = "#FFFFFF";
// 	ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
// }
// class Ball {
//   dx: number = 0;
//   dy: number = 0;
//   private maxSpeed: number = 7;
//   private paddleBounceOffset: number = 2; // Pushes the ball slightly out after collision

//   constructor(public x: number, public y: number, public size: number) {
// 	this.reset(x, y);
//   }

//   update(cvs: HTMLCanvasElement, leftPaddle: Paddle, rightPaddle: Paddle) {
// 	this.x += this.dx;
// 	this.y += this.dy;

// 	// Bounce off the top and bottom walls
// 	if (this.y < 0 || this.y + this.size > cvs.height) {
// 	  this.dy *= -1;
// 	}

// 	// Collision with paddles
// 	if (this.collidesWith(leftPaddle)) {
// 	  this.handlePaddleCollision(leftPaddle, true);
// 	} else if (this.collidesWith(rightPaddle)) {
// 	  this.handlePaddleCollision(rightPaddle, false);
// 	}
//   }

//   collidesWith(paddle: Paddle): boolean {
// 	return (
// 	  this.x < paddle.x + paddle.width &&
// 	  this.x + this.size > paddle.x &&
// 	  this.y < paddle.y + paddle.height &&
// 	  this.y + this.size > paddle.y
// 	);
//   }

//   handlePaddleCollision(paddle: Paddle, isLeftPaddle: boolean) {
// 	// Invert the X direction
// 	this.dx *= -1.1;

// 	// Push the ball out of the paddle surface to prevent sticking
// 	if (isLeftPaddle) {
// 	  this.x = paddle.x + paddle.width + this.paddleBounceOffset;
// 	} else {
// 	  this.x = paddle.x - this.size - this.paddleBounceOffset;
// 	}

// 	// Introduce randomness to the angle
// 	const angleAdjustment = Math.random() * 0.4 - 0.2;
// 	this.dy += angleAdjustment;

// 	// Cap the speed to avoid unplayability
// 	this.dx = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.dx));
// 	this.dy = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.dy));
//   }

//   draw(ctx: CanvasRenderingContext2D) {
// 	ctx.fillStyle = "#FFFFFF";
// 	ctx.fillRect(this.x, this.y, this.size, this.size);
//   }

//   reset(x: number, y: number) {
// 	this.x = x;
// 	this.y = y;

// 	// Randomize initial direction
// 	this.dx = Math.random() > 0.5 ? 4 : -4;
// 	this.dy = Math.random() > 0.5 ? 3 : -3;
//   }
// }
// //////
//  import Pong from "./Pong.js";
 
//  export default class PongControls {
//    private pong: Pong;
//    private startButton: HTMLButtonElement;
//    private pauseButton: HTMLButtonElement;
//    private menuButton: HTMLButtonElement;
//    private isPaused: boolean = false;
//    private pauseOverlay: HTMLDivElement;
 
 
//    constructor(pongInstance: Pong) {
// 	 this.pong = pongInstance;
 
// 	 // Create buttons
// 	 this.startButton = document.createElement("button");
// 	 this.pauseButton = document.createElement("button");
// 	 this.menuButton = document.createElement("button");
 
// 	 // Add classes
// 	 this.startButton.className = "bg-green-500 text-white px-4 py-2 rounded mr-2";
// 	 this.pauseButton.className = "bg-yellow-500 text-white px-4 py-2 rounded mr-2";
// 	 this.menuButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
 
// 	 // Set text
// 	 this.startButton.textContent = "Start Game";
// 	 this.pauseButton.textContent = "Pause Game";
// 	 this.menuButton.textContent = "Menu";
 
// 	 // Attach to the DOM
// 	 const controlsContainer = document.createElement("div");
// 	 controlsContainer.className = "mt-5 flex justify-center space-x-4";
// 	 controlsContainer.appendChild(this.startButton);
// 	 controlsContainer.appendChild(this.pauseButton);
// 	 controlsContainer.appendChild(this.menuButton);
 
// 	 document.querySelector(".text-center")!.appendChild(controlsContainer);
 
//  //PAUSE overlay
// 	  this.pauseOverlay = document.createElement("div");
// 	 this.pauseOverlay.className = `
// 	   fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center 
// 	   text-white text-4xl hidden z-50 transition-all duration-300
// 	 `;
// 	 this.pauseOverlay.innerHTML = "<div>Game Paused</div>";
// 	 document.body.appendChild(this.pauseOverlay);
 
 
// 	 // Event Listeners
// 	 this.startButton.addEventListener("click", () => this.handleStart());
// 	 this.pauseButton.addEventListener("click", () => this.handlePause());
// 	 this.menuButton.addEventListener("click", () => this.handleMenu());
 
// 	 // Initial state
// 	 this.startButton.disabled = false;
// 	 this.pauseButton.disabled = true;
// 	 this.menuButton.disabled = false;
 
// 	 // Keyboard event for Esc
// 	 document.addEventListener("keydown", (e) => {
// 	   if (e.code === "Escape") {
// 		 this.handlePause();
// 	   }
// 	 });
//    }
 
//    handleStart() {
// 	 this.pong.startGame();
// 	 this.isPaused = false;
// 	 this.startButton.disabled = true;
// 	 this.pauseButton.disabled = false;
// 	  this.hidePauseOverlay();
//    }
 
//    handlePause() {
// 	 this.isPaused = !this.isPaused;
// 	 this.pong.togglePause(this.isPaused);
// 	 this.pauseButton.textContent = this.isPaused ? "Resume Game" : "Pause Game";
   
// 	 if (this.isPaused) {
// 	   this.showPauseOverlay();
// 	 } else {
// 	   this.hidePauseOverlay();
// 	 }
//  }
 
//  handleMenu() {
//    this.pong.cleanUp();
//    window.location.href = "pongMenu.html";
//  }
 
//  showPauseOverlay() {
// 	 this.pauseOverlay.classList.remove("hidden");
// 	 setTimeout(() => {
// 	   this.pauseOverlay.style.opacity = "1";
// 	 }, 10); // slight delay for transition
//    }
 
//    hidePauseOverlay() {
// 	 this.pauseOverlay.style.opacity = "0";
// 	 setTimeout(() => {
// 	   this.pauseOverlay.classList.add("hidden");
// 	 }, 300); // matches the transition duration
//    }
   
//  }
//  ////That version was playable with added pause


// @ts-ignore
import { CooldownTimer } from "./objects.js";
import { updateTextForElem } from "../../utils/languages.js";

export class Character {
	spellName: string = "";
	x: number;
	y: number;
	direction: any;
	speed: number | any;
	px: number;
	py: number;
	tpReady: boolean = true;
	pcG: any;
	ts: number;
	cooldownTimer: any = null;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.px = x;
		this.py = y;
		this.tpReady = true;
		this.pcG = pacmanGame;
		this.ts = this.pcG.tileSize;
		this.cooldownTimer = null;
	}

	setDirection(direction: any): void {
		this.direction = direction;
	}

	teleport(): void {
		if (this.tpReady == true) 
			{
			const tmpVal = this.pcG.cells[this.y][this.x].value;
			for (let i = 0; i < this.pcG.height; i++) 
				{
				for (let j = 0; j < this.pcG.width; j++) 
					{
					if ( this.pcG.cells[i][j].value == tmpVal && !(this.y == i && this.x == j)) 
					{
						this.x = j;
						this.y = i;
						this.px = j;
						this.py = i;
						this.tpReady = false;
						return;
					}
				}
			}
		}
	}
}

//#region PACMAN CHARACTERS

export class PacmanBase extends Character {
	speed: number;
	score: number;
	objective: number;
	cooldownDisplay: HTMLElement | null;
	pointFactor: number;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.speed = pacmanGame.pSpeed;
		this.score = 0;
		this.objective = -1;
		this.cooldownDisplay = document.getElementById('pCD');
		if (this.cooldownDisplay) 
		{
			updateTextForElem(this.cooldownDisplay, "ready");
		}
		
		//updateTextForElem(this.cooldownDisplay, "ready");
		this.pointFactor = 100 / 100;
	}

	useSpell(): void {}

	stopSpell(): void {}

	gainPoints(pointsGain: number): void {
		this.score += Math.floor(pointsGain * this.pointFactor);
	}

	premove(): void {}

	beforeMove(): void {
		const value = this.pcG.cells[this.y][this.x].value;
		if (value === 5 || value === 7) 
			{
			if (value === 5) 
			{
				this.pcG.cells[this.y][this.x].value = 6;
				this.gainPoints(15);
			} 
			else 
			{
				this.pcG.cells[this.y][this.x].value = 8;
				this.gainPoints(150);
			}
			this.pcG.pScore.textContent = this.score;
		} 
		else if (value >= 2 && value <= 4) 
			this.teleport();
		else 
			this.tpReady = true;
	}

	checkDirection(): void {
		switch (this.direction)
		 {
			case "up":
				if (this.y - 1 >= 0 &&
					this.pcG.cells[this.y - 1][this.x].value !== 1 &&
					this.pcG.cells[this.y - 1][this.x].value !== 9) {
					this.y -= 1;
				}
				break;
			case "down":
				if (this.y + 1 < this.pcG.height &&
					this.pcG.cells[this.y + 1][this.x].value !== 1 &&
					this.pcG.cells[this.y + 1][this.x].value !== 9) {
					this.y += 1;
				}
				break;
			case "left":
				if (this.x - 1 >= 0 &&
					this.pcG.cells[this.y][this.x - 1].value !== 1 &&
					this.pcG.cells[this.y][this.x - 1].value !== 9) {
					this.x -= 1;
				}
				break;
			case "right":
				if (this.x + 1 < this.pcG.width &&
					this.pcG.cells[this.y][this.x + 1].value !== 1 &&
					this.pcG.cells[this.y][this.x + 1].value !== 9) {
					this.x += 1;
				}
				break;
			default:
				break;
		}
	}

	move(): void {
		if (this.direction == "none") return;

		if (this.y == this.py && this.x == this.px) {
			this.beforeMove();
			this.premove();
			this.checkDirection();
		}

		if (this.px != this.x) {
			this.px = this.px < this.x
				? Math.round((this.px + this.speed) * 10000) / 10000 > this.x ? this.x : Math.round((this.px + this.speed) * 10000) / 10000
				: Math.round((this.px - this.speed) * 10000) / 10000 < this.x ? this.x : Math.round((this.px - this.speed) * 10000) / 10000;
		} else if (this.py != this.y) {
			this.py = this.py < this.y
				? Math.round((this.py + this.speed) * 10000) / 10000 > this.y ? this.y : Math.round((this.py + this.speed) * 10000) / 10000
				: Math.round((this.py - this.speed) * 10000) / 10000 < this.y ? this.y : Math.round((this.py - this.speed) * 10000) / 10000;
		}
	}

	eatFruit(fruit: { points: number }): void {
		this.gainPoints(fruit.points);
		this.pcG.pScore.textContent = this.score;
	}

	getSprite(): HTMLImageElement {
		const frame = this.pcG.frame % 40;
		if (frame < 10) return this.pcG.images.imgPacman1;
		if (frame < 20) return this.pcG.images.imgPacman2;
		if (frame < 30) return this.pcG.images.imgPacman3;
		return this.pcG.images.imgPacman2;
	}

	render(): void {
		if (this.objective > 0 && this.score >= this.objective) {
			this.pcG.partyOver(this.pcG.usernames.pacman);
		}

		const img = this.getSprite();

		const angle = this.direction === "right" ? 0 :
			this.direction === "up" ? -90 :
			this.direction === "left" ? 0 : 90;

		const radians = angle * Math.PI / 180;

		this.pcG.c.save();
		this.pcG.c.translate(this.px * this.ts + this.ts / 2, this.py * this.ts + this.ts / 2);

		if (this.direction === "left") {
			this.pcG.c.scale(-1, 1);
		} else {
			this.pcG.c.rotate(radians);
		}

		this.pcG.c.drawImage(img, -this.ts / 2, -this.ts / 2, this.ts, this.ts);
		this.pcG.c.restore();
	}
}


export class Pacman extends PacmanBase {
	frenzyDuration: number;
	frenzyCooldown: number;
	frenzySpeedBoost: number;
	disableGhostDuration: number;
	inFrenzy: boolean;
	eatenTimer: any;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "gluttony";
		this.frenzyDuration = 5;
		this.frenzyCooldown = 17;
		this.frenzySpeedBoost = 130 / 100;
		this.disableGhostDuration = 5;
		this.inFrenzy = false;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, this.frenzyDuration, this.frenzyCooldown, this.stopSpell.bind(this));
		this.eatenTimer = new CooldownTimer(null, this, this.disableGhostDuration, this.disableGhostDuration, this.stopEaten.bind(this));
	}

	eatFruit(fruit: { points: number }): void {
		this.score += fruit.points;
		this.pcG.pScore.textContent = this.score;
		this.startFrenzy();
	}

	eatGhost(): void {
		this.pcG.ghost.disabled = true;
		this.pcG.pacman.gainPoints(300);
		this.eatenTimer.startCD();
	}

	startFrenzy(): void {
		if (this.cooldownTimer.startCD()) {
			this.speed *= this.frenzySpeedBoost;
			this.inFrenzy = true;
		}
	}

	stopSpell(): void {
		this.speed /= this.frenzySpeedBoost;
		this.inFrenzy = false;
	}

	stopEaten(): void {
		this.pcG.ghost.disabled = false;
	}

	getSprite(): HTMLImageElement {
		if (this.inFrenzy) {
			return this.pcG.frame % 40 < 10 ? this.pcG.images.imgPacman1_frenzy :
				this.pcG.frame % 40 < 20 ? this.pcG.images.imgPacman2_frenzy :
				this.pcG.frame % 40 < 30 ? this.pcG.images.imgPacman3_frenzy :
				this.pcG.images.imgPacman2_frenzy;
		} else {
			return this.pcG.frame % 40 < 10 ? this.pcG.images.imgPacman1 :
				this.pcG.frame % 40 < 20 ? this.pcG.images.imgPacman2 :
				this.pcG.frame % 40 < 30 ? this.pcG.images.imgPacman3 :
				this.pcG.images.imgPacman2;
		}
	}
}

export class PacWoman extends PacmanBase {
	turbo: boolean;
	speedDuration: number;
	speedCooldown: number;
	speedBoost: number;
	speedAdd: number;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "turbo";
		this.turbo = false;
		this.speedDuration = 10;
		this.speedCooldown = 25;
		this.speedBoost = 120 / 100;
		this.speedAdd = (this.speed * 103 / 100) - this.speed;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, this.speedDuration, this.speedCooldown, this.stopSpell.bind(this));
	}

	eatFruit(fruit: { points: number }): void {
		this.score += fruit.points;
		this.pcG.pScore.textContent = this.score;
		this.speed += this.speedAdd;
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			this.speed *= this.speedBoost;
			this.turbo = true;
		}
	}

	stopSpell(): void {
		this.speed /= this.speedBoost;
		this.turbo = false;
	}

	getSprite(): HTMLImageElement {
		if (this.turbo) {
			return this.pcG.frame % 40 < 10 ? this.pcG.images.imgPacwoman1_turbo :
				this.pcG.frame % 40 < 20 ? this.pcG.images.imgPacwoman2_turbo :
				this.pcG.frame % 40 < 30 ? this.pcG.images.imgPacwoman3_turbo :
				this.pcG.images.imgPacwoman2_turbo;
		} else {
			return this.pcG.frame % 40 < 10 ? this.pcG.images.imgPacman1 :
				this.pcG.frame % 40 < 20 ? this.pcG.images.imgPacman2 :
				this.pcG.frame % 40 < 30 ? this.pcG.images.imgPacman3 :
				this.pcG.images.imgPacman2;
		}
	}
}


export class PacMIB extends PacmanBase {
	stunDuration: number;
	stunCooldown: number;
	baseSpeed: number;
	speedBoost: number;
	speedDuration: number;
	speedy: boolean;
	warpSpeedTimer: any;
	ghostSpeed: number | undefined;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "flash";
		this.stunDuration = 3;
		this.stunCooldown = 20;
		this.baseSpeed = this.speed;
		this.speedBoost = this.speed * 120 / 100;
		this.speedDuration = 3;
		this.speedy = false;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, this.stunDuration, this.stunCooldown, this.stopSpell.bind(this));
		this.warpSpeedTimer = new CooldownTimer(null, this, this.speedDuration, this.speedDuration, this.stopSpeedBoost.bind(this));
		this.ghostSpeed = undefined;
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			this.pcG.ghost.disabled = true;
		}
	}

	stopSpell(): void {
		this.pcG.ghost.disabled = false;
	}

	stopSpeedBoost(): void {
		this.speed = this.baseSpeed;
	}

	teleport(): void {
		if (this.tpReady == true) {
			const tmpVal = this.pcG.cells[this.y][this.x].value;
			for (let i = 0; i < this.pcG.height; i++) {
				for (let j = 0; j < this.pcG.width; j++) {
					if (this.pcG.cells[i][j].value == tmpVal && !(this.y == i && this.x == j)) {
						this.x = j;
						this.y = i;
						this.px = j;
						this.py = i;
						this.speed = this.speedBoost;
						this.warpSpeedTimer.startCD();
						this.tpReady = false;
						return;
					}
				}
			}
		}
	}
}

export class Pacventurer extends PacmanBase {
	grapplingCD: number;
	grappling: boolean;
	grapplingSpeed: number;
	grapplingDirection: string;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "grappling hook";
		this.pointFactor = 105 / 100;
		this.grapplingCD = 15;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.grapplingCD, this.stopSpell.bind(this));
		this.grappling = false;
		this.grapplingSpeed = 800 / 100;
		this.grapplingDirection = "";
	}

	premove(): void {
		if (this.grappling) {
			const isWall = (nextY: number, nextX: number): boolean => {
				return nextY < 0 || nextX < 0 ||
					nextY >= this.pcG.height || nextX >= this.pcG.width ||
					this.pcG.cells[nextY][nextX].value === 1 || this.pcG.cells[nextY][nextX].value === 9;
			};

			let nextY = this.y, nextX = this.x;

			switch (this.grapplingDirection) {
				case "up": nextY -= 1; break;
				case "down": nextY += 1; break;
				case "left": nextX -= 1; break;
				case "right": nextX += 1; break;
			}

			if (isWall(nextY, nextX)) {
				this.grappling = false;
				this.speed /= this.grapplingSpeed;
			}
		}
	}

	checkDirection(): void {
		let usedDirection = this.direction;
		if (this.grappling) {
			usedDirection = this.grapplingDirection;
		}

		switch (usedDirection) {
			case "up":
				if (this.y - 1 >= 0 && this.pcG.cells[this.y - 1][this.x].value !== 1 && this.pcG.cells[this.y - 1][this.x].value !== 9)
					this.y -= 1;
				break;
			case "down":
				if (this.y + 1 < this.pcG.height && this.pcG.cells[this.y + 1][this.x].value !== 1 && this.pcG.cells[this.y + 1][this.x].value !== 9)
					this.y += 1;
				break;
			case "left":
				if (this.x - 1 >= 0 && this.pcG.cells[this.y][this.x - 1].value !== 1 && this.pcG.cells[this.y][this.x - 1].value !== 9)
					this.x -= 1;
				break;
			case "right":
				if (this.x + 1 < this.pcG.width && this.pcG.cells[this.y][this.x + 1].value !== 1 && this.pcG.cells[this.y][this.x + 1].value !== 9)
					this.x += 1;
				break;
		}
	}

	setDirection(direction: any): void {
		this.direction = direction;
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			this.grappling = true;
			this.speed *= this.grapplingSpeed;
			this.grapplingDirection = this.direction;
		}
	}
}


export class GhostBase extends Character {
	cooldownDisplay: HTMLElement | null;
	spawnX: number;
	spawnY: number;
	disabled: boolean;
	speed: number;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		
		super(x, y, direction, pacmanGame);
		// this.speed = pacmanGame.gSpeed;
		this.speed = pacmanGame.gSpeed;
		this.cooldownDisplay = document.getElementById('gCD');
		// updateTextForElem(this.cooldownDisplay, "ready");
		if (this.cooldownDisplay) {
			updateTextForElem(this.cooldownDisplay, "ready");
		}
		
		this.spawnX = this.x;
		this.spawnY = this.y;
		this.disabled = false;
	}

	useSpell(): void {}

	stopSpell(): void {}

	premove(): void {}

	beforeMove(): void {
		const cellValue = this.pcG.cells[this.y][this.x].value;
		if (cellValue >= 2 && cellValue <= 4) {
			this.teleport();
		} else {
			this.tpReady = true;
		}
	}

	checkPacmanCollision(): void {
		if (!this.disabled) {
			const pacman = this.pcG.pacman;
			if (Math.abs(pacman.py - this.py) < 0.5 && Math.abs(pacman.px - this.px) < 0.5) {
				if (pacman.inFrenzy) {
					pacman.eatGhost();
				} else if (!this.disabled) {
					this.pcG.partyOver(this.pcG.usernames.ghost);
				}
			}
		}
	}

	checkDirection(): void {
		switch (this.direction) {
			case "up":
				if (this.y - 1 >= 0 && this.pcG.cells[this.y - 1][this.x].value !== 1)
					this.y -= 1;
				break;
			case "down":
				if (this.y + 1 < this.pcG.height && this.pcG.cells[this.y + 1][this.x].value !== 1)
					this.y += 1;
				break;
			case "left":
				if (this.x - 1 >= 0 && this.pcG.cells[this.y][this.x - 1].value !== 1)
					this.x -= 1;
				break;
			case "right":
				if (this.x + 1 < this.pcG.width && this.pcG.cells[this.y][this.x + 1].value !== 1)
					this.x += 1;
				break;
			default:
				break;
		}
	}

	move(): void {
		if (this.y == this.py && this.x == this.px) {
			this.beforeMove();
			this.premove();
			this.checkDirection();
		}

		if (!this.disabled) {
			if (this.px != this.x) {
				this.px = this.px < this.x
					? Math.round((this.px + this.speed) * 1000) / 1000 > this.x
						? this.x
						: Math.round((this.px + this.speed) * 1000) / 1000
					: Math.round((this.px - this.speed) * 1000) / 1000 < this.x
						? this.x
						: Math.round((this.px - this.speed) * 1000) / 1000;
			} else if (this.py != this.y) {
				this.py = this.py < this.y
					? Math.round((this.py + this.speed) * 1000) / 1000 > this.y
						? this.y
						: Math.round((this.py + this.speed) * 1000) / 1000
					: Math.round((this.py - this.speed) * 1000) / 1000 < this.y
						? this.y
						: Math.round((this.py - this.speed) * 1000) / 1000;
			}
		}
	}

	getImage(): HTMLImageElement {
		if (this.disabled) {
			return this.pcG.images.imgGhostDisabled;
		} else {
			switch (this.direction) {
				case "right": return this.pcG.images.imgGhost1;
				case "down": return this.pcG.images.imgGhost2;
				case "up": return this.pcG.images.imgGhost3;
				case "left": return this.pcG.images.imgGhost4;
				default: return this.pcG.images.imgGhost1;
			}
		}
	}

	render(): void {
		this.checkPacmanCollision();

		const img = this.getImage();
		this.pcG.c.drawImage(img, this.px * this.ts, this.py * this.ts, this.ts, this.ts);
	}
}


export class BlueGhost extends GhostBase {
	ghostBlockCooldown: number;
	speedDuration: number;
	speedTimer: any;
	gBlockX: number | undefined;
	gBlockY: number | undefined;
	lastX: number;
	lastY: number;
	baseSpeed: number;
	speedBoost: number;
	cellValue: number | "Nothing"; //?????

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "ghost block";
		this.ghostBlockCooldown = 5;
		this.speedDuration = 10;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.ghostBlockCooldown, this.stopSpell.bind(this));
		this.speedTimer = new CooldownTimer(null, this, this.speedDuration, this.speedDuration, this.stopSpeed.bind(this));
		this.gBlockX = undefined;
		this.gBlockY = undefined;
		this.lastX = this.x;
		this.lastY = this.y;
		this.baseSpeed = this.speed;
		this.speedBoost = this.speed * 110 / 100;
		this.cellValue = "Nothing";
	}

	premove(): void {
		this.lastX = this.x;
		this.lastY = this.y;
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			if (this.cellValue !== "Nothing") {
				this.pcG.cells[this.gBlockX!][this.gBlockY!].value = this.cellValue;
			}
			this.gBlockX = this.lastY;
			this.gBlockY = this.lastX;
			this.cellValue = this.pcG.cells[this.gBlockX][this.gBlockY].value;
			this.pcG.cells[this.gBlockX][this.gBlockY].value = 9;
			this.speed = this.speedBoost;
			this.speedTimer.startCD();
		}
	}

	stopSpeed(): void {
		this.speed = this.baseSpeed;
	}
}


export class OrangeGhost extends GhostBase {
	wallBlockX: number;
	wallBlockY: number;
	lastX: number;
	lastY: number;
	isWall: boolean;
	excavateCooldown: number;
	ghostlySpeed: number;
	baseSpeed: number;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "excavate";
		this.wallBlockX = this.x;
		this.wallBlockY = this.y;
		this.lastX = this.x;
		this.lastY = this.y;
		this.isWall = false;
		this.excavateCooldown = 20;
		this.ghostlySpeed = this.speed * 150 / 100;
		this.baseSpeed = this.speed;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.excavateCooldown, this.stopSpell.bind(this));
	}
////??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
	premove(): void {
		const isWall = (nextY: number, nextX: number): boolean => {
			return nextY < 0 || nextX < 0 || nextY >= this.pcG.height || nextX >= this.pcG.width ||
				this.pcG.cells[nextY][nextX].value === 1;
		};

		const isGhostBlock = (nextY: number, nextX: number): boolean => {
			return nextY < 0 || nextX < 0 || nextY >= this.pcG.height || nextX >= this.pcG.width ||
				this.pcG.cells[nextY][nextX].value === 9;
		};

		this.lastX = this.x;
		this.lastY = this.y;
		this.wallBlockY = this.y;
		this.wallBlockX = this.x;

		switch (this.direction) {
			case "up": this.wallBlockY -= 1; break;
			case "down": this.wallBlockY += 1; break;
			case "left": this.wallBlockX -= 1; break;
			case "right": this.wallBlockX += 1; break;
		}

		this.isWall = isWall(this.wallBlockY, this.wallBlockX);

		if (isGhostBlock(this.wallBlockY, this.wallBlockX) || this.pcG.cells[this.lastY][this.lastX].value === 9) {
			this.speed = this.ghostlySpeed;
		} else {
			this.speed = this.baseSpeed;
		}
	}

	useSpell(): void {
		if (this.isWall) {
			if (this.cooldownTimer.startCD()) {
				this.pcG.cells[this.wallBlockY][this.wallBlockX].value = 9;
			}
		}
	}
}

export class PinkGhost extends GhostBase {
	intangibleDuration: number;
	intangibleCooldown: number;
	intangibleSpeed: number;
	intangible: boolean;
	lastGroundX: number;
	lastGroundY: number;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "dematerialize";
		this.intangibleDuration = 2;
		this.intangibleCooldown = 25;
		this.intangibleSpeed = 110 / 100;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, this.intangibleDuration, this.intangibleCooldown, this.stopSpell.bind(this));
		this.intangible = false;
		this.lastGroundX = this.x;
		this.lastGroundY = this.y;
	}

	premove(): void {
		if (this.pcG.cells[this.y][this.x].value != 1) {
			this.lastGroundX = this.x;
			this.lastGroundY = this.y;
		}
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			this.intangible = true;
			this.speed *= this.intangibleSpeed;
		}
	}

	stopSpell(): void {
		this.intangible = false;
		this.speed /= this.intangibleSpeed;
		if (this.pcG.cells[this.y][this.x].value === 1) {
			this.x = this.lastGroundX;
			this.y = this.lastGroundY;
			this.px = this.x;
			this.py = this.y;
		}
	}

	checkDirection(): void {
		switch (this.direction) {
			case "up":
				if (this.y - 1 >= 0 &&
					(this.intangible || (this.pcG.cells[this.y - 1][this.x].value !== 1 && this.pcG.cells[this.y - 1][this.x].value !== 9))) {
					this.y -= 1;
				}
				break;
			case "down":
				if (this.y + 1 < this.pcG.height &&
					(this.intangible || (this.pcG.cells[this.y + 1][this.x].value !== 1 && this.pcG.cells[this.y + 1][this.x].value !== 9))) {
					this.y += 1;
				}
				break;
			case "left":
				if (this.x - 1 >= 0 &&
					(this.intangible || (this.pcG.cells[this.y][this.x - 1].value !== 1 && this.pcG.cells[this.y][this.x - 1].value !== 9))) {
					this.x -= 1;
				}
				break;
			case "right":
				if (this.x + 1 < this.pcG.width &&
					(this.intangible || (this.pcG.cells[this.y][this.x + 1].value !== 1 && this.pcG.cells[this.y][this.x + 1].value !== 9))) {
					this.x += 1;
				}
				break;
		}
	}

	getImage(): HTMLImageElement {
		if (this.disabled) {
			return this.pcG.images.imgGhostDisabled;
		} else if (this.intangible) {
			switch (this.direction) {
				case "right": return this.pcG.images.imgGhost1_intangible;
				case "down": return this.pcG.images.imgGhost2_intangible;
				case "up": return this.pcG.images.imgGhost3_intangible;
				case "left": return this.pcG.images.imgGhost4_intangible;
				default: return this.pcG.images.imgGhost1_intangible;
			}
		} else {
			switch (this.direction) {
				case "right": return this.pcG.images.imgGhost1;
				case "down": return this.pcG.images.imgGhost2;
				case "up": return this.pcG.images.imgGhost3;
				case "left": return this.pcG.images.imgGhost4;
				default: return this.pcG.images.imgGhost1;
			}
		}
	}
}

// export class OrangeGhost extends GhostBase {
// 	constructor(x, y, direction, pacmanGame) {
// 		super(x, y, direction, pacmanGame);
// 		this.spellName = "excavate";
// 		this.wallBlockX = this.x;
// 		this.wallBlockY = this.y;
// 		this.lastX = this.x;
// 		this.lastY = this.y;
// 		this.isWall = false;
// 		this.excavateCooldown = 20;
// 		this.ghostlySpeed = this.speed * 150/100;
// 		this.baseSpeed = this.speed;
// 		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.excavateCooldown, this.stopSpell.bind(this));
// 	}

// 	premove() {
// 		const isWall = (nextY, nextX) => {
// 			return nextY < 0 || nextX < 0 || nextY >= this.pcG.height || nextX >= this.pcG.width || 
// 				   this.pcG.cells[nextY][nextX].value === 1;
// 		};

// 		const isGhostBlock = (nextY, nextX) => {
// 			return nextY < 0 || nextX < 0 || nextY >= this.pcG.height || nextX >= this.pcG.width || 
// 				this.pcG.cells[nextY][nextX].value === 9;
// 		};	

// 		this.lastX = this.x;
// 		this.lastY = this.y;
// 		this.wallBlockY = this.y;
// 		this.wallBlockX = this.x;
	
// 		switch (this.direction) {
// 			case "up": this.wallBlockY -= 1; break;
// 			case "down": this.wallBlockY += 1; break;
// 			case "left": this.wallBlockX -= 1; break;
// 			case "right": this.wallBlockX += 1; break;
// 			default: break;
// 		}
	
// 		if (isWall(this.wallBlockY, this.wallBlockX)) {
// 			this.isWall = true;
// 		}
// 		else {
// 			this.isWall = false;
// 		}
		
// 		if (isGhostBlock(this.wallBlockY, this.wallBlockX) || this.pcG.cells[this.lastY][this.lastX].value === 9) {
// 			this.speed = this.ghostlySpeed;
// 		}
// 		else {
// 			this.speed = this.baseSpeed;
// 		}
// 	}
			

// 	useSpell() {
// 		if (this.isWall) {
// 			if (this.cooldownTimer.startCD()) {
// 				this.pcG.cells[this.wallBlockY][this.wallBlockX].value = 9;
// 			}
// 		}		
// 	}
// }

// export class PinkGhost extends GhostBase {
// 	constructor(x, y, direction, pacmanGame) {
// 		super(x, y, direction, pacmanGame);
// 		this.spellName = "dematerialize";
// 		this.intangibleDuration = 2;
// 		this.intangibleCooldown = 25;
// 		this.intangibleSpeed = 110/100;
// 		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, this.intangibleDuration, this.intangibleCooldown, this.stopSpell.bind(this));
// 		this.intangible = false;
// 		this.lastGroundX = this.x;
// 		this.lastGroundY = this.y;
// 	}

// 	premove() {
// 		if (this.pcG.cells[this.y][this.x].value != 1) {
// 			this.lastGroundX = this.x;
// 			this.lastGroundY = this.y;
// 		}
// 	}

// 	useSpell() {
// 		if (this.cooldownTimer.startCD()) {
// 			this.intangible = true;
// 			this.speed *= this.intangibleSpeed;
// 		}
// 	}

// 	stopSpell() {
// 		this.intangible = false;
// 		this.speed /= this.intangibleSpeed;
// 		if (this.pcG.cells[this.y][this.x].value == 1) {
// 			this.x = this.lastGroundX;
// 			this.y = this.lastGroundY;
// 			this.px = this.x;
// 			this.py = this.y;
// 		}
// 	}

// 	checkDirection() {
// 		switch (this.direction) {
// 			case "up":
// 				if (this.y - 1 >= 0)
// 					if (this.intangible || (this.pcG.cells[this.y - 1][this.x].value !== 1 && this.pcG.cells[this.y - 1][this.x].value !== 9))
// 						this.y -= 1;
// 				break;
// 			case "down":
// 				if (this.y + 1 < this.pcG.height)
// 					if (this.intangible || (this.pcG.cells[this.y + 1][this.x].value !== 1 && this.pcG.cells[this.y + 1][this.x].value !== 9))
// 						this.y += 1;
// 				break;
// 			case "left":
// 				if (this.x - 1 >= 0)
// 					if (this.intangible || (this.pcG.cells[this.y][this.x - 1].value !== 1 && this.pcG.cells[this.y][this.x - 1].value !== 9))
// 						this.x -= 1;
// 				break;
// 			case "right":
// 				if (this.x + 1 < this.pcG.width)
// 					if (this.intangible || (this.pcG.cells[this.y][this.x + 1].value !== 1 && this.pcG.cells[this.y][this.x + 1].value !== 9))
// 						this.x += 1;
// 				break;
// 			default:
// 				break;
// 		}
// 	}

// 	getImage () {
// 		if (this.disabled) {
// 			return this.pcG.images.imgGhostDisabled;
// 		}		
// 		else if (this.intangible){
// 			switch (this.direction){
// 				case "right":
// 					return this.pcG.images.imgGhost1_intangible;
// 				case "down":
// 					return this.pcG.images.imgGhost2_intangible;
// 				case "up":
// 					return this.pcG.images.imgGhost3_intangible;
// 				case "left":
// 					return this.pcG.images.imgGhost4_intangible;
// 				default:
// 					return this.pcG.images.imgGhost1_intangible;
// 			}
// 		}
// 		else {
// 			switch (this.direction){
// 				case "right":
// 					return this.pcG.images.imgGhost1;
// 				case "down":
// 					return this.pcG.images.imgGhost2;
// 				case "up":
// 					return this.pcG.images.imgGhost3;
// 				case "left":
// 					return this.pcG.images.imgGhost4;
// 				default:
// 					return this.pcG.images.imgGhost1;
// 			}
// 		}
// 	}
// }

// export class GreenGhost extends GhostBase {
// 	constructor(x, y, direction, pacmanGame) {
// 		super(x, y, direction, pacmanGame);
// 		this.spellName = "blockade";
// 		this.blockadeCooldown = 25;
// 		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.blockadeCooldown, this.stopSpell.bind(this));
// 		this.lastX = this.x;
// 		this.lastY = this.y;
// 		this.frontBlockX = -1;
// 		this.frontBlockY = -1;
// 		this.ghostBlockX = -1;
// 		this.ghostBlockY = -1;
// 		this.breakWallDuration = 2;
// 		this.breakWallTimer = new CooldownTimer(null, this, this.breakWallDuration, this.breakWallDuration, this.breakWall.bind(this));
// 	}

// 	premove() {
// 		this.lastX = this.x;
// 		this.lastY = this.y;
// 		switch (this.direction) {
// 			case "up":
// 				this.frontBlockX = this.x;
// 				this.frontBlockY = this.y - 1;
// 				break;
// 			case "down":
// 				this.frontBlockX = this.x;
// 				this.frontBlockY = this.y + 1;
// 				break;
// 			case "left":
// 				this.frontBlockX = this.x - 1;
// 				this.frontBlockY = this.y;
// 				break;
// 			case "right":
// 				this.frontBlockX = this.x + 1;
// 				this.frontBlockY = this.y;
// 				break;
// 			default:
// 				break;
// 		}
// 		if (this.frontBlockX >= 0  && this.frontBlockX < this.pcG.width &&
// 			this.frontBlockY >= 0  && this.frontBlockY < this.pcG.height &&
// 			this.pcG.cells[this.frontBlockY][this.frontBlockX].value === 1) {
// 			this.breakWallTimer.startCD();
// 		}
// 		else {
// 			this.breakWallTimer.resetCD();
// 		}
// 	}

// 	useSpell() {
// 		if (this.cooldownTimer.startCD()) {
// 			this.pcG.cells[this.lastY][this.lastX].value = 1;
// 		}		
// 	}

// 	breakWall() {
// 		if (this.pcG.cells[this.frontBlockY][this.frontBlockX].value === 1) {
// 			this.pcG.cells[this.frontBlockY][this.frontBlockX].value = 9;
// 			if (this.ghostBlockX != -1 && this.ghostBlockY != -1)
// 			this.pcG.cells[this.ghostBlockY][this.ghostBlockX].value = 1;
// 			this.ghostBlockX = this.frontBlockX;
// 			this.ghostBlockY = this.frontBlockY;
// 		}
// 	}
// }


export class GreenGhost extends GhostBase {
	blockadeCooldown: number;
	lastX: number;
	lastY: number;
	frontBlockX: number;
	frontBlockY: number;
	ghostBlockX: number;
	ghostBlockY: number;
	breakWallDuration: number;
	breakWallTimer: any;

	constructor(x: number, y: number, direction: any, pacmanGame: any) {
		super(x, y, direction, pacmanGame);
		this.spellName = "blockade";
		this.blockadeCooldown = 25;
		this.cooldownTimer = new CooldownTimer(this.cooldownDisplay, this, 0, this.blockadeCooldown, this.stopSpell.bind(this));
		this.lastX = this.x;
		this.lastY = this.y;
		this.frontBlockX = -1;
		this.frontBlockY = -1;
		this.ghostBlockX = -1;
		this.ghostBlockY = -1;
		this.breakWallDuration = 2;
		this.breakWallTimer = new CooldownTimer(null, this, this.breakWallDuration, this.breakWallDuration, this.breakWall.bind(this));
	}

	premove(): void {
		this.lastX = this.x;
		this.lastY = this.y;

		switch (this.direction) {
			case "up":
				this.frontBlockX = this.x;
				this.frontBlockY = this.y - 1;
				break;
			case "down":
				this.frontBlockX = this.x;
				this.frontBlockY = this.y + 1;
				break;
			case "left":
				this.frontBlockX = this.x - 1;
				this.frontBlockY = this.y;
				break;
			case "right":
				this.frontBlockX = this.x + 1;
				this.frontBlockY = this.y;
				break;
			default:
				break;
		}

		if (
			this.frontBlockX >= 0 &&
			this.frontBlockX < this.pcG.width &&
			this.frontBlockY >= 0 &&
			this.frontBlockY < this.pcG.height &&
			this.pcG.cells[this.frontBlockY][this.frontBlockX].value === 1
		) {
			this.breakWallTimer.startCD();
		} else {
			this.breakWallTimer.resetCD();
		}
	}

	useSpell(): void {
		if (this.cooldownTimer.startCD()) {
			this.pcG.cells[this.lastY][this.lastX].value = 1;
		}
	}

	breakWall(): void {
		if (this.pcG.cells[this.frontBlockY][this.frontBlockX].value === 1) {
			this.pcG.cells[this.frontBlockY][this.frontBlockX].value = 9;

			if (this.ghostBlockX !== -1 && this.ghostBlockY !== -1) {
				this.pcG.cells[this.ghostBlockY][this.ghostBlockX].value = 1;
			}

			this.ghostBlockX = this.frontBlockX;
			this.ghostBlockY = this.frontBlockY;
		}
	}
}
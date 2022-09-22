import { Dust, Splash } from "./particles.js";

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super("SITTING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input) {
    if (
      input.includes("ArrowLeft") ||
      input.includes("ArrowRight") ||
      input.includes("swipe up") ||
      input.includes("swipe right")
    ) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes(" ") || input.includes("swipe down")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(game) {
    super("RUNNING", game);
    this.fps = 5;
  }
  enter() {
    this.game.player.frameX = 20;
    this.game.player.maxFrame = 24;
    this.game.player.frameY = 1;
  }
  handleInput(input) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.4,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes("ArrowDown") || input.includes("swipe left")) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp") || input.includes("swipe up")) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes(" ") || input.includes("swipe down")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super("JUMPING", game);
  }
  enter() {
    if (this.game.player.onGround()) this.game.player.vy -= 18;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
    this.game.player.frameY = 3;
  }
  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1);
    } else if (input.includes(" ") || input.includes("swipe down")) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

export class Falling extends State {
  constructor(game) {
    super("FALLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 5;
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

export class Rolling extends State {
  constructor(game) {
    super("ROLLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 2;
  }
  handleInput(input) {
    if (
      !input.includes(" ") &&
      !input.includes("swipe down") &&
      this.game.player.onGround()
    ) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes(" ") && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    } else if (
      (input.includes(" ") &&
        input.includes("ArrowUp") &&
        this.game.player.onGround()) ||
      (input.includes("swipe up") && this.game.player.onGround())
    ) {
      this.game.player.vy -= 18;
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

export class Diving extends State {
  constructor(game) {
    super("DIVING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 10;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (input.includes(" ") && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Hit extends State {
  constructor(game) {
    super("HIT", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 4;
  }
  handleInput(input) {
    if (this.game.player.frameX >= 4 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (this.game.player.frameX >= 4 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 2);
    }
  }
}
